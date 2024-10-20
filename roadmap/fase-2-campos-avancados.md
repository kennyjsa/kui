# 🚧 Fase 2: Campos Avançados

**Status:** ✅ Completa (Sprint 1 ✅ | Sprint 2 ✅ | Sprint 3 ✅)  
**Período:** 1 dia (19/10/2024)  
**Prioridade:** Alta  
**Progresso:** ████████████████████ 100%

## 🎯 Objetivos

Expandir os tipos de campos disponíveis e implementar funcionalidades essenciais para aplicações reais.

## 📋 Entregas Planejadas

### Sprint 1: Máscaras e Campos Básicos

#### 1.1 Máscaras de Input Funcionais ✅
- [x] Integrar `react-input-mask` ou `imask`
- [x] Aplicar máscaras declarativas do schema
- [x] Máscaras disponíveis:
  - [x] CPF: `999.999.999-99`
  - [x] CNPJ: `99.999.999/9999-99`
  - [x] Telefone: `(99) 99999-9999`
  - [x] CEP: `99999-999`
  - [x] Data: `99/99/9999`
  - [x] Hora: `99:99`
- [x] Validação integrada com máscara
- [x] Exemplo no person-addresses

**Critérios de Aceitação:**
- Máscaras aplicadas automaticamente ao digitar
- Valor sem máscara enviado ao submit
- Validação respeitando formato da máscara

#### 1.2 Campo `textarea()` ✅
```typescript
descricao: zKUI.textarea("Descrição", {
  rows: 4,
  maxLength: 500
})
```
- [x] Implementar componente Textarea
- [x] Suporte a rows configurável
- [x] Suporte a maxLength
- [ ] Contador de caracteres (opcional)
- [ ] Auto-resize (opcional)

#### 1.3 Campo `currency()` ✅
```typescript
salario: zKUI.currency("Salário", {
  currency: "BRL",
  locale: "pt-BR"
})
```
- [x] Formatação monetária
- [x] Suporte a múltiplas moedas
- [x] Integração com Intl.NumberFormat
- [x] Valor armazenado como número

### Sprint 2: Campo de Relação

#### 2.1 Campo `relation()` - Básico ✅
```typescript
usuarioResponsavel: zKUI.relation("Usuário Responsável", {
  relation: "user",
  provider: "userProvider",
  displayField: "nome",
  valueField: "id"
})
```
- [x] Componente Select básico
- [x] Integração com DataProvider
- [x] Carregar opções do provider
- [x] Display field configurável
- [x] Value field configurável

#### 2.2 Select com Busca ✅
- [x] Implementar @radix-ui/react-select
- [x] Busca assíncrona (via provider)
- [ ] Debounce na busca
- [x] Loading state
- [x] Empty state
- [x] Error state

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

#### 2.4 Exemplo Completo ✅
- [x] Adicionar campo de relação no pessoa.schema
- [x] Criar mock provider para usuários
- [x] Demonstrar no exemplo

### Sprint 3: Campos Adicionais

#### 3.1 Campo `checkbox()` ✅
```typescript
aceitoTermos: zKUI.checkbox("Aceito os termos", {
  required: true
})
```
- [x] Checkbox component estilizado (Radix UI)
- [x] Suporte a labels
- [x] Validação required

#### 3.2 Campo `radio()` ✅
```typescript
genero: zKUI.radio("Gênero", {
  options: [
    { label: "Masculino", value: "M" },
    { label: "Feminino", value: "F" },
    { label: "Outro", value: "O" }
  ]
})
```
- [x] Radio group component (Radix UI)
- [x] Layout vertical
- [x] Opções configuráveis

#### 3.3 Campo `switch()` ✅
```typescript
ativo: zKUI.switch("Ativo")
```
- [x] Switch toggle component (Radix UI)
- [x] Estados on/off
- [x] Labels configuráveis

#### 3.4 Campo `rating()` ✅
```typescript
avaliacao: zKUI.rating("Avaliação", {
  max: 5,
  allowHalf: true
})
```
- [x] Star rating component
- [x] Configurável (5, 10 estrelas)
- [x] Hover effect
- [x] Visual feedback

#### 3.5 Campo `color()` ✅
```typescript
corFavorita: zKUI.color("Cor Favorita")
```
- [x] Color picker component
- [x] Input nativo + campo hex
- [x] Validação formato hex
- [x] Sincronização bidirecional

#### 3.6 Campo `file()` ✅
```typescript
avatar: zKUI.file("Avatar", {
  accept: "image/*",
  maxSize: 5 * 1024 * 1024, // 5MB
  preview: true
})
```
- [x] File upload component (react-dropzone)
- [x] Preview de imagens
- [x] Validação de tipo
- [x] Validação de tamanho
- [x] Múltiplos arquivos
- [x] Drag and drop

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

