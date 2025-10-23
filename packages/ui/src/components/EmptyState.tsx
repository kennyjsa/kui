"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { Button } from "./Button";
import {
  Database,
  Search,
  FileText,
  Users,
  Package,
  ShoppingCart,
  Calendar,
  MessageSquare,
  Image,
  RefreshCw,
  Plus,
  Upload,
  Download,
  AlertCircle
} from "lucide-react";

const emptyStateVariants = cva(
  "flex flex-col items-center justify-center text-center p-8",
  {
    variants: {
      size: {
        sm: "p-4",
        md: "p-8",
        lg: "p-12",
      },
      variant: {
        default: "text-muted-foreground",
        primary: "text-primary",
        muted: "text-muted-foreground/70",
        error: "text-destructive",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  };
  // Props para facilitar uso comum
  image?: React.ReactNode;
  simple?: boolean; // Modo simples sem padding extra
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, size, variant, icon, title, description, action, secondaryAction, image, simple, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          emptyStateVariants({ size, variant }),
          simple && "p-4",
          className
        )}
        {...props}
      >
        {/* Imagem ou ícone */}
        {(image || icon) && (
          <div className="mb-4 text-4xl text-muted-foreground/50">
            {image || icon}
          </div>
        )}

        {/* Título */}
        <h3 className="text-lg font-semibold mb-2">{title}</h3>

        {/* Descrição */}
        {description && (
          <p className="text-sm text-muted-foreground mb-6 max-w-sm">
            {description}
          </p>
        )}

        {/* Ações */}
        {(action || secondaryAction) && (
          <div className="flex gap-3">
            {action && (
              <Button
                onClick={action.onClick}
                variant={action.variant || "default"}
                size="sm"
              >
                {action.label}
              </Button>
            )}
            {secondaryAction && (
              <Button
                onClick={secondaryAction.onClick}
                variant={secondaryAction.variant || "outline"}
                size="sm"
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }
);

EmptyState.displayName = "EmptyState";

// Helpers simples para casos comuns (opcionais)
export const EmptyStateIcons = {
  database: <Database className="h-12 w-12" />,
  search: <Search className="h-12 w-12" />,
  file: <FileText className="h-12 w-12" />,
  users: <Users className="h-12 w-12" />,
  package: <Package className="h-12 w-12" />,
  cart: <ShoppingCart className="h-12 w-12" />,
  calendar: <Calendar className="h-12 w-12" />,
  message: <MessageSquare className="h-12 w-12" />,
  image: <Image className="h-12 w-12" />,
  refresh: <RefreshCw className="h-12 w-12" />,
  plus: <Plus className="h-12 w-12" />,
  upload: <Upload className="h-12 w-12" />,
  download: <Download className="h-12 w-12" />,
  error: <AlertCircle className="h-12 w-12" />,
};

export { EmptyState, emptyStateVariants };
