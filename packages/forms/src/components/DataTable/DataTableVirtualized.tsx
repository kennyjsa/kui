"use client";

import React from "react";
import type { DataTableColumn } from "../../types";

export interface DataTableVirtualizedProps<T = any> {
  data: T[];
  columns: DataTableColumn<T>[];
  isLoading?: boolean;
  height?: number;
  itemHeight?: number;
  actions?: (row: T, context: any) => React.ReactNode;
  actionContext?: any;
  responsive?: any;
}

export function DataTableVirtualized<T = any>({
  data,
  columns,
  isLoading = false,
  actions,
  actionContext,
  responsive,
}: DataTableVirtualizedProps<T>) {

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-2 text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Nenhum dado encontrado.
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      {/* Header */}
      <div className={`bg-muted/50 border-b ${
        responsive?.isMobile ? "px-2 py-1" : "px-4 py-2"
      }`}>
        <div className="flex items-center">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {columns.slice(0, responsive?.isMobile ? 2 : 4).map((column) => (
              <div key={column.key} className="flex-1">
                <span className="font-semibold text-sm">{column.label}</span>
              </div>
            ))}
          </div>
          {actions && (
            <div className="ml-4">
              <span className="font-semibold text-sm">Ações</span>
            </div>
          )}
        </div>
      </div>

      {/* List */}
      <div className="space-y-2">
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex items-center border-b hover:bg-muted/50 ${
              responsive?.isMobile ? "px-2 py-1" : "px-4 py-2"
            }`}
          >
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {columns.slice(0, responsive?.isMobile ? 2 : 4).map((column) => (
                <div key={column.key} className="flex-1">
                  <span className="font-medium text-gray-600 text-sm">
                    {column.label}:
                  </span>{" "}
                  <span className={responsive?.isMobile ? "text-sm" : ""}>
                    {column.render ? column.render((item as any)[column.key], item) : (item as any)[column.key]}
                  </span>
                </div>
              ))}
            </div>

            {actions && (
              <div className={`ml-4 flex ${
                responsive?.isMobile ? "flex-col space-y-1" : "space-x-2"
              }`}>
                {actions(item, actionContext)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Hook para otimizações de performance
 */
export function useDataTablePerformance() {
  const [memoizedData, setMemoizedData] = React.useState<any[]>([]);

  const memoizeData = React.useCallback((data: any[]) => {
    setMemoizedData(data);
  }, []);

  const debouncedSearch = React.useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (callback: () => void, delay = 300) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(callback, delay);
      };
    })(),
    []
  );

  return {
    memoizedData,
    memoizeData,
    debouncedSearch,
  };
}
