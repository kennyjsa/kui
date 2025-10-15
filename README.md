# 🧩 KUI Framework

> **KUI (Kinetic UI Framework)** — Framework declarativo para construção de formulários, grids e CRUD em React com type-safety completo.

[![Version](https://img.shields.io/npm/v/@kui-framework/forms?label=version)](https://www.npmjs.com/package/@kui-framework/forms)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/kennyjsa/kui/blob/develop/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://www.typescriptlang.org/)

---

## ✨ Features

- 🎯 **Geração automática de UI** a partir de schemas Zod
- 🎨 **18 tipos de campos** prontos para uso
- 🔐 **Type-safety** completo end-to-end
- 🔄 **Integração backend** (REST e tRPC)
- 📱 **Responsivo** por padrão
- ♿ **Acessível** com Radix UI
- ⚡ **Performance** otimizada
- 🎭 **3 modos** (create, edit, view)
- 🎨 **Design System** completo
- 🔧 **Customizável** e extensível

---

## 📦 Instalação

```bash
npm install @kui-framework/forms @kui-framework/ui @kui-framework/core @kui-framework/zod-extension @kui-framework/theme
# ou
pnpm add @kui-framework/forms @kui-framework/ui @kui-framework/core @kui-framework/zod-extension @kui-framework/theme
# ou
yarn add @kui-framework/forms @kui-framework/ui @kui-framework/core @kui-framework/zod-extension @kui-framework/theme
```

### Setup Tailwind

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

---

## 🚀 Quick Start

### Desenvolvimento Local

```bash
# Clone o repositório
git clone https://github.com/kennyjsa/kui.git
cd kui

# Instalar dependências
pnpm install

# Build
pnpm build

# Executar showcase
cd examples/kui-showcase
pnpm dev
```

Acesse: http://localhost:3000

## 📖 Exemplos de Uso

### 1. Formulário com FormBuilder

```typescript
import { zKUI } from "@kui-framework/zod-extension";

const userSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  name: zKUI.text("Nome", { required: true }),
  email: zKUI.email("E-mail", { required: true }),
  age: zKUI.number("Idade", {
    derived: true,
    compute: (values) => calculateAge(values.birthDate)
  }),
});
```

```tsx
import { FormBuilder } from "@kui-framework/forms";

function UserForm() {
  return (
    <FormBuilder
      schema={userSchema}
      mode="create"
      onSubmit={async (data) => {
        console.log(data);
      }}
    />
  );
}
```

### 2. DataTable Multi-View

```tsx
import { DataTable, extractColumns } from "@kui-framework/forms";
import { extractFiltersFromSchema } from "@kui-framework/core";

function UsersPage() {
  // Gerar colunas e filtros automaticamente
  const columns = extractColumns(userSchema);
  const filters = extractFiltersFromSchema(userSchema);

  return (
    <DataTable
      providerName="userProvider"
      columns={columns}
      filters={filters}
      enableSearch
      enableViews
      initialView="table"
      enableUrlState
      actions={(user, context) => (
        <>
          <Button onClick={() => edit(user)}>Editar</Button>
          <Button 
            variant="destructive"
            onClick={() => context.optimisticRemove(user.id)}
          >
            Excluir
          </Button>
        </>
      )}
    />
  );
}
```

## 🎨 Componentes Disponíveis

### 📝 Formulários
- **FormBuilder**: Gerador automático de formulários
- **18 Tipos de Campos**: Text, email, number, date, select, etc.
- **Validação**: Zod validation integrada
- **Modos**: Create, Edit, View automáticos

### 📊 DataTable Multi-View
- **3 Modos de Visualização**: Table, Grid, List
- **Filtros Progressivos**: Busca global + filtros avançados com pills
- **URL State**: Compartilhar filtros e paginação
- **TanStack Table**: Integração com tabela profissional
- **Responsivo**: Mobile-first design
- **Performance**: Virtualização para listas grandes
- **Cache**: Optimistic updates e invalidation

### 🧩 UI Components
- **Inputs**: Text, email, password, number, currency
- **Seleção**: Select, radio, checkbox, switch
- **Layout**: Grid, sections, tabs, accordion
- **Feedback**: Toast, dialogs, loading states
- **Navegação**: Breadcrumbs, pagination

### 🎨 Design System
- **Temas**: Light, dark, custom
- **Variantes**: Primary, secondary, destructive
- **Tamanhos**: Small, medium, large
- **Responsivo**: Mobile-first design

## 🔌 Integrações

### REST API
```typescript
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
```

### tRPC
```typescript
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
```

## 📚 Documentação

- 📖 **[Guia de Início Rápido](./docs/getting-started.md)** - Configure em minutos
- 🧩 **[Componentes](./docs/components/)** - Documentação completa
- 📝 **[Formulários](./docs/forms/)** - Criação de formulários
- 🎨 **[Temas](./docs/theming/)** - Personalização
- 🔌 **[Integrações](./docs/integrations/)** - Backend e APIs
- 📚 **[Exemplos](./docs/examples/)** - Casos de uso reais

## 🏗️ Estrutura

```
kui/
├── packages/
│   ├── zod-extension/  → Extensões Zod
│   ├── core/           → Providers e registry
│   ├── theme/          → Design tokens
│   ├── ui/             → Componentes base
│   └── forms/          → Form builder + DataTable
├── examples/
│   └── kui-showcase/    → Showcase completo com todos os exemplos
└── docs/
    ├── ai-agents/        → Documentação para agentes de IA
    ├── components/       → Documentação de componentes
    ├── forms/           → Documentação de formulários
    ├── datatable.md     → Documentação do DataTable
    └── examples/        → Exemplos e casos de uso
```

## 🤖 Para Agentes de IA

Este framework possui **documentação otimizada para agentes de IA**!

📚 **[Acesse a documentação completa para IA →](./docs/ai-agents/)**

- [🚀 Guia Rápido](./docs/ai-agents/AGENT_GUIDE.md) - Comece aqui
- [📖 Padrões e Receitas](./docs/ai-agents/PATTERNS.md) - Exemplos completos
- [📋 Referência de Campos](./docs/ai-agents/FIELD_REFERENCE.md) - Todos os 18 campos
- [🌐 Integração REST](./docs/ai-agents/REST_INTEGRATION.md) - APIs REST
- [⚡ Integração tRPC](./docs/ai-agents/TRPC_INTEGRATION.md) - tRPC type-safe

**Showcase completo:** [`/examples/kui-showcase/`](./examples/kui-showcase/)

## 🌿 Branches

- `main` — Versão estável
- `develop` — Desenvolvimento principal
- `feature/*` — Novas funcionalidades
- `hotfix/*` — Correções urgentes

## 🛠️ Desenvolvimento

```bash
# Instalar dependências
pnpm install

# Build todos os pacotes
pnpm build

# Modo desenvolvimento (watch)
pnpm dev

# Lint
pnpm lint

# Format
pnpm format
```

## 📝 Conceitos

### Modos de Formulário

- **create**: Criação de novo registro
- **edit**: Edição de registro existente
- **view**: Visualização (readonly)

### 📋 Tipos de Campos (18)

**Básicos:**  
`identifier` • `text` • `number` • `date` • `email` • `password` • `boolean` • `select`

**Avançados:**  
`textarea` • `currency` • `checkbox` • `radio` • `switch` • `rating` • `color` • `file`

**Especiais:**  
`relation` (relacionamentos) • `grid` (sublistas 1:N)

### ⚙️ Opções Declarativas

**Visibilidade:**  
`hiddenIn` • `readOnly` • `readOnlyIn` • `showIf` (condicional)

**Validação:**  
`required` • `mask` • `.refine()` (cross-field)

**Comportamento:**  
`derived` (calculado) • `compute` (função) • `transient` (não persistido)

**Grid:**  
`pageSize` • `columns` • `allowCreate` • `allowEdit` • `allowDelete`

## 📄 Licença

MIT License - veja [LICENSE](LICENSE)

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

Desenvolvido com ❤️ usando React, TypeScript, Zod, Tailwind CSS
