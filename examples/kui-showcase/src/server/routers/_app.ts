import { router } from '../trpc';
import { pessoaRouter } from './pessoa';
import { usuarioRouter } from './usuario';
import { userRouter } from "./user.router";

/**
 * App Router - agrupa todos os routers
 */
export const appRouter = router({
  pessoa: pessoaRouter,
  usuario: usuarioRouter,
  user: userRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;

