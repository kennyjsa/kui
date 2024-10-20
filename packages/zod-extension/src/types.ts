/**
 * Opções de configuração para campos KUI
 */
export type KuiOptions = {
  /** Texto de placeholder para o campo */
  placeholder?: string;

  /** Texto de ajuda exibido abaixo do campo */
  helperText?: string;

  /** Indica se o campo é obrigatório */
  required?: boolean;

  /** Máscara de entrada (ex: "999.999.999-99") */
  mask?: string;

  /** Modos em que o campo está disponível */
  modes?: ("create" | "edit" | "view")[];

  /** Define se o campo é somente leitura */
  readOnly?: boolean;

  /** Define em quais modos o campo é somente leitura */
  readOnlyIn?: ("create" | "edit" | "view")[];

  /** Define em quais modos o campo fica oculto */
  hiddenIn?: ("create" | "edit" | "view")[];

  /** Campo transitório - não é persistido */
  transient?: boolean;

  /** Campo derivado - calculado automaticamente */
  derived?: boolean;

  /** Função de computação para campos derivados */
  compute?: (values: any) => any;

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
 * Opções específicas para campos de relação
 */
export type RelationOptions = KuiOptions & {
  /** Nome da relação */
  relation: string;

  /** Nome do provider de dados */
  provider: string;

  /** Campo a ser exibido */
  displayField: string;

  /** Campo usado como valor */
  valueField: string;

  /** Se true, permite múltipla seleção */
  multiple?: boolean;
};

/**
 * Opções para campos de grid (sublistas)
 */
export type GridOptions = KuiOptions & {
  /** Schema dos itens do grid */
  itemSchema: any;

  /** Colunas visíveis no grid */
  columns?: string[];

  /** Permite adicionar novos itens */
  allowCreate?: boolean;

  /** Permite editar itens */
  allowEdit?: boolean;

  /** Permite remover itens */
  allowDelete?: boolean;
};

/**
 * Metadados KUI anexados ao schema Zod
 */
export interface KuiMetadata {
  label: string;
  type: string;
  options: KuiOptions | RelationOptions | GridOptions;
}

