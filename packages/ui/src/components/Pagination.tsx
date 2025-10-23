"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "./Button";

const paginationVariants = cva(
  "flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "",
        solid: "bg-muted px-4 py-2 rounded-md",
        outline: "border border-input bg-background px-4 py-2 rounded-md",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const paginationItemVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "hover:bg-accent hover:text-accent-foreground",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "h-8 w-8",
        md: "h-9 w-9",
        lg: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
    },
  }
);

// Pagination Root - Componente principal
export interface PaginationProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof paginationVariants> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
  className?: string;
}

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({
    className,
    variant,
    size,
    currentPage,
    totalPages,
    onPageChange,
    showFirstLast = true,
    showPrevNext = true,
    maxVisiblePages = 5,
    ...props
  }, ref) => {

    // Calcular páginas visíveis
    const getVisiblePages = () => {
      const pages: (number | string)[] = [];
      const halfVisible = Math.floor(maxVisiblePages / 2);

      if (totalPages <= maxVisiblePages) {
        // Mostrar todas as páginas
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Lógica para mostrar páginas com ellipsis
        if (currentPage <= halfVisible + 1) {
          // Início: 1, 2, 3, 4, 5, ..., 10
          for (let i = 1; i <= maxVisiblePages - 1; i++) {
            pages.push(i);
          }
          pages.push("...");
          pages.push(totalPages);
        } else if (currentPage >= totalPages - halfVisible) {
          // Fim: 1, ..., 6, 7, 8, 9, 10
          pages.push(1);
          pages.push("...");
          for (let i = totalPages - maxVisiblePages + 2; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          // Meio: 1, ..., 4, 5, 6, ..., 10
          pages.push(1);
          pages.push("...");
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i);
          }
          pages.push("...");
          pages.push(totalPages);
        }
      }

      return pages;
    };

    const visiblePages = getVisiblePages();

    const handlePageClick = (page: number) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        onPageChange(page);
      }
    };

    const handlePrevious = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };

    const handleNext = () => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };

    const handleFirst = () => {
      onPageChange(1);
    };

    const handleLast = () => {
      onPageChange(totalPages);
    };

    return (
      <nav
        ref={ref}
        className={cn(paginationVariants({ variant, size }), className)}
        aria-label="Pagination"
        {...props}
      >
        <div className="flex items-center space-x-1">
          {/* Primeira página */}
          {showFirstLast && currentPage > 1 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFirst}
              className="h-9 w-9"
              aria-label="Primeira página"
            >
              <span className="sr-only">Primeira página</span>
              <span className="text-xs">1</span>
            </Button>
          )}

          {/* Página anterior */}
          {showPrevNext && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              disabled={currentPage <= 1}
              className="h-9 w-9"
              aria-label="Página anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}

          {/* Páginas visíveis */}
          {visiblePages.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="flex h-9 w-9 items-center justify-center"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </span>
              );
            }

            const pageNumber = page as number;
            const isCurrentPage = pageNumber === currentPage;

            return (
              <Button
                key={pageNumber}
                variant={isCurrentPage ? "default" : "ghost"}
                size="icon"
                onClick={() => handlePageClick(pageNumber)}
                className={cn(
                  "h-9 w-9",
                  isCurrentPage && "bg-primary text-primary-foreground"
                )}
                aria-label={`Página ${pageNumber}`}
                aria-current={isCurrentPage ? "page" : undefined}
              >
                {pageNumber}
              </Button>
            );
          })}

          {/* Próxima página */}
          {showPrevNext && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              disabled={currentPage >= totalPages}
              className="h-9 w-9"
              aria-label="Próxima página"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}

          {/* Última página */}
          {showFirstLast && currentPage < totalPages && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLast}
              className="h-9 w-9"
              aria-label="Última página"
            >
              <span className="sr-only">Última página</span>
              <span className="text-xs">{totalPages}</span>
            </Button>
          )}
        </div>
      </nav>
    );
  }
);

Pagination.displayName = "Pagination";

// Pagination Item - Item individual
export interface PaginationItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  page: number;
  isActive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export const PaginationItem = React.forwardRef<HTMLButtonElement, PaginationItemProps>(
  ({ className, page, isActive, onClick, disabled, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        variant={isActive ? "default" : "ghost"}
        size="icon"
        className={cn(
          "h-9 w-9",
          isActive && "bg-primary text-primary-foreground",
          className
        )}
        aria-current={isActive ? "page" : undefined}
        {...props}
      >
        {page}
      </Button>
    );
  }
);

PaginationItem.displayName = "PaginationItem";

// Pagination Previous - Botão anterior
export interface PaginationPreviousProps extends React.HTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  disabled?: boolean;
}

export const PaginationPrevious = React.forwardRef<HTMLButtonElement, PaginationPreviousProps>(
  ({ className, onClick, disabled, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        variant="ghost"
        size="icon"
        className={cn("h-9 w-9", className)}
        aria-label="Página anterior"
        {...props}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
    );
  }
);

PaginationPrevious.displayName = "PaginationPrevious";

// Pagination Next - Botão próximo
export interface PaginationNextProps extends React.HTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  disabled?: boolean;
}

export const PaginationNext = React.forwardRef<HTMLButtonElement, PaginationNextProps>(
  ({ className, onClick, disabled, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        variant="ghost"
        size="icon"
        className={cn("h-9 w-9", className)}
        aria-label="Próxima página"
        {...props}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    );
  }
);

PaginationNext.displayName = "PaginationNext";

// Pagination Ellipsis - Para páginas ocultas
export interface PaginationEllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

export const PaginationEllipsis = React.forwardRef<HTMLSpanElement, PaginationEllipsisProps>(
  ({ className, children = <MoreHorizontal className="h-4 w-4" />, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("flex h-9 w-9 items-center justify-center", className)}
        aria-hidden="true"
        {...props}
      >
        {children}
      </span>
    );
  }
);

PaginationEllipsis.displayName = "PaginationEllipsis";

// Pagination Info - Informações da paginação
export interface PaginationInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage?: number;
  className?: string;
}

export const PaginationInfo = React.forwardRef<HTMLDivElement, PaginationInfoProps>(
  ({ className, currentPage, totalPages, totalItems, itemsPerPage, ...props }, ref) => {
    const startItem = totalItems && itemsPerPage ? (currentPage - 1) * itemsPerPage + 1 : undefined;
    const endItem = totalItems && itemsPerPage
      ? Math.min(currentPage * itemsPerPage, totalItems)
      : undefined;

    return (
      <div
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      >
        {startItem && endItem && totalItems ? (
          <span>
            Mostrando {startItem} a {endItem} de {totalItems} resultados
          </span>
        ) : (
          <span>
            Página {currentPage} de {totalPages}
          </span>
        )}
      </div>
    );
  }
);

PaginationInfo.displayName = "PaginationInfo";

export { paginationVariants, paginationItemVariants };
