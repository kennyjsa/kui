# KUI Framework Showcase

Este é o showcase completo do KUI Framework, demonstrando todos os componentes, recursos e funcionalidades disponíveis.

## 🚀 Funcionalidades Demonstradas

### 📊 Sistema de Visualização de Dados (DataTable)

- **Lista Básica de Usuários** (`/users-datatable`)
  - DataTable padrão com geração automática de colunas e filtros
  - URL state para compartilhar filtros e paginação
  - 3 modos de visualização: Table, Grid, List
  - Actions com optimistic updates

- **Lista Avançada de Usuários** (`/users-datatable-advanced`)
  - TanStack Table integration
  - Virtualização para listas grandes
  - Filtros avançados com pills
  - Cache invalidation e optimistic updates

### 🎨 Componentes UI

- **Componentes Básicos** (`/with-basic-components`)
- **Elevação** (`/with-elevation`)
- **Acessibilidade** (`/with-aria`)
- **Breadcrumbs** (`/with-breadcrumbs`)
- **Dialogs** (`/with-dialogs`)
- **Empty States** (`/with-empty-states`)
- **Grid Layout** (`/with-grid-layout`)
- **Loading States** (`/with-loading`)
- **Pagination** (`/with-pagination`)
- **Sections** (`/with-sections`)
- **Sidebar** (`/with-sidebar`)
- **Tabs** (`/with-tabs`)
- **Toast** (`/with-toast`)
- **tRPC Integration** (`/with-trpc`)

### 📝 Formulários

- **Formulários Simples** (`/forms/simple-forms`)
- **Formulários com Validação** (`/forms/validation-forms`)
- **Formulários com Campos Derivados** (`/forms/derived-fields`)
- **Formulários com Campos Condicionais** (`/forms/conditional-fields`)
- **Formulários com Grid** (`/forms/grid-forms`)
- **Formulários com REST Provider** (`/forms/rest-forms`)
- **Formulários com tRPC Provider** (`/forms/trpc-forms`)

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React
- **tRPC** - End-to-end typesafe APIs
- **TanStack Query** - Server state management
- **TanStack Table** - Headless table library
- **Zod** - Schema validation
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible components

## 🚀 Como Executar

```bash
# Instalar dependências
pnpm install

# Executar em modo desenvolvimento
pnpm dev

# Build para produção
pnpm build
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Páginas Next.js
│   ├── forms/             # Exemplos de formulários
│   ├── users-datatable/   # DataTable básico
│   ├── users-datatable-advanced/ # DataTable avançado
│   └── with-*/            # Exemplos de componentes
├── components/            # Componentes compartilhados
├── providers/            # Providers tRPC
├── schemas/              # Schemas Zod
└── server/               # Backend tRPC
```

## 🎯 Principais Recursos Demonstrados

### DataTable Multi-View
- ✅ 3 modos de visualização (Table/Grid/List)
- ✅ Filtros progressivos com pills
- ✅ URL state para compartilhar estado
- ✅ Responsividade mobile-first
- ✅ TanStack Table integration
- ✅ Virtualização para performance
- ✅ Optimistic updates
- ✅ Cache invalidation

### Formulários Declarativos
- ✅ Geração automática de campos
- ✅ Validação com Zod
- ✅ Campos derivados
- ✅ Campos condicionais
- ✅ Layout responsivo
- ✅ Integração tRPC/REST

### Componentes UI
- ✅ Design system consistente
- ✅ Acessibilidade (ARIA)
- ✅ Responsividade
- ✅ Temas e elevação
- ✅ Estados de loading/empty

## 📚 Documentação

- [Guia de Início Rápido](../../docs/getting-started.md)
- [Documentação do DataTable](../../docs/datatable.md)
- [Documentação de Formulários](../../docs/forms/README.md)
- [Guia de Componentes](../../docs/components/README.md)

## 🤝 Contribuindo

Veja [CONTRIBUTING.md](../../docs/contributing.md) para mais informações sobre como contribuir com o projeto.
