import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { db } from '../db/mockDatabase';
import { pessoaSchema } from '../../schemas/pessoa.schema';

export const pessoaRouter = router({
  /**
   * Lista todas as pessoas com paginação
   */
  list: publicProcedure
    .input(
      z.object({
        page: z.number().default(1),
        pageSize: z.number().default(10),
        filters: z.record(z.any()).optional(),
        sort: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { page, pageSize } = input;
      const skip = (page - 1) * pageSize;

      const pessoas = await db.pessoa.findMany({ skip, take: pageSize });
      const total = await db.pessoa.count();

      return {
        data: pessoas,
        total,
        page,
        pageSize,
      };
    }),

  /**
   * Busca uma pessoa por ID
   */
  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const pessoa = await db.pessoa.findUnique({
        where: { id: input.id },
      });

      if (!pessoa) {
        throw new Error('Pessoa não encontrada');
      }

      return pessoa;
    }),

  /**
   * Cria uma nova pessoa
   */
  create: publicProcedure
    .input(pessoaSchema.omit({ id: true }))
    .mutation(async ({ input }) => {
      // Calcular idade se dataNascimento foi fornecido
      let idade;
      if (input.dataNascimento) {
        const birthDate = new Date(input.dataNascimento);
        const today = new Date();
        idade = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          idade--;
        }
      }

      const pessoa = await db.pessoa.create({
        data: {
          ...input as any,
          idade,
        },
      });

      return pessoa;
    }),

  /**
   * Atualiza uma pessoa existente
   */
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        data: pessoaSchema.partial().omit({ id: true }),
      })
    )
    .mutation(async ({ input }) => {
      // Calcular idade se dataNascimento foi atualizado
      let updateData: any = { ...input.data };

      if (input.data.dataNascimento) {
        const birthDate = new Date(input.data.dataNascimento);
        const today = new Date();
        let idade = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          idade--;
        }
        updateData.idade = idade;
      }

      const pessoa = await db.pessoa.update({
        where: { id: input.id },
        data: updateData,
      });

      return pessoa;
    }),

  /**
   * Deleta uma pessoa
   */
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.pessoa.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),
});

