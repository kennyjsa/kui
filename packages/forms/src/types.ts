import type { z } from "zod";

/**
 * Modo de operação do formulário
 *
 * - `create`: Criação de novo registro (IDs ocultos, campos editáveis)
 * - `edit`: Edição de registro existente (IDs visíveis readonly, campos editáveis)
 * - `view`: Visualização (todos os campos readonly)
 *
 * @example
 * ```tsx
 * <FormBuilder schema={schema} mode="create" />  // Criar
 * <FormBuilder schema={schema} mode="edit" />    // Editar
 * <FormBuilder schema={schema} mode="view" />    // Visualizar
 * ```
 */
export type FormMode = "create" | "edit" | "view";

/**
 * Configuração de um campo no formulário
 *
 * Gerado automaticamente a partir do schema Zod com metadados KUI
 */
export interface FieldConfig {
  /** Nome do campo no schema */
  name: string;

  /** Label exibido para o usuário */
  label: string;

  /** Tipo do campo (text, number, select, etc) */
  type: string;

  /** Opções do campo (KuiOptions, RelationOptions, GridOptions) */
  options: any;

  /** Schema Zod do campo */
  schema: z.ZodTypeAny;
}

/**
 * Tipo de schema aceito pelo FormBuilder
 *
 * Suporta ZodObject e ZodEffects (schemas com .refine para validações cross-field)
 *
 * @example
 * ```tsx
 * // ZodObject simples
 * const schema = zKUI.object({
 *   name: zKUI.text("Nome")
 * });
 *
 * // ZodEffects com .refine()
 * const schema = zKUI.object({
 *   password: zKUI.password("Senha"),
 *   confirmPassword: zKUI.password("Confirmar")
 * }).refine(data => data.password === data.confirmPassword);
 * ```
 */
export type AcceptedSchema = z.ZodObject<any> | z.ZodEffects<any>;

/**
 * Props do FormBuilder - Componente principal de geração de formulários
 *
 * @template T - Schema Zod (ZodObject ou ZodEffects)
 *
 * @example
 * ```tsx
 * import { FormBuilder } from "@kui-framework/forms";
 * import { zKUI } from "@kui-framework/zod-extension";
 *
 * const schema = zKUI.object({
 *   name: zKUI.text("Nome", { required: true }),
 *   email: zKUI.email("E-mail", { required: true }),
 * });
 *
 * function MyForm() {
 *   const handleSubmit = async (data) => {
 *     console.log(data);
 *   };
 *
 *   return (
 *     <FormBuilder
 *       schema={schema}
 *       mode="create"
 *       onSubmit={handleSubmit}
 *     />
 *   );
 * }
 * ```
 */
export interface FormBuilderProps<T extends AcceptedSchema> {
  /**
   * Schema Zod com metadados KUI
   * Criado com zKUI.object()
   */
  schema: T;

  /**
   * Modo de operação do formulário
   * @default "create"
   */
  mode?: FormMode;

  /**
   * Valores iniciais do formulário
   * Usado em modo edit para preencher campos
   */
  defaultValues?: Partial<z.infer<T>>;

  /**
   * Callback executado ao submeter o formulário
   * Recebe os dados validados
   * @param data - Dados do formulário (tipados conforme schema)
   */
  onSubmit: (data: z.infer<T>) => void | Promise<void>;

  /**
   * Classes CSS adicionais para o formulário
   */
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

