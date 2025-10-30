import { z } from "zod";
import type { DataTableColumn } from "../types";

/**
 * Opções para extração de colunas do schema
 */
export interface ExtractColumnsOptions {
  /** Campos a excluir da extração */
  exclude?: string[];
  /** Campos específicos a incluir (se definido, apenas estes serão extraídos) */
  include?: string[];
  /** Overrides para definições específicas de colunas */
  overrides?: Record<string, Partial<DataTableColumn>>;
}

/**
 * Extrai definições de colunas de um Zod schema
 *
 * @example
 * ```typescript
 * import { extractColumns } from "@kui/forms";
 * import { userSchema } from "@/schemas/user.schema";
 *
 * const columns = extractColumns(userSchema, {
 *   include: ["nome", "email", "ativo", "dataNascimento"],
 *   overrides: {
 *     ativo: {
 *       label: "Status",
 *       render: (value) => value ? <Badge>Ativo</Badge> : <Badge variant="secondary">Inativo</Badge>
 *     },
 *   }
 * });
 * ```
 */
export function extractColumns(
  schema: z.ZodObject<any>,
  options?: ExtractColumnsOptions
): DataTableColumn[] {
  const shape = schema.shape;
  const columns: DataTableColumn[] = [];

  for (const [key, fieldSchema] of Object.entries(shape)) {
    // Aplicar include/exclude
    if (options?.exclude?.includes(key)) continue;
    if (options?.include && !options.include.includes(key)) continue;

    const column = mapZodToColumn(key, fieldSchema as z.ZodTypeAny);

    // Aplicar overrides
    if (options?.overrides?.[key]) {
      Object.assign(column, options.overrides[key]);
    }

    columns.push(column);
  }

  return columns;
}

/**
 * Mapeia um campo Zod para uma definição de coluna
 */
function mapZodToColumn(key: string, schema: z.ZodTypeAny): DataTableColumn {
  // Extrair label dos metadados KUI
  const description = schema.description || key;

  // Determinar se é sortable baseado no tipo
  const sortable = isSortableType(schema);

  // Determinar renderer padrão baseado no tipo
  const render = getDefaultRenderer(schema);

  return {
    key,
    label: description,
    sortable,
    render,
  };
}

/**
 * Verifica se um tipo Zod é sortable
 */
function isSortableType(schema: z.ZodTypeAny): boolean {
  // Tipos primitivos são sortables
  if (schema instanceof z.ZodString) return true;
  if (schema instanceof z.ZodNumber) return true;
  if (schema instanceof z.ZodBoolean) return true;
  if (schema instanceof z.ZodDate) return true;

  // Arrays não são sortables
  if (schema instanceof z.ZodArray) return false;

  // Objects não são sortables
  if (schema instanceof z.ZodObject) return false;

  // Para unions, verificar se algum tipo é sortable
  if (schema instanceof z.ZodUnion) {
    return schema._def.options.some((option: z.ZodTypeAny) => isSortableType(option));
  }

  // Para optional/nullable, verificar o tipo interno
  if (schema instanceof z.ZodOptional || schema instanceof z.ZodNullable) {
    return isSortableType(schema._def.innerType);
  }

  // Fallback: assumir que é sortable
  return true;
}

/**
 * Retorna um renderer padrão baseado no tipo Zod
 */
function getDefaultRenderer(schema: z.ZodTypeAny): ((value: any, row: any) => React.ReactNode) | undefined {
  // Boolean: renderizar como badge
  if (schema instanceof z.ZodBoolean) {
    return (value: boolean) => value ? "Sim" : "Não";
  }

  // Date: formatar data
  if (schema instanceof z.ZodDate) {
    return (value: Date) => {
      if (!value) return "-";
      return new Date(value).toLocaleDateString("pt-BR");
    };
  }

  // String com formato de email: renderizar como link
  if (schema instanceof z.ZodString) {
    const description = schema.description || "";
    if (description.toLowerCase().includes("email") || description.toLowerCase().includes("e-mail")) {
      return (value: string) => value;
    }
  }

  // Enum: renderizar valor como string
  if (schema instanceof z.ZodEnum) {
    return (value: any) => String(value);
  }

  // Array: mostrar quantidade
  if (schema instanceof z.ZodArray) {
    return (value: any[]) => {
      if (!Array.isArray(value)) return "-";
      return `${value.length} item(s)`;
    };
  }

  // Para outros tipos, não definir renderer (usar valor padrão)
  return undefined;
}
