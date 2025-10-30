"use client";

import { ReactNode } from 'react';
import { Toast, ToastProvider } from "./toast/Toaster";
import { DialogProvider } from "./dialog/DialogProvider";

interface ClientProvidersProps {
  children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <DialogProvider>
      <ToastProvider>
        {children}
        <Toast />
      </ToastProvider>
    </DialogProvider>
  );
}

