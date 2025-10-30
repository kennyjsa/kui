"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { DataTableProps } from "../../types";
import { useDataTable } from "../../hooks/useDataTable";
import { DataTableToolbar } from "./DataTableToolbar";
import { DataTableFilters } from "./DataTableFilters";
import { useDataTableResponsive } from "./DataTableResponsive";
import { DataTableAdvanced } from "./DataTableAdvanced";

// Componentes já implementados acima

const DataTableView = ({ view, data, columns, isLoading, sortBy, sortOrder, onSort, renderCard, actions, actionContext, responsive, useTanStackTable }: any) => {
  if (isLoading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  if (data.length === 0) {
    return <div className="text-center py-8 text-gray-500">Nenhum dado encontrado</div>;
  }

  // Se usar TanStack Table e for view table, usar componente avançado
  if (view === "table" && useTanStackTable) {
    return (
      <DataTableAdvanced
        data={data}
        columns={columns}
        isLoading={isLoading}
        onSort={onSort}
        sortBy={sortBy}
        sortOrder={sortOrder}
        actions={actions}
        actionContext={actionContext}
        responsive={responsive}
      />
    );
  }

  if (view === "table") {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              {columns.map((column: any) => (
                <th
                  key={column.key}
                  className={`border border-gray-300 px-4 py-2 text-left ${
                    responsive?.isMobile ? "px-2 py-1" : ""
                  }`}
                >
                  {column.sortable ? (
                    <button
                      onClick={() => onSort(column.key)}
                      className="flex items-center space-x-1 hover:text-blue-600"
                    >
                      <span className={responsive?.isMobile ? "text-sm" : ""}>{column.label}</span>
                      {sortBy === column.key && (
                        <span className={responsive?.isMobile ? "text-xs" : ""}>
                          {sortOrder === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </button>
                  ) : (
                    <span className={responsive?.isMobile ? "text-sm" : ""}>{column.label}</span>
                  )}
                </th>
              ))}
              {actions && (
                <th className={`border border-gray-300 px-4 py-2 ${
                  responsive?.isMobile ? "px-2 py-1" : ""
                }`}>
                  Ações
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, index: number) => (
              <tr key={item.id || index} className="hover:bg-gray-50">
                {columns.map((column: any) => (
                  <td
                    key={column.key}
                    className={`border border-gray-300 px-4 py-2 ${
                      responsive?.isMobile ? "px-2 py-1 text-sm" : ""
                    }`}
                  >
                    {column.render ? column.render(item[column.key], item) : item[column.key]}
                  </td>
                ))}
                {actions && (
                  <td className={`border border-gray-300 px-4 py-2 ${
                    responsive?.isMobile ? "px-2 py-1" : ""
                  }`}>
                    <div className={`flex ${
                      responsive?.isMobile ? "flex-col space-y-1" : "space-x-2"
                    }`}>
                      {actions(item, actionContext)}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (view === "grid") {
    const gridCols = responsive?.getResponsiveGridCols() || 3;
    const gridClass = `grid grid-cols-1 ${
      gridCols >= 2 ? "sm:grid-cols-2" : ""
    } ${
      gridCols >= 3 ? "lg:grid-cols-3" : ""
    } gap-4`;

    return (
      <div className={gridClass}>
        {data.map((item: any, index: number) => (
          <div key={item.id || index} className="border rounded-lg p-4">
            {renderCard ? renderCard(item) : (
              <div>
                {columns.slice(0, responsive?.isMobile ? 2 : 3).map((column: any) => (
                  <div key={column.key} className="mb-2">
                    <span className="font-medium">{column.label}:</span>{" "}
                    {column.render ? column.render(item[column.key], item) : item[column.key]}
                  </div>
                ))}
                {actions && (
                  <div className="mt-4 flex space-x-2">
                    {actions(item, actionContext)}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (view === "list") {
    return (
      <div className="space-y-4">
        {data.map((item: any, index: number) => (
          <div key={item.id || index} className="border rounded-lg p-4">
            {renderCard ? renderCard(item) : (
              <div className={`grid gap-4 ${
                responsive?.isMobile
                  ? "grid-cols-1"
                  : responsive?.isTablet
                    ? "grid-cols-2"
                    : "grid-cols-2 lg:grid-cols-4"
              }`}>
                {columns.map((column: any) => (
                  <div key={column.key}>
                    <span className="font-medium text-gray-600">{column.label}:</span>{" "}
                    {column.render ? column.render(item[column.key], item) : item[column.key]}
                  </div>
                ))}
              </div>
            )}
            {actions && (
              <div className={`mt-4 flex ${
                responsive?.isMobile ? "flex-col space-y-2" : "space-x-2"
              }`}>
                {actions(item, actionContext)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return null;
};

const DataTablePagination = ({ page, totalPages, total, pageSize, onPageChange }: any) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-gray-600">
        Mostrando {(page - 1) * pageSize + 1} a {Math.min(page * pageSize, total)} de {total} resultados
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="px-3 py-1">
          {page} de {totalPages}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

function DataTableInner<T = any>(props: DataTableProps<T>) {
  const {
    columns,
    filters = [],
    enableSearch = true,
    enableViews = true,
    initialView = "table",
    pageSize = 10,
    enableUrlState = true,
    renderCard,
    emptyState,
    actions,
    useTanStackTable = false,
  } = props;

  const responsive = useDataTableResponsive();

  const table = useDataTable<T>({
    providerName: props.providerName,
    initialPageSize: pageSize,
    initialView: responsive.getResponsiveView(initialView),
    enableUrlState,
  });

  // Aplicar responsividade às colunas
  const responsiveColumns = responsive.getResponsiveColumns(columns);

  return (
    <div className="space-y-4">
      {/* Toolbar: Busca + Views */}
      <DataTableToolbar
        search={table.search}
        onSearchChange={table.setSearch}
        view={table.view}
        onViewChange={table.setView}
        enableSearch={enableSearch}
        enableViews={enableViews}
        availableFilters={filters}
        activeFilters={table.filters}
        onAddFilter={table.addFilter}
      />

      {/* Pills de Filtros Ativos */}
      {table.filters.length > 0 && (
        <DataTableFilters
          filters={table.filters}
          filterDefinitions={filters}
          onRemove={table.removeFilter}
          onUpdate={table.updateFilter}
          onClear={table.clearFilters}
        />
      )}

      {/* View (Table/Grid/List) */}
      <DataTableView
        view={table.view}
        data={table.data}
        columns={responsiveColumns}
        isLoading={table.isLoading}
        sortBy={table.sortBy}
        sortOrder={table.sortOrder}
        onSort={table.toggleSort}
        renderCard={renderCard}
        emptyState={emptyState}
        actions={actions}
        actionContext={table.actionContext}
        responsive={responsive}
        useTanStackTable={useTanStackTable}
      />

      {/* Paginação */}
      <DataTablePagination
        page={table.page}
        totalPages={table.totalPages}
        total={table.total}
        pageSize={table.pageSize}
        onPageChange={table.setPage}
      />
    </div>
  );
}

// Wrapper com QueryClient
const queryClient = new QueryClient();

export function DataTable<T = any>(props: DataTableProps<T>) {
  return (
    <QueryClientProvider client={queryClient}>
      <DataTableInner {...props} />
    </QueryClientProvider>
  );
}
