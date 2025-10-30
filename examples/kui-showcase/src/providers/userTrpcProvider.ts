import { createTrpcProvider } from "@kui/core";
import { trpc } from "@/lib/trpc";

/**
 * Provider tRPC para usuários
 * Integra as operações CRUD com o backend tRPC
 */
export const userTrpcProvider = createTrpcProvider({
  name: "userTrpcProvider",
  router: trpc.user,
  procedures: {
    list: "list",
    get: "getById",
    create: "create",
    update: "update",
    delete: "delete",
  },
});
