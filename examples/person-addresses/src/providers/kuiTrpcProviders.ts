import { createTrpcProvider } from "@kui-framework/core";
import { trpc } from "../lib/trpc";

/**
 * Provider tRPC para Pessoa
 */
export const pessoaTrpcProvider = createTrpcProvider({
  name: "pessoaTrpcProvider",
  router: trpc.pessoa,
  procedures: {
    list: "list",
    get: "get",
    create: "create",
    update: "update",
    delete: "delete",
  },
});

/**
 * Provider tRPC para Usuário
 */
export const usuarioTrpcProvider = createTrpcProvider({
  name: "usuarioTrpcProvider",
  router: trpc.usuario,
  procedures: {
    list: "list",
  },
});

