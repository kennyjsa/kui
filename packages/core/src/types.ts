/**
 * Interface para um Data Provider genérico
 */
export interface DataProvider<T = any> {
  /** Nome do provider */
  name: string;

  /** Lista todos os registros */
  list: (params?: ListParams) => Promise<ListResponse<T>>;

  /** Obtém um registro por ID */
  get: (id: string | number) => Promise<T>;

  /** Cria um novo registro */
  create: (data: Partial<T>) => Promise<T>;

  /** Atualiza um registro existente */
  update: (id: string | number, data: Partial<T>) => Promise<T>;

  /** Remove um registro */
  delete: (id: string | number) => Promise<void>;
}

/**
 * Parâmetros para listagem
 */
export interface ListParams {
  page?: number;
  pageSize?: number;
  sort?: string;
  order?: "asc" | "desc";
  filters?: Record<string, any>;
  search?: string;
}

/**
 * Resposta de listagem
 */
export interface ListResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * Configuração de um provider no registry
 */
export interface ProviderConfig {
  name: string;
  provider: DataProvider;
}

/**
 * Registry de providers
 */
export interface ProviderRegistry {
  register: (config: ProviderConfig) => void;
  get: (name: string) => DataProvider | undefined;
  getAll: () => Map<string, DataProvider>;
}

/**
 * Tipos de filtro suportados pelo DataTable
 */
export type FilterType =
  | "text"        // Input texto
  | "select"      // Select single
  | "multiselect" // Checkboxes
  | "date"        // Single date
  | "daterange"   // Range de datas
  | "number"      // Input number
  | "numberrange" // Min-max
  | "boolean";    // Switch/Checkbox

/**
 * Operadores por tipo de filtro
 */
export type FilterOperator =
  | "eq"       // equals
  | "ne"       // not equals
  | "contains" // contém
  | "gt"       // greater than
  | "gte"      // greater or equal
  | "lt"       // less than
  | "lte"      // less or equal
  | "in"       // in array
  | "between"; // entre valores

/**
 * Definição de um filtro para o DataTable
 */
export interface FilterDefinition {
  key: string;
  label: string;
  type: FilterType;
  operator?: FilterOperator;
  options?: { label: string; value: any }[]; // Para select/multiselect
  placeholder?: string;
}

/**
 * Valor de filtro aplicado
 */
export interface FilterValue {
  key: string;
  operator: FilterOperator;
  value: any;
}

