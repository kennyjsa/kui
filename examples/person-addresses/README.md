# KUI Framework Showcase

Demonstração completa de todos os componentes e recursos do KUI Framework.

## 🚀 Executar

```bash
pnpm install
pnpm dev
```

Acesse: **http://localhost:3000**

## 📖 Páginas

### 1. **/** - Campos Básicos (Formulário Pessoa)
Demonstra todos os tipos de campos disponíveis:
- ✅ **identifier** - ID (oculto no create)
- ✅ **text** - Texto simples (Nome)
- ✅ **text + mask** - CPF e Telefone com máscaras
- ✅ **date** - Data de Nascimento
- ✅ **number + derived** - Idade (calculada automaticamente)
- ✅ **email** - E-mail com validação
- ✅ **textarea** - Observações
- ✅ **currency** - Salário com formatação R$
- ✅ **relation** - Usuário Responsável (select com provider)
- ✅ **checkbox** - Aceita Termos
- ✅ **radio** - Estado Civil
- ✅ **switch** - Cadastro Ativo
- ✅ **rating** - Avaliação (estrelas)
- ✅ **color** - Cor Favorita
- ✅ **file** - Foto de Perfil (upload)

### 2. **/with-basic-components** - Componentes Básicos
Demonstra todos os componentes básicos do KUI Framework:
- ✅ **Botões** - Todas as variações e tamanhos
- ✅ **Inputs** - Text, email, password, currency, masked
- ✅ **Seleção** - Select, checkboxes, radio, switch
- ✅ **Interativos** - Rating, color picker, file upload
- ✅ **Status** - Badges, skeletons, loading states
- ✅ **Formulário Completo** - Exemplo prático

### 3. **/with-grid** - Grid de Endereços
Demonstra campo `grid()` para sublistas 1:N:
- ✅ Pessoa + Endereços (relação 1:N)
- ✅ CRUD de endereços via modal
- ✅ Tracking de status (novo, editado, excluído)
- ✅ Estado 100% local
- ✅ Persistência única no submit
- ✅ Responsivo (tabela ↔ cards)

### 4. **/with-toast** - Toast Notifications
Demonstra sistema de notificações não bloqueantes:
- ✅ API fluida: `toast.info()`, `toast.success()`, `toast.error()`, `toast.warning()`
- ✅ Toast customizados com variantes
- ✅ Cenários reais de uso
- ✅ Múltiplos toasts simultâneos
- ✅ Compatível com SSR

### 5. **/with-dialogs** - Dialog System
Demonstra sistema de interações bloqueantes:
- ✅ API fluida: `dialog.alert()`, `dialog.confirm()`, `dialog.options()`
- ✅ Alert dialogs (simples e detalhados)
- ✅ Confirm dialogs (confirmações binárias)
- ✅ Options dialogs (múltiplas escolhas)
- ✅ Variantes visuais (success, warning, error, info)
- ✅ Compatível com SSR

### 6. **/with-empty-states** - Empty States
Demonstra componentes para estados vazios:
- ✅ Empty State básico com ações contextuais
- ✅ Grid Empty States para listas vazias
- ✅ Search Empty States para busca sem resultados
- ✅ Empty States específicos por domínio (Documentos, Usuários, Produtos, etc.)
- ✅ Error Empty States para tratamento de erros
- ✅ Customização completa (título, descrição, ações, ícones)
- ✅ Melhores práticas de UX

## 🎯 Modos de Formulário

| Modo | Comportamento |
|------|---------------|
| **Create** | Campos editáveis, ID oculto, valores vazios |
| **Edit** | Campos editáveis, CPF readonly, valores preenchidos |
| **View** | Todos os campos readonly |

## 🏗️ Estrutura

```
src/
├── app/
│   ├── page.tsx              → Campos básicos
│   ├── with-grid/
│   │   └── page.tsx          → Exemplo com grid
│   ├── layout.tsx            → Layout com navegação
│   └── globals.css           → Estilos globais
├── components/
│   ├── Sidebar.tsx           → Menu lateral de navegação
│   ├── Header.tsx            → Cabeçalho da aplicação
│   └── AppLayout.tsx         → Layout principal
├── schemas/
│   ├── pessoa.schema.ts            → Schema de pessoa
│   ├── endereco.schema.ts          → Schema de endereço
│   └── pessoaComEndereco.schema.ts → Pessoa + Grid de endereços
└── providers/
    └── mockUserProvider.ts   → Provider mock para exemplo
```

## ✨ Features Demonstradas

### Campos Avançados
- Máscaras automáticas (CPF, telefone, CEP)
- Formatação monetária
- Campos calculados (derived)
- Upload de arquivos com preview
- Color picker
- Star rating

### Grid/Sublistas
- Gerenciamento de array local
- CRUD via modal
- Tracking de mudanças
- Validações (minItems, maxItems)
- Responsivo

### Relações
- Select integrado com DataProvider
- Loading/error states
- Mock provider de exemplo

### Toast System (Notificações)
- API fluida: `toast.info()`, `toast.success()`, `toast.error()`, `toast.warning()`
- Toast customizados com variantes
- Múltiplos toasts simultâneos
- Compatível com SSR (Server-Side Rendering)
- Baseado no Radix UI

### Dialog System (Interações)
- API fluida: `dialog.alert()`, `dialog.confirm()`, `dialog.options()`
- Alert dialogs (simples e detalhados)
- Confirm dialogs (confirmações binárias)
- Options dialogs (múltiplas escolhas)
- Variantes visuais (success, warning, error, info)
- Compatível com SSR (Server-Side Rendering)
- Baseado no Radix UI

### Empty States (Estados Vazios)
- Empty State básico com ações contextuais
- Grid Empty States para listas vazias
- Search Empty States para busca sem resultados
- Empty States específicos por domínio
- Error Empty States para tratamento de erros
- Customização completa (título, descrição, ações, ícones)
- Melhores práticas de UX

## 🧪 Como Testar

1. **Página Principal** - Teste todos os tipos de campos
2. **Página Grid** - Adicione, edite e exclua endereços
3. **Página Toast** - Teste notificações não bloqueantes
4. **Página Dialogs** - Teste interações bloqueantes
5. **Página Empty States** - Teste estados vazios e suas ações
6. **Console** - Veja os dados JSON ao submeter
7. **Responsive** - Redimensione a janela para ver grid ↔ cards

## 📦 Tecnologias

- Next.js 14 (App Router)
- KUI Framework (todos os pacotes)
- Tailwind CSS
- React Hook Form
- Zod

## 🎓 Aprenda Mais

Veja os arquivos de schema para entender como definir formulários declarativamente com KUI!

