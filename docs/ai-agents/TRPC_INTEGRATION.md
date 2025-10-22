# ⚡ KUI Framework - Integração com tRPC

> Guia completo para integrar o KUI Framework com tRPC (type-safe APIs).

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Configuração Básica](#configuração-básica)
3. [Setup tRPC](#setup-trpc)
4. [Provider tRPC](#provider-trpc)
5. [Routers](#routers)
6. [CRUD Completo](#crud-completo)
7. [Relacionamentos](#relacionamentos)
8. [Casos Avançados](#casos-avançados)

---

## Visão Geral

tRPC fornece APIs type-safe sem necessidade de gerar código. Perfeito para monorepos e apps Next.js/React.

**Vantagens:**
- ✅ Type-safety completa (frontend ↔ backend)
- ✅ Auto-complete no editor
- ✅ Sem geração de código
- ✅ Integração natural com KUI
- ✅ Validação com Zod

---

## Configuração Básica

### 1. Instalar Pacotes

```bash
pnpm add @trpc/server @trpc/client @trpc/react-query @trpc/next @tanstack/react-query zod
pnpm add @kui-framework/core @kui-framework/forms @kui-framework/zod-extension
```

### 2. Estrutura de Pastas

```
src/
  server/
    trpc.ts                 # Configuração tRPC
    routers/
      _app.ts               # Router principal
      user.ts               # Router de usuários
      product.ts            # Router de produtos
  lib/
    trpc.ts                 # Cliente tRPC (frontend)
  providers/
    TrpcProvider.tsx        # React Query Provider
    userTrpcProvider.ts     # KUI Provider para users
  app/
    api/
      trpc/
        [trpc]/
          route.ts          # Handler Next.js App Router
```

---

## Setup tRPC

### 1. Configurar tRPC Server

```typescript
// src/server/trpc.ts
import { initTRPC } from '@trpc/server';
import { z } from 'zod';

// Contexto (pode incluir auth, db, etc)
export const createTRPCContext = async (opts: any) => {
  return {
    // session: await getSession(opts),
    // db: prisma,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
```

### 2. Criar Router de Usuários

```typescript
// src/server/routers/user.ts
import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

// Simular banco de dados
const users = [
  { id: 1, name: 'João', email: 'joao@example.com', role: 'admin' },
  { id: 2, name: 'Maria', email: 'maria@example.com', role: 'user' },
];

let nextId = 3;

export const userRouter = router({
  // List - listar todos
  getAll: publicProcedure
    .input(z.object({
      page: z.number().optional(),
      pageSize: z.number().optional(),
    }).optional())
    .query(async ({ input }) => {
      const page = input?.page || 1;
      const pageSize = input?.pageSize || 10;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      
      return {
        data: users.slice(start, end),
        total: users.length,
      };
    }),
  
  // Get - buscar por ID
  getById: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      const user = users.find(u => u.id === input);
      if (!user) throw new Error('User not found');
      return user;
    }),
  
  // Create - criar novo
  create: publicProcedure
    .input(z.object({
      name: z.string(),
      email: z.string().email(),
      role: z.enum(['admin', 'user', 'guest']),
    }))
    .mutation(async ({ input }) => {
      const newUser = { id: nextId++, ...input };
      users.push(newUser);
      return newUser;
    }),
  
  // Update - atualizar
  update: publicProcedure
    .input(z.object({
      id: z.number(),
      data: z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        role: z.enum(['admin', 'user', 'guest']).optional(),
      }),
    }))
    .mutation(async ({ input }) => {
      const index = users.findIndex(u => u.id === input.id);
      if (index === -1) throw new Error('User not found');
      
      users[index] = { ...users[index], ...input.data };
      return users[index];
    }),
  
  // Delete - excluir
  delete: publicProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const index = users.findIndex(u => u.id === input);
      if (index === -1) throw new Error('User not found');
      
      users.splice(index, 1);
      return { success: true };
    }),
});
```

### 3. Router Principal

```typescript
// src/server/routers/_app.ts
import { router } from '../trpc';
import { userRouter } from './user';
import { productRouter } from './product';

export const appRouter = router({
  user: userRouter,
  product: productRouter,
});

export type AppRouter = typeof appRouter;
```

### 4. Handler Next.js (App Router)

```typescript
// src/app/api/trpc/[trpc]/route.ts
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server/routers/_app';
import { createTRPCContext } from '@/server/trpc';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: createTRPCContext,
  });

export { handler as GET, handler as POST };
```

### 5. Cliente tRPC (Frontend)

```typescript
// src/lib/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server/routers/_app';

export const trpc = createTRPCReact<AppRouter>();
```

### 6. Provider React Query + tRPC

```tsx
// src/providers/TrpcProvider.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { trpc } from '@/lib/trpc';

export function TrpcProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: '/api/trpc',
          // Headers para autenticação
          headers() {
            return {
              authorization: getAuthToken(),
            };
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}

function getAuthToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken') || '';
  }
  return '';
}
```

---

## Provider tRPC

### Criar KUI Provider para tRPC

```typescript
// src/providers/userTrpcProvider.ts
import { createTrpcProvider } from '@kui-framework/core';
import { trpc } from '@/lib/trpc';

export const userTrpcProvider = createTrpcProvider({
  name: 'userProvider',
  router: trpc.user, // Router do tRPC
  procedures: {
    list: 'getAll',
    get: 'getById',
    create: 'create',
    update: 'update',
    delete: 'delete',
  },
});
```

### Registrar Providers

```tsx
// src/app/layout.tsx
'use client';

import { TrpcProvider } from '@/providers/TrpcProvider';
import { KuiDataProvider } from '@kui-framework/core';
import { userTrpcProvider } from '@/providers/userTrpcProvider';

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html>
      <body>
        {/* Provider tRPC (React Query) */}
        <TrpcProvider>
          {/* Provider KUI */}
          <KuiDataProvider providers={[
            { name: 'userProvider', provider: userTrpcProvider }
          ]}>
            {children}
          </KuiDataProvider>
        </TrpcProvider>
      </body>
    </html>
  );
}
```

---

## CRUD Completo

### Schema

```typescript
// src/schemas/user.schema.ts
import { zKUI } from "@kui-framework/zod-extension";

export const userSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  name: zKUI.text("Nome", { required: true }),
  email: zKUI.email("E-mail", { required: true }),
  role: zKUI.select("Perfil", ["admin", "user", "guest"], {
    required: true,
  }),
  active: zKUI.switch("Ativo"),
});

export type User = typeof userSchema._type;
```

### Create

```tsx
// src/app/users/create/page.tsx
'use client';

import { FormBuilder } from "@kui-framework/forms";
import { userSchema } from "@/schemas/user.schema";
import { userTrpcProvider } from "@/providers/userTrpcProvider";
import { useRouter } from "next/navigation";

export default function CreateUserPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      await userTrpcProvider.create(data);
      alert("Usuário criado com sucesso!");
      router.push("/users");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar usuário");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Criar Usuário</h1>
      <FormBuilder
        schema={userSchema}
        mode="create"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
```

### Edit

```tsx
// src/app/users/[id]/edit/page.tsx
'use client';

import { FormBuilder } from "@kui-framework/forms";
import { userSchema } from "@/schemas/user.schema";
import { userTrpcProvider } from "@/providers/userTrpcProvider";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditUserPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const userId = Number(params.id);

  useEffect(() => {
    userTrpcProvider.get(userId)
      .then(setUser)
      .catch(err => console.error(err));
  }, [userId]);

  const handleSubmit = async (data: any) => {
    try {
      await userTrpcProvider.update(userId, data);
      alert("Usuário atualizado com sucesso!");
      router.push("/users");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar usuário");
    }
  };

  if (!user) return <div>Carregando...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Usuário</h1>
      <FormBuilder
        schema={userSchema}
        mode="edit"
        defaultValues={user}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
```

### List

```tsx
// src/app/users/page.tsx
'use client';

import { trpc } from "@/lib/trpc";
import Link from "next/link";

export default function UsersPage() {
  // Usar tRPC diretamente para listagem
  const { data, isLoading } = trpc.user.getAll.useQuery({ 
    page: 1, 
    pageSize: 10 
  });

  if (isLoading) return <div>Carregando...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Usuários</h1>
        <Link 
          href="/users/create"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Novo Usuário
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Nome</th>
              <th className="px-6 py-3 text-left">E-mail</th>
              <th className="px-6 py-3 text-left">Perfil</th>
              <th className="px-6 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4 text-right">
                  <Link 
                    href={`/users/${user.id}/edit`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

---

## Relacionamentos

### Schema com Relação

```typescript
// src/schemas/post.schema.ts
import { zKUI } from "@kui-framework/zod-extension";

export const postSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  title: zKUI.text("Título", { required: true }),
  content: zKUI.textarea("Conteúdo", { required: true }),
  
  // Relacionamento N:1 com usuário
  authorId: zKUI.relation("Autor", {
    relation: "user",
    provider: "userProvider",
    displayField: "name",
    valueField: "id",
    required: true,
  }),
});
```

### Router com Relação

```typescript
// src/server/routers/post.ts
import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

export const postRouter = router({
  getAll: publicProcedure
    .input(z.object({
      authorId: z.number().optional(), // Filtrar por autor
    }).optional())
    .query(async ({ input }) => {
      let posts = allPosts;
      
      if (input?.authorId) {
        posts = posts.filter(p => p.authorId === input.authorId);
      }
      
      return {
        data: posts,
        total: posts.length,
      };
    }),
  
  // ... outros métodos
});
```

---

## Casos Avançados

### Autenticação

```typescript
// src/server/trpc.ts
import { initTRPC, TRPCError } from '@trpc/server';

const t = initTRPC.context<Context>().create();

// Middleware de autenticação
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);

// Usar em routers
export const userRouter = router({
  create: protectedProcedure // apenas autenticados
    .input(userSchema)
    .mutation(async ({ input, ctx }) => {
      // ctx.session.user está disponível
      // ...
    }),
});
```

### Prisma Integration

```typescript
// src/server/routers/user.ts
import { router, publicProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';

export const userRouter = router({
  getAll: publicProcedure
    .input(z.object({
      page: z.number().optional(),
      pageSize: z.number().optional(),
    }).optional())
    .query(async ({ input }) => {
      const page = input?.page || 1;
      const pageSize = input?.pageSize || 10;
      
      const [data, total] = await Promise.all([
        prisma.user.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
        }),
        prisma.user.count(),
      ]);
      
      return { data, total };
    }),
  
  create: publicProcedure
    .input(userSchema)
    .mutation(async ({ input }) => {
      return await prisma.user.create({
        data: input,
      });
    }),
  
  // ... outros
});
```

### Subscriptions (Real-time)

```typescript
import { observable } from '@trpc/server/observable';

export const chatRouter = router({
  onMessage: publicProcedure
    .subscription(() => {
      return observable<Message>((emit) => {
        const onMessage = (message: Message) => {
          emit.next(message);
        };
        
        eventEmitter.on('message', onMessage);
        
        return () => {
          eventEmitter.off('message', onMessage);
        };
      });
    }),
});

// Cliente
const { data } = trpc.chat.onMessage.useSubscription();
```

---

## ✅ Checklist para Integração tRPC

- [ ] tRPC instalado e configurado
- [ ] Routers criados com procedures CRUD
- [ ] Cliente tRPC configurado
- [ ] TrpcProvider (React Query) configurado
- [ ] KUI Provider criado com `createTrpcProvider`
- [ ] Providers registrados (TrpcProvider + KuiDataProvider)
- [ ] Rotas Next.js configuradas
- [ ] Type-safety funcionando (autocomplete)
- [ ] Testado: list, get, create, update, delete

---

## 📖 Próximos Passos

- Ver [AGENT_GUIDE.md](./AGENT_GUIDE.md) - Guia rápido
- Ver [REST_INTEGRATION.md](./REST_INTEGRATION.md) - Integração REST
- Ver exemplo completo: `/examples/person-addresses`

---

## 💡 Dicas

1. **Type-safety é automático:** Não precisa gerar tipos manualmente
2. **Use Zod:** Validação no backend e frontend com mesmo schema
3. **React Query:** tRPC usa por baixo, aproveite features (cache, refetch, etc)
4. **Procedures vs Mutations:** Use `query` para leitura, `mutation` para escrita
5. **Batching:** tRPC agrupa requisições automaticamente
6. **DevTools:** Instale React Query DevTools para debug

