"use client";

import { GlobalProviders } from "@kui-framework/ui";

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return <GlobalProviders>{children}</GlobalProviders>;
}
