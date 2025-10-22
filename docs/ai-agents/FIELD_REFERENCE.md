# 📚 KUI Framework - Referência de Campos

> Referência completa de todos os 18 tipos de campos disponíveis no KUI Framework.

## 📋 Índice

- [Campos Básicos](#campos-básicos)
- [Campos de Texto](#campos-de-texto)
- [Campos Numéricos](#campos-numéricos)
- [Campos de Seleção](#campos-de-seleção)
- [Campos Booleanos](#campos-booleanos)
- [Campos de Data](#campos-de-data)
- [Campos Avançados](#campos-avançados)
- [Campos Especiais](#campos-especiais)
- [Opções Comuns](#opções-comuns)

---

## Campos Básicos

### `identifier()` - Campo Identificador

**Uso:** IDs de entidades (chaves primárias)

**Comportamento padrão:**
- Sempre `readOnly: true`
- Oculto em modo `create` (`hiddenIn: ["create"]`)
- Aceita string ou number

```tsx
zKUI.identifier("ID")
```

**Exemplo completo:**
```tsx
import { zKUI } from "@kui-framework/zod-extension";

const schema = zKUI.object({
  id: zKUI.identifier("ID"),
  name: zKUI.text("Nome"),
});

// Em create: campo não aparece
// Em edit/view: aparece como readonly
```

**Tipo TypeScript resultante:**
```typescript
string | number | undefined
```

---

### `text()` - Campo de Texto

**Uso:** Inputs de texto simples (nome, título, etc)

```tsx
zKUI.text(label: string, options?: KuiOptions)
```

**Opções específicas:**
- `mask` - Máscara de input (ex: "999.999.999-99")
- `minLength` - Tamanho mínimo
- `maxLength` - Tamanho máximo
- `pattern` - Regex de validação

**Exemplos:**

```tsx
// Simples
zKUI.text("Nome")

// Com validação
zKUI.text("Nome", { 
  required: true,
  minLength: 3,
  maxLength: 100,
  placeholder: "Digite seu nome completo"
})

// Com máscara
zKUI.text("CPF", {
  mask: "999.999.999-99",
  required: true
})

// ReadOnly em edição
zKUI.text("Código", {
  readOnlyIn: ["edit"]
})
```

**Tipo TypeScript:** `string`

---

### `textarea()` - Campo de Texto Longo

**Uso:** Textos longos (descrições, observações, comentários)

```tsx
zKUI.textarea(label: string, options?: KuiOptions)
```

**Opções específicas:**
- `rows` - Número de linhas visíveis
- `maxLength` - Limite de caracteres

**Exemplos:**

```tsx
// Simples
zKUI.textarea("Observações")

// Customizado
zKUI.textarea("Descrição do Produto", {
  required: true,
  rows: 5,
  maxLength: 500,
  placeholder: "Descreva o produto em detalhes...",
  helperText: "Máximo 500 caracteres"
})
```

**Tipo TypeScript:** `string`

---

## Campos Numéricos

### `number()` - Campo Numérico

**Uso:** Números inteiros ou decimais

```tsx
zKUI.number(label: string, options?: KuiOptions)
```

**Opções específicas:**
- `min` - Valor mínimo
- `max` - Valor máximo
- `step` - Incremento (padrão: 1)
- `derived` - Se é um campo calculado
- `compute` - Função de cálculo (para derived)

**Exemplos:**

```tsx
// Simples
zKUI.number("Idade")

// Com validação
zKUI.number("Quantidade", {
  required: true,
  min: 1,
  max: 999,
  step: 1
})

// Campo derivado (calculado)
zKUI.number("Total", {
  derived: true,
  readOnly: true,
  compute: (values) => values.quantity * values.price
})
```

**Tipo TypeScript:** `number` (ou `number | undefined` se `derived: true`)

---

### `currency()` - Campo de Moeda

**Uso:** Valores monetários

```tsx
zKUI.currency(label: string, options?: KuiOptions)
```

**Opções específicas:**
- `currency` - Código da moeda (padrão: "BRL")
- `locale` - Locale para formatação (padrão: "pt-BR")
- `min` - Valor mínimo
- `max` - Valor máximo

**Exemplos:**

```tsx
// Real Brasileiro (padrão)
zKUI.currency("Preço")

// Customizado
zKUI.currency("Salário Mensal", {
  required: true,
  currency: "BRL",
  locale: "pt-BR",
  min: 0
})

// Outras moedas
zKUI.currency("Price (USD)", {
  currency: "USD",
  locale: "en-US"
})

zKUI.currency("Preis (EUR)", {
  currency: "EUR",
  locale: "de-DE"
})
```

**Formatação:**
- BRL: R$ 1.234,56
- USD: $1,234.56
- EUR: €1.234,56

**Tipo TypeScript:** `number`

---

## Campos de Data

### `date()` - Campo de Data

**Uso:** Datas (data picker)

```tsx
zKUI.date(label: string, options?: KuiOptions)
```

**Opções específicas:**
- `min` - Data mínima
- `max` - Data máxima

**Exemplos:**

```tsx
// Simples
zKUI.date("Data de Nascimento")

// Com validação
zKUI.date("Data de Início", {
  required: true,
  min: new Date('2024-01-01'),
})

// Usado em cálculo
const schema = zKUI.object({
  birthDate: zKUI.date("Data de Nascimento", { required: true }),
  age: zKUI.number("Idade", {
    derived: true,
    readOnly: true,
    compute: (values) => {
      if (!values.birthDate) return null;
      const today = new Date();
      const birth = new Date(values.birthDate);
      return Math.floor((today - birth) / (365.25 * 24 * 60 * 60 * 1000));
    }
  })
});
```

**Tipo TypeScript:** `Date | string`

---

### `systemDate()` - Data do Sistema

**Uso:** Timestamps automáticos (createdAt, updatedAt)

```tsx
zKUI.systemDate(label: string, options?: Partial<KuiOptions>)
```

**Comportamento padrão:**
- Sempre `readOnly: true`
- Sempre `derived: true`
- Valor gerado automaticamente

**Exemplos:**

```tsx
const schema = zKUI.object({
  id: zKUI.identifier("ID"),
  name: zKUI.text("Nome"),
  createdAt: zKUI.systemDate("Criado em"),
  updatedAt: zKUI.systemDate("Atualizado em"),
});
```

**Tipo TypeScript:** `Date | string`

---

## Campos de Seleção

### `select()` - Campo de Seleção

**Uso:** Dropdown com opções pré-definidas

```tsx
zKUI.select(label: string, values: string[], options?: KuiOptions)
```

**Exemplos:**

```tsx
// Simples
zKUI.select("Estado Civil", ["solteiro", "casado", "divorciado", "viuvo"])

// Com configuração
zKUI.select("Categoria", ["electronics", "clothing", "books"], {
  required: true,
  placeholder: "Selecione uma categoria"
})

// Valores enum
enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending"
}

zKUI.select("Status", Object.values(Status), {
  required: true
})
```

**Tipo TypeScript:** `"option1" | "option2" | ...` (enum literal)

---

### `radio()` - Radio Group

**Uso:** Seleção única com opções visíveis

```tsx
zKUI.radio(
  label: string, 
  radioOptions: Array<{ label: string; value: string }>, 
  options?: KuiOptions
)
```

**Diferença do select:** Todas as opções ficam visíveis (melhor para poucas opções)

**Exemplos:**

```tsx
// Simples
zKUI.radio("Sexo", [
  { label: "Masculino", value: "M" },
  { label: "Feminino", value: "F" },
  { label: "Outro", value: "O" }
])

// Com configuração
zKUI.radio("Forma de Pagamento", [
  { label: "Cartão de Crédito", value: "credit_card" },
  { label: "Boleto", value: "boleto" },
  { label: "PIX", value: "pix" }
], {
  required: true,
  helperText: "Escolha a forma de pagamento"
})
```

**Tipo TypeScript:** `string`

---

## Campos Booleanos

### `boolean()` - Campo Booleano

**Uso:** Valores verdadeiro/falso genéricos

```tsx
zKUI.boolean(label: string, options?: KuiOptions)
```

**Exemplos:**

```tsx
zKUI.boolean("Ativo")

zKUI.boolean("Publicado", {
  default: false
})
```

**Tipo TypeScript:** `boolean`

---

### `checkbox()` - Checkbox

**Uso:** Confirmações, aceites, flags

```tsx
zKUI.checkbox(label: string, options?: KuiOptions)
```

**Comportamento padrão:** `default: false`

**Exemplos:**

```tsx
// Simples
zKUI.checkbox("Aceito os termos de uso")

// Obrigatório (deve estar marcado)
zKUI.checkbox("Li e concordo com os termos", {
  required: true
})

// Múltiplos checkboxes
const schema = zKUI.object({
  newsletter: zKUI.checkbox("Receber newsletter"),
  sms: zKUI.checkbox("Receber SMS"),
  whatsapp: zKUI.checkbox("Receber WhatsApp"),
});
```

**Tipo TypeScript:** `boolean` (default `false`)

---

### `switch()` - Toggle Switch

**Uso:** Ativar/desativar funcionalidades

```tsx
zKUI.switch(label: string, options?: KuiOptions)
```

**Diferença do checkbox:** Estilo visual de toggle (mais moderno)

**Exemplos:**

```tsx
// Simples
zKUI.switch("Cadastro Ativo")

// Com configuração
zKUI.switch("Notificações Push", {
  default: true,
  helperText: "Receber notificações em tempo real"
})
```

**Tipo TypeScript:** `boolean` (default `false`)

---

## Campos Avançados

### `email()` - Campo de Email

**Uso:** Endereços de email

```tsx
zKUI.email(label: string, options?: KuiOptions)
```

**Validação automática:** Formato de email válido

**Exemplos:**

```tsx
// Simples
zKUI.email("E-mail")

// Com validação
zKUI.email("E-mail Principal", {
  required: true,
  placeholder: "seu@email.com"
})
```

**Tipo TypeScript:** `string` (validado como email)

---

### `password()` - Campo de Senha

**Uso:** Senhas (input type="password")

```tsx
zKUI.password(label: string, options?: KuiOptions)
```

**Opções específicas:**
- `minLength` - Tamanho mínimo

**Exemplos:**

```tsx
// Simples
zKUI.password("Senha")

// Com validação
zKUI.password("Nova Senha", {
  required: true,
  minLength: 8,
  helperText: "Mínimo 8 caracteres"
})

// Confirmação de senha
const schema = zKUI.object({
  password: zKUI.password("Senha", { required: true, minLength: 8 }),
  confirmPassword: zKUI.password("Confirmar Senha", { 
    required: true,
    transient: true // não persiste
  })
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"]
});
```

**Tipo TypeScript:** `string`

---

### `rating()` - Campo de Avaliação

**Uso:** Avaliações por estrelas

```tsx
zKUI.rating(label: string, options?: KuiOptions)
```

**Opções específicas:**
- `max` - Número máximo de estrelas (padrão: 5)

**Exemplos:**

```tsx
// 5 estrelas (padrão)
zKUI.rating("Avaliação do Produto")

// Customizado
zKUI.rating("Satisfação", {
  max: 10,
  required: true,
  helperText: "Avalie de 1 a 10"
})
```

**Tipo TypeScript:** `number` (0 até max)

---

### `color()` - Seletor de Cor

**Uso:** Escolha de cores (hex)

```tsx
zKUI.color(label: string, options?: KuiOptions)
```

**Formato:** Hexadecimal (#RRGGBB)

**Exemplos:**

```tsx
// Simples
zKUI.color("Cor Favorita")

// Com configuração
zKUI.color("Cor do Tema", {
  required: true,
  default: "#3B82F6",
  helperText: "Escolha a cor principal do tema"
})
```

**Tipo TypeScript:** `string` (validado como hex #RRGGBB)

---

### `file()` - Upload de Arquivo

**Uso:** Upload de arquivos

```tsx
zKUI.file(label: string, options?: KuiOptions)
```

**Opções específicas:**
- `accept` - Tipos de arquivo aceitos (ex: "image/*", ".pdf")
- `maxSize` - Tamanho máximo em bytes
- `multiple` - Permite múltiplos arquivos
- `preview` - Mostrar preview (para imagens)

**Exemplos:**

```tsx
// Upload de imagem
zKUI.file("Foto de Perfil", {
  accept: "image/*",
  maxSize: 5 * 1024 * 1024, // 5MB
  preview: true,
  helperText: "JPG, PNG ou GIF (máx. 5MB)"
})

// Upload de documento
zKUI.file("Documento", {
  accept: ".pdf,.doc,.docx",
  maxSize: 10 * 1024 * 1024, // 10MB
  required: true
})

// Múltiplos arquivos
zKUI.file("Anexos", {
  multiple: true,
  accept: ".pdf,.jpg,.png",
  maxSize: 5 * 1024 * 1024
})
```

**Tipo TypeScript:**
- Single: `any` (File ou string)
- Multiple: `any[]`

---

## Campos Especiais

### `relation()` - Campo de Relacionamento

**Uso:** Relacionamentos entre entidades (FK)

```tsx
zKUI.relation(label: string, relationOptions: RelationOptions)
```

**RelationOptions:**
```typescript
{
  relation: string;        // Nome da relação
  provider: string;        // Nome do provider registrado
  displayField: string;    // Campo para exibir na lista
  valueField: string;      // Campo usado como valor (geralmente "id")
  multiple?: boolean;      // Seleção múltipla (N:M)
  placeholder?: string;
  filter?: (values: any) => any;  // Filtro dinâmico
  // ... outras opções comuns
}
```

**Exemplos:**

```tsx
// Relacionamento N:1 (Many-to-One)
zKUI.relation("Categoria", {
  relation: "category",
  provider: "categoryProvider",
  displayField: "name",
  valueField: "id",
  required: true,
  placeholder: "Selecione uma categoria"
})

// Relacionamento N:M (Many-to-Many)
zKUI.relation("Tags", {
  relation: "tag",
  provider: "tagProvider",
  displayField: "name",
  valueField: "id",
  multiple: true,
  placeholder: "Selecione as tags"
})

// Com filtro dinâmico
zKUI.relation("Produtos", {
  relation: "product",
  provider: "productProvider",
  displayField: "name",
  valueField: "id",
  multiple: true,
  filter: (values) => ({
    categoryId: values.category // apenas produtos da categoria selecionada
  }),
  showIf: (values) => !!values.category
})
```

**Provider necessário:**
```tsx
import { createRestProvider, KuiDataProvider } from '@kui-framework/core';

const categoryProvider = createRestProvider({
  name: 'categoryProvider',
  baseUrl: 'https://api.example.com',
  endpoints: {
    list: '/categories',
    get: '/categories/:id',
    // ...
  },
});

// Envolver app
<KuiDataProvider providers={[
  { name: 'categoryProvider', provider: categoryProvider }
]}>
  <App />
</KuiDataProvider>
```

**Tipo TypeScript:**
- Single: `any` (geralmente number ou string - o ID)
- Multiple: `any[]`

---

### `grid()` - Grid/Sublista (1:N)

**Uso:** Sublistas, relacionamentos 1:N (ex: Pessoa tem vários Endereços)

```tsx
zKUI.grid(label: string, gridOptions: GridOptions)
```

**GridOptions:**
```typescript
{
  itemSchema: ZodObject;              // Schema dos itens
  columns: Array<{                    // Colunas da grid
    key: string;
    label: string;
  }>;
  allowCreate?: boolean;              // Permitir criar (padrão: true)
  allowEdit?: boolean;                // Permitir editar (padrão: true)
  allowDelete?: boolean;              // Permitir excluir (padrão: true)
  minItems?: number;                  // Mínimo de itens
  maxItems?: number;                  // Máximo de itens
  pageSize?: number;                  // Itens por página
  breakpoint?: "sm" | "md" | "lg";    // Quando mudar para lista (padrão: "md")
}
```

**Exemplos:**

```tsx
// Schema do item
const addressSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  street: zKUI.text("Rua", { required: true }),
  number: zKUI.text("Número", { required: true }),
  city: zKUI.text("Cidade", { required: true }),
  zipCode: zKUI.text("CEP", { mask: "99999-999" }),
});

// Grid no schema principal
const personSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  name: zKUI.text("Nome", { required: true }),
  addresses: zKUI.grid("Endereços", {
    itemSchema: addressSchema,
    columns: [
      { key: "street", label: "Rua" },
      { key: "number", label: "Número" },
      { key: "city", label: "Cidade" },
    ],
    allowCreate: true,
    allowEdit: true,
    allowDelete: true,
    minItems: 1, // Pelo menos 1 endereço
    maxItems: 5, // No máximo 5 endereços
  }),
});
```

**Com validação:**
```tsx
const schema = zKUI
  .object({
    name: zKUI.text("Nome"),
    phones: zKUI.grid("Telefones", {
      itemSchema: phoneSchema,
      columns: [...],
      minItems: 1,
    }),
  })
  .refine(
    (data) => {
      // Validação customizada
      const hasMain = data.phones?.some(p => p.isMain);
      return hasMain;
    },
    {
      message: "Deve haver pelo menos um telefone principal",
      path: ["phones"],
    }
  );
```

**Tipo TypeScript:** `Array<typeof itemSchema._type>`

**Como funciona a persistência:**
Os itens retornam com metadata indicando ações:
```typescript
{
  phones: [
    { id: 1, number: "...", __meta__: { action: "updated" } },
    { number: "...", __meta__: { action: "new" } },
    { id: 3, __meta__: { action: "deleted" } },
  ]
}
```

---

## Opções Comuns

Todas as funções de campo aceitam um objeto `options` com as seguintes propriedades:

### Validação

```typescript
{
  required: boolean;           // Campo obrigatório
  min: number;                // Valor mínimo (number)
  max: number;                // Valor máximo (number)
  minLength: number;          // Tamanho mínimo (string)
  maxLength: number;          // Tamanho máximo (string)
  pattern: RegExp;            // Validação por regex
}
```

### Apresentação

```typescript
{
  label: string;              // Label do campo (primeiro parâmetro)
  placeholder: string;        // Placeholder do input
  helperText: string;         // Texto de ajuda abaixo do campo
  default: any;               // Valor padrão
}
```

### Visibilidade

```typescript
{
  hiddenIn: Array<"create" | "edit" | "view">;  // Ocultar em modos
  readOnly: boolean;                             // Sempre readonly
  readOnlyIn: Array<"create" | "edit" | "view">; // Readonly em modos
  showIf: (values: any) => boolean;              // Mostrar condicionalmente
}
```

### Comportamento

```typescript
{
  derived: boolean;           // Campo calculado (não editável)
  compute: (values: any) => any;  // Função de cálculo (para derived)
  transient: boolean;         // Não persiste no backend
  mask: string;               // Máscara de input (ex: "999.999.999-99")
}
```

### Layout

```typescript
{
  layout: {
    xs?: number;   // Colunas em extra-small (mobile) - máx 12
    sm?: number;   // Colunas em small
    md?: number;   // Colunas em medium (tablet)
    lg?: number;   // Colunas em large (desktop)
  }
}
```

**Exemplo com todas as opções:**

```tsx
zKUI.text("Nome Completo", {
  // Validação
  required: true,
  minLength: 3,
  maxLength: 100,
  
  // Apresentação
  placeholder: "Digite seu nome completo",
  helperText: "Nome como aparece no documento",
  
  // Visibilidade
  readOnlyIn: ["view"],
  
  // Layout
  layout: { xs: 12, md: 6 },
})
```

---

## Resumo Rápido

| Campo | Uso | Tipo TypeScript |
|-------|-----|----------------|
| `identifier()` | IDs | `string \| number \| undefined` |
| `text()` | Texto curto | `string` |
| `textarea()` | Texto longo | `string` |
| `number()` | Números | `number` |
| `currency()` | Moeda | `number` |
| `date()` | Datas | `Date \| string` |
| `systemDate()` | Timestamp auto | `Date \| string` |
| `select()` | Dropdown | `"opt1" \| "opt2" \| ...` |
| `radio()` | Radio group | `string` |
| `boolean()` | Verdadeiro/Falso | `boolean` |
| `checkbox()` | Checkbox | `boolean` |
| `switch()` | Toggle | `boolean` |
| `email()` | Email | `string` |
| `password()` | Senha | `string` |
| `rating()` | Estrelas | `number` |
| `color()` | Cor (hex) | `string` |
| `file()` | Upload | `any \| any[]` |
| `relation()` | FK | `any \| any[]` |
| `grid()` | Sublista 1:N | `Array<T>` |

---

## ✅ Checklist de Uso

Ao usar campos KUI, sempre:

- [ ] Importar de `@kui-framework/zod-extension` não de `zod`
- [ ] Usar `zKUI.object()` para envolver os campos
- [ ] Adicionar `required: true` quando obrigatório
- [ ] Usar `identifier()` para IDs
- [ ] Campos derivados precisam `derived: true` + `compute`
- [ ] Campos transientes precisam `transient: true`
- [ ] Relations precisam de provider registrado
- [ ] Grid precisa de `itemSchema` e `columns`
- [ ] Máscaras seguem padrão "9" para dígito, "A" para letra
- [ ] Layout usa grid de 12 colunas

---

Para exemplos completos de uso, veja:
- [AGENT_GUIDE.md](./AGENT_GUIDE.md) - Guia rápido
- [PATTERNS.md](./PATTERNS.md) - Padrões e receitas
- `/examples/ai-examples/` - Exemplos funcionais

