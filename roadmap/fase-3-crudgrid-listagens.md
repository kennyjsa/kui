# 📅 Fase 3: CrudGrid e Listagens

**Status:** 🚧 Em Progresso (Sprint 1 ✅ Completa, Sprint 2 ✅ Completa)  
**Período:** 1 dia (19/10/2024)  
**Prioridade:** Alta  
**Progresso:** ████████████░░░░░░░░ 60%

## 🎯 Objetivos

Implementar sistema completo de gerenciamento de listas e sublistas (relações 1:N) com **estado local** e **persistência única** no submit.

## 🏗️ Arquitetura Definida

### Princípios
- ✅ **Estado 100% local** - array no formulário
- ✅ **Operações client-side** - filtro, ordenação, paginação em JS
- ✅ **CRUD via modal** - create/edit/view sem sair do contexto
- ✅ **Persistência única** - submit do formulário pai salva tudo
- ✅ **Tracking de mudanças** - new, updated, deleted, unchanged
- ✅ **Responsivo** - Grid (desktop) ↔ List (mobile)

### Componentes
```
GridField      → Tabela HTML (desktop)
ListField      → Cards (mobile)
ResponsiveGrid → Auto-switch baseado em breakpoint
GridItemModal  → Modal para CRUD de item
```

## 📋 Entregas Planejadas

### Sprint 1: Campo Grid Básico

#### 1.1 Campo `grid()` - Estrutura ✅
```typescript
enderecos: zKUI.grid("Endereços", {
  itemSchema: enderecoSchema,
  columns: ["rua", "numero", "cidade", "uf"],
  allowCreate: true,
  allowEdit: true,
  allowDelete: true
})
```
- [x] Tipo e interface GridOptions
- [x] Metadados para campo grid
- [x] Validação de itemSchema (minItems, maxItems)
- [x] Integração com FormBuilder via FieldRenderer

#### 1.2 GridField Component (Tabela Desktop) ✅
- [x] Tabela HTML simples e performática
- [x] Header com nomes das colunas (extraídos do schema)
- [x] Linhas com dados formatados
- [x] Botões de ação por linha (editar, excluir, restaurar)
- [x] Botão "Adicionar" no footer
- [x] Indicadores visuais de status (badges: novo, editado, excluído)
- [x] Empty state quando vazio
- [ ] Busca simples (input texto filtra localmente)
- [ ] Ordenação por coluna (click no header)

#### 1.3 GridItemModal Component ✅
- [x] Modal para CRUD de item com Dialog (Radix UI)
- [x] Modos: create, edit, view
- [x] FormBuilder reutilizado com itemSchema
- [x] Botões: Salvar, Cancelar
- [x] Salvar NÃO persiste backend (só atualiza array local)
- [x] Validação com Zod antes de salvar

#### 1.4 Controle de Estado Local ✅
```typescript
type GridItem<T> = {
  data: T;
  status: 'new' | 'updated' | 'deleted' | 'unchanged';
  _tempId?: string; // Para itens novos sem ID do backend
};
```
- [x] Array de itens no formulário (react-hook-form)
- [x] Tracking de mudanças por item
- [x] Soft delete (marca como deleted, não remove do array)
- [x] Hard delete para itens 'new' (remove do array)
- [x] Validação do array completo (minItems, maxItems) via Zod
- [x] Submit retorna array completo (sem tracking, apenas dados)

### Sprint 2: ListField Component (Cards Mobile)

#### 2.1 ListField - Estrutura Base ✅
```typescript
<ListField
  items={enderecos}
  onChange={handleChange}
  itemSchema={enderecoSchema}
  displayFields={["rua", "numero", "cidade"]}
  allowCreate={true}
  allowEdit={true}
  allowDelete={true}
/>
```
- [x] Cards empilhados verticalmente
- [x] Extração automática de campos do schema
- [x] Título + campos principais no card
- [x] Botões de ação no card (editar, excluir, restaurar)
- [x] Mesma lógica de estado do GridField
- [x] Compartilha GridItemModal
- [x] Empty state

