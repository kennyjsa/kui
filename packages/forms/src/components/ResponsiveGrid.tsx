"use client";

import type { GridOptions } from "@kui-framework/zod-extension";
import type { FormMode } from "../types";
import { GridField } from "./GridField";
import { ListField } from "./ListField";
import { useMediaQuery, breakpoints } from "../hooks/useMediaQuery";

export interface ResponsiveGridProps {
  value?: any[];
  onChange: (items: any[]) => void;
  options: GridOptions;
  mode: FormMode;
}

export function ResponsiveGrid({ value, onChange, options, mode }: ResponsiveGridProps) {
  const breakpoint = options.breakpoint || "md";
  const isDesktop = useMediaQuery(breakpoints[breakpoint]);

  // Renderiza Grid ou List baseado no breakpoint
  if (isDesktop) {
    return <GridField value={value} onChange={onChange} options={options} mode={mode} />;
  }

  return <ListField value={value} onChange={onChange} options={options} mode={mode} />;
}

