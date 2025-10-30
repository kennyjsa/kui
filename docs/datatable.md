# 📊 DataTable - Sistema de Visualização de Dados Multi-View

O DataTable é um sistema completo de visualização de dados inspirado no Jira, com 3 modos de visualização, filtros progressivos, URL state e integração TanStack Table.

## 🚀 Características

- ✅ **3 Modos de Visualização**: Table, Grid, List
- ✅ **Filtros Progressivos**: Busca global + filtros avançados com pills
- ✅ **URL State**: Compartilhar filtros e paginação
- ✅ **TanStack Table**: Integração com tabela profissional
- ✅ **Responsivo**: Mobile-first design
- ✅ **Performance**: Virtualização para listas grandes
- ✅ **Cache**: Optimistic updates e invalidation
- ✅ **Geração Automática**: Colunas e filtros do schema Zod

## 📦 Instalação

```bash
pnpm add @kui-framework/forms @kui-framework/core @kui-framework/ui
```

## 🎯 Uso Básico

### 1. Backend - Configurar tRPC

```typescript
// server/routers/user.router.ts
import { createDataTableRouter } from '@kui-framework/core';

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

### 2. Frontend - DataTable Simples

```tsx
// app/users/page.tsx
import { DataTable } from '@kui-framework/forms';

export default function UsersPage() {
  return (
    <DataTable
      providerName="userProvider"
      columns={[
        { key: 'nome', label: 'Nome', sortable: true },
        { key: 'email', label: 'E-mail', sortable: true },
        { key: 'ativo', label: 'Status', render: (value) => 
          <Badge variant={value ? 'default' : 'secondary'}>
            {value ? 'Ativo' : 'Inativo'}
          </Badge>
        },
      ]}
      enableSearch
      enableViews
      initialView="table"
      pageSize={10}
      enableUrlState
    />
  );
}
```

## 🎨 Geração Automática

### 1. Gerar Colunas do Schema

```tsx
import { extractColumns } from '@kui-framework/forms';
import { userSchema } from '../schemas/user.schema';

const columns = extractColumns(userSchema, {
  include: ['nome', 'email', 'ativo', 'dataNascimento'],
  overrides: {
    ativo: {
      render: (value) => (
        <Badge variant={value ? 'default' : 'secondary'}>
          {value ? 'Ativo' : 'Inativo'}
        </Badge>
      )
    },
    dataNascimento: {
      render: (value) => new Date(value).toLocaleDateString('pt-BR')
    }
  }
});
```

### 2. Gerar Filtros do Schema

```tsx
import { extractFiltersFromSchema } from '@kui-framework/core';

const filters = extractFiltersFromSchema(userSchema, {
  include: ['nome', 'email', 'ativo', 'dataNascimento'],
  overrides: {
    ativo: {
      type: 'select',
      options: [
        { label: 'Ativo', value: true },
        { label: 'Inativo', value: false },
      ]
    },
    dataNascimento: { type: 'daterange' }
  }
});
```

### 3. DataTable Completo

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
  renderCard={(user) => (
    <Card>
      <CardHeader>
        <CardTitle>{user.nome</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge>{user.ativo ? 'Ativo' : 'Inativo'}</Badge>
      </CardContent>
    </Card>
  )}
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
```

## 🎛️ Modos de Visualização

### Table View
Visualização clássica em tabela com TanStack Table:

```tsx
<DataTable
  initialView="table"
  useTanStackTable={true} // Habilita TanStack Table
  // ... outras props
/>
```

### Grid View
Cards em grid responsivo:

```tsx
<DataTable
  initialView="grid"
  renderCard={(item) => (
    <Card>
      <CardHeader>
        <CardTitle>{item.nome}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{item.email}</p>
      </CardContent>
    </Card>
  )}
  // ... outras props
/>
```

### List View
Cards full-width para mobile:

```tsx
<DataTable
  initialView="list"
  renderCard={(item) => (
    <Card className="flex items-center space-x-4">
      <div className="flex-1">
        <h3 className="font-semibold">{item.nome}</h3>
        <p className="text-sm text-gray-600">{item.email}</p>
      </div>
      <Badge>{item.ativo ? 'Ativo' : 'Inativo'}</Badge>
    </Card>
  )}
  // ... outras props
/>
```

## 🔍 Sistema de Filtros

### Filtros Básicos

```tsx
const filters = [
  {
    key: 'nome',
    label: 'Nome',
    type: 'text',
    operator: 'contains'
  },
  {
    key: 'ativo',
    label: 'Status',
    type: 'select',
    operator: 'eq',
    options: [
      { label: 'Ativo', value: true },
      { label: 'Inativo', value: false }
    ]
  }
];
```

### Tipos de Filtro Suportados

```typescript
type FilterType = 
  | 'text'        // Input texto
  | 'select'      // Select single
  | 'multiselect' // Checkboxes
  | 'date'        // Single date
  | 'daterange'   // Range de datas
  | 'number'      // Input number
  | 'numberrange' // Min-max
  | 'boolean';    // Switch/Checkbox
```

### Operadores

```typescript
type FilterOperator = 
  | 'eq'       // equals
  | 'ne'       // not equals
  | 'contains' // contém
  | 'gt'       // greater than
  | 'gte'      // greater or equal
  | 'lt'       // less than
  | 'lte'      // less or equal
  | 'in'       // in array
  | 'between'; // entre valores
```

