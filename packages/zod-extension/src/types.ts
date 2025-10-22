/**
 * Opções de configuração para campos KUI
 *
 * @example
 * ```tsx
 * // Campo obrigatório com placeholder
 * zKUI.text("Nome", {
 *   required: true,
 *   placeholder: "Digite seu nome"
 * })
 *
 * // Campo com máscara
 * zKUI.text("CPF", {
 *   mask: "999.999.999-99",
 *   required: true
 * })
 *
 * // Campo derivado (calculado)
 * zKUI.number("Total", {
 *   derived: true,
 *   readOnly: true,
 *   compute: (values) => values.quantity * values.price
 * })
 *
 * // Campo condicional
 * zKUI.text("Endereço", {
 *   showIf: (values) => values.needsShipping === true
 * })
 * ```
 */
export type KuiOptions = {
  /**
   * Texto de placeholder para o campo
   * @example "Digite seu nome"
   */
  placeholder?: string;

  /**
   * Texto de ajuda exibido abaixo do campo
   * @example "Mínimo 8 caracteres"
   */
  helperText?: string;

  /**
   * Indica se o campo é obrigatório
   * @default false
   */
  required?: boolean;

  /**
   * Máscara de entrada (9 = dígito, A = letra)
   * @example "999.999.999-99" // CPF
   * @example "(99) 99999-9999" // Telefone
   */
  mask?: string;

  /**
   * Modos em que o campo está disponível
   * @example ["edit", "view"] // não aparece em create
   */
  modes?: ("create" | "edit" | "view")[];

  /**
   * Define se o campo é somente leitura
   * @default false
   */
  readOnly?: boolean;

  /**
   * Define em quais modos o campo é somente leitura
   * @example ["edit"] // readonly apenas em edição
   */
  readOnlyIn?: ("create" | "edit" | "view")[];

  /**
   * Define em quais modos o campo fica oculto
   * @example ["create"] // oculto em criação (comum para IDs)
   */
  hiddenIn?: ("create" | "edit" | "view")[];

  /**
   * Campo transitório - não é persistido no backend
   * Útil para campos auxiliares como "confirmar senha"
   * @default false
   */
  transient?: boolean;

  /**
   * Campo derivado - calculado automaticamente
   * Requer compute function
   * @default false
   */
  derived?: boolean;

  /**
   * Função de computação para campos derivados
   * Recebe todos os valores do formulário e retorna o valor calculado
   * @param values - Todos os valores do formulário
   * @returns Valor calculado do campo
   * @example (values) => values.quantity * values.price
   */
  compute?: (values: any) => any;

  /**
   * Função que determina se o campo deve ser exibido (campos condicionais)
   * @param values - Todos os valores do formulário
   * @returns true para mostrar, false para ocultar
   * @example (values) => values.paymentMethod === "credit_card"
   */
  showIf?: (values: any) => boolean;

  /** Configuração de layout responsivo */
  layout?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };

  /** Número de linhas para textarea */
  rows?: number;

  /** Comprimento máximo do texto */
  maxLength?: number;

  /** Código da moeda (ISO 4217) para campos currency */
  currency?: string;

  /** Locale para formatação (ex: pt-BR, en-US) */
  locale?: string;

  /** Opções para select, radio, etc */
  options?: Array<{ label: string; value: string | number }>;

  /** Número máximo para rating */
  max?: number;

  /** Permite meia estrela no rating */
  allowHalf?: boolean;

  /** Accept types para file input (ex: "image/*") */
  accept?: string;

  /** Tamanho máximo do arquivo em bytes */
  maxSize?: number;

  /** Permite múltiplos arquivos */
  multiple?: boolean;

  /** Exibe preview de imagens */
  preview?: boolean;
};

/**
 * Opções específicas para campos de relação (Foreign Keys)
 *
 * @example
 * ```tsx
 * // Relacionamento N:1 (Many-to-One)
 * zKUI.relation("Categoria", {
 *   relation: "category",
 *   provider: "categoryProvider",
 *   displayField: "name",
 *   valueField: "id",
 *   required: true
 * })
 *
 * // Relacionamento N:M (Many-to-Many)
 * zKUI.relation("Tags", {
 *   relation: "tag",
 *   provider: "tagProvider",
 *   displayField: "name",
 *   valueField: "id",
 *   multiple: true
 * })
 * ```
 */
export type RelationOptions = KuiOptions & {
  /**
   * Nome da relação (identificador)
   * @example "category"
   */
  relation: string;

  /**
   * Nome do provider de dados registrado no KuiDataProvider
   * @example "categoryProvider"
   */
  provider: string;

  /**
   * Campo da entidade relacionada a ser exibido no select
   * @example "name"
   */
  displayField: string;

  /**
   * Campo usado como valor (geralmente "id")
   * @example "id"
   */
  valueField: string;

  /**
   * Se true, permite múltipla seleção (relacionamento N:M)
   * @default false
   */
  multiple?: boolean;
};

/**
 * Opções para campos de grid (sublistas 1:N)
 *
 * @example
 * ```tsx
 * // Schema do item
 * const addressSchema = zKUI.object({
 *   id: zKUI.identifier("ID"),
 *   street: zKUI.text("Rua", { required: true }),
 *   number: zKUI.text("Número", { required: true }),
 * });
 *
 * // Grid no schema principal
 * const personSchema = zKUI.object({
 *   id: zKUI.identifier("ID"),
 *   name: zKUI.text("Nome"),
 *   addresses: zKUI.grid("Endereços", {
 *     itemSchema: addressSchema,
 *     columns: [
 *       { key: "street", label: "Rua" },
 *       { key: "number", label: "Número" }
 *     ],
 *     minItems: 1,
 *     allowCreate: true,
 *     allowEdit: true,
 *     allowDelete: true
 *   })
 * });
 * ```
 */
export type GridOptions = KuiOptions & {
  /**
   * Schema Zod dos itens do grid
   * Deve ser criado com zKUI.object()
   */
  itemSchema: any;

  /**
   * Colunas visíveis no grid (formato tabela)
   * @example [{ key: "name", label: "Nome" }, { key: "email", label: "E-mail" }]
   */
  columns: Array<{ key: string; label: string }>;

  /**
   * Campos exibidos nos cards (modo mobile/lista)
   * Se não especificado, usa os mesmos de columns
   */
  displayFields?: string[];

  /**
   * Permite adicionar novos itens
   * @default true
   */
  allowCreate?: boolean;

  /**
   * Permite editar itens existentes
   * @default true
   */
  allowEdit?: boolean;

  /**
   * Permite remover itens
   * @default true
   */
  allowDelete?: boolean;

  /**
   * Mínimo de itens obrigatórios
   * @example 1 // pelo menos 1 item obrigatório
   */
  minItems?: number;

  /**
   * Máximo de itens permitidos
   * @example 5 // no máximo 5 itens
   */
  maxItems?: number;

  /**
   * Breakpoint para switch Grid ↔ List
   * Em telas menores que o breakpoint, exibe como lista
   * @default "md"
   */
  breakpoint?: "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Número de itens por página
   * @default 5
   */
  pageSize?: number;
};

/**
 * Metadados KUI anexados ao schema Zod
 */
export interface KuiMetadata {
  label: string;
  type: string;
  options: KuiOptions | RelationOptions | GridOptions;
}

