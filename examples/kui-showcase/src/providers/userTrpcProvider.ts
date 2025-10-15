import { createTrpcProvider } from "@kui-framework/core";
import { trpc } from "@/lib/trpc";

/**
 * Provider tRPC para usuários
 * Integra as operações CRUD com o backend tRPC
 */
export const userTrpcProvider = createTrpcProvider({
  name: "userTrpcProvider",

  // Listar usuários
  list: async (params) => {
    const { page = 1, pageSize = 10, search, status = "all" } = params;

    const result = await trpc.user.list.query({
      page,
      pageSize,
      search,
      status,
    });

    return {
      data: result.data,
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
      totalPages: result.totalPages,
    };
  },

  // Buscar usuário por ID
  get: async (id) => {
    const user = await trpc.user.getById.query({ id });
    return user;
  },

  // Criar usuário
  create: async (data) => {
    const newUser = await trpc.user.create.mutate(data);
    return newUser;
  },

  // Atualizar usuário
  update: async (id, data) => {
    const updatedUser = await trpc.user.update.mutate({ id, ...data });
    return updatedUser;
  },

  // Excluir usuário
  delete: async (id) => {
    const deletedUser = await trpc.user.delete.mutate({ id });
    return deletedUser;
  },
});