## ⚡ Actions e Cache

### Context de Actions

```tsx
actions={(user, context) => (
  <>
    <Button 
      onClick={async () => {
        // Update otimista
        context.optimisticPatch(user.id, { ativo: !user.ativo });
        
        // Mutation no backend
        await trpc.user.toggleStatus.mutate({ id: user.id });
        
        // Invalidar cache
        context.invalidate();
      }}
    >
      {user.ativo ? 'Desativar' : 'Ativar'}
    </Button>
    
    <Button 
      variant="destructive"
      onClick={async () => {
        if (!confirm('Confirma exclusão?')) return;
        
        // Remove otimisticamente
        context.optimisticRemove(user.id);
        
        // Delete no backend
        await trpc.user.delete.mutate({ id: user.id });
      }}
    >
      Excluir
    </Button>
  </>
)}
```

### Métodos do Context

- `context.refetch()` - Refetch completo
- `context.invalidate()` - Invalidar cache
- `context.optimisticUpdate(updater)` - Update otimista
- `context.optimisticRemove(id)` - Remove otimista
- `context.optimisticPatch(id, patch)` - Patch otimista

## 📱 Responsividade

### Mobile (< 768px)
- Força view "list" ou "grid"
- Esconde colunas menos importantes
- Filtros em modal full-screen

### Tablet (768px - 1024px)
- Grid 2-3 colunas
- Table com scroll horizontal

### Desktop (> 1024px)
- Todas as views disponíveis
- Table completa

## 🎯 Props Completas

```typescript
interface DataTableProps<T = any> {
  providerName: string;
  columns: DataTableColumn<T>[];
  filters?: FilterDefinition[];
  enableSearch?: boolean;
  enableViews?: boolean;
  initialView?: 'table' | 'grid' | 'list';
  pageSize?: number;
  enableUrlState?: boolean;
  useTanStackTable?: boolean;
  renderCard?: (item: T) => React.ReactNode;
  emptyState?: React.ReactNode;
  actions?: (row: T, context: DataTableActionContext) => React.ReactNode;
}
```

## 🔧 Hook useDataTable

```tsx
import { useDataTable } from '@kui-framework/forms';

function CustomDataTable() {
  const table = useDataTable({
    providerName: 'userProvider',
    initialPageSize: 10,
    initialView: 'table',
    enableUrlState: true,
  });

  return (
    <div>
      <input 
        value={table.search}
        onChange={(e) => table.setSearch(e.target.value)}
      />
      
      <div>
        {table.data.map(item => (
          <div key={item.id}>{item.nome}</div>
        ))}
      </div>
      
      <button onClick={() => table.setPage(table.page + 1)}>
        Próxima Página
      </button>
    </div>
  );
}
```

## 🎨 Customização

### Render Personalizado

```tsx
const columns = [
  {
    key: 'status',
    label: 'Status',
    render: (value, row) => (
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${
          value ? 'bg-green-500' : 'bg-red-500'
        }`} />
        <span>{value ? 'Ativo' : 'Inativo'}</span>
      </div>
    )
  }
];
```

### Empty State

```tsx
<DataTable
  emptyState={
    <div className="text-center py-8">
      <p className="text-gray-500">Nenhum usuário encontrado</p>
      <Button onClick={() => createUser()}>
        Criar Primeiro Usuário
      </Button>
    </div>
  }
  // ... outras props
/>
```

## 🚀 Performance

### Virtualização

```tsx
import { DataTableVirtualized } from '@kui-framework/forms';

<DataTableVirtualized
  data={data}
  columns={columns}
  height={600}
  itemHeight={60}
  // ... outras props
/>
```

### Debounced Search

O search é automaticamente debounced (300ms) para melhor performance.

### Cache Inteligente

- Cache por 30 segundos
- Invalidação automática após mutations
- Optimistic updates para UX fluida

## 📚 Exemplos Completos

Veja exemplos completos no [Showcase](../examples/kui-showcase/):

- **[DataTable Básico](../examples/kui-showcase/src/app/users-datatable/page.tsx)**
- **[DataTable Avançado](../examples/kui-showcase/src/app/users-datatable-advanced/page.tsx)**

## 🆘 Troubleshooting

### Problemas Comuns

1. **Provider não encontrado**
   ```tsx
   // Certifique-se de registrar o provider
   <KuiDataProvider providers={[userProvider]}>
   ```

2. **Filtros não funcionam**
   ```tsx
   // Verifique se o backend implementa a lógica de filtros
   const where = buildWhereClause(input.filters, input.search);
   ```

3. **URL state não persiste**
   ```tsx
   // Habilite URL state
   <DataTable enableUrlState={true} />
   ```

### Debug

```tsx
// Adicione logs para debug
const table = useDataTable({
  providerName: 'userProvider',
  // ...
});

console.log('Table state:', {
  page: table.page,
  search: table.search,
  filters: table.filters,
  data: table.data
});
```

---

**🎉 Pronto!** Agora você tem um sistema completo de visualização de dados. Explore os [exemplos](../examples/kui-showcase/) para ver mais casos de uso!
