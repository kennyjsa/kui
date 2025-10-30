"use client";

import React from "react";
import { Button } from "@kui/ui";
import { Input } from "@kui/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@kui/ui";
import { Checkbox } from "@kui/ui";
import { DatePicker, DateRangePicker } from "@kui/ui";
import { Popover, PopoverContent, PopoverTrigger } from "@kui/ui";
import { Trash2 } from "lucide-react";
import type { FilterDefinition, FilterValue } from "@kui/core";

export interface FilterPopoverProps {
  filter: FilterValue;
  filterDefinition?: FilterDefinition;
  onUpdate: (value: any) => void;
  onRemove: () => void;
  children: React.ReactNode;
}

export function FilterPopover({
  filter,
  filterDefinition,
  onUpdate,
  onRemove,
  children,
}: FilterPopoverProps) {
  const [open, setOpen] = React.useState(false);

  const renderFilterInput = () => {
    if (!filterDefinition) {
      return (
        <Input
          value={filter.value}
          onChange={(e) => onUpdate(e.target.value)}
          placeholder="Valor"
        />
      );
    }

    switch (filterDefinition.type) {
      case "text":
        return (
          <Input
            value={filter.value}
            onChange={(e) => onUpdate(e.target.value)}
            placeholder={filterDefinition.placeholder || "Digite o valor"}
          />
        );

      case "number":
        return (
          <Input
            type="number"
            value={filter.value}
            onChange={(e) => onUpdate(Number(e.target.value))}
            placeholder={filterDefinition.placeholder || "Digite o número"}
          />
        );

      case "boolean":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={filter.value}
              onCheckedChange={(checked) => onUpdate(checked)}
            />
            <span className="text-sm">Ativo</span>
          </div>
        );

      case "select":
        return (
          <Select value={filter.value} onValueChange={onUpdate}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent>
              {filterDefinition.options?.map((option) => (
                <SelectItem key={option.value} value={String(option.value)}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "multiselect":
        return (
          <div className="space-y-2">
            {filterDefinition.options?.map((option) => {
              const isSelected = Array.isArray(filter.value) && filter.value.includes(option.value);
              return (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={(checked) => {
                      const currentValues = Array.isArray(filter.value) ? filter.value : [];
                      if (checked) {
                        onUpdate([...currentValues, option.value]);
                      } else {
                        onUpdate(currentValues.filter((v) => v !== option.value));
                      }
                    }}
                  />
                  <span className="text-sm">{option.label}</span>
                </div>
              );
            })}
          </div>
        );

      case "date":
        return (
          <DatePicker
            date={filter.value instanceof Date ? filter.value : new Date(filter.value)}
            onDateChange={(date) => onUpdate(date)}
            placeholder="Selecione uma data"
          />
        );

      case "daterange":
        return (
          <DateRangePicker
            dateRange={filter.value}
            onDateRangeChange={(range) => onUpdate(range)}
            placeholder="Selecione um período"
          />
        );

      case "numberrange":
        return (
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Mín"
              value={filter.value?.min || ""}
              onChange={(e) => onUpdate({ ...filter.value, min: Number(e.target.value) })}
            />
            <span className="text-sm">até</span>
            <Input
              type="number"
              placeholder="Máx"
              value={filter.value?.max || ""}
              onChange={(e) => onUpdate({ ...filter.value, max: Number(e.target.value) })}
            />
          </div>
        );

      default:
        return (
          <Input
            value={filter.value}
            onChange={(e) => onUpdate(e.target.value)}
            placeholder="Valor"
          />
        );
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">
              {filterDefinition?.label || filter.key}
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onRemove();
                setOpen(false);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Valor
            </label>
            {renderFilterInput()}
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              size="sm"
              onClick={() => setOpen(false)}
            >
              Aplicar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
