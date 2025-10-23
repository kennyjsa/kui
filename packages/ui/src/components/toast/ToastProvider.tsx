"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { createContext, useContext, useState, useEffect } from "react";
import { ToastRenderer } from "./ToastRenderer";
import type { ToastAPI } from "./types";

interface ToastContextType {
  toast: ToastAPI;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [toasts, setToasts] = useState<Array<{
    id: string;
    title?: string;
    description?: string;
    variant?: "default" | "destructive" | "success" | "warning" | "info";
    open: boolean;
    action?: React.ReactNode;
  }>>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toast: ToastAPI = {
    info: (title: string, description?: string) => {
      if (!mounted) return;
      const id = Math.random().toString(36).substr(2, 9);
      setToasts(prev => [...prev, { id, title, description, variant: "info", open: true }]);
    },

    success: (title: string, description?: string) => {
      if (!mounted) return;
      const id = Math.random().toString(36).substr(2, 9);
      setToasts(prev => [...prev, { id, title, description, variant: "success", open: true }]);
    },

    error: (title: string, description?: string) => {
      if (!mounted) return;
      const id = Math.random().toString(36).substr(2, 9);
      setToasts(prev => [...prev, { id, title, description, variant: "destructive", open: true }]);
    },

    warning: (title: string, description?: string) => {
      if (!mounted) return;
      const id = Math.random().toString(36).substr(2, 9);
      setToasts(prev => [...prev, { id, title, description, variant: "warning", open: true }]);
    },

    custom: (options) => {
      if (!mounted) return;
      const id = Math.random().toString(36).substr(2, 9);
      setToasts(prev => [...prev, {
        id,
        title: options.title,
        description: options.description,
        variant: options.variant || "default",
        action: options.action,
        open: true
      }]);
    },
  };

  // Durante SSR, renderiza apenas o contexto sem ToastViewport
  if (!mounted) {
    return (
      <ToastContext.Provider value={{ toast }}>
        {children}
      </ToastContext.Provider>
    );
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // No cliente, renderiza com ToastViewport
  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastPrimitives.Provider>
        {children}
        <ToastRenderer toasts={toasts} onRemove={removeToast} />
        <ToastPrimitives.ToastViewport className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]" />
      </ToastPrimitives.Provider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
