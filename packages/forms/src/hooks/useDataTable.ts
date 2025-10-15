import { useState, useMemo, useCallback, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useKuiProvider } from "@kui-framework/core";
import type { FilterValue } from "@kui-framework/core";
import { useSearchParams } from "next/navigation";

/**
 * Tipos de visualização disponíveis
 */
export type DataTableView = "table" | "grid" | "list";

/**
 * Contexto para ações do DataTable
 */
export interface DataTableActionContext {
  /** Refetch completo da lista */
  refetch: () => void;
  /** Invalidar cache do react-query */
  invalidate: () => void;
  /** Update otimista - atualiza cache local imediatamente */
  optimisticUpdate: (updater: (items: any[]) => any[]) => void;
  /** Remove item otimisticamente */
  optimisticRemove: (id: string | number) => void;
  /** Patch item otimisticamente */
  optimisticPatch: (id: string | number, patch: any) => void;
}

/**
 * Opções para o hook useDataTable
 */
export interface UseDataTableOptions {
  /** Nome do provider registrado */
  providerName: string;
  /** Tamanho inicial da página */
  initialPageSize?: number;
  /** View inicial */
  initialView?: DataTableView;
  /** Habilitar sincronização com URL */
  enableUrlState?: boolean;
}

/**
 * Hook principal para gerenciar estado do DataTable
 *
 * @example
 * ```tsx
 * function MyDataTable() {
 *   const table = useDataTable({
 *     providerName: "userProvider",
 *     initialPageSize: 10,
 *     enableUrlState: true,
 *   });
 *
 *   return (
 *     <div>
 *       <input
 *         value={table.search}
 *         onChange={(e) => table.setSearch(e.target.value)}
 *       />
 *       // Renderizar dados
 *     </div>
 *   );
 * }
 * ```
 */
export function useDataTable<T = any>(options: UseDataTableOptions) {
  const provider = useKuiProvider(options.providerName);
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  // State derivado de URL ou inicial
  const [page, setPage] = useState(() => {
    if (!options.enableUrlState) return 1;
    const urlPage = searchParams?.get("page");
    return urlPage ? Number(urlPage) : 1;
  });

  const [pageSize, setPageSize] = useState(options.initialPageSize || 10);

  const [search, setSearch] = useState(() => {
    if (!options.enableUrlState) return "";
    return searchParams?.get("search") || "";
  });

  // Debounced search para melhor performance
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const [sortBy, setSortBy] = useState<string | undefined>(() => {
    if (!options.enableUrlState) return undefined;
    return searchParams?.get("sortBy") || undefined;
  });

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(() => {
    if (!options.enableUrlState) return "asc";
    const urlSortOrder = searchParams?.get("sortOrder") as "asc" | "desc";
    return urlSortOrder || "asc";
  });

  const [filters, setFilters] = useState<FilterValue[]>(() => {
    if (!options.enableUrlState) return [];
    const urlFilters = searchParams?.get("filters");
    return urlFilters ? JSON.parse(urlFilters) : [];
  });

  const [view, setView] = useState<DataTableView>(() => {
    if (!options.enableUrlState) return options.initialView || "table";
    const urlView = searchParams?.get("view") as DataTableView;
    return urlView || options.initialView || "table";
  });

  // Sincronizar state com URL
  useEffect(() => {
    if (!options.enableUrlState) return;

    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (search) params.set("search", search);
    if (sortBy) params.set("sortBy", sortBy);
    if (sortOrder !== "asc") params.set("sortOrder", sortOrder);
    if (filters.length > 0) params.set("filters", JSON.stringify(filters));
    if (view !== "table") params.set("view", view);

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [page, search, sortBy, sortOrder, filters, view, options.enableUrlState]);

  // Query com debounced search
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [options.providerName, "list", page, pageSize, debouncedSearch, sortBy, sortOrder, filters],
    queryFn: () => provider.list({
      page,
      pageSize,
      search: debouncedSearch,
      sort: sortBy,
      order: sortOrder,
      filters: filters.map(f => ({
        key: f.key,
        operator: f.operator,
        value: f.value,
      })),
    }),
    staleTime: 30000, // Cache por 30 segundos
    refetchOnWindowFocus: false, // Não refetch ao focar na janela
  });

  // Helpers para filtros
  const addFilter = useCallback((filter: FilterValue) => {
    setFilters(prev => [...prev, filter]);
    setPage(1); // Reset para página 1
  }, []);

  const removeFilter = useCallback((key: string) => {
    setFilters(prev => prev.filter(f => f.key !== key));
    setPage(1);
  }, []);

  const updateFilter = useCallback((key: string, value: any) => {
    setFilters(prev => prev.map(f =>
      f.key === key ? { ...f, value } : f
    ));
    setPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters([]);
    setSearch("");
    setPage(1);
  }, []);

  // Helper para ordenação
  const toggleSort = useCallback((column: string) => {
    if (sortBy === column) {
      setSortOrder(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  }, [sortBy]);

  // Context para ações
  const actionContext = useMemo((): DataTableActionContext => ({
    // Refetch completo (mais seguro, mas mais lento)
    refetch: () => refetch(),

    // Invalidar cache (trigger refetch automático)
    invalidate: () => {
      queryClient.invalidateQueries({
        queryKey: [options.providerName, "list"]
      });
    },

    // Update otimista - atualiza cache local imediatamente
    optimisticUpdate: (updater: (items: T[]) => T[]) => {
      queryClient.setQueryData(
        [options.providerName, "list", page, pageSize, search, sortBy, sortOrder, filters],
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: updater(oldData.data),
          };
        }
      );
    },

    // Remove item otimisticamente
    optimisticRemove: (id: string | number) => {
      queryClient.setQueryData(
        [options.providerName, "list", page, pageSize, search, sortBy, sortOrder, filters],
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: oldData.data.filter((item: any) => item.id !== id),
            total: oldData.total - 1,
          };
        }
      );
    },

    // Patch item otimisticamente
    optimisticPatch: (id: string | number, patch: Partial<T>) => {
      queryClient.setQueryData(
        [options.providerName, "list", page, pageSize, search, sortBy, sortOrder, filters],
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: oldData.data.map((item: any) =>
              item.id === id ? { ...item, ...patch } : item
            ),
          };
        }
      );
    },
  }), [queryClient, refetch, options.providerName, page, pageSize, search, sortBy, sortOrder, filters]);

  return {
    // Data
    data: data?.data || [],
    total: data?.total || 0,
    totalPages: data ? Math.ceil(data.total / data.pageSize) : 0,

    // State
    page,
    pageSize,
    search,
    sortBy,
    sortOrder,
    filters,
    view,
    isLoading,
    error,

    // Actions
    setPage,
    setPageSize,
    setSearch,
    toggleSort,
    addFilter,
    removeFilter,
    updateFilter,
    clearFilters,
    setView,
    refetch,

    // Action context
    actionContext,
  };
}
