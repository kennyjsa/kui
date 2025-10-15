# 📚 Exemplos Práticos - Casos de Uso Reais

Explore exemplos práticos do KUI Framework com casos de uso reais e implementações completas.

## 🚀 Showcase Interativo

O [Showcase Completo](../examples/kui-showcase/) é a melhor forma de ver todos os componentes e funcionalidades em ação:

```bash
cd examples/kui-showcase
pnpm dev
```

Acesse: http://localhost:3000

## 📊 DataTable - Visualização de Dados

### Lista Básica de Usuários
- **Arquivo**: `src/app/users-datatable/page.tsx`
- **Funcionalidades**: DataTable básico com geração automática de colunas e filtros
- **Recursos**: Busca, paginação, ordenação, URL state

```tsx
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
```

### Lista Avançada de Usuários
- **Arquivo**: `src/app/users-datatable-advanced/page.tsx`
- **Funcionalidades**: DataTable com TanStack Table e virtualização
- **Recursos**: 3 modos de visualização, filtros avançados, actions com optimistic updates

```tsx
<DataTable
  providerName="userProvider"
  columns={columns}
  filters={filters}
  useTanStackTable
  actions={(user, context) => (
    <>
      <Button onClick={() => editUser(user)}>Editar</Button>
      <Button 
        variant="destructive"
        onClick={() => context.optimisticRemove(user.id)}
      >
        Excluir
      </Button>
    </>
  )}
/>
```

## 📝 Formulários - 18 Tipos de Campos

### Formulários Simples
- **Arquivo**: `src/app/forms/simple-forms/page.tsx`
- **Funcionalidades**: Formulários básicos com campos simples
- **Recursos**: Validação, máscaras, campos obrigatórios

```tsx
<FormBuilder
  schema={userSchema}
  mode="create"
  onSubmit={async (data) => {
    console.log('Dados do usuário:', data);
  }}
/>
```

### Formulários com Validação
- **Arquivo**: `src/app/forms/with-validations/page.tsx`
- **Funcionalidades**: Validação avançada com Zod
- **Recursos**: Validação cross-field, mensagens customizadas

```tsx
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

### Formulários com Grid
- **Arquivo**: `src/app/forms/with-grid/page.tsx`
- **Funcionalidades**: Layout responsivo com grid
- **Recursos**: Seções, campos condicionais, layout adaptativo

```tsx
const userSchema = zKUI.object({
  nome: zKUI.text('Nome', { 
    grid: { xs: 12, md: 6 },
    section: 'Dados Pessoais'
  }),
  email: zKUI.email('E-mail', { 
    grid: { xs: 12, md: 6 },
    section: 'Dados Pessoais'
  })
});
```

### Formulários com tRPC
- **Arquivo**: `src/app/forms/with-trpc/page.tsx`
- **Funcionalidades**: Integração completa com tRPC
- **Recursos**: CRUD automático, validação server-side, cache

```tsx
<FormBuilder
  schema={userSchema}
  mode="create"
  provider="userProvider"
  onSubmit={async (data) => {
    // Salvamento automático via tRPC
    await trpc.user.create.mutate(data);
  }}
/>
```

## 🧩 Componentes UI - Biblioteca Completa

### Componentes Básicos
- **Arquivo**: `src/app/with-basic-components/page.tsx`
- **Funcionalidades**: Todos os componentes básicos
- **Recursos**: Inputs, botões, cards, badges, etc.

```tsx
<div className="space-y-4">
  <Input placeholder="Digite algo..." />
  <Button>Primário</Button>
  <Badge>Sucesso</Badge>
  <Card>
    <CardContent>
      <p>Conteúdo do card</p>
    </CardContent>
  </Card>
</div>
```

### Sistema de Elevação
- **Arquivo**: `src/app/with-elevation/page.tsx`
- **Funcionalidades**: Sistema de elevação completo
- **Recursos**: 5 níveis de elevação, sombras, profundidade

```tsx
<div className="space-y-4">
  <Card elevation="none">Sem elevação</Card>
  <Card elevation="sm">Elevação pequena</Card>
  <Card elevation="md">Elevação média</Card>
  <Card elevation="lg">Elevação grande</Card>
  <Card elevation="xl">Elevação extra grande</Card>
</div>
```

### Acessibilidade
- **Arquivo**: `src/app/with-aria/page.tsx`
- **Funcionalidades**: Componentes com ARIA labels
- **Recursos**: Navegação por teclado, screen readers, foco

```tsx
<Button 
  aria-label="Fechar modal"
  onClick={closeModal}
>
  ×
