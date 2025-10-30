export { providerRegistry } from "./registry";
export { createRestProvider } from "./providers/createRestProvider";
export { createTrpcProvider } from "./providers/createTrpcProvider";

export type {
  DataProvider,
  ListParams,
  ListResponse,
  ProviderConfig,
  ProviderRegistry,
  FilterType,
  FilterOperator,
  FilterDefinition,
  FilterValue,
} from "./types";

export type { RestProviderConfig } from "./providers/createRestProvider";
export type { TrpcProviderOptions } from "./providers/createTrpcProvider";

export { createDataTableRouter, dataTableInputSchema } from "./providers/createDataTableRouter";
export type { DataTableInput, DataTableResult } from "./providers/createDataTableRouter";

export { extractFiltersFromSchema } from "./utils/extractFiltersFromSchema";
export type { ExtractFiltersOptions } from "./utils/extractFiltersFromSchema";

// Export client-only components only when imported
// Use import { KuiDataProvider } from '@kui-framework/core/client-only' for client components