#### 2.2 ResponsiveGrid Component ✅
```typescript
<ResponsiveGrid
  value={field.value}
  onChange={field.onChange}
  itemSchema={enderecoSchema}
  columns={["rua", "numero", "cidade"]}
  breakpoint="md" // < md = list, >= md = grid
/>
```
- [x] Hook useMediaQuery para detectar viewport
- [x] Auto-switch Grid ↔ List
- [x] Mesmo estado compartilhado
- [x] Renderização condicional baseada em breakpoint
- [x] Breakpoint configurável (xs, sm, md, lg, xl)

### Sprint 3: Features Locais

#### 3.1 Busca e Filtro Local
```typescript
// Busca simples em múltiplas colunas
const filteredItems = items.filter(item =>
  columns.some(col =>
    String(item[col]).toLowerCase().includes(search.toLowerCase())
  )
);
```
- [ ] Input de busca acima do grid
- [ ] Filtro em tempo real (client-side)
- [ ] Busca em múltiplas colunas
- [ ] Debounce (300ms)
- [ ] Clear search
- [ ] Contador de resultados

#### 3.2 Ordenação Local
- [ ] Click em header para ordenar
- [ ] Indicador visual (seta up/down)
- [ ] Toggle ascendente/descendente
- [ ] Ordenação por string, número, data
- [ ] Estado de ordenação preservado

#### 3.3 Paginação Local
```typescript
const paginatedItems = filteredItems.slice(
  (page - 1) * pageSize,
  page * pageSize
);
```
- [ ] Controles: anterior, próxima, ir para página
- [ ] Seletor de itens por página (5, 10, 25, 50)
- [ ] Info: "Exibindo X-Y de Z itens"
- [ ] Desabilitar botões quando necessário
- [ ] Reset para página 1 ao filtrar

#### 3.4 Indicadores Visuais de Status
- [ ] Badge "Novo" (verde) para status: 'new'
- [ ] Badge "Editado" (amarelo) para status: 'updated'
- [ ] Badge "Excluído" (vermelho) + riscado para status: 'deleted'
- [ ] Itens 'deleted' visíveis mas sinalizados
- [ ] Opção de "Restaurar" item deletado

### Sprint 4: UX e Validações

#### 4.1 Estados Visuais
- [ ] Empty state quando array vazio
- [ ] Empty state quando busca não retorna resultados
- [ ] Mensagens contextuais
- [ ] Ilustrações ou ícones apropriados

#### 4.2 Validações
- [ ] Validar item individual antes de salvar no modal
- [ ] Validar array completo no submit do formulário
- [ ] minItems / maxItems configurável
- [ ] Mensagens de erro claras
- [ ] Bloquear submit se grid inválido

#### 4.3 Confirmações
- [ ] Confirmar exclusão de item
- [ ] Dialog: "Tem certeza?"
- [ ] Cancelar exclusão
- [ ] Restaurar item deletado

#### 4.4 Performance
- [ ] Memoização de linhas
- [ ] Virtualização opcional (para grids muito grandes)
- [ ] Debounce em busca (300ms)
- [ ] Re-render otimizado

## 📊 Exemplo Completo

### Schema de Endereço
```typescript
export const enderecoSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  rua: zKUI.text("Rua", { required: true }),
  numero: zKUI.text("Número", { required: true }),
  complemento: zKUI.text("Complemento"),
  bairro: zKUI.text("Bairro", { required: true }),
  cidade: zKUI.text("Cidade", { required: true }),
  uf: zKUI.select("UF", ["AC", "AL", "AM", "BA", "CE", "..."], { required: true }),
  cep: zKUI.text("CEP", { mask: "99999-999", required: true }),
  principal: zKUI.switch("Endereço Principal"),
});
```

### Schema de Pessoa com Endereços (Campo grid)
```typescript
export const pessoaComEnderecosSchema = zKUI.object({
  ...pessoaSchema.shape,
  enderecos: zKUI.grid("Endereços", {
    itemSchema: enderecoSchema,
    columns: ["rua", "numero", "cidade", "uf", "principal"],
    allowCreate: true,
    allowEdit: true,
    allowDelete: true,
    minItems: 1, // Pelo menos um endereço
    maxItems: 10 // Máximo 10 endereços
  }),
});
```

