# 📝 Formulários

> Guia completo para criação e gerenciamento de formulários com o KUI Framework

## 📋 Índice

- [FormBuilder](./formbuilder.md) - Componente principal
- [Schemas](./schemas.md) - Definição de schemas Zod
- [Validação](./validation.md) - Validações e regras
- [Modos](./modes.md) - Create, Edit, View
- [Layout](./layout.md) - Organização de campos
- [Integração](./integration.md) - Backend e APIs

## 🎯 Visão Geral

O KUI Framework revoluciona a criação de formulários através de schemas declarativos. Defina uma vez, use em qualquer lugar.

### ✨ Principais Recursos

- **Declarativo**: Schemas Zod com metadados
- **Type-Safe**: TypeScript completo
- **Validação**: Zod validation integrada
- **Modos**: Create, Edit, View automáticos
- **Layout**: Grid responsivo automático
- **Integração**: REST, tRPC, GraphQL

## 🚀 Exemplo Básico

```tsx
import { FormBuilder } from "@kui-framework/forms";
import { zKUI } from "@kui-framework/zod-extension";

// 1. Defina o schema
const userSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  name: zKUI.text("Nome", { required: true }),
  email: zKUI.email("E-mail", { required: true }),
  age: zKUI.number("Idade"),
});

// 2. Use o FormBuilder
export function UserForm() {
  return (
    <FormBuilder
      schema={userSchema}
      mode="create"
      onSubmit={(data) => console.log(data)}
    />
  );
}
```

## 🎨 Tipos de Campos

### Campos Básicos

```typescript
// Texto
zKUI.text("Nome", { required: true })
zKUI.textarea("Descrição", { rows: 4 })
zKUI.email("E-mail", { required: true })
zKUI.password("Senha", { minLength: 8 })

// Números
zKUI.number("Idade", { min: 0, max: 120 })
zKUI.currency("Preço", { currency: "BRL" })

// Datas
zKUI.date("Data de Nascimento")
zKUI.systemDate("Criado em") // automático
```

### Campos de Seleção

```typescript
// Select
zKUI.select("Estado", ["SP", "RJ", "MG"], { required: true })

// Radio
zKUI.radio("Sexo", [
  { label: "Masculino", value: "M" },
  { label: "Feminino", value: "F" }
])

// Checkbox
zKUI.checkbox("Aceito termos", { required: true })
zKUI.switch("Ativo")
```

### Campos Avançados

```typescript
// Upload
zKUI.file("Foto", {
  accept: "image/*",
  maxSize: 5 * 1024 * 1024 // 5MB
})

// Rating
zKUI.rating("Avaliação", { max: 5 })

// Color
zKUI.color("Cor Favorita")

// Relacionamentos
zKUI.relation("Categoria", {
  relation: "category",
  provider: "categoryProvider",
  displayField: "name",
  valueField: "id"
})
```

## 🔧 Validação

### Validação Básica

```typescript
const schema = zKUI.object({
  name: zKUI.text("Nome", {
    required: true,
    minLength: 3,
    maxLength: 100
  }),
  
  email: zKUI.email("E-mail", {
    required: true,
    helperText: "Usaremos para contato"
  }),
  
  age: zKUI.number("Idade", {
    min: 18,
    max: 120
  })
});
```

### Validação Cross-Field

```typescript
const schema = zKUI
  .object({
    password: zKUI.password("Senha", { required: true }),
    confirmPassword: zKUI.password("Confirmar Senha", { 
      required: true,
      transient: true // não persiste
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"]
  });
```

### Campos Condicionais

```typescript
const schema = zKUI.object({
  contactType: zKUI.radio("Tipo", [
    { label: "Pessoa Física", value: "individual" },
    { label: "Pessoa Jurídica", value: "company" }
  ]),
  
  // Só aparece para Pessoa Física
  cpf: zKUI.text("CPF", {
    mask: "999.999.999-99",
    showIf: (values) => values.contactType === "individual"
  }),
  
  // Só aparece para Pessoa Jurídica
  cnpj: zKUI.text("CNPJ", {
    mask: "99.999.999/9999-99",
    showIf: (values) => values.contactType === "company"
  })
});
```

## 🎭 Modos de Formulário

### Create (Criação)

```tsx
<FormBuilder
  schema={userSchema}
  mode="create"
  onSubmit={handleCreate}
/>
```

- Campos obrigatórios visíveis
- IDs ocultos
- Todos os campos editáveis

### Edit (Edição)

```tsx
<FormBuilder
  schema={userSchema}
  mode="edit"
  defaultValues={existingUser}
  onSubmit={handleUpdate}
/>
```

- IDs visíveis (readonly)
- Campos preenchidos
- Validação completa

### View (Visualização)

```tsx
<FormBuilder
  schema={userSchema}
  mode="view"
  defaultValues={userData}
  onSubmit={() => {}}
/>
```

- Todos os campos readonly
- Layout otimizado para leitura
- Sem validação

## 📱 Layout Responsivo

```typescript
const schema = zKUI.object({
  // Largura total em mobile, metade em desktop
  fullName: zKUI.text("Nome Completo", {
    layout: { xs: 12, md: 6 }
  }),
  
  email: zKUI.email("E-mail", {
    layout: { xs: 12, md: 6 }
  }),
  
  // Campos de 1/3 em desktop
  city: zKUI.text("Cidade", {
    layout: { xs: 12, md: 4 }
  }),
  
  state: zKUI.text("Estado", {
    layout: { xs: 12, md: 4 }
  }),
  
  zipCode: zKUI.text("CEP", {
    layout: { xs: 12, md: 4 }
  })
});
```

## 🔌 Integração com Backend

### REST API

```typescript
// Provider
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

// Uso
<FormBuilder
  schema={userSchema}
  mode="create"
  onSubmit={async (data) => {
    await userProvider.create(data);
  }}
/>
```

### tRPC

```typescript
// Provider
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

// Uso
<FormBuilder
  schema={userSchema}
  mode="create"
  onSubmit={async (data) => {
    await userTrpcProvider.create(data);
  }}
/>
```

## 🎯 Próximos Passos

1. **FormBuilder**: Aprenda o componente principal
2. **Schemas**: Domine a definição de schemas
3. **Validação**: Implemente validações robustas
4. **Layout**: Organize campos responsivamente
5. **Integração**: Conecte com seu backend

---

**Explore os guias detalhados para dominar a criação de formulários com o KUI Framework!**
