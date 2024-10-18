import type { DataProvider, ProviderConfig, ProviderRegistry } from "./types";

/**
 * Implementação do registry de providers
 */
class ProviderRegistryImpl implements ProviderRegistry {
  private providers = new Map<string, DataProvider>();

  register(config: ProviderConfig): void {
    if (this.providers.has(config.name)) {
      console.warn(`Provider "${config.name}" já está registrado. Será substituído.`);
    }
    this.providers.set(config.name, config.provider);
  }

  get(name: string): DataProvider | undefined {
    const provider = this.providers.get(name);
    if (!provider) {
      console.error(`Provider "${name}" não encontrado no registry.`);
    }
    return provider;
  }

  getAll(): Map<string, DataProvider> {
    return new Map(this.providers);
  }
}

/**
 * Instância global do registry
 */
export const providerRegistry = new ProviderRegistryImpl();

