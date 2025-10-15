# 🚀 Guia de Início Rápido

Configure o KUI Framework em minutos e comece a construir aplicações modernas com React.

## 📦 Instalação

### 1. Instalar Pacotes

```bash
# NPM
npm install @kui-framework/forms @kui-framework/ui @kui-framework/core @kui-framework/zod-extension @kui-framework/theme

# PNPM
pnpm add @kui-framework/forms @kui-framework/ui @kui-framework/core @kui-framework/zod-extension @kui-framework/theme

# Yarn
yarn add @kui-framework/forms @kui-framework/ui @kui-framework/core @kui-framework/zod-extension @kui-framework/theme
```

### 2. Configurar Tailwind CSS

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

```css
/* globals.css */
@import '@kui-framework/theme/globals.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3. Configurar Providers

```tsx
// app/providers.tsx
import { KuiDataProvider } from '@kui-framework/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TrpcProvider } from './trpc-provider';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TrpcProvider>
        <KuiDataProvider
          providers={[
            // Seus providers aqui
          ]}
        >
          {children}
        </KuiDataProvider>
      </TrpcProvider>
    </QueryClientProvider>
  );
}
```

## 🎯 Primeiro Formulário

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

## 📊 Primeira Lista de Dados

### 1. Configurar Backend (tRPC)

```typescript
// server/routers/user.router.ts
import { createDataTableRouter } from '@kui-framework/core';
import { userSchema } from '../schemas/user.schema';

export const userRouter = createTRPCRouter({
  list: createDataTableRouter({
    procedure: publicProcedure,
    handler: async (input) => {
      // Sua lógica de query
      const users = await db.user.findMany({
        skip: (input.page - 1) * input.pageSize,
        take: input.pageSize,
        where: buildWhereClause(input.filters, input.search),
        orderBy: input.sortBy ? {
          [input.sortBy]: input.sortOrder
        } : undefined,
      });
      
      const total = await db.user.count();
      
      return { data: users, total };
    }
  }),
});
```

### 2. Criar DataTable

```tsx
// app/users-list/page.tsx
import { DataTable, extractColumns } from '@kui-framework/forms';
import { extractFiltersFromSchema } from '@kui-framework/core';
import { userSchema } from '../schemas/user.schema';

export default function UsersListPage() {
  // Gerar colunas automaticamente
  const columns = extractColumns(userSchema, {
    include: ['nome', 'email', 'ativo', 'dataNascimento'],
    overrides: {
      ativo: {
        render: (value) => (
          <Badge variant={value ? 'default' : 'secondary'}>
            {value ? 'Ativo' : 'Inativo'}
          </Badge>
        )
      }
    }
  });

  // Gerar filtros automaticamente
  const filters = extractFiltersFromSchema(userSchema, {
    include: ['nome', 'email', 'ativo'],
    overrides: {
      ativo: {
        type: 'select',
        options: [
          { label: 'Ativo', value: true },
          { label: 'Inativo', value: false },
        ]
      }
    }
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Lista de Usuários</h1>
      
      <DataTable
        providerName="userProvider"
        columns={columns}
        filters={filters}
        enableSearch
        enableViews
        initialView="table"
        pageSize={10}
        enableUrlState
        actions={(user, context) => (
          <>
            <Button size="sm" onClick={() => editUser(user)}>
              Editar
            </Button>
            <Button 
              size="sm" 
              variant="destructive"
              onClick={() => context.optimisticRemove(user.id)}
            >
              Excluir
            </Button>
          </>
        )}
      />
    </div>
  );
}
```

## 🎨 Primeiros Componentes

### 1. Usar Componentes Básicos

```tsx
import { Button, Input, Card, Badge } from '@kui-framework/ui';

export function ExampleComponents() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Componentes Básicos</h2>
      
      <div className="space-y-4">
        <Input placeholder="Digite algo..." />
        
        <div className="flex gap-2">
          <Button>Primário</Button>
          <Button variant="secondary">Secundário</Button>
          <Button variant="outline">Outline</Button>
        </div>
        
        <div className="flex gap-2">
          <Badge>Sucesso</Badge>
          <Badge variant="secondary">Info</Badge>
          <Badge variant="destructive">Erro</Badge>
        </div>
      </div>
    </Card>
  );
}
```

### 2. Usar Sistema de Elevação

```tsx
import { Card } from '@kui-framework/ui';

export function ElevationExample() {
  return (
    <div className="space-y-4">
      <Card elevation="none" className="p-4">
        Sem elevação
      </Card>
      
      <Card elevation="sm" className="p-4">
        Elevação pequena
      </Card>
      
      <Card elevation="md" className="p-4">
        Elevação média
      </Card>
      
      <Card elevation="lg" className="p-4">
        Elevação grande
      </Card>
    </div>
  );
}
```

## 🔧 Configurações Avançadas

### 1. Provider REST

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

### 2. Provider tRPC

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

### 3. Registrar Providers

```tsx
// app/providers.tsx
import { KuiDataProvider } from '@kui-framework/core';
import { userProvider } from './providers/rest-provider';
import { userTrpcProvider } from './providers/trpc-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <KuiDataProvider
      providers={[
        userProvider,
        userTrpcProvider,
      ]}
    >
      {children}
    </KuiDataProvider>
  );
}
```

## 🎯 Próximos Passos

1. **[Exemplos Práticos](./examples/README.md)** - Veja casos de uso reais
2. **[Componentes](./components/README.md)** - Explore todos os componentes
3. **[Formulários](./forms/README.md)** - Aprenda sobre os 18 tipos de campos
4. **[DataTable](./datatable.md)** - Sistema de visualização de dados
5. **[Showcase](../examples/kui-showcase/)** - Demonstração interativa

## 🆘 Precisa de Ajuda?

- **[FAQ](./guides/faq.md)** - Perguntas frequentes
- **[Troubleshooting](./guides/troubleshooting.md)** - Solução de problemas
- **[Contribuindo](./contributing.md)** - Como contribuir
- **[GitHub Issues](https://github.com/kennyjsa/kui/issues)** - Reportar bugs

---

**🎉 Parabéns!** Você configurou o KUI Framework com sucesso. Agora explore os [exemplos](./examples/README.md) e o [showcase](../examples/kui-showcase/) para ver tudo em ação!
