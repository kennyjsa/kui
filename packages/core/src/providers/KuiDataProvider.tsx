import React, { createContext, useContext, ReactNode } from "react";
import { providerRegistry } from "../registry";
import type { DataProvider, ProviderConfig } from "../types";

/**
 * Contexto para providers
 */
interface KuiDataContextValue {
  getProvider: (name: string) => DataProvider | undefined;
}

const KuiDataContext = createContext<KuiDataContextValue | undefined>(undefined);

/**
 * Props do KuiDataProvider
 */
interface KuiDataProviderProps {
  providers: ProviderConfig[];
  children: ReactNode;
}

/**
 * Provider principal do KUI - registra todos os data providers
 */
export function KuiDataProvider({ providers, children }: KuiDataProviderProps) {
  // Registra os providers na montagem
  React.useEffect(() => {
    providers.forEach((config) => {
      providerRegistry.register(config);
    });
  }, [providers]);

  const value: KuiDataContextValue = {
    getProvider: (name: string) => providerRegistry.get(name),
  };

  return <KuiDataContext.Provider value={value}>{children}</KuiDataContext.Provider>;
}

/**
 * Hook para acessar um provider específico
 */
export function useKuiProvider(name: string): DataProvider {
  const context = useContext(KuiDataContext);

  if (!context) {
    throw new Error("useKuiProvider deve ser usado dentro de um KuiDataProvider");
  }

  const provider = context.getProvider(name);

  if (!provider) {
    throw new Error(`Provider "${name}" não encontrado`);
  }

  return provider;
}

