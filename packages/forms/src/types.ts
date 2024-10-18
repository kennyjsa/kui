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
 * Props do FormBuilder
 */
export interface FormBuilderProps<T extends z.ZodObject<any>> {
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

