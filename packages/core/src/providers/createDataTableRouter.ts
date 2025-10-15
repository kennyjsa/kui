import { z } from "zod";

/**
 * Schema de input padronizado para queries de DataTable
 */
export const dataTableInputSchema = z.object({
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
  filters: z.array(z.object({
    key: z.string(),
    operator: z.string(),
    value: z.any(),
  })).optional(),
});

export type DataTableInput = z.infer<typeof dataTableInputSchema>;

/**
 * Resultado de uma query de DataTable
 */
export interface DataTableResult<T> {
  data: T[];
  total: number;
}

/**
 * Cria um procedure tRPC padronizado para DataTable
 *
 * @example
 * ```typescript
 * // server/routers/users.ts
 * import { createDataTableRouter } from "@kui-framework/core";
 *
 * export const userRouter = router({
 *   list: createDataTableRouter({
 *     procedure: publicProcedure,
 *     handler: async (input) => {
 *       // Sua lógica de query (Prisma, Drizzle, etc)
 *       const where = buildWhereClause(input.filters, input.search);
 *
 *       const [data, total] = await Promise.all([
 *         db.user.findMany({
 *           skip: (input.page - 1) * input.pageSize,
 *           take: input.pageSize,
 *           where,
 *           orderBy: input.sortBy ? {
 *             [input.sortBy]: input.sortOrder
 *           } : undefined,
 *         }),
 *         db.user.count({ where }),
 *       ]);
 *
 *       return { data, total };
 *     }
 *   }),
 * });
 * ```
 */
export function createDataTableRouter<T>(options: {
  procedure: any; // Usar any para evitar problemas de tipos complexos do tRPC
  handler: (input: DataTableInput) => Promise<DataTableResult<T>>;
}) {
  return options.procedure
    .input(dataTableInputSchema)
    .query(async ({ input }: { input: DataTableInput }) => {
      // Delega para o handler (service/repository)
      const result = await options.handler(input);

      // Apenas formata a resposta padronizada
      return {
        data: result.data,
        total: result.total,
        page: input.page,
        pageSize: input.pageSize,
        totalPages: Math.ceil(result.total / input.pageSize),
      };
    });
}
