# 🔌 Integrações - Backend e APIs

O KUI Framework oferece integração completa com diferentes tipos de backend e APIs.

## 🚀 Características

- ✅ **tRPC**: Type-safe APIs end-to-end
- ✅ **REST**: Integração com APIs REST
- ✅ **GraphQL**: Suporte a GraphQL (em desenvolvimento)
- ✅ **Real-time**: WebSockets e Server-Sent Events
- ✅ **Cache**: React Query integrado
- ✅ **Type Safety**: TypeScript completo

## 📦 Instalação

```bash
pnpm add @kui-framework/core @tanstack/react-query
```

## 🎯 tRPC Integration

### 1. Configurar tRPC

```typescript
// lib/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../server/routers/_app';

export const trpc = createTRPCReact<AppRouter>();
```

### 2. Provider tRPC

```tsx
// app/providers.tsx
import { trpc } from '../lib/trpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
```

### 3. Router Backend

```typescript
// server/routers/user.router.ts
import { createDataTableRouter } from '@kui-framework/core';

export const userRouter = createTRPCRouter({
  list: createDataTableRouter({
    procedure: publicProcedure,
    handler: async (input) => {
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
  
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await db.user.findUnique({
        where: { id: input.id }
      });
    }),
    
  create: publicProcedure
    .input(userSchema)
    .mutation(async ({ input }) => {
      return await db.user.create({ data: input });
    }),
    
  update: publicProcedure
    .input(z.object({ id: z.string() }).merge(userSchema.partial()))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return await db.user.update({
        where: { id },
        data
      });
    }),
    
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await db.user.delete({
        where: { id: input.id }
      });
    }),
});
```

### 4. Provider KUI

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

### 5. Uso no Frontend

```tsx
// app/users/page.tsx
import { DataTable } from '@kui-framework/forms';
import { userTrpcProvider } from '../providers/trpc-provider';

export default function UsersPage() {
  return (
    <DataTable
      providerName="userProvider"
      columns={columns}
      filters={filters}
      enableSearch
      enableViews
      initialView="table"
      pageSize={10}
      enableUrlState
    />
  );
}
```

## 🌐 REST Integration

### 1. Configurar REST Provider

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
  headers: {
    'Authorization': 'Bearer token',
    'Content-Type': 'application/json',
  },
});
```

### 2. Backend REST

```typescript
// server/routes/users.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const page = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || 10;
  const search = searchParams.get('search');
  const sortBy = searchParams.get('sortBy');
  const sortOrder = searchParams.get('sortOrder') || 'asc';
  const filters = JSON.parse(searchParams.get('filters') || '[]');
  
  const where = buildWhereClause(filters, search);
  const orderBy = sortBy ? { [sortBy]: sortOrder } : undefined;
  
  const [data, total] = await Promise.all([
    db.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where,
      orderBy,
    }),
    db.user.count({ where }),
  ]);
  
  return Response.json({
    data,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  });
}
```

### 3. Uso no Frontend

```tsx
// app/users/page.tsx
import { DataTable } from '@kui-framework/forms';
import { userProvider } from '../providers/rest-provider';

export default function UsersPage() {
  return (
    <DataTable
      providerName="userProvider"
      columns={columns}
      filters={filters}
      enableSearch
      enableViews
      initialView="table"
      pageSize={10}
      enableUrlState
    />
  );
}
```

## 🔄 Real-time Updates

### 1. WebSocket Integration

```typescript
// providers/websocket-provider.ts
import { createWebSocketProvider } from '@kui-framework/core';

export const userWebSocketProvider = createWebSocketProvider({
  name: 'userProvider',
  url: 'ws://localhost:3001',
  events: {
    'user:created': (data) => {
      // Atualizar cache
      queryClient.invalidateQueries(['userProvider', 'list']);
    },
    'user:updated': (data) => {
      // Atualizar item específico
      queryClient.setQueryData(['userProvider', 'get', data.id], data);
    },
    'user:deleted': (data) => {
      // Remover item do cache
      queryClient.setQueryData(['userProvider', 'list'], (old: any) => ({
        ...old,
        data: old.data.filter((item: any) => item.id !== data.id)
      }));
    },
  },
});
```

### 2. Server-Sent Events

```typescript
// providers/sse-provider.ts
import { createSSEProvider } from '@kui-framework/core';

