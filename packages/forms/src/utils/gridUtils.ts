/**
 * Utilitários para sistema de grid do FormBuilder
 */

/**
 * Configuração de grid para o formulário
 */
export type GridConfig = number | {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
};

/**
 * Gera classes CSS do Tailwind para grid responsivo
 *
 * @param grid - Configuração do grid
 * @returns Classes CSS do Tailwind
 *
 * @example
 * ```typescript
 * getGridClasses(2) // "grid grid-cols-1 md:grid-cols-2"
 * getGridClasses({ xs: 1, md: 2, lg: 3 }) // "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
 * ```
 */
export function getGridClasses(grid?: GridConfig): string {
  if (!grid) {
    return "grid grid-cols-1 gap-4";
  }

  const baseClasses = ["grid", "gap-4"];

  if (typeof grid === "number") {
    // Número simples - aplicado a partir do breakpoint md
    if (grid === 1) {
      baseClasses.push("grid-cols-1");
    } else {
      baseClasses.push("grid-cols-1", `md:grid-cols-${grid}`);
    }
  } else {
    // Objeto com media queries
    if (grid.xs !== undefined) {
      baseClasses.push(`grid-cols-${grid.xs}`);
    } else {
      baseClasses.push("grid-cols-1");
    }

    if (grid.sm !== undefined) {
      baseClasses.push(`sm:grid-cols-${grid.sm}`);
    }

    if (grid.md !== undefined) {
      baseClasses.push(`md:grid-cols-${grid.md}`);
    }

    if (grid.lg !== undefined) {
      baseClasses.push(`lg:grid-cols-${grid.lg}`);
    }
  }

  return baseClasses.join(" ");
}

/**
 * Valida se a configuração de grid é válida
 *
 * @param grid - Configuração do grid
 * @returns true se válida, false caso contrário
 */
export function isValidGridConfig(grid?: GridConfig): boolean {
  if (!grid) return true;

  if (typeof grid === "number") {
    return grid > 0 && grid <= 12;
  }

  if (typeof grid === "object") {
    const values = Object.values(grid).filter(v => v !== undefined);
    return values.every(v => v > 0 && v <= 12);
  }

  return false;
}
