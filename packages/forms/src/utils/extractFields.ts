import { z } from "zod";
import { getKuiMetadata } from "@kui/zod-extension";
import type { FieldConfig } from "../types";

/**
 * Extrai configurações de campos de um schema Zod
 */
export function extractFields(schema: z.ZodObject<any>): FieldConfig[] {
  const shape = schema.shape;
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

