import { router } from '../trpc';
import { pessoaRouter } from './pessoa';
import { usuarioRouter } from './usuario';

/**
 * App Router - agrupa todos os routers
 */
export const appRouter = router({
  pessoa: pessoaRouter,
  usuario: usuarioRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;

