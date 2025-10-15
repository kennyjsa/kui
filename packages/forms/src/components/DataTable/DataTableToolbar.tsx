"use client";

import React from "react";
import { Button } from "@kui-framework/ui";
import { Input } from "@kui-framework/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@kui-framework/ui";
import { Filter, Search, Table, Grid, List } from "lucide-react";
import type { FilterDefinition, FilterValue } from "@kui-framework/core";

export interface DataTableToolbarProps {
  search: string;
  onSearchChange: (search: string) => void;
  view: "table" | "grid" | "list";
  onViewChange: (view: "table" | "grid" | "list") => void;
  enableSearch?: boolean;
  enableViews?: boolean;
  availableFilters?: FilterDefinition[];
  activeFilters?: FilterValue[];
  onAddFilter?: (filter: FilterValue) => void;
}

export function DataTableToolbar({
  search,
  onSearchChange,
  view,
  onViewChange,
  enableSearch = true,
  enableViews = true,
  availableFilters = [],
  activeFilters = [],
  onAddFilter,
}: DataTableToolbarProps) {
  const handleAddFilter = (filterDef: FilterDefinition) => {
    if (!onAddFilter) return;

    // Criar filtro com valor padrão baseado no tipo
    const defaultFilter: FilterValue = {
      key: filterDef.key,
      operator: filterDef.operator || "eq",
      value: filterDef.type === "boolean" ? false :
             filterDef.type === "number" ? 0 :
             filterDef.type === "date" ? new Date() : "",
    };

    onAddFilter(defaultFilter);
  };

  return (
    <div className="flex items-center justify-between space-x-2 py-4">
      <div className="flex flex-1 items-center space-x-2">
        {enableSearch && (
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-8"
            />
          </div>
        )}

        {availableFilters.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
                {activeFilters.length > 0 && (
                  <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                    {activeFilters.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {availableFilters.map((filter) => (
                <DropdownMenuItem
                  key={filter.key}
                  onClick={() => handleAddFilter(filter)}
                  className="cursor-pointer"
                >
                  {filter.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {enableViews && (
        <div className="flex items-center space-x-2">
          <div className="flex rounded-md border">
            <Button
              variant={view === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewChange("table")}
              className="rounded-r-none border-r"
            >
              <Table className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewChange("grid")}
              className="rounded-none border-r"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewChange("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