### Formulário com Grid Inline
```typescript
export default function PessoaForm() {
  const handleSubmit = async (data) => {
    // data.enderecos = array completo com tracking
    // [
    //   { data: {...}, status: 'new' },
    //   { data: {...}, status: 'updated' },
    //   { data: {...}, status: 'deleted' },
    //   { data: {...}, status: 'unchanged' }
    // ]
    
    await api.savePessoa(data); // Persiste tudo de uma vez
  };

  return (
    <FormBuilder
      schema={pessoaComEnderecosSchema}
      mode="edit"
      defaultValues={pessoa}
      onSubmit={handleSubmit}
    />
  );
}
```

### Estado do Array
```typescript
// Exemplo de estado interno do GridField
const items = [
  { 
    data: { id: 1, rua: "Rua A", numero: "100" },
    status: 'unchanged' 
  },
  { 
    data: { rua: "Rua B", numero: "200" },
    status: 'new',
    _tempId: 'temp-uuid-1' 
  },
  { 
    data: { id: 3, rua: "Rua C", numero: "300" },
    status: 'deleted' // Visível mas riscado
  },
];
```

## 📊 Critérios de Sucesso

- [ ] Grid renderiza até 100 itens sem lag (paginação local)
- [ ] Busca local instantânea (< 50ms)
- [ ] Ordenação local instantânea
- [ ] Modal de CRUD funciona perfeitamente
- [ ] Tracking de status correto (new, updated, deleted)
- [ ] Submit retorna array completo
- [ ] Responsivo: Grid (desktop) ↔ List (mobile)
- [ ] Validações funcionando (minItems, maxItems)
- [ ] Acessibilidade completa (keyboard navigation)

## 🔗 Dependências

**Nenhuma dependência externa nova!** 🎉

Vamos usar apenas:
- React (hooks nativos)
- Componentes já criados (@kui/ui)
- HTML table nativo
- CSS Grid/Flexbox para cards

## 📝 Notas Técnicas

### Estado Local
```typescript
// Estado gerenciado por react-hook-form
const form = useForm({
  defaultValues: {
    nome: "João",
    enderecos: [ // Array de objetos simples
      { id: 1, rua: "Rua A", numero: "100" },
      { id: 2, rua: "Rua B", numero: "200" }
    ]
  }
});

// GridField adiciona tracking internamente
// Mas no submit retorna apenas os dados
```

### Tracking de Mudanças
- Internamente: `GridItem<T>` com status
- No submit: Pode retornar tracking ou só dados (configurável)
- Soft delete: mantém no array com status 'deleted'
- Hard delete: remove do array (apenas para 'new')

### Performance
- Paginação local para arrays grandes (> 50 itens)
- Busca com debounce (300ms)
- Memoização de linhas/cards
- Virtualização opcional (futura) se necessário

### Validação
- Item individual: validado no modal antes de salvar
- Array completo: validado no submit do formulário pai
- Regras: minItems, maxItems
- Erros exibidos no formulário pai

### Responsividade
- MediaQuery: `(min-width: 768px)` → Grid
- MediaQuery: `(max-width: 767px)` → List
- Hook personalizado: `useMediaQuery()`
- Mesmo estado, renderização diferente

## 🐛 Riscos e Mitigações

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Performance com muitos itens (> 100) | Médio | Paginação local obrigatória |
| Complexidade de estado com tracking | Médio | Estado simples e bem documentado |
| Sincronização grid ↔ formulário | Alto | Usar react-hook-form corretamente |
| Perder mudanças ao fechar modal | Baixo | Confirmação antes de cancelar |
| Grid muito genérico perde flexibilidade | Médio | Props de customização |

## ➡️ Próxima Fase

**Fase 4: Integração e Backend**

Integrar tRPC, validações assíncronas e estado avançado.

