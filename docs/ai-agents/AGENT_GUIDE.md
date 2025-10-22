# 🤖 KUI Framework - Guia para Agentes de IA

> Este documento foi criado especificamente para ajudar agentes de IA a gerar código usando o KUI Framework de forma eficiente e correta.

## 📋 Índice Rápido

1. [Visão Geral](#visão-geral)
2. [Instalação e Setup](#instalação-e-setup)
3. [Exemplo Mínimo Funcional](#exemplo-mínimo-funcional)
4. [Estrutura de Projeto](#estrutura-de-projeto)
5. [Padrões Comuns](#padrões-comuns)
6. [Referência Rápida](#referência-rápida)
7. [Troubleshooting](#troubleshooting)

---

## Visão Geral

**KUI (Kinetic UI Framework)** é um framework declarativo para construção de formulários e CRUD em React.

### Conceito Principal
Você define um **schema Zod com metadados** e o KUI gera automaticamente:
- ✅ Interface de formulário completa
- ✅ Validação integrada
- ✅ Estados (create/edit/view)
- ✅ Campos derivados (calculados)
- ✅ Relacionamentos entre entidades
- ✅ Sublistas (grids 1:N)

### Arquitetura em 3 Camadas

```
Schema (Zod + Metadados)
    ↓
FormBuilder (gerador de UI)
    ↓
Componentes UI (inputs, selects, etc)
```

---

## Instalação e Setup

### 1. Instalar Pacotes

```bash
pnpm add @kui-framework/forms @kui-framework/ui @kui-framework/core @kui-framework/zod-extension @kui-framework/theme
# ou
npm install @kui-framework/forms @kui-framework/ui @kui-framework/core @kui-framework/zod-extension @kui-framework/theme
```

### 2. Configurar Tailwind

```js
// tailwind.config.js
import kuiPreset from '@kui-framework/theme/tailwind';

export default {
  presets: [kuiPreset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@kui-framework/**/*.{js,mjs}',
  ],
};
```

### 3. Importar CSS Global

```css
/* src/app/globals.css ou src/index.css */
@import '@kui-framework/theme/globals.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Exemplo Mínimo Funcional

Este é o **código completo** necessário para criar um formulário funcional:

```tsx
// src/schemas/user.schema.ts
import { zKUI } from "@kui-framework/zod-extension";

export const userSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  name: zKUI.text("Nome", { required: true }),
  email: zKUI.email("E-mail", { required: true }),
  age: zKUI.number("Idade"),
});

export type User = typeof userSchema._type;
```

```tsx
// src/components/UserForm.tsx
import { FormBuilder } from "@kui-framework/forms";
import { userSchema } from "../schemas/user.schema";

export function UserForm() {
  const handleSubmit = async (data: any) => {
    console.log("Dados enviados:", data);
    // Aqui você faria a chamada para o backend
  };

  return (
    <FormBuilder
      schema={userSchema}
      mode="create"
      onSubmit={handleSubmit}
    />
  );
}
```

**Pronto!** Isso gera um formulário completo com validação.

---

## Estrutura de Projeto

Quando gerar código KUI, organize assim:

```
src/
  schemas/           # Schemas Zod com metadados KUI
    user.schema.ts
    product.schema.ts
  components/        # Componentes de formulário
    UserForm.tsx
    ProductForm.tsx
  providers/         # Providers de dados (tRPC/REST)
    userProvider.ts
  pages/            # Páginas Next.js ou rotas
    users/
      create.tsx
      [id]/edit.tsx
```

---

## Padrões Comuns

### Padrão 1: CRUD Básico (sem backend)

```tsx
// Schema
export const productSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  name: zKUI.text("Nome do Produto", { required: true }),
  price: zKUI.currency("Preço", { required: true }),
  description: zKUI.textarea("Descrição"),
});

// Componente
export function ProductForm({ mode = "create", initialData }: Props) {
  return (
    <FormBuilder
      schema={productSchema}
      mode={mode}
      defaultValues={initialData}
      onSubmit={async (data) => {
        console.log(data);
      }}
    />
  );
}
```

### Padrão 2: Campo Derivado (Calculado)

```tsx
export const personSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  birthDate: zKUI.date("Data de Nascimento", { required: true }),
  age: zKUI.number("Idade", {
    derived: true,
    readOnly: true,
    compute: (values) => {
      if (!values.birthDate) return null;
      const today = new Date();
      const birth = new Date(values.birthDate);
      return Math.floor((today.getTime() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    },
  }),
});
```

### Padrão 3: Campo Condicional

```tsx
export const orderSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  paymentMethod: zKUI.select("Forma de Pagamento", ["credit_card", "boleto", "pix"]),
  cardNumber: zKUI.text("Número do Cartão", {
    showIf: (values) => values.paymentMethod === "credit_card",
    required: true,
  }),
});
```

### Padrão 4: Relacionamento (Select de outra entidade)

```tsx
// 1. Criar provider
import { createRestProvider, KuiDataProvider } from '@kui-framework/core';

const userProvider = createRestProvider({
  name: 'userProvider',
  baseUrl: 'https://api.example.com',
  endpoints: {
    list: '/users',
    get: '/users/:id',
    create: '/users',
    update: '/users/:id',
    delete: '/users/:id',
  },
});

// 2. Envolver app no provider
export function App() {
  return (
    <KuiDataProvider providers={[{ name: 'userProvider', provider: userProvider }]}>
      <OrderForm />
    </KuiDataProvider>
  );
}

// 3. Usar no schema
export const orderSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  customer: zKUI.relation("Cliente", {
    relation: "user",
    provider: "userProvider",
    displayField: "name",
    valueField: "id",
    required: true,
  }),
});
```

### Padrão 5: Grid (Sublista 1:N)

```tsx
// Schema do item
const addressSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  street: zKUI.text("Rua", { required: true }),
  number: zKUI.text("Número", { required: true }),
  city: zKUI.text("Cidade", { required: true }),
});

