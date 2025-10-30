"use client";

import { Button } from "@kui-framework/ui";
import { Badge } from "@kui-framework/ui";
import { X } from "lucide-react";
import type { FilterDefinition, FilterValue } from "@kui-framework/core";
import { FilterPopover } from "./FilterPopover";

export interface DataTableFiltersProps {
  filters: FilterValue[];
  filterDefinitions: FilterDefinition[];
  onRemove: (key: string) => void;
  onUpdate: (key: string, value: any) => void;
  onClear: () => void;
}

export function DataTableFilters({
  filters,
  filterDefinitions,
  onRemove,
  onUpdate,
  onClear,
}: DataTableFiltersProps) {
  if (filters.length === 0) return null;

  const getFilterDefinition = (key: string) => {
    return filterDefinitions.find(f => f.key === key);
  };

  const formatFilterValue = (filter: FilterValue) => {
    const filterDef = getFilterDefinition(filter.key);
    if (!filterDef) return String(filter.value);

    switch (filterDef.type) {
      case "boolean":
        return filter.value ? "Sim" : "Não";
      case "date":
        return filter.value instanceof Date
          ? filter.value.toLocaleDateString("pt-BR")
          : String(filter.value);
      case "select": {
        const option = filterDef.options?.find(opt => opt.value === filter.value);
        return option?.label || String(filter.value);
      }
      default:
        return String(filter.value);
    }
  };

  return (
    <div className="flex items-center space-x-2 py-2">
      <span className="text-sm text-muted-foreground">Filtros:</span>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const filterDef = getFilterDefinition(filter.key);
          return (
            <div key={filter.key} className="flex items-center space-x-1">
              <FilterPopover
                filter={filter}
                filterDefinition={filterDef}
                onUpdate={(value) => onUpdate(filter.key, value)}
                onRemove={() => onRemove(filter.key)}
              >
                <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                  <span className="font-medium">{filterDef?.label || filter.key}:</span>
                  <span className="ml-1">{formatFilterValue(filter)}</span>
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              </FilterPopover>
            </div>
          );
        })}
      </div>
      {filters.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-muted-foreground hover:text-foreground"
        >
          Limpar todos
        </Button>
      )}
    </div>
  );
}