export const userSSEProvider = createSSEProvider({
  name: 'userProvider',
  url: '/api/users/events',
  events: {
    'user:created': (data) => {
      queryClient.invalidateQueries(['userProvider', 'list']);
    },
  },
});
```

## 🎯 Formulários com Integração

### 1. FormBuilder com Provider

```tsx
// app/users/form/page.tsx
import { FormBuilder } from '@kui-framework/forms';
import { userSchema } from '../schemas/user.schema';

export default function UserForm() {
  return (
    <FormBuilder
      schema={userSchema}
      mode="create"
      provider="userProvider"
      onSubmit={async (data) => {
        // Salvamento automático via provider
        console.log('Usuário criado:', data);
      }}
    />
  );
}
```

### 2. Formulário com tRPC

```tsx
// app/users/edit/[id]/page.tsx
import { FormBuilder } from '@kui-framework/forms';
import { userSchema } from '../../schemas/user.schema';
import { trpc } from '../../../lib/trpc';

export default function EditUserPage({ params }: { params: { id: string } }) {
  const { data: user, isLoading } = trpc.user.getById.useQuery({ id: params.id });
  
  if (isLoading) return <div>Carregando...</div>;
  
  return (
    <FormBuilder
      schema={userSchema}
      mode="edit"
      initialData={user}
      onSubmit={async (data) => {
        await trpc.user.update.mutate({ id: params.id, ...data });
      }}
    />
  );
}
```

## 🔧 Cache e Performance

### 1. React Query Config

```typescript
// lib/query-client.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      cacheTime: 10 * 60 * 1000, // 10 minutos
      refetchOnWindowFocus: false,
    },
  },
});
```

### 2. Optimistic Updates

```tsx
// app/users/page.tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function UsersPage() {
  const queryClient = useQueryClient();
  
  const deleteUser = useMutation({
    mutationFn: (id: string) => trpc.user.delete.mutate({ id }),
    onMutate: async (id) => {
      // Cancelar queries em andamento
      await queryClient.cancelQueries(['userProvider', 'list']);
      
      // Snapshot do cache
      const previousData = queryClient.getQueryData(['userProvider', 'list']);
      
      // Update otimista
      queryClient.setQueryData(['userProvider', 'list'], (old: any) => ({
        ...old,
        data: old.data.filter((item: any) => item.id !== id)
      }));
      
      return { previousData };
    },
    onError: (err, id, context) => {
      // Rollback em caso de erro
      queryClient.setQueryData(['userProvider', 'list'], context?.previousData);
    },
    onSettled: () => {
      // Refetch para garantir consistência
      queryClient.invalidateQueries(['userProvider', 'list']);
    },
  });
  
  return (
    <DataTable
      providerName="userProvider"
      columns={columns}
      actions={(user) => (
        <Button 
          variant="destructive"
          onClick={() => deleteUser.mutate(user.id)}
        >
          Excluir
        </Button>
      )}
    />
  );
}
```

## 🚀 Exemplos Completos

Veja exemplos completos no [Showcase](../examples/kui-showcase/):

- **[tRPC Integration](../examples/kui-showcase/src/app/with-trpc/page.tsx)**
- **[REST Integration](../examples/kui-showcase/src/app/with-rest/page.tsx)**
- **[Formulários com tRPC](../examples/kui-showcase/src/app/forms/with-trpc/page.tsx)**

## 🆘 Troubleshooting

### Problemas Comuns

1. **Provider não encontrado**
   ```tsx
   // Certifique-se de registrar o provider
   <KuiDataProvider providers={[userProvider]}>
   ```

2. **tRPC não funciona**
   ```tsx
   // Verifique se o router está configurado
   export const appRouter = createTRPCRouter({
     user: userRouter,
   });
   ```

3. **REST não funciona**
   ```tsx
   // Verifique se a URL está correta
   baseUrl: 'https://api.example.com'
   ```

### Debug

```tsx
// Adicione logs para debug
const { data, isLoading, error } = trpc.user.getAll.useQuery();
console.log('Data:', data);
console.log('Loading:', isLoading);
console.log('Error:', error);
```

---

**🎉 Pronto!** Agora você tem integração completa com backend. Explore os [exemplos](../examples/kui-showcase/) para ver mais casos de uso!
