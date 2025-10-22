# 🌐 KUI Framework - Integração com REST API

> Guia completo para integrar o KUI Framework com APIs REST.

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Configuração Básica](#configuração-básica)
3. [Provider REST](#provider-rest)
4. [CRUD Completo](#crud-completo)
5. [Autenticação](#autenticação)
6. [Transformações](#transformações)
7. [Tratamento de Erros](#tratamento-de-erros)
8. [Casos Avançados](#casos-avançados)

---

## Visão Geral

O KUI fornece `createRestProvider` para integração com APIs REST seguindo padrões RESTful.

**Recursos:**
- ✅ CRUD completo (list, get, create, update, delete)
- ✅ Autenticação via headers
- ✅ Transformação de dados (API ↔ Form)
- ✅ Paginação automática
- ✅ Tratamento de erros
- ✅ TypeScript type-safe

---

## Configuração Básica

### 1. Instalar Pacotes

```bash
pnpm add @kui-framework/core @kui-framework/forms @kui-framework/zod-extension
```

### 2. Criar Provider

```typescript
// src/providers/userProvider.ts
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

### 3. Registrar Provider

```tsx
// src/app/layout.tsx
import { KuiDataProvider } from '@kui-framework/core';
import { userProvider } from '@/providers/userProvider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <KuiDataProvider providers={[
          { name: 'userProvider', provider: userProvider }
        ]}>
          {children}
        </KuiDataProvider>
      </body>
    </html>
  );
}
```

---

## Provider REST

### Configuração Completa

```typescript
import { createRestProvider } from '@kui-framework/core';

export const userProvider = createRestProvider({
  // Nome único do provider
  name: 'userProvider',
  
  // URL base da API
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  
  // Endpoints REST
  endpoints: {
    list: '/api/users',              // GET com query params
    get: '/api/users/:id',            // GET por ID
    create: '/api/users',             // POST
    update: '/api/users/:id',         // PUT ou PATCH
    delete: '/api/users/:id',         // DELETE
  },
  
  // Headers (pode ser objeto ou função)
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  
  // Ou headers dinâmicos
  headers: () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
  }),
  
  // Transformar resposta da API para o form
  transformResponse: (data) => {
    // Se API retorna { user: {...} }
    return data.user || data;
  },
  
  // Transformar dados do form para a API
  transformRequest: (data) => {
    // Remover campos que a API não aceita
    const { createdAt, updatedAt, ...apiData } = data;
    return apiData;
  },
});
```

### Endpoints com Parâmetros

Use `:param` para parâmetros dinâmicos:

```typescript
endpoints: {
  get: '/api/users/:id',           // /api/users/123
  update: '/api/users/:id',        // /api/users/123
  delete: '/api/users/:id',        // /api/users/123
  
  // Múltiplos parâmetros
  getTeamMember: '/api/teams/:teamId/members/:memberId',
}
```

---

## CRUD Completo

### List (Listagem com Paginação)

```typescript
// Listar com paginação
const response = await userProvider.list({
  page: 1,
  pageSize: 10,
});

// Resposta esperada:
// {
//   data: User[],
//   total: number
// }

console.log(response.data);   // Array de usuários
console.log(response.total);  // Total de registros
```

**Request enviado:**
```
GET /api/users?page=1&pageSize=10
```

**Response esperado:**
```json
{
  "data": [
    { "id": 1, "name": "João", ... },
    { "id": 2, "name": "Maria", ... }
  ],
  "total": 50
}
```

### Get (Buscar por ID)

```typescript
const user = await userProvider.get(123);
console.log(user); // { id: 123, name: "João", ... }
```

**Request enviado:**
```
GET /api/users/123
```

**Response esperado:**
```json
{
  "id": 123,
  "name": "João",
  "email": "joao@example.com"
}
```

### Create (Criar)

```typescript
const newUser = await userProvider.create({
  name: "João Silva",
  email: "joao@example.com",
  role: "user",
});

console.log(newUser); // { id: 456, name: "João Silva", ... }
```

**Request enviado:**
```
POST /api/users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "role": "user"
}
```

**Response esperado:**
```json
{
  "id": 456,
  "name": "João Silva",
  "email": "joao@example.com",
  "role": "user",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Update (Atualizar)

```typescript
const updatedUser = await userProvider.update(123, {
  name: "João Silva Atualizado",
  email: "joao.novo@example.com",
});

console.log(updatedUser); // { id: 123, name: "João Silva Atualizado", ... }
```

**Request enviado:**
```
PUT /api/users/123
Content-Type: application/json

{
  "name": "João Silva Atualizado",
  "email": "joao.novo@example.com"
}
```

### Delete (Excluir)

```typescript
await userProvider.delete(123);
// Retorna void ou { success: true }
```

**Request enviado:**
```
DELETE /api/users/123
```

**Response esperado:**
```
204 No Content

// ou

{
  "success": true
}
```

---

## Autenticação

### Token Bearer

```typescript
export const userProvider = createRestProvider({
  name: 'userProvider',
  baseUrl: 'https://api.example.com',
  endpoints: { /* ... */ },
  
  // Headers dinâmicos para incluir token
  headers: () => {
    const token = getAuthToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  },
});

// Função para obter token
function getAuthToken(): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken') || '';
  }
  return '';
}
```

### API Key

```typescript
headers: {
  'Content-Type': 'application/json',
  'X-API-Key': process.env.NEXT_PUBLIC_API_KEY,
}
```

### Cookies

Se sua API usa cookies para auth, eles são enviados automaticamente se configurado CORS corretamente:

```typescript
// No servidor (backend)
// Configurar CORS para aceitar credentials
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// No provider (frontend)
// Fetch envia cookies automaticamente para same-origin
// Para cross-origin, configure:
credentials: 'include',
```

---

## Transformações

### Transformar Resposta (API → Form)

Quando a API retorna dados em formato diferente do esperado:

```typescript
transformResponse: (data) => {
  // API retorna: { success: true, user: {...} }
  // Form espera: {...}
  
  if (data.user) {
    return data.user;
  }
  
  // API retorna array direto, mas esperamos { data, total }
  if (Array.isArray(data)) {
    return {
      data: data,
      total: data.length,
    };
  }
  
  return data;
}
```

### Transformar Request (Form → API)

Quando a API espera dados em formato diferente:

```typescript
transformRequest: (data) => {
  // Remover campos readonly que a API não aceita
  const { id, createdAt, updatedAt, ...apiData } = data;
  
  // Transformar formato de data
  if (apiData.birthDate) {
    apiData.birthDate = new Date(apiData.birthDate).toISOString();
  }
  
  // Encapsular em objeto se API espera
  return {
    user: apiData,
  };
}
```

### Exemplo Completo

```typescript
export const productProvider = createRestProvider({
  name: 'productProvider',
  baseUrl: 'https://api.example.com',
  endpoints: {
    list: '/products',
    get: '/products/:id',
    create: '/products',
    update: '/products/:id',
    delete: '/products/:id',
  },
  
  transformResponse: (data, operation) => {
    // Diferentes transformações por operação
    if (operation === 'list') {
      // API retorna: { items: [...], count: 10 }
      // Precisamos: { data: [...], total: 10 }
      return {
        data: data.items,
        total: data.count,
      };
    }
    
    if (operation === 'get') {
      // API retorna: { product: {...} }
      // Precisamos: {...}
      return data.product;
    }
    
    return data;
  },
  
  transformRequest: (data, operation) => {
    if (operation === 'create' || operation === 'update') {
      // API espera: { product: {...} }
      // Enviamos: {...}
      return {
        product: data,
      };
    }
    
    return data;
  },
});
```

---

## Tratamento de Erros

### Try/Catch

```typescript
try {
  const user = await userProvider.get(123);
  console.log(user);
} catch (error) {
  console.error('Erro ao buscar usuário:', error);
  
  // Verificar tipo de erro
  if (error.status === 404) {
    alert('Usuário não encontrado');
  } else if (error.status === 401) {
    // Redirecionar para login
    router.push('/login');
  } else {
    alert('Erro ao buscar usuário');
  }
}
```

### Error Handling Global

```typescript
// src/lib/errorHandler.ts
export function handleApiError(error: any) {
  if (error.status === 401) {
    // Token expirado - redirecionar para login
    window.location.href = '/login';
    return;
  }
  
  if (error.status === 403) {
    alert('Você não tem permissão para esta ação');
    return;
  }
  
  if (error.status === 404) {
    alert('Recurso não encontrado');
    return;
  }
  
  if (error.status === 422) {
    // Erro de validação
    alert('Dados inválidos: ' + error.message);
    return;
  }
  
  if (error.status >= 500) {
    alert('Erro no servidor. Tente novamente mais tarde.');
    return;
  }
  
  alert('Erro desconhecido: ' + error.message);
}

// Uso
try {
  await userProvider.create(data);
} catch (error) {
  handleApiError(error);
}
```

---

## Casos Avançados

### Query Parameters Customizados

```typescript
// Provider padrão usa page e pageSize
const response = await userProvider.list({ page: 1, pageSize: 10 });

// Para query params customizados, estenda o provider
const customProvider = createRestProvider({
  name: 'customProvider',
  baseUrl: 'https://api.example.com',
  endpoints: {
    list: '/users',
  },
  
  // Customizar query params
  buildListUrl: (baseUrl, params) => {
    const url = new URL(baseUrl);
    if (params.page) url.searchParams.set('offset', String((params.page - 1) * params.pageSize));
    if (params.pageSize) url.searchParams.set('limit', String(params.pageSize));
    if (params.search) url.searchParams.set('q', params.search);
    if (params.filter) url.searchParams.set('filter', params.filter);
    return url.toString();
  },
});
```

### Múltiplos Providers

```tsx
import { userProvider } from '@/providers/userProvider';
import { productProvider } from '@/providers/productProvider';
import { categoryProvider } from '@/providers/categoryProvider';

export function AppProviders({ children }) {
  return (
    <KuiDataProvider providers={[
      { name: 'userProvider', provider: userProvider },
      { name: 'productProvider', provider: productProvider },
      { name: 'categoryProvider', provider: categoryProvider },
    ]}>
      {children}
    </KuiDataProvider>
  );
}
```

### Provider por Ambiente

```typescript
// src/providers/userProvider.ts
const API_URL = {
  development: 'http://localhost:3000',
  staging: 'https://staging-api.example.com',
  production: 'https://api.example.com',
};

const environment = process.env.NODE_ENV || 'development';

export const userProvider = createRestProvider({
  name: 'userProvider',
  baseUrl: API_URL[environment],
  endpoints: { /* ... */ },
});
```

### Timeout e Retry

```typescript
// Wrapper para adicionar timeout e retry
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries: number = 3,
  timeout: number = 5000
) {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) return response;
      if (response.status < 500) throw new Error('Client error');
      // Retry em erros 5xx
    } catch (error) {
      if (i === retries - 1) throw error;
      // Esperar antes de retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
}
```

---

## ✅ Checklist para Integração REST

- [ ] Provider criado com `createRestProvider`
- [ ] baseUrl configurado (preferencialmente com env var)
- [ ] Endpoints mapeados corretamente
- [ ] Headers de autenticação configurados (se necessário)
- [ ] Provider registrado no `KuiDataProvider`
- [ ] Transformações implementadas (se API tem formato diferente)
- [ ] Tratamento de erros implementado
- [ ] Testado: list, get, create, update, delete

---

## 📖 Próximos Passos

- Ver [AGENT_GUIDE.md](./AGENT_GUIDE.md) - Guia rápido
- Ver [TRPC_INTEGRATION.md](./TRPC_INTEGRATION.md) - Integração tRPC
- Ver exemplos: `/examples/ai-examples/07-with-rest-provider.tsx`

