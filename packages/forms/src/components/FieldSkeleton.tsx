import { Skeleton } from "@kui-framework/ui";
import type { FieldConfig } from "../types";

/**
 * Skeleton para um campo individual
 * Renderiza skeleton apropriado baseado no tipo do campo
 */
export interface FieldSkeletonProps {
  /** Configuração do campo */
  config: FieldConfig;
}

export function FieldSkeleton({ config }: FieldSkeletonProps) {
  const { type, options } = config;

  // Grid layout (respeita o layout do campo)
  const gridClass = getGridClass(options?.layout);

  switch (type) {
    case "identifier":
      // ID geralmente oculto no create, pequeno no edit
      return (
        <div className={gridClass}>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" /> {/* Label */}
            <Skeleton className="h-10 w-24" /> {/* Input pequeno */}
          </div>
        </div>
      );

    case "text":
    case "email":
    case "password":
      return (
        <div className={gridClass}>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" /> {/* Label */}
            <Skeleton className="h-10 w-full" /> {/* Input */}
          </div>
        </div>
      );

    case "textarea":
      const rows = options?.rows || 4;
      const height = rows * 24 + 16; // Aproximadamente
      return (
        <div className={gridClass}>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className={`w-full`} height={height} />
          </div>
        </div>
      );

    case "number":
    case "currency":
      return (
        <div className={gridClass}>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      );

    case "date":
    case "systemDate":
      return (
        <div className={gridClass}>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      );

    case "select":
    case "relation":
      return (
        <div className={gridClass}>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      );

    case "checkbox":
      return (
        <div className={gridClass}>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-5 w-5" variant="rectangular" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      );

    case "switch":
      return (
        <div className={gridClass}>
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-6 w-11" variant="rectangular" />
          </div>
        </div>
      );

    case "radio":
      const radioOptions = options?.options || [1, 2, 3];
      return (
        <div className={gridClass}>
          <div className="space-y-3">
            <Skeleton className="h-4 w-24" /> {/* Label */}
            {radioOptions.map((_: any, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4" variant="circular" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      );

    case "rating":
      return (
        <div className={gridClass}>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-6 w-6" variant="circular" />
              ))}
            </div>
          </div>
        </div>
      );

    case "color":
      return (
        <div className={gridClass}>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <div className="flex space-x-2">
              <Skeleton className="h-10 w-10" variant="rectangular" />
              <Skeleton className="h-10 flex-1" />
            </div>
          </div>
        </div>
      );

    case "file":
      return (
        <div className={gridClass}>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-32 w-full" variant="rectangular" />
          </div>
        </div>
      );

    case "grid":
      const columns = options?.columns || [];
      const numColumns = columns.length || 3;
      const pageSize = options?.pageSize || 5;
      
      return (
        <div className={gridClass}>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" /> {/* Label */}
            <div className="border rounded-md">
              {/* Header */}
              <div className="flex gap-4 p-4 border-b bg-muted/50">
                {Array.from({ length: numColumns }).map((_, i) => (
                  <Skeleton key={i} className="h-4 flex-1" />
                ))}
                <Skeleton className="h-4 w-20" /> {/* Actions column */}
              </div>
              {/* Rows */}
              {Array.from({ length: Math.min(pageSize, 3) }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex gap-4 p-4 border-b">
                  {Array.from({ length: numColumns }).map((_, colIndex) => (
                    <Skeleton key={colIndex} className="h-4 flex-1" />
                  ))}
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    default:
      // Fallback genérico
      return (
        <div className={gridClass}>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      );
  }
}

/**
 * Helper para obter classes de grid baseado no layout
 */
function getGridClass(layout?: { xs?: number; sm?: number; md?: number; lg?: number }) {
  if (!layout) return ""; // Usa o grid padrão do FormBuilder

  const classes: string[] = [];

  if (layout.xs) {
    classes.push(`col-span-${layout.xs}`);
  }
  if (layout.md) {
    classes.push(`md:col-span-${layout.md}`);
  }
  if (layout.lg) {
    classes.push(`lg:col-span-${layout.lg}`);
  }

  return classes.join(" ");
}

