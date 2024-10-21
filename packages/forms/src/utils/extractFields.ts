import { z } from "zod";
import { getKuiMetadata } from "@kui/zod-extension";
import type { FieldConfig, AcceptedSchema } from "../types";

/**
 * Desembrulha ZodEffects para pegar o ZodObject interno
 */
function unwrapSchema(schema: AcceptedSchema): z.ZodObject<any> {
  // Se for ZodEffects (criado por .refine()), pega o innerType
  if (schema instanceof z.ZodEffects) {
    return unwrapSchema(schema.innerType() as AcceptedSchema);
  }

  // Se já for ZodObject, retorna diretamente
  return schema as z.ZodObject<any>;
}

/**
 * Extrai configurações de campos de um schema Zod
 */
export function extractFields(schema: AcceptedSchema): FieldConfig[] {
  // Desembrulha o schema se necessário
  const unwrapped = unwrapSchema(schema);
  const shape = unwrapped.shape;
  const fields: FieldConfig[] = [];

  Object.entries(shape).forEach(([name, fieldSchema]) => {
    const metadata = getKuiMetadata(fieldSchema as z.ZodTypeAny);

    if (metadata) {
      fields.push({
        name,
        label: metadata.label,
        type: metadata.type,
        options: metadata.options,
        schema: fieldSchema as z.ZodTypeAny,
      });
    }
  });

  return fields;
}

