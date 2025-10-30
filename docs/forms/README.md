# 📝 Formulários - FormBuilder e 18 Tipos de Campos

O KUI Framework oferece um sistema completo de formulários declarativos com 18 tipos de campos, validação automática e geração de UI a partir de schemas Zod.

## 🚀 Características

- ✅ **18 Tipos de Campos**: Text, email, number, date, select, etc.
- ✅ **Validação Automática**: Zod validation integrada
- ✅ **3 Modos**: Create, Edit, View automáticos
- ✅ **Campos Derivados**: Cálculos automáticos
- ✅ **Campos Condicionais**: Visibilidade baseada em outros campos
- ✅ **Layout Responsivo**: Grid e seções
- ✅ **Integração Backend**: tRPC e REST

## 📦 Instalação

```bash
pnpm add @kui-framework/forms @kui-framework/zod-extension
```

## 🎯 Uso Básico

### 1. Definir Schema

```typescript
// schemas/user.schema.ts
import { zKUI } from '@kui-framework/zod-extension';

export const userSchema = zKUI.object({
  id: zKUI.identifier('ID'),
  nome: zKUI.text('Nome Completo', { required: true }),
  email: zKUI.email('E-mail', { required: true }),
  idade: zKUI.number('Idade', {
    derived: true,
    compute: (values) => calculateAge(values.dataNascimento)
  }),
  dataNascimento: zKUI.date('Data de Nascimento'),
  ativo: zKUI.boolean('Ativo', { default: true }),
  telefone: zKUI.text('Telefone').optional(),
});
```

### 2. Criar Formulário

```tsx
// components/UserForm.tsx
import { FormBuilder } from '@kui-framework/forms';
import { userSchema } from '../schemas/user.schema';

export function UserForm() {
  return (
    <FormBuilder
      schema={userSchema}
      mode="create"
      onSubmit={async (data) => {
        console.log('Dados do usuário:', data);
        // Implementar salvamento
      }}
    />
  );
}
```

### 3. Usar o Formulário

```tsx
// app/users/page.tsx
import { UserForm } from '../components/UserForm';

export default function UsersPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Cadastro de Usuário</h1>
      <UserForm />
    </div>
  );
}
```

## 🎨 18 Tipos de Campos

### Campos Básicos

```typescript
// Texto
zKUI.text('Nome', { required: true })
zKUI.email('E-mail', { required: true })
zKUI.password('Senha', { required: true })
zKUI.textarea('Observações')

// Números
zKUI.number('Idade', { min: 0, max: 120 })
zKUI.currency('Salário', { currency: 'BRL' })

// Data e Hora
zKUI.date('Data de Nascimento')
zKUI.datetime('Data e Hora')
zKUI.time('Horário')

// Boolean
zKUI.boolean('Ativo', { default: true })
zKUI.switch('Receber Notificações')
zKUI.checkbox('Termos de Uso', { required: true })
```

### Campos de Seleção

```typescript
// Select
zKUI.select('Estado Civil', {
  options: [
    { label: 'Solteiro', value: 'solteiro' },
    { label: 'Casado', value: 'casado' },
    { label: 'Divorciado', value: 'divorciado' },
  ]
})

// Radio
zKUI.radio('Sexo', {
  options: [
    { label: 'Masculino', value: 'M' },
    { label: 'Feminino', value: 'F' },
  ]
})

// Multi-select
zKUI.multiselect('Habilidades', {
  options: [
    { label: 'JavaScript', value: 'js' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'React', value: 'react' },
  ]
})
```

### Campos Especiais

```typescript
// Rating
zKUI.rating('Avaliação', { max: 5 })

// Color
zKUI.color('Cor Favorita')

// File
zKUI.file('Foto', { 
  accept: 'image/*',
  maxSize: '5MB'
})

// Relation (Relacionamento)
zKUI.relation('Empresa', {
  provider: 'companyProvider',
  displayField: 'nome',
  valueField: 'id'
})

// Grid (Sublista 1:N)
zKUI.grid('Endereços', {
  schema: addressSchema,
  pageSize: 5,
  allowCreate: true,
  allowEdit: true,
  allowDelete: true
})
```

