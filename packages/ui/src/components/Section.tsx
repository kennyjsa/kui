"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const sectionVariants = cva(
  "space-y-4",
  {
    variants: {
      variant: {
        default: "border-b border-border pb-6",
        card: "border border-border rounded-lg p-6 bg-card",
        flat: "bg-muted/30 rounded-lg p-4",
        bordered: "border-l-4 border-l-primary pl-4",
      },
      spacing: {
        sm: "space-y-2",
        md: "space-y-4",
        lg: "space-y-6",
      },
    },
    defaultVariants: {
      variant: "default",
      spacing: "md",
    },
  }
);

export interface SectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionVariants> {
  title?: string;
  description?: string;
  divider?: boolean;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  children: React.ReactNode;
}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({
    className,
    variant,
    spacing,
    title,
    description,
    divider = true,
    collapsible = false,
    defaultCollapsed = false,
    children,
    ...props
  }, ref) => {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

    const toggleCollapsed = () => {
      if (collapsible) {
        setIsCollapsed(!isCollapsed);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          sectionVariants({ variant, spacing }),
          className
        )}
        {...props}
      >
        {/* Header */}
        {(title || description) && (
          <div
            className={cn(
              "flex items-start justify-between",
              collapsible && "cursor-pointer"
            )}
            onClick={collapsible ? toggleCollapsed : undefined}
          >
            <div className="flex-1">
              {title && (
                <h3 className="text-lg font-semibold text-foreground">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </div>
            {collapsible && (
              <button
                type="button"
                className="ml-4 p-1 hover:bg-muted rounded-md transition-colors"
                onClick={toggleCollapsed}
              >
                <svg
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isCollapsed && "rotate-180"
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        {!isCollapsed && (
          <div className="space-y-4">
            {children}
          </div>
        )}

        {/* Divider */}
        {divider && variant === "default" && (
          <div className="border-b border-border mt-6" />
        )}
      </div>
    );
  }
);

Section.displayName = "Section";

// Wrapper para múltiplas seções
export interface SectionGroupProps {
  children: React.ReactNode;
  className?: string;
  spacing?: "sm" | "md" | "lg";
}

const SectionGroup = React.forwardRef<HTMLDivElement, SectionGroupProps>(
  ({ className, spacing = "md", children, ...props }, ref) => {
    const spacingClasses = {
      sm: "space-y-4",
      md: "space-y-8",
      lg: "space-y-12",
    };

    return (
      <div
        ref={ref}
        className={cn(spacingClasses[spacing], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SectionGroup.displayName = "SectionGroup";

// Hook para gerenciar estado de seções
export function useSection() {
  const [collapsedSections, setCollapsedSections] = React.useState<Record<string, boolean>>({});

  const toggleSection = React.useCallback((sectionId: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  }, []);

  const isSectionCollapsed = React.useCallback((sectionId: string) => {
    return collapsedSections[sectionId] || false;
  }, [collapsedSections]);

  return {
    collapsedSections,
    toggleSection,
    isSectionCollapsed,
  };
}

export { Section, sectionVariants, SectionGroup };
