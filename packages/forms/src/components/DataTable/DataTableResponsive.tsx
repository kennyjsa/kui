"use client";

import React from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

/**
 * Hook para gerenciar responsividade do DataTable
 */
export function useDataTableResponsive() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Forçar view baseada no breakpoint
  const getResponsiveView = (preferredView: "table" | "grid" | "list") => {
    if (isMobile) {
      return "list"; // Mobile sempre lista para melhor UX
    }
    if (isTablet && preferredView === "table") {
      return "grid"; // Tablet: preferir grid em vez de tabela
    }
    return preferredView;
  };

  // Configurações de colunas por breakpoint
  const getResponsiveColumns = (columns: any[], preferredColumns?: number) => {
    if (isMobile) {
      return columns.slice(0, 2); // Mobile: apenas 2 colunas principais
    }
    if (isTablet) {
      return columns.slice(0, preferredColumns || 4); // Tablet: até 4 colunas
    }
    return columns; // Desktop: todas as colunas
  };

  // Configurações de grid por breakpoint
  const getResponsiveGridCols = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  return {
    isMobile,
    isTablet,
    isDesktop,
    getResponsiveView,
    getResponsiveColumns,
    getResponsiveGridCols,
  };
}

/**
 * Componente wrapper para responsividade
 */
export interface DataTableResponsiveProps {
  children: React.ReactNode;
  className?: string;
}

export function DataTableResponsive({ children, className }: DataTableResponsiveProps) {
  const { isMobile } = useDataTableResponsive();

  return (
    <div className={`${isMobile ? "px-2" : "px-4"} ${className || ""}`}>
      {children}
    </div>
  );
}
