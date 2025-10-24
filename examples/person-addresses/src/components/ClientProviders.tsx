"use client";

import { GlobalProviders } from "@kui-framework/ui";
import { ThemeProvider } from "@/contexts/ThemeContext";

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <ThemeProvider>
      <GlobalProviders>{children}</GlobalProviders>
    </ThemeProvider>
  );
}
