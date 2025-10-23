"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const gridVariants = cva(
  "grid",
  {
    variants: {
      cols: {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6",
        12: "grid-cols-12",
        auto: "grid-cols-[repeat(auto-fit,minmax(250px,1fr))]",
        "auto-sm": "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]",
        "auto-lg": "grid-cols-[repeat(auto-fit,minmax(300px,1fr))]",
      },
      gap: {
        0: "gap-0",
        1: "gap-1",
        2: "gap-2",
        3: "gap-3",
        4: "gap-4",
        6: "gap-6",
        8: "gap-8",
      },
      responsive: {
        none: "",
        sm: "sm:grid-cols-2",
        md: "md:grid-cols-3",
        lg: "lg:grid-cols-4",
        xl: "xl:grid-cols-6",
        "sm-md": "sm:grid-cols-2 md:grid-cols-3",
        "sm-lg": "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        "sm-xl": "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
        "md-lg": "md:grid-cols-3 lg:grid-cols-4",
        "md-xl": "md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
        "lg-xl": "lg:grid-cols-4 xl:grid-cols-6",
      },
    },
    defaultVariants: {
      cols: 1,
      gap: 4,
      responsive: "none",
    },
  }
);

const gridItemVariants = cva(
  "",
  {
    variants: {
      colSpan: {
        1: "col-span-1",
        2: "col-span-2",
        3: "col-span-3",
        4: "col-span-4",
        5: "col-span-5",
        6: "col-span-6",
        full: "col-span-full",
        auto: "col-auto",
      },
      rowSpan: {
        1: "row-span-1",
        2: "row-span-2",
        3: "row-span-3",
        4: "row-span-4",
        5: "row-span-5",
        6: "row-span-6",
        full: "row-span-full",
        auto: "row-auto",
      },
      responsive: {
        none: "",
        sm: "sm:col-span-2",
        md: "md:col-span-3",
        lg: "lg:col-span-4",
        xl: "xl:col-span-6",
        "sm-md": "sm:col-span-2 md:col-span-3",
        "sm-lg": "sm:col-span-2 md:col-span-3 lg:col-span-4",
        "sm-xl": "sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-6",
        "md-lg": "md:col-span-3 lg:col-span-4",
        "md-xl": "md:col-span-3 lg:col-span-4 xl:col-span-6",
        "lg-xl": "lg:col-span-4 xl:col-span-6",
      },
    },
    defaultVariants: {
      colSpan: 1,
      rowSpan: 1,
      responsive: "none",
    },
  }
);

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  children: React.ReactNode;
  className?: string;
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, responsive, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          gridVariants({ cols, gap, responsive }),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = "Grid";

export interface GridItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridItemVariants> {
  children: React.ReactNode;
  className?: string;
}

export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, colSpan, rowSpan, responsive, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          gridItemVariants({ colSpan, rowSpan, responsive }),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GridItem.displayName = "GridItem";

// Grid Container - Para layouts complexos
export interface GridContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
}

export const GridContainer = React.forwardRef<HTMLDivElement, GridContainerProps>(
  ({ className, maxWidth = "xl", padding = "md", children, ...props }, ref) => {
    const maxWidthClasses = {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      full: "max-w-full",
    };

    const paddingClasses = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full",
          maxWidthClasses[maxWidth],
          paddingClasses[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GridContainer.displayName = "GridContainer";

// Responsive Grid - Grid com breakpoints automáticos
export interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  minItemWidth?: number;
  gap?: VariantProps<typeof gridVariants>["gap"];
  className?: string;
}

export const ResponsiveGrid = React.forwardRef<HTMLDivElement, ResponsiveGridProps>(
  ({ className, minItemWidth = 250, gap = 4, children, ...props }, ref) => {
    const gridStyle = {
      gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}px, 1fr))`,
    };

    const gapClasses = {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      6: "gap-6",
      8: "gap-8",
    };

    return (
      <div
        ref={ref}
        className={cn("grid", gapClasses[gap as keyof typeof gapClasses], className)}
        style={gridStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ResponsiveGrid.displayName = "ResponsiveGrid";

// Masonry Grid - Grid com layout em cascata
export interface MasonryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  columns?: number;
  gap?: VariantProps<typeof gridVariants>["gap"];
  className?: string;
}

export const MasonryGrid = React.forwardRef<HTMLDivElement, MasonryGridProps>(
  ({ className, columns = 3, gap = 4, children, ...props }, ref) => {
    const gapClasses = {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      6: "gap-6",
      8: "gap-8",
    };

    return (
      <div
        ref={ref}
        className={cn("columns-1", gapClasses[gap as keyof typeof gapClasses], className)}
        style={{
          columnCount: columns,
          columnGap: gap === 0 ? "0" : `${(gap || 4) * 0.25}rem`,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

MasonryGrid.displayName = "MasonryGrid";

// Grid Breakpoints - Utilitário para breakpoints
export const GridBreakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// Grid Presets - Configurações pré-definidas
export const GridPresets = {
  // Layouts comuns
  "1-col": { cols: 1, responsive: "none" },
  "2-col": { cols: 2, responsive: "sm" },
  "3-col": { cols: 3, responsive: "md" },
  "4-col": { cols: 4, responsive: "lg" },
  "6-col": { cols: 6, responsive: "xl" },

  // Layouts responsivos
  "responsive-2": { cols: 1, responsive: "sm" },
  "responsive-3": { cols: 1, responsive: "sm-md" },
  "responsive-4": { cols: 1, responsive: "sm-lg" },
  "responsive-6": { cols: 1, responsive: "sm-xl" },

  // Layouts automáticos
  "auto": { cols: "auto", responsive: "none" },
  "auto-sm": { cols: "auto-sm", responsive: "none" },
  "auto-lg": { cols: "auto-lg", responsive: "none" },
} as const;

export {
  gridVariants,
  gridItemVariants
};
