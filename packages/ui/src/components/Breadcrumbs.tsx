"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { ChevronRight } from "lucide-react";

const breadcrumbsVariants = cva(
  "flex items-center space-x-1 text-sm text-muted-foreground",
  {
    variants: {
      variant: {
        default: "",
        solid: "bg-muted px-3 py-2 rounded-md",
        outline: "border border-input bg-background px-3 py-2 rounded-md",
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

// Breadcrumb Root - Componente principal seguindo padrões Radix UI
export interface BreadcrumbsProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof breadcrumbsVariants> {
  children: React.ReactNode;
  separator?: React.ReactNode;
  className?: string;
}

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ className, variant, size, children, separator, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(breadcrumbsVariants({ variant, size }), className)}
        aria-label="Breadcrumb"
        {...props}
      >
        <ol className="flex items-center space-x-1">
          {React.Children.map(children, (child, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="flex-shrink-0 mx-1" aria-hidden="true">
                  {separator || <ChevronRight className="h-4 w-4" />}
                </span>
              )}
              {child}
            </li>
          ))}
        </ol>
      </nav>
    );
  }
);

Breadcrumbs.displayName = "Breadcrumbs";

// Breadcrumb Link - Para itens clicáveis
export interface BreadcrumbLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, children, href, onClick, icon, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent) => {
      if (onClick) {
        e.preventDefault();
        onClick();
      }
    };

    return (
      <a
        ref={ref}
        href={href}
        onClick={handleClick}
        className={cn(
          "flex items-center gap-1 hover:text-foreground transition-colors",
          className
        )}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span className="truncate">{children}</span>
      </a>
    );
  }
);

BreadcrumbLink.displayName = "BreadcrumbLink";

// Breadcrumb Page - Para o item atual (não clicável)
export interface BreadcrumbPageProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("font-medium text-foreground", className)}
        aria-current="page"
        {...props}
      >
        {children}
      </span>
    );
  }
);

BreadcrumbPage.displayName = "BreadcrumbPage";

// Breadcrumb Separator
export interface BreadcrumbSeparatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

export const BreadcrumbSeparator = React.forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
  ({ className, children = <ChevronRight className="h-4 w-4" />, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("flex-shrink-0 text-muted-foreground", className)}
        aria-hidden="true"
        {...props}
      >
        {children}
      </span>
    );
  }
);

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

// Breadcrumb Ellipsis - Para itens ocultos
export interface BreadcrumbEllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

export const BreadcrumbEllipsis = React.forwardRef<HTMLSpanElement, BreadcrumbEllipsisProps>(
  ({ className, children = "...", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("text-muted-foreground", className)}
        aria-hidden="true"
        {...props}
      >
        {children}
      </span>
    );
  }
);

BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export { breadcrumbsVariants };
