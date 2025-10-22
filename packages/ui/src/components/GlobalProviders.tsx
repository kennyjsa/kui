"use client";

import { ReactNode, useEffect, useState } from 'react';
import { DialogProvider } from './DialogProvider';
import { Toaster } from './Toaster';

interface GlobalProvidersProps {
  children: ReactNode;
}

export function GlobalProviders({ children }: GlobalProvidersProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Durante o SSR, renderiza apenas os children
  if (!mounted) {
    return <>{children}</>;
  }

  // No cliente, renderiza com todos os providers
  return (
    <DialogProvider>
      {children}
      <Toaster />
    </DialogProvider>
  );
}