## 🎛️ Modos de Formulário

### Create Mode
```tsx
<FormBuilder
  schema={userSchema}
  mode="create"
  onSubmit={async (data) => {
    await trpc.user.create.mutate(data);
  }}
/>
```

### Edit Mode
```tsx
<FormBuilder
  schema={userSchema}
  mode="edit"
  initialData={user}
  onSubmit={async (data) => {
    await trpc.user.update.mutate({ id: user.id, ...data });
  }}
/>
```

### View Mode
```tsx
<FormBuilder
  schema={userSchema}
  mode="view"
  initialData={user}
/>
```

## 🔧 Campos Derivados

```typescript
const userSchema = zKUI.object({
  dataNascimento: zKUI.date('Data de Nascimento'),
  idade: zKUI.number('Idade', {
    derived: true,
    compute: (values) => {
      if (!values.dataNascimento) return 0;
      const today = new Date();
      const birth = new Date(values.dataNascimento);
      return today.getFullYear() - birth.getFullYear();
    }
  }),
  categoria: zKUI.text('Categoria', {
    derived: true,
    compute: (values) => {
      if (values.idade < 18) return 'Menor';
      if (values.idade < 65) return 'Adulto';
      return 'Idoso';
    }
  })
});
```

## 🎯 Campos Condicionais

```typescript
const userSchema = zKUI.object({
  temTelefone: zKUI.boolean('Tem Telefone'),
  telefone: zKUI.text('Telefone', {
    showIf: (values) => values.temTelefone === true,
    required: true
  }),
  tipoPessoa: zKUI.select('Tipo de Pessoa', {
    options: [
      { label: 'Física', value: 'fisica' },
      { label: 'Jurídica', value: 'juridica' }
    ]
  }),
  cpf: zKUI.text('CPF', {
    showIf: (values) => values.tipoPessoa === 'fisica',
    mask: '000.000.000-00'
  }),
  cnpj: zKUI.text('CNPJ', {
    showIf: (values) => values.tipoPessoa === 'juridica',
    mask: '00.000.000/0000-00'
  })
});
```

## 📐 Layout e Grid

### Grid Responsivo

```typescript
const userSchema = zKUI.object({
  nome: zKUI.text('Nome', { 
    grid: { xs: 12, md: 6 } 
  }),
  email: zKUI.email('E-mail', { 
    grid: { xs: 12, md: 6 } 
  }),
  endereco: zKUI.textarea('Endereço', { 
    grid: { xs: 12 } 
  })
});
```

### Seções

```typescript
const userSchema = zKUI.object({
  // Seção 1: Dados Pessoais
  nome: zKUI.text('Nome', { section: 'Dados Pessoais' }),
  email: zKUI.email('E-mail', { section: 'Dados Pessoais' }),
  
  // Seção 2: Endereço
  cep: zKUI.text('CEP', { section: 'Endereço' }),
  rua: zKUI.text('Rua', { section: 'Endereço' }),
  cidade: zKUI.text('Cidade', { section: 'Endereço' })
});
```

## 🔗 Integração Backend

### tRPC Provider

```typescript
// providers/trpc-provider.ts
import { createTrpcProvider } from '@kui-framework/core';
import { trpc } from '../lib/trpc';

export const userTrpcProvider = createTrpcProvider({
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
```

### REST Provider

```typescript
// providers/rest-provider.ts
import { createRestProvider } from '@kui-framework/core';

export const userProvider = createRestProvider({
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
```

### Formulário com Provider

```tsx
<FormBuilder
  schema={userSchema}
  mode="create"
  provider="userProvider"
  onSubmit={async (data) => {
    // Salvamento automático via provider
    console.log('Usuário criado:', data);
  }}
/>
```

## 🎨 Customização

### Render Personalizado

