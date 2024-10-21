import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { db } from '../db/mockDatabase';

export const usuarioRouter = router({
  /**
   * Lista todos os usuários
   */
  list: publicProcedure
    .input(
      z.object({
        page: z.number().default(1),
        pageSize: z.number().default(10),
      })
    )
    .query(async ({ input }) => {
      const { page, pageSize } = input;
      const skip = (page - 1) * pageSize;

      const usuarios = await db.usuario.findMany({ skip, take: pageSize });
      const total = await db.usuario.count();

      return {
        data: usuarios,
        total,
        page,
        pageSize,
      };
    }),
});

