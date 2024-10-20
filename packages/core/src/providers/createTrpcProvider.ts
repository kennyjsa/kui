import type { DataProvider, ListParams } from "../types";

/**
 * Opções para criar um provider tRPC
 */
export interface TrpcProviderOptions<TRouter = any> {
  /** Nome único do provider */
  name: string;
  
  /** Router tRPC (ex: trpc.user) */
  router: TRouter;
  
  /** Mapeamento de procedures do tRPC */
  procedures?: {
    list?: string;
    get?: string;
    create?: string;
    update?: string;
    delete?: string;
  };
}

/**
 * Cria um DataProvider a partir de um router tRPC
 * 
 * @example
 * ```typescript
 * const userProvider = createTrpcProvider({
 *   name: "userProvider",
 *   router: trpc.user,
 *   procedures: {
 *     list: "getAll",
 *     get: "getById",
 *     create: "create",
 *     update: "update",
 *     delete: "delete"
 *   }
 * });
 * ```
 */
export function createTrpcProvider<TRouter = any>(
  options: TrpcProviderOptions<TRouter>
): DataProvider {
  const { name, router, procedures = {} } = options;

  // Procedures padrão
  const proc = {
    list: procedures.list || "list",
    get: procedures.get || "get",
    create: procedures.create || "create",
    update: procedures.update || "update",
    delete: procedures.delete || "delete",
  };

  return {
    name,

    async list(params: ListParams = {}) {
      const { page = 1, pageSize = 10, filters, sort } = params;

      // @ts-ignore - tRPC typing complexo
      const procedure = router[proc.list];
      
      if (!procedure) {
        throw new Error(`Procedure "${proc.list}" não encontrada no router tRPC`);
      }

      try {
        const result = await procedure.query({
          page,
          pageSize,
          filters,
          sort,
        });

        // Normalizar resposta
        if (Array.isArray(result)) {
          return {
            data: result,
            total: result.length,
            page,
            pageSize,
          };
        }

        return result;
      } catch (error: any) {
        throw new Error(`Erro ao listar ${name}: ${error.message}`);
      }
    },

    async get(id: any) {
      // @ts-ignore
      const procedure = router[proc.get];
      
      if (!procedure) {
        throw new Error(`Procedure "${proc.get}" não encontrada no router tRPC`);
      }

      try {
        return await procedure.query({ id });
      } catch (error: any) {
        throw new Error(`Erro ao buscar ${name} (id: ${id}): ${error.message}`);
      }
    },

    async create(data: any) {
      // @ts-ignore
      const procedure = router[proc.create];
      
      if (!procedure) {
        throw new Error(`Procedure "${proc.create}" não encontrada no router tRPC`);
      }

      try {
        return await procedure.mutate(data);
      } catch (error: any) {
        throw new Error(`Erro ao criar ${name}: ${error.message}`);
      }
    },

    async update(id: any, data: any) {
      // @ts-ignore
      const procedure = router[proc.update];
      
      if (!procedure) {
        throw new Error(`Procedure "${proc.update}" não encontrada no router tRPC`);
      }

      try {
        return await procedure.mutate({ id, ...data });
      } catch (error: any) {
        throw new Error(`Erro ao atualizar ${name} (id: ${id}): ${error.message}`);
      }
    },

    async delete(id: any) {
      // @ts-ignore
      const procedure = router[proc.delete];
      
      if (!procedure) {
        throw new Error(`Procedure "${proc.delete}" não encontrada no router tRPC`);
      }

      try {
        await procedure.mutate({ id });
      } catch (error: any) {
        throw new Error(`Erro ao deletar ${name} (id: ${id}): ${error.message}`);
      }
    },
  };
}

