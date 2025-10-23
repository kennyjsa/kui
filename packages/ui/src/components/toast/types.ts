import type { ReactNode } from "react";

export type ToastVariant = "default" | "destructive" | "success" | "warning" | "info";

export interface ToastOptions {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: ReactNode;
}

export interface ToastAPI {
  info: (title: string, description?: string) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  custom: (options: ToastOptions) => void;
}
