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

