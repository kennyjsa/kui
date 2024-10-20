import { z } from "zod";
import type { KuiOptions, RelationOptions, GridOptions, KuiMetadata } from "./types";

/**
 * Símbolo para armazenar metadados KUI no schema Zod
 */
export const KUI_METADATA = Symbol("kui_metadata");

/**
 * Anexa metadados KUI a um schema Zod
 */
function withKuiMetadata<T extends z.ZodTypeAny>(
  schema: T,
  metadata: KuiMetadata
): T {
  (schema as any)[KUI_METADATA] = metadata;
  return schema;
}

/**
 * Obtém metadados KUI de um schema Zod
 */
export function getKuiMetadata(schema: z.ZodTypeAny): KuiMetadata | undefined {
  return (schema as any)[KUI_METADATA];
}

/**
 * Extensões KUI para Zod
 */
export const zKUI = {
  /**
   * Campo identificador (ID) - sempre readonly e oculto no create
   */
  identifier(label: string, options: Partial<KuiOptions> = {}) {
    return withKuiMetadata(
      z.string().or(z.number()).optional(),
      {
        label,
        type: "identifier",
        options: {
          ...options,
          readOnly: true,
          hiddenIn: ["create"],
        },
      }
    );
  },

  /**
   * Campo de texto
   */
  text(label: string, options: KuiOptions = {}) {
    return withKuiMetadata(
      z.string(),
      {
        label,
        type: "text",
        options,
      }
    );
  },

  /**
   * Campo de texto longo (textarea)
   */
  textarea(label: string, options: KuiOptions = {}) {
    return withKuiMetadata(
      z.string(),
      {
        label,
        type: "textarea",
        options,
      }
    );
  },

  /**
   * Campo numérico
   */
  number(label: string, options: KuiOptions = {}) {
    // Campos derivados são opcionais
    const schema = options.derived ? z.number().optional() : z.number();

    return withKuiMetadata(
      schema,
      {
        label,
        type: "number",
        options,
      }
    );
  },

  /**
   * Campo de valor monetário
   */
  currency(label: string, options: KuiOptions = {}) {
    return withKuiMetadata(
      z.number(),
      {
        label,
        type: "currency",
        options: {
          currency: "BRL",
          locale: "pt-BR",
          ...options,
        },
      }
    );
  },

  /**
   * Campo de data
   */
  date(label: string, options: KuiOptions = {}) {
    return withKuiMetadata(
      z.date().or(z.string()),
      {
        label,
        type: "date",
        options,
      }
    );
  },

  /**
   * Campo booleano (checkbox/switch)
   */
  boolean(label: string, options: KuiOptions = {}) {
    return withKuiMetadata(
      z.boolean(),
      {
        label,
        type: "boolean",
        options,
      }
    );
  },

  /**
   * Campo checkbox
   */
  checkbox(label: string, options: KuiOptions = {}) {
    return withKuiMetadata(
      z.boolean().default(false),
      {
        label,
        type: "checkbox",
        options,
      }
    );
  },

  /**
   * Campo radio group
   */
  radio(label: string, radioOptions: Array<{ label: string; value: string }>, options: KuiOptions = {}) {
    return withKuiMetadata(
      z.string(),
      {
        label,
        type: "radio",
        options: {
          ...options,
          options: radioOptions,
        },
      }
    );
  },

  /**
   * Campo switch (toggle)
   */
  switch(label: string, options: KuiOptions = {}) {
    return withKuiMetadata(
      z.boolean().default(false),
      {
        label,
        type: "switch",
        options,
      }
    );
  },

  /**
   * Campo de email
   */
  email(label: string, options: KuiOptions = {}) {
    return withKuiMetadata(
      z.string().email(),
      {
        label,
        type: "email",
        options,
      }
    );
  },

  /**
   * Campo de senha
   */
  password(label: string, options: KuiOptions = {}) {
    return withKuiMetadata(
      z.string(),
      {
        label,
        type: "password",
        options,
      }
    );
  },

  /**
   * Campo de seleção (select)
   */
  select(label: string, values: string[], options: KuiOptions = {}) {
    return withKuiMetadata(
      z.enum(values as [string, ...string[]]),
      {
        label,
        type: "select",
        options,
      }
    );
  },

  /**
   * Campo de avaliação por estrelas
   */
  rating(label: string, options: KuiOptions = {}) {
    return withKuiMetadata(
      z.number().min(0).max(options.max || 5),
      {
        label,
        type: "rating",
        options: {
          max: 5,
          ...options,
        },
      }
    );
  },

  /**
   * Campo de seleção de cor
   */
  color(label: string, options: KuiOptions = {}) {
    return withKuiMetadata(
      z.string().regex(/^#[0-9A-F]{6}$/i, "Cor inválida"),
      {
        label,
        type: "color",
        options,
      }
    );
  },

  /**
   * Campo de upload de arquivo
   */
  file(label: string, options: KuiOptions = {}) {
    return withKuiMetadata(
      options.multiple ? z.array(z.any()) : z.any(),
      {
        label,
        type: "file",
        options: {
          preview: true,
          ...options,
        },
      }
    );
  },

  /**
   * Campo de data do sistema - automático e readonly
   */
  systemDate(label: string, options: Partial<KuiOptions> = {}) {
    return withKuiMetadata(
      z.date().or(z.string()),
      {
        label,
        type: "systemDate",
        options: {
          ...options,
          readOnly: true,
          derived: true,
        },
      }
    );
  },

  /**
   * Campo de relação/associação
   */
  relation(label: string, relationOptions: RelationOptions) {
    return withKuiMetadata(
      relationOptions.multiple ? z.array(z.any()) : z.any(),
      {
        label,
        type: "relation",
        options: relationOptions,
      }
    );
  },

  /**
   * Campo de grid (sublista 1..N)
   */
  grid(label: string, gridOptions: GridOptions) {
    return withKuiMetadata(
      z.array(gridOptions.itemSchema),
      {
        label,
        type: "grid",
        options: gridOptions,
      }
    );
  },

  /**
   * Cria um objeto com metadados KUI
   */
  object<T extends z.ZodRawShape>(shape: T) {
    return z.object(shape);
  },
};

