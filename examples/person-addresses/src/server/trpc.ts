import { initTRPC } from '@trpc/server';

/**
 * Inicialização do tRPC.
 * Aqui você pode adicionar contexto, middleware, etc.
 */
const t = initTRPC.create();

/**
 * Export reusable router and procedure helpers
 */
export const router = t.router;
export const publicProcedure = t.procedure;

