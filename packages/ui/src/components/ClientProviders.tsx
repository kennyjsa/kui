"use client";

import { ReactNode } from 'react';
import { Toaster } from './Toaster';
import { DialogProvider } from './DialogProvider';

interface ClientProvidersProps {
  children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <DialogProvider>
      {children}
      <Toaster />
    </DialogProvider>
  );
}
