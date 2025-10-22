import { cn } from "../lib/utils";

/**
 * Componente Skeleton base para loading states
 * 
 * @example
 * ```tsx
 * <Skeleton className="h-10 w-full" />
 * <Skeleton className="h-4 w-32" />
 * ```
 */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Largura fixa (opcional) */
  width?: string | number;
  /** Altura fixa (opcional) */
  height?: string | number;
  /** Variante do skeleton */
  variant?: "default" | "circular" | "rectangular";
  /** Desabilitar animação */
  noAnimation?: boolean;
}

export function Skeleton({
  className,
  width,
  height,
  variant = "default",
  noAnimation = false,
  style,
  ...props
}: SkeletonProps) {
  const variantStyles = {
    default: "rounded-md",
    circular: "rounded-full",
    rectangular: "rounded-none",
  };

  return (
    <div
      className={cn(
        "bg-muted",
        !noAnimation && "animate-pulse",
        variantStyles[variant],
        className
      )}
      style={{
        width: width ? (typeof width === "number" ? `${width}px` : width) : undefined,
        height: height ? (typeof height === "number" ? `${height}px` : height) : undefined,
        ...style,
      }}
      {...props}
    />
  );
}
