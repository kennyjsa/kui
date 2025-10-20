# Person & Addresses Example

Exemplo completo de uso do KUI Framework com demonstração de todos os recursos.

## 🚀 Executar

```bash
pnpm install
pnpm dev
```

Acesse: **http://localhost:3000**

## 📖 Páginas

### 1. **/** - Campos Básicos
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

### 2. **/with-grid** - Grid de Endereços
Demonstra campo `grid()` para sublistas 1:N:
- ✅ Pessoa + Endereços (relação 1:N)
- ✅ CRUD de endereços via modal
- ✅ Tracking de status (novo, editado, excluído)
- ✅ Estado 100% local
- ✅ Persistência única no submit
- ✅ Responsivo (tabela ↔ cards)

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
│   └── Navigation.tsx        → Menu de navegação
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

## 🧪 Como Testar

1. **Página Principal** - Teste todos os tipos de campos
2. **Página Grid** - Adicione, edite e exclua endereços
3. **Console** - Veja os dados JSON ao submeter
4. **Responsive** - Redimensione a janela para ver grid ↔ cards

## 📦 Tecnologias

- Next.js 14 (App Router)
- KUI Framework (todos os pacotes)
- Tailwind CSS
- React Hook Form
- Zod

## 🎓 Aprenda Mais

Veja os arquivos de schema para entender como definir formulários declarativamente com KUI!

