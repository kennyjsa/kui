"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const formLayoutVariants = cva(
  "flex min-h-screen",
  {
    variants: {
      sidebar: {
        none: "",
        left: "flex-row",
        right: "flex-row-reverse",
      },
      sidebarWidth: {
        sm: "",
        md: "",
        lg: "",
        xl: "",
        custom: "",
      },
    },
    defaultVariants: {
      sidebar: "none",
      sidebarWidth: "md",
    },
  }
);

export interface FormLayoutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formLayoutVariants> {
  sidebar?: "none" | "left" | "right";
  sidebarWidth?: "sm" | "md" | "lg" | "xl" | "custom";
  customSidebarWidth?: string;
  sidebarCollapsible?: boolean;
  defaultSidebarCollapsed?: boolean;
  children: React.ReactNode;
  sidebarContent?: React.ReactNode;
}

const FormLayout = React.forwardRef<HTMLDivElement, FormLayoutProps>(
  ({
    className,
    sidebar = "none",
    sidebarWidth = "md",
    customSidebarWidth,
    sidebarCollapsible = false,
    defaultSidebarCollapsed = false,
    children,
    sidebarContent,
    ...props
  }, ref) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(defaultSidebarCollapsed);

    const toggleSidebar = () => {
      if (sidebarCollapsible) {
        setIsSidebarCollapsed(!isSidebarCollapsed);
      }
    };

    const getSidebarWidth = () => {
      if (customSidebarWidth) return customSidebarWidth;

      const widths: Record<"sm" | "md" | "lg" | "xl", string> = {
        sm: "w-64", // 256px
        md: "w-80", // 320px
        lg: "w-96", // 384px
        xl: "w-[28rem]", // 448px
      };

      return sidebarWidth === "custom" ? "w-80" : widths[sidebarWidth];
    };

    const getMainContentClasses = () => {
      if (sidebar === "none") return "flex-1";
      if (isSidebarCollapsed) return "flex-1";

      return cn(
        "flex-1",
        sidebar === "left" && "ml-0",
        sidebar === "right" && "mr-0"
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          formLayoutVariants({ sidebar, sidebarWidth }),
          className
        )}
        {...props}
      >
        {/* Main Content */}
        <div className={getMainContentClasses()}>
          {children}
        </div>

        {/* Sidebar */}
        {sidebar !== "none" && sidebarContent && (
          <div
            className={cn(
              "border-l border-border bg-muted/30 transition-all duration-300",
              getSidebarWidth(),
              isSidebarCollapsed && "w-0 overflow-hidden",
              sidebar === "left" && "border-l-0 border-r border-border"
            )}
          >
            <div className="h-full p-6">
              {/* Sidebar Header */}
              {sidebarCollapsible && (
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Sidebar</h3>
                  <button
                    type="button"
                    onClick={toggleSidebar}
                    className="p-1 hover:bg-muted rounded-md transition-colors"
                  >
                    <svg
                      className={cn(
                        "h-4 w-4 transition-transform",
                        isSidebarCollapsed && "rotate-180"
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
                </div>
              )}

              {/* Sidebar Content */}
              {!isSidebarCollapsed && (
                <div className="space-y-6">
                  {sidebarContent}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

FormLayout.displayName = "FormLayout";

export { FormLayout, formLayoutVariants };
