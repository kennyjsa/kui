import type { z } from "zod";

/**
 * Modo de operação do formulário
 */
export type FormMode = "create" | "edit" | "view";

/**
 * Configuração de um campo no formulário
 */
export interface FieldConfig {
  name: string;
  label: string;
  type: string;
  options: any;
  schema: z.ZodTypeAny;
}

/**
 * Tipo de schema aceito pelo FormBuilder
 * Suporta ZodObject e ZodEffects (para validações .refine)
 */
export type AcceptedSchema = z.ZodObject<any> | z.ZodEffects<any>;

/**
 * Props do FormBuilder
 */
export interface FormBuilderProps<T extends AcceptedSchema> {
  schema: T;
  mode?: FormMode;
  defaultValues?: Partial<z.infer<T>>;
  onSubmit: (data: z.infer<T>) => void | Promise<void>;
  className?: string;
}

/**
 * Props do FieldRenderer
 */
export interface FieldRendererProps {
  config: FieldConfig;
  mode: FormMode;
  control: any;
  errors: any;
}

