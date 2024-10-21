# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Não Publicado]

### Em Desenvolvimento
- Sprint 3 da Fase 4: Auto-save e formulários multi-step
- Fase 5: UX e refinamentos
- Fase 6: Testes automatizados
- Fase 7: Distribuição e marketing

---

## [0.0.1] - 2024-10-21

### 🎉 Primeira Release Alpha

Release inicial do KUI Framework com funcionalidades core completas.

### ✨ Adicionado

#### Fase 1: Consolidação
- **Monorepo** com Turborepo + pnpm workspaces
- **5 pacotes:** `@kui/zod-extension`, `@kui/core`, `@kui/theme`, `@kui/ui`, `@kui/forms`
- **FormBuilder** com geração automática de UI
- **3 modos:** create, edit, view
- **Campos básicos:** identifier, text, number, date, email, password, boolean, select
- **Campos derivados** com cálculo automático
- **DataProvider** genérico e `createRestProvider`

#### Fase 2: Campos Avançados
- **Máscaras de input** com `react-input-mask`
- **Novos campos:**
  - `textarea()` - texto longo
  - `currency()` - valores monetários
  - `checkbox()` - caixa de seleção
  - `radio()` - opções exclusivas
  - `switch()` - toggle on/off
  - `rating()` - avaliação com estrelas
  - `color()` - seletor de cores
  - `file()` - upload com drag & drop e preview
- **Campo `relation()`** - relacionamento com outras entidades via Select

#### Fase 3: CrudGrid e Listagens
- **Campo `grid()`** - sublistas inline (relações 1:N)
- **GridField** - tabela para desktop
- **ListField** - cards para mobile
- **ResponsiveGrid** - auto-switch baseado em breakpoint
- **GridItemModal** - CRUD via modal
- **useMediaQuery** hook
- **Arquitetura local-first** - estado no formulário
- **Tracking de mudanças** - new, updated, deleted, unchanged
- **Paginação simples** - anterior/próxima (pageSize padrão: 5)
- **SimplePagination** component
- **Badges de status** visuais

#### Fase 4: Integração e Backend
- **createTrpcProvider** - integração com tRPC
- **Backend tRPC** completo com routers
- **React Query** integrado
- **TrpcProvider** component
- **Validações cross-field** com `.refine()`
- **Campos condicionais** com `showIf`
- **Suporte a ZodEffects** - validações aninhadas
- **Memoização** - React.memo, useCallback, useMemo
- **ErrorBoundary** - tratamento de erros
- **Skeleton components** - FormSkeleton, GridSkeleton

### 🔧 Melhorado

- **Performance** otimizada com memoização em componentes pesados
- **Bundle size** mantido em ~87KB
- **Type-safety** completa end-to-end
- **Exports** organizados e tree-shakeable

### 🐛 Corrigido

- Campo ID visível e obrigatório em modo create
- Idade não calculava automaticamente
- CSS não carregava após rebuild
- Conflitos ESLint com Next.js
- Error "Rendered more hooks than previous render" no RelationSelect
- Warning de `value` sem `onChange` no MaskedInput
- Invariant Violation do react-input-mask

### 📚 Documentação

- README.md principal
- READMEs individuais de cada pacote
- project-context.md
- Roadmap completo (7 fases)
- PROGRESS.md com estatísticas
- PUBLISHING.md com guia de publicação
- RELEASE_GUIDE.md com processo de release

### 🏗️ Infraestrutura

- GitHub Actions para CI/CD
- Workflow de release automatizado (tags na main)
- Scripts de automação (bump-version, validate-version, validate-tag, check-publish)
- Husky hooks (pre-commit, pre-push)
- Validações automáticas de versão e branch
- ESLint e Prettier configurados
- TypeScript strict mode

### 📦 Dependências Principais

- **zod** ^3.22.4 - Validação de schemas
- **react-hook-form** ^7.49.3 - Gerenciamento de formulários
- **@radix-ui** - Componentes acessíveis
- **tailwindcss** ^3.4.0 - Styling
- **@trpc** ^11.6.0 - Integração backend (peer)
- **@tanstack/react-query** ^5.90.5 - Cache e estado (peer)

---

## [0.0.0] - Não publicado

Desenvolvimento inicial e setup do projeto.

---

## 🔗 Links

- [Repositório GitHub](https://github.com/kennyjsa/kui)
- [NPM Organization](https://www.npmjs.com/org/kui)
- [Issues](https://github.com/kennyjsa/kui/issues)
- [Roadmap](https://github.com/kennyjsa/kui/tree/develop/roadmap)

