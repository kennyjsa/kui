# 🚧 Fase 2: Campos Avançados

**Status:** Em Planejamento  
**Período:** Estimado 2-3 semanas  
**Prioridade:** Alta

## 🎯 Objetivos

Expandir os tipos de campos disponíveis e implementar funcionalidades essenciais para aplicações reais.

## 📋 Entregas Planejadas

### Sprint 1: Máscaras e Campos Básicos

#### 1.1 Máscaras de Input Funcionais
- [ ] Integrar `react-input-mask` ou `imask`
- [ ] Aplicar máscaras declarativas do schema
- [ ] Máscaras disponíveis:
  - [ ] CPF: `999.999.999-99`
  - [ ] CNPJ: `99.999.999/9999-99`
  - [ ] Telefone: `(99) 99999-9999`
  - [ ] CEP: `99999-999`
  - [ ] Data: `99/99/9999`
  - [ ] Hora: `99:99`
- [ ] Validação integrada com máscara
- [ ] Exemplo no person-addresses

**Critérios de Aceitação:**
- Máscaras aplicadas automaticamente ao digitar
- Valor sem máscara enviado ao submit
- Validação respeitando formato da máscara

#### 1.2 Campo `textarea()`
```typescript
descricao: zKUI.textarea("Descrição", {
  rows: 4,
  maxLength: 500
})
```
- [ ] Implementar componente Textarea
- [ ] Suporte a rows configurável
- [ ] Contador de caracteres (opcional)
- [ ] Auto-resize (opcional)

#### 1.3 Campo `currency()`
```typescript
salario: zKUI.currency("Salário", {
  currency: "BRL",
  locale: "pt-BR"
})
```
- [ ] Formatação monetária
- [ ] Suporte a múltiplas moedas
- [ ] Integração com Intl.NumberFormat
- [ ] Validação de valores

### Sprint 2: Campo de Relação

#### 2.1 Campo `relation()` - Básico
```typescript
usuarioResponsavel: zKUI.relation("Usuário Responsável", {
  relation: "user",
  provider: "userProvider",
  displayField: "nome",
  valueField: "id"
})
```
- [ ] Componente Select básico
- [ ] Integração com DataProvider
- [ ] Carregar opções do provider
- [ ] Display field configurável
- [ ] Value field configurável

#### 2.2 Select com Busca
- [ ] Implementar react-select ou similar
- [ ] Busca assíncrona
- [ ] Debounce na busca
- [ ] Loading state
- [ ] Empty state
- [ ] Error state

#### 2.3 Relações Múltiplas
```typescript
tags: zKUI.relation("Tags", {
  relation: "tag",
  provider: "tagProvider",
  displayField: "nome",
  valueField: "id",
  multiple: true
})
```
- [ ] Suporte a multiple select
- [ ] Chips para selecionados
- [ ] Limite de seleções (opcional)

#### 2.4 Exemplo Completo
- [ ] Adicionar campo de relação no pessoa.schema
- [ ] Criar mock provider para usuários
- [ ] Demonstrar no exemplo

### Sprint 3: Campos Adicionais

#### 3.1 Campo `checkbox()`
```typescript
aceitoTermos: zKUI.checkbox("Aceito os termos", {
  required: true
})
```
- [ ] Checkbox component estilizado
- [ ] Suporte a labels com HTML
- [ ] Validação required

#### 3.2 Campo `radio()`
```typescript
genero: zKUI.radio("Gênero", {
  options: [
    { label: "Masculino", value: "M" },
    { label: "Feminino", value: "F" },
    { label: "Outro", value: "O" }
  ]
})
```
- [ ] Radio group component
- [ ] Layout horizontal/vertical
- [ ] Opções configuráveis

#### 3.3 Campo `switch()`
```typescript
ativo: zKUI.switch("Ativo")
```
- [ ] Switch toggle component
- [ ] Estados on/off
- [ ] Labels configuráveis

#### 3.4 Campo `rating()`
```typescript
avaliacao: zKUI.rating("Avaliação", {
  max: 5,
  allowHalf: true
})
```
- [ ] Star rating component
- [ ] Configurável (5, 10 estrelas)
- [ ] Meia estrela (opcional)

#### 3.5 Campo `color()`
```typescript
corFavorita: zKUI.color("Cor Favorita")
```
- [ ] Color picker component
- [ ] Formatos: hex, rgb, hsl
- [ ] Paleta de cores padrão

#### 3.6 Campo `file()`
```typescript
avatar: zKUI.file("Avatar", {
  accept: "image/*",
  maxSize: 5 * 1024 * 1024, // 5MB
  preview: true
})
```
- [ ] File upload component
- [ ] Preview de imagens
- [ ] Validação de tipo
- [ ] Validação de tamanho
- [ ] Múltiplos arquivos (opcional)

## 📊 Critérios de Sucesso

- [ ] Todos os campos documentados
- [ ] Exemplos funcionando
- [ ] Testes unitários > 70%
- [ ] Performance: campos renderizam < 16ms
- [ ] Acessibilidade: ARIA completo

## 🔗 Dependências

- react-input-mask (máscaras)
- react-select ou @radix-ui/react-select (select com busca)
- react-dropzone (file upload)

## 📝 Notas Técnicas

### Máscaras
- Armazenar valor sem máscara no formulário
- Aplicar máscara apenas na exibição
- Validar formato antes de submit

### Relações
- Cache de opções do provider
- Invalidar cache quando necessário
- Suporte a lazy loading

### Performance
- Memoizar componentes pesados
- Virtualização para listas grandes (react-window)
- Debounce em buscas

## 🐛 Riscos e Mitigações

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Dependências aumentam bundle size | Médio | Tree-shaking e code splitting |
| Máscaras complexas de manter | Baixo | Usar biblioteca consolidada |
| Select assíncrono com performance ruim | Alto | Implementar virtualização |

## ➡️ Próxima Fase

**Fase 3: CrudGrid e Listagens**

Implementar campo `grid()` para sublistas e componente CrudGrid completo.