// Schema principal com grid
export const personSchema = zKUI.object({
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
    minItems: 1,
  }),
});
```

### Padrão 6: Validação Cross-Field

```tsx
export const registrationSchema = zKUI
  .object({
    password: zKUI.password("Senha", { required: true }),
    confirmPassword: zKUI.password("Confirmar Senha", { 
      required: true,
      transient: true, // não será enviado ao backend
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });
```

### Padrão 7: Integração com tRPC

```tsx
// 1. Criar provider tRPC
import { createTrpcProvider } from '@kui-framework/core';
import { trpc } from './lib/trpc';

const userTrpcProvider = createTrpcProvider({
  name: 'userProvider',
  router: trpc.user,
  procedures: {
    list: 'getAll',
    get: 'getById',
    create: 'create',
    update: 'update',
    delete: 'delete',
  },
});

// 2. Envolver no TrpcProvider + KuiDataProvider
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TrpcProvider>
      <KuiDataProvider providers={[{ name: 'userProvider', provider: userTrpcProvider }]}>
        {children}
      </KuiDataProvider>
    </TrpcProvider>
  );
}
```

---

## Referência Rápida

### 18 Tipos de Campos

```tsx
// Básicos
zKUI.identifier("ID")                    // ID (sempre readonly)
zKUI.text("Nome")                        // Input de texto
zKUI.number("Idade")                     // Input numérico
zKUI.date("Data Nascimento")             // Date picker
zKUI.email("E-mail")                     // Input de email
zKUI.password("Senha")                   // Input de senha
zKUI.boolean("Ativo")                    // Checkbox/Switch
zKUI.select("Estado", ["SP", "RJ"])      // Select dropdown

// Avançados
zKUI.textarea("Observações")             // Textarea
zKUI.currency("Preço")                   // Input de moeda
zKUI.checkbox("Aceito termos")           // Checkbox
zKUI.radio("Sexo", [...])                // Radio group
zKUI.switch("Ativo")                     // Toggle switch
zKUI.rating("Avaliação", { max: 5 })     // Estrelas
zKUI.color("Cor")                        // Color picker
zKUI.file("Anexo")                       // Upload de arquivo

// Especiais
zKUI.relation("Cliente", {...})          // Select de relacionamento
zKUI.grid("Endereços", {...})            // Sublista 1:N
```

### Opções Comuns

```tsx
{
  required: true,              // Campo obrigatório
  placeholder: "Digite...",    // Placeholder
  helperText: "Dica...",       // Texto de ajuda
  readOnly: true,              // Apenas leitura
  readOnlyIn: ["edit"],        // Readonly em modo específico
  hiddenIn: ["create"],        // Ocultar em modo específico
  showIf: (values) => ...,     // Mostrar condicionalmente
  mask: "999.999.999-99",      // Máscara de input
  derived: true,               // Campo calculado
  compute: (values) => ...,    // Função de cálculo
  transient: true,             // Não persiste no backend
}
```

### Modos de Formulário

```tsx
mode="create"  // Criação: IDs ocultos, campos editáveis
mode="edit"    // Edição: IDs visíveis readonly, campos editáveis
mode="view"    // Visualização: tudo readonly
```

---

## Troubleshooting

### Problema: "Schema não é válido"
**Solução:** Use sempre `zKUI.object()`, não `z.object()`

### Problema: "Provider não encontrado"
**Solução:** Verifique se o nome do provider no schema corresponde ao registrado no `KuiDataProvider`

### Problema: "Campo derivado não atualiza"
**Solução:** Certifique-se que `derived: true` está definido e que `compute` retorna um valor

### Problema: "Grid não salva mudanças"
**Solução:** O grid retorna arrays com `__meta__` indicando ações (new/updated/deleted). Processe no backend conforme necessário.

### Problema: "Estilos não aplicados"
**Solução:** Verifique:
1. Tailwind config inclui `kuiPreset`
2. Content inclui `node_modules/@kui-framework/**/*.{js,mjs}`
3. CSS global importa `@kui-framework/theme/globals.css`

---

## ✅ Checklist para Gerar Código KUI

Quando criar código usando KUI, sempre:

- [ ] Importar de `@kui-framework/zod-extension` não de `zod`
- [ ] Usar `zKUI.object()` para schemas
- [ ] Definir tipos com `typeof schema._type`
- [ ] Adicionar `required: true` em campos obrigatórios
- [ ] Usar `identifier()` para IDs
- [ ] Campos derivados devem ter `derived: true` + `compute`
- [ ] Campos transientes devem ter `transient: true`
- [ ] Providers devem estar registrados no `KuiDataProvider`
- [ ] Envolver app no provider quando usar relations
- [ ] Grid precisa de `itemSchema` e `columns`

---

## 📚 Próximos Passos

- Ver [PATTERNS.md](./PATTERNS.md) para mais exemplos completos
- Ver [FIELD_REFERENCE.md](./FIELD_REFERENCE.md) para referência detalhada de todos os campos
- Ver `/examples/ai-examples/` para projetos completos funcionais

---

**Dica Final para Agentes de IA:**  
Sempre que possível, copie e adapte os exemplos existentes em `/examples/`. Eles são completos e testados. Modificar código funcional é mais seguro que criar do zero.