```typescript
const userSchema = zKUI.object({
  status: zKUI.select('Status', {
    options: [
      { label: 'Ativo', value: 'ativo' },
      { label: 'Inativo', value: 'inativo' }
    ],
    render: (value) => (
      <Badge variant={value === 'ativo' ? 'default' : 'secondary'}>
        {value === 'ativo' ? 'Ativo' : 'Inativo'}
      </Badge>
    )
  })
});
```

### Validação Customizada

```typescript
const userSchema = zKUI.object({
  email: zKUI.email('E-mail', { required: true }),
  confirmEmail: zKUI.email('Confirmar E-mail', { required: true })
}).refine(
  (data) => data.email === data.confirmEmail,
  {
    message: "E-mails não coincidem",
    path: ["confirmEmail"],
  }
);
```

### Máscaras

```typescript
const userSchema = zKUI.object({
  cpf: zKUI.text('CPF', { 
    mask: '000.000.000-00',
    placeholder: '000.000.000-00'
  }),
  telefone: zKUI.text('Telefone', { 
    mask: '(00) 00000-0000'
  }),
  cep: zKUI.text('CEP', { 
    mask: '00000-000'
  })
});
```

## 🎯 Props Completas

```typescript
interface FormBuilderProps<T = any> {
  schema: z.ZodObject<any>;
  mode: 'create' | 'edit' | 'view';
  initialData?: Partial<T>;
  provider?: string;
  onSubmit?: (data: T) => Promise<void> | void;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  showActions?: boolean;
  className?: string;
}
```

## 🚀 Exemplos Avançados

### Formulário com Grid

```tsx
// app/users/advanced/page.tsx
import { FormBuilder } from '@kui-framework/forms';
import { userSchema } from '../schemas/user.schema';

export default function AdvancedUserForm() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Formulário Avançado</h1>
      
      <FormBuilder
        schema={userSchema}
        mode="create"
        provider="userProvider"
        onSubmit={async (data) => {
          console.log('Dados salvos:', data);
        }}
        submitText="Salvar Usuário"
        cancelText="Cancelar"
      />
    </div>
  );
}
```

### Formulário com Validação

```tsx
// app/users/validation/page.tsx
import { FormBuilder } from '@kui-framework/forms';
import { userSchema } from '../schemas/user.schema';

export default function ValidationForm() {
  return (
    <FormBuilder
      schema={userSchema}
      mode="create"
      onSubmit={async (data) => {
        try {
          await trpc.user.create.mutate(data);
          toast.success('Usuário criado com sucesso!');
        } catch (error) {
          toast.error('Erro ao criar usuário');
        }
      }}
    />
  );
}
```

## 📚 Exemplos Completos

Veja exemplos completos no [Showcase](../examples/kui-showcase/):

- **[Formulários Simples](../examples/kui-showcase/src/app/forms/simple-forms/page.tsx)**
- **[Formulários com Validação](../examples/kui-showcase/src/app/forms/with-validations/page.tsx)**
- **[Formulários com Grid](../examples/kui-showcase/src/app/forms/with-grid/page.tsx)**
- **[Formulários com tRPC](../examples/kui-showcase/src/app/forms/with-trpc/page.tsx)**

## 🆘 Troubleshooting

### Problemas Comuns

1. **Schema não reconhecido**
   ```tsx
   // Use zKUI em vez de z
   import { zKUI } from '@kui-framework/zod-extension';
   ```

2. **Provider não encontrado**
   ```tsx
   // Certifique-se de registrar o provider
   <KuiDataProvider providers={[userProvider]}>
   ```

3. **Validação não funciona**
   ```tsx
   // Verifique se o schema tem validações
   zKUI.text('Nome', { required: true })
   ```

### Debug

```tsx
// Adicione logs para debug
<FormBuilder
  schema={userSchema}
  mode="create"
  onSubmit={async (data) => {
    console.log('Dados do formulário:', data);
  }}
/>
```

---

**🎉 Pronto!** Agora você tem um sistema completo de formulários. Explore os [exemplos](../examples/kui-showcase/) para ver mais casos de uso!