</Button>
```

### Modais e Dialogs
- **Arquivo**: `src/app/with-dialogs/page.tsx`
- **Funcionalidades**: Sistema completo de modais
- **Recursos**: Confirmação, formulários, overlays

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Abrir Modal</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirmar Ação</DialogTitle>
      <DialogDescription>
        Tem certeza que deseja continuar?
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancelar</Button>
      <Button>Confirmar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Toast e Notificações
- **Arquivo**: `src/app/with-toast/page.tsx`
- **Funcionalidades**: Sistema de notificações
- **Recursos**: Toast, alertas, feedback visual

```tsx
const { toast } = useToast();

<Button onClick={() => {
  toast({
    title: "Sucesso",
    description: "Operação realizada com sucesso!",
  });
}}>
  Mostrar Toast
</Button>
```

## 🔧 Integrações - Backend

### tRPC Integration
- **Arquivo**: `src/app/with-trpc/page.tsx`
- **Funcionalidades**: Integração completa com tRPC
- **Recursos**: Type-safety, cache, mutations, queries

```tsx
// Provider tRPC
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

// Uso no componente
const { data, isLoading } = trpc.user.getAll.useQuery();
```

### REST Integration
- **Arquivo**: `src/app/with-rest/page.tsx`
- **Funcionalidades**: Integração com APIs REST
- **Recursos**: HTTP methods, headers, error handling

```tsx
// Provider REST
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

## 📱 Responsividade - Mobile-First

### Grid Layout
- **Arquivo**: `src/app/with-grid-layout/page.tsx`
- **Funcionalidades**: Layout responsivo
- **Recursos**: Breakpoints, grid adaptativo, mobile-first

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</div>
```

### Sidebar
- **Arquivo**: `src/app/with-sidebar/page.tsx`
- **Funcionalidades**: Sidebar responsiva
- **Recursos**: Collapse, overlay, mobile menu

```tsx
<Sidebar>
  <SidebarContent>
    <SidebarItem>
      <SidebarLink href="/">Home</SidebarLink>
    </SidebarItem>
    <SidebarItem>
      <SidebarLink href="/users">Usuários</SidebarLink>
    </SidebarItem>
  </SidebarContent>
</Sidebar>
```

## 🎨 Temas - Design System

### Tokens
- **Arquivo**: `src/app/with-tokens/page.tsx`
- **Funcionalidades**: Design tokens
- **Recursos**: Cores, espaçamento, tipografia, elevação

```tsx
<div className="bg-primary text-primary-foreground p-4 rounded-lg">
  <h2 className="text-2xl font-bold">Título</h2>
  <p className="text-sm opacity-90">Descrição</p>
</div>
```

### Dark Mode
- **Arquivo**: `src/app/with-dark-mode/page.tsx`
- **Funcionalidades**: Tema escuro
- **Recursos**: Toggle, persistência, transições

```tsx
const { theme, setTheme } = useTheme();

<Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
  {theme === 'dark' ? '☀️' : '🌙'}
</Button>
```

## 🚀 Performance - Otimizações

### Virtualização
- **Arquivo**: `src/app/with-virtualization/page.tsx`
- **Funcionalidades**: Listas virtuais
- **Recursos**: Renderização otimizada, scroll infinito

```tsx
<DataTableVirtualized
  data={data}
  columns={columns}
  height={600}
  itemHeight={60}
/>
```

### Lazy Loading
- **Arquivo**: `src/app/with-lazy-loading/page.tsx`
- **Funcionalidades**: Carregamento sob demanda
- **Recursos**: Code splitting, suspense, fallbacks

```tsx
const LazyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

## 📚 Como Usar os Exemplos

### 1. Clonar o Repositório

```bash
git clone https://github.com/kennyjsa/kui.git
cd kui
```

### 2. Instalar Dependências

```bash
pnpm install
```

### 3. Executar Showcase

```bash
cd examples/kui-showcase
pnpm dev
```

### 4. Explorar Exemplos

- Navegue pelos exemplos no menu lateral
- Veja o código fonte de cada exemplo
- Teste as funcionalidades interativamente
- Copie e adapte para seu projeto

## 🎯 Próximos Passos

1. **[Guia de Início Rápido](../getting-started.md)** - Configure o KUI
2. **[Documentação de Formulários](../forms/README.md)** - Aprenda sobre os 18 tipos de campos
3. **[Documentação do DataTable](../datatable.md)** - Sistema de visualização de dados
4. **[Documentação de Componentes](../components/README.md)** - Biblioteca completa de componentes
5. **[Contribuindo](../contributing.md)** - Como contribuir com o projeto

## 🆘 Precisa de Ajuda?

- **[FAQ](../guides/faq.md)** - Perguntas frequentes
- **[Troubleshooting](../guides/troubleshooting.md)** - Solução de problemas
- **[GitHub Issues](https://github.com/kennyjsa/kui/issues)** - Reportar bugs
- **[Discord](https://discord.gg/kui)** - Comunidade

---

**🎉 Explore os exemplos e construa aplicações incríveis com o KUI Framework!**
