import type { DataProvider, ListParams, ListResponse } from "../types";

/**
 * Configuração para criar um REST provider
 */
export interface RestProviderConfig {
  name: string;
  baseUrl: string;
  headers?: Record<string, string>;
}

/**
 * Cria um Data Provider baseado em REST API
 */
export function createRestProvider<T = any>(config: RestProviderConfig): DataProvider<T> {
  const { baseUrl, headers = {} } = config;

  const fetchJson = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  };

  return {
    name: config.name,

    async list(params?: ListParams): Promise<ListResponse<T>> {
      const queryParams = new URLSearchParams();

      if (params?.page) queryParams.set("page", params.page.toString());
      if (params?.pageSize) queryParams.set("pageSize", params.pageSize.toString());
      if (params?.sort) queryParams.set("sort", params.sort);
      if (params?.order) queryParams.set("order", params.order);
      if (params?.search) queryParams.set("search", params.search);
      if (params?.filters) {
        Object.entries(params.filters).forEach(([key, value]) => {
          queryParams.set(`filter[${key}]`, String(value));
        });
      }

      const url = `${baseUrl}?${queryParams.toString()}`;
      return fetchJson(url);
    },

    async get(id: string | number): Promise<T> {
      return fetchJson(`${baseUrl}/${id}`);
    },

    async create(data: Partial<T>): Promise<T> {
      return fetchJson(baseUrl, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    async update(id: string | number, data: Partial<T>): Promise<T> {
      return fetchJson(`${baseUrl}/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },

    async delete(id: string | number): Promise<void> {
      await fetchJson(`${baseUrl}/${id}`, {
        method: "DELETE",
      });
    },
  };
}

