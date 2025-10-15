import { z } from "zod";
import type { FilterDefinition } from "../types";

/**
 * Opções para extração de filtros do schema
 */
export interface ExtractFiltersOptions {
  /** Campos a excluir da extração */
  exclude?: string[];
  /** Campos específicos a incluir (se definido, apenas estes serão extraídos) */
  include?: string[];
  /** Overrides para definições específicas de filtros */
  overrides?: Record<string, Partial<FilterDefinition>>;
}

/**
 * Extrai definições de filtros de um Zod schema
 *
 * @example
 * ```typescript
 * import { extractFiltersFromSchema } from "@kui-framework/core";
 * import { userSchema } from "@/schemas/user.schema";
 *
 * const filters = extractFiltersFromSchema(userSchema, {
 *   include: ["nome", "email", "ativo", "dataNascimento"],
 *   overrides: {
 *     ativo: {
 *       type: "select",
 *       options: [
 *         { label: "Ativo", value: true },
 *         { label: "Inativo", value: false },
 *       ]
 *     },
 *   }
 * });
 * ```
 */
export function extractFiltersFromSchema(
  schema: z.ZodObject<any>,
  options?: ExtractFiltersOptions
): FilterDefinition[] {
  const shape = schema.shape;
  const filters: FilterDefinition[] = [];

  for (const [key, fieldSchema] of Object.entries(shape)) {
    // Aplicar include/exclude
    if (options?.exclude?.includes(key)) continue;
    if (options?.include && !options.include.includes(key)) continue;

    const filter = mapZodToFilter(key, fieldSchema as z.ZodTypeAny);

    // Aplicar overrides
    if (options?.overrides?.[key]) {
      Object.assign(filter, options.overrides[key]);
    }

    filters.push(filter);
  }

  return filters;
}

/**
 * Mapeia um campo Zod para uma definição de filtro
 */
function mapZodToFilter(key: string, schema: z.ZodTypeAny): FilterDefinition {
  // Extrair label dos metadados KUI
  const description = schema.description || key;

  // Mapear tipo Zod para FilterType
  if (schema instanceof z.ZodString) {
    return { key, label: description, type: "text", operator: "contains" };
  }

  if (schema instanceof z.ZodNumber) {
    return { key, label: description, type: "number", operator: "eq" };
  }

  if (schema instanceof z.ZodBoolean) {
    return { key, label: description, type: "boolean", operator: "eq" };
  }

  if (schema instanceof z.ZodDate) {
    return { key, label: description, type: "date", operator: "eq" };
  }

  if (schema instanceof z.ZodEnum) {
    const options = schema._def.values.map((v: any) => ({
      label: String(v),
      value: v,
    }));
    return { key, label: description, type: "select", operator: "eq", options };
  }

  if (schema instanceof z.ZodArray) {
    // Para arrays, assumir que é multiselect
    const elementSchema = schema.element;
    if (elementSchema instanceof z.ZodString || elementSchema instanceof z.ZodEnum) {
      return { key, label: description, type: "multiselect", operator: "in" };
    }
  }

  if (schema instanceof z.ZodUnion) {
    // Para unions, usar o primeiro tipo não-nullable
    const nonNullableOptions = schema._def.options.filter(
      (option: z.ZodTypeAny) => !(option instanceof z.ZodNull)
    );
    if (nonNullableOptions.length > 0) {
      return mapZodToFilter(key, nonNullableOptions[0]);
    }
  }

  if (schema instanceof z.ZodOptional || schema instanceof z.ZodNullable) {
    // Para optional/nullable, extrair o tipo interno
    return mapZodToFilter(key, schema._def.innerType);
  }

  // Fallback para tipos não reconhecidos
  return { key, label: description, type: "text", operator: "contains" };
}
