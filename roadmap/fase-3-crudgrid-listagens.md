# 📅 Fase 3: CrudGrid e Listagens

**Status:** Planejada  
**Período:** Estimado 3-4 semanas  
**Prioridade:** Alta

## 🎯 Objetivos

Implementar sistema completo de gerenciamento de listas e sublistas (relações 1:N).

## 📋 Entregas Planejadas

### Sprint 1: Campo Grid Básico

#### 1.1 Campo `grid()` - Estrutura
```typescript
enderecos: zKUI.grid("Endereços", {
  itemSchema: enderecoSchema,
  columns: ["rua", "numero", "cidade", "uf"],
  allowCreate: true,
  allowEdit: true,
  allowDelete: true
})
```
- [ ] Tipo e interface Grid
- [ ] Metadados para campo grid
- [ ] Validação de itemSchema
- [ ] Integração com FormBuilder

#### 1.2 GridField Component
- [ ] Tabela inline para exibir itens
- [ ] Botões de ação (adicionar, editar, remover)
- [ ] Modal ou drawer para edição
- [ ] Estado interno (novo, editado, removido)
- [ ] Validação de itens individuais

#### 1.3 Controle de Estado
- [ ] Array de itens no formulário
- [ ] Tracking de mudanças (added, updated, deleted)
- [ ] Validação do array completo
- [ ] Submit com diff de mudanças

### Sprint 2: CrudGrid Component

#### 2.1 CrudGrid - Estrutura Base
```typescript
<CrudGrid
  provider={pessoaProvider}
  columns={[
    { key: "id", label: "ID" },
    { key: "nome", label: "Nome" },
    { key: "email", label: "E-mail" },
  ]}
  schema={pessoaSchema}
  onEdit={(id) => navigate(`/pessoa/${id}`)}
/>
```
- [ ] Componente CrudGrid independente
- [ ] Integração com DataProvider
- [ ] Configuração de colunas
- [ ] Ações padrão (criar, editar, excluir)

#### 2.2 Paginação
- [ ] Paginação server-side
- [ ] Controles de navegação (anterior, próxima)
- [ ] Seletor de itens por página
- [ ] Info de total de registros
- [ ] Integração com provider.list()

#### 2.3 Busca e Filtros
- [ ] Campo de busca global
- [ ] Filtros por coluna
- [ ] Filtros avançados (modal)
- [ ] Múltiplos filtros combinados
- [ ] Clear filters

#### 2.4 Ordenação
- [ ] Click em header para ordenar
- [ ] Indicador visual de ordenação
- [ ] Ordenação ascendente/descendente
- [ ] Ordenação por múltiplas colunas

### Sprint 3: Funcionalidades Avançadas

#### 3.1 Seleção de Linhas
- [ ] Checkbox para seleção
- [ ] Selecionar todos
- [ ] Ações em massa
- [ ] Contador de selecionados

#### 3.2 Ações Personalizadas
```typescript
<CrudGrid
  actions={[
    { 
      label: "Exportar", 
      icon: <Download />,
      onClick: (selected) => exportData(selected)
    }
  ]}
/>
```
- [ ] Ações customizadas globais
- [ ] Ações por linha
- [ ] Confirmação de ações destrutivas
- [ ] Loading state em ações

#### 3.3 Renderização Customizada
```typescript
<CrudGrid
  columns={[
    { 
      key: "status", 
      label: "Status",
      render: (value) => <Badge>{value}</Badge>
    }
  ]}
/>
```
- [ ] Render functions por coluna
- [ ] Componentes customizados
- [ ] Formatação de dados (data, moeda, etc)

#### 3.4 Export de Dados
- [ ] Export para CSV
- [ ] Export para Excel (XLSX)
- [ ] Export para PDF (opcional)
- [ ] Export com filtros aplicados
- [ ] Export de selecionados

### Sprint 4: UX do Grid

#### 4.1 Estados Visuais
- [ ] Loading skeleton
- [ ] Empty state
- [ ] Error state
- [ ] Retry em caso de erro
- [ ] Placeholder quando sem dados

#### 4.2 Responsividade
- [ ] Layout mobile (cards)
- [ ] Scroll horizontal em desktop
- [ ] Colunas colapsáveis
- [ ] Prioridade de colunas

#### 4.3 Performance
- [ ] Virtualização de linhas (react-window)
- [ ] Lazy loading de dados
- [ ] Debounce em busca
- [ ] Cache de queries

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
  uf: zKUI.select("UF", ["AC", "AL", "AM", "..."], { required: true }),
  cep: zKUI.text("CEP", { mask: "99999-999", required: true }),
  principal: zKUI.boolean("Endereço Principal"),
});
```

### Schema de Pessoa com Endereços
```typescript
export const pessoaComEnderecosSchema = zKUI.object({
  ...pessoaSchema.shape,
  enderecos: zKUI.grid("Endereços", {
    itemSchema: enderecoSchema,
    columns: ["rua", "numero", "cidade", "uf", "principal"],
    allowCreate: true,
    allowEdit: true,
    allowDelete: true,
    minItems: 1 // Pelo menos um endereço
  }),
});
```

### Página com CrudGrid
```typescript
export default function PessoasPage() {
  return (
    <CrudGrid
      provider={pessoaProvider}
      schema={pessoaSchema}
      columns={[
        { key: "nome", label: "Nome", sortable: true },
        { key: "email", label: "E-mail" },
        { key: "telefone", label: "Telefone" },
      ]}
      searchable
      exportable
    />
  );
}
```

## 📊 Critérios de Sucesso

- [ ] Grid renderiza 1000+ linhas sem lag (com virtualização)
- [ ] Paginação funciona corretamente
- [ ] Busca e filtros são rápidos (< 300ms)
- [ ] Sublistas (grid field) funcionam perfeitamente
- [ ] Export funciona para grandes datasets
- [ ] Acessibilidade completa (keyboard navigation)

## 🔗 Dependências

- @tanstack/react-table (gerenciamento de tabela)
- react-window (virtualização)
- papaparse (export CSV)
- xlsx (export Excel)

## 📝 Notas Técnicas

### Performance
- Virtualização obrigatória para > 100 linhas
- Paginação server-side preferível
- Cache inteligente de queries
- Debounce em todas as buscas

### Estado
- Estado do grid separado do formulário
- Sincronização com URL (filtros, página, ordenação)
- Persist state em localStorage (opcional)

### Validação
- Validar itens individuais do grid
- Validar array completo (minItems, maxItems)
- Mostrar erros inline no grid

## 🐛 Riscos e Mitigações

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Performance ruim com muitos dados | Alto | Virtualização obrigatória |
| Complexidade do estado | Médio | Usar @tanstack/react-table |
| Export trava navegador | Médio | Web Workers para processamento |
| Grid muito genérico perde flexibilidade | Alto | Permitir overrides e customizações |

## ➡️ Próxima Fase

**Fase 4: Integração e Backend**

Integrar tRPC, validações assíncronas e estado avançado.

