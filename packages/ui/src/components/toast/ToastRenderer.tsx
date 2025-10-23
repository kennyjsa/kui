"use client";

import * as React from "react";
import { Toast, ToastTitle, ToastDescription, ToastClose } from "./Toaster";

interface ToastRendererProps {
  toasts: Array<{
    id: string;
    title?: string;
    description?: string;
    variant?: "default" | "destructive" | "success" | "warning" | "info";
    open: boolean;
    action?: React.ReactNode;
  }>;
  onRemove: (id: string) => void;
}

export function ToastRenderer({ toasts, onRemove }: ToastRendererProps) {
  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          variant={toast.variant}
          open={toast.open}
          onOpenChange={(open) => {
            if (!open) {
              onRemove(toast.id);
            }
          }}
        >
          <div className="grid gap-1">
            {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
            {toast.description && (
              <ToastDescription>{toast.description}</ToastDescription>
            )}
          </div>
          {toast.action}
          <ToastClose />
        </Toast>
      ))}
    </>
  );
}
