# @kui/core

Core KUI Framework - Providers, registry e integração com backends (REST/tRPC).

## 📦 Instalação

```bash
npm install @kui/core @kui/zod-extension
# or
pnpm add @kui/core @kui/zod-extension
```

## 🚀 Uso Básico

### Provider REST

```typescript
import { createRestProvider, KuiDataProvider } from '@kui/core';

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

export function App() {
  return (
    <KuiDataProvider providers={[{ name: 'userProvider', provider: userProvider }]}>
      {/* Seus componentes aqui */}
    </KuiDataProvider>
  );
}
```

### Provider tRPC

```typescript
import { createTrpcProvider } from '@kui/core';
import { trpc } from './lib/trpc';

const userTrpcProvider = createTrpcProvider({
  name: 'userTrpcProvider',
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

## 🎯 Features

- ✅ **Interface DataProvider** unificada
- ✅ **createRestProvider** para APIs REST
- ✅ **createTrpcProvider** para tRPC
- ✅ **Registry global** de providers
- ✅ **React Context** para acesso aos providers
- ✅ **Type-safe** com TypeScript

## 📖 API

### DataProvider

```typescript
interface DataProvider<T = any> {
  name: string;
  list: (params?: ListParams) => Promise<ListResponse<T>>;
  get: (id: string | number) => Promise<T>;
  create: (data: Partial<T>) => Promise<T>;
  update: (id: string | number, data: Partial<T>) => Promise<T>;
  delete: (id: string | number) => Promise<void>;
}
```

### Hooks

```typescript
// Obter provider registrado
const provider = useKuiProvider('userProvider');

// Usar provider
const users = await provider.list({ page: 1, pageSize: 10 });
const user = await provider.get(1);
const newUser = await provider.create({ name: 'João' });
```

## 📄 Licença

MIT © Kenny JSA
