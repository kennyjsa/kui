# 🧩 KUI Framework

**KUI (Kinetic UI Framework)** — Framework de UI declarativa para construção de formulários, grids e layouts administrativos em React.

## 🎯 Características

- 🔧 **Declarativo**: Baseado em schemas Zod com metadados
- 🎨 **Componentes prontos**: Form builder, field renderer, grids
- 🔗 **Integração**: tRPC, REST APIs
- 💅 **Design System**: Tailwind CSS + ShadCN
- 📦 **Monorepo**: Arquitetura modular com Turborepo
- 🌐 **TypeScript**: Type-safe end-to-end

## 📦 Pacotes

| Pacote | Descrição |
|--------|-----------|
| `@kui/zod-extension` | Extensões declarativas do Zod |
| `@kui/core` | Providers e registry de dados |
| `@kui/theme` | Tema e design tokens |
| `@kui/ui` | Componentes visuais base |
| `@kui/forms` | Form builder e field renderer |

## 🚀 Quick Start

### Instalação

```bash
pnpm install
pnpm build
```

### Executar Exemplo

```bash
cd examples/person-addresses
pnpm dev
```

Acesse: http://localhost:3000

## 📖 Exemplo de Uso

### 1. Defina um Schema

```typescript
import { zKUI } from "@kui/zod-extension";

const userSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  name: zKUI.text("Nome", { required: true }),
  email: zKUI.email("E-mail", { required: true }),
  age: zKUI.number("Idade", {
    derived: true,
    compute: (values) => calculateAge(values.birthDate)
  }),
});
```

### 2. Use o FormBuilder

```tsx
import { FormBuilder } from "@kui/forms";

function UserForm() {
  return (
    <FormBuilder
      schema={userSchema}
      mode="create"
      onSubmit={async (data) => {
        console.log(data);
      }}
    />
  );
}
```

## 🏗️ Estrutura

```
kui/
├── packages/
│   ├── zod-extension/  → Extensões Zod
│   ├── core/           → Providers e registry
│   ├── theme/          → Design tokens
│   ├── ui/             → Componentes base
│   └── forms/          → Form builder
└── examples/
    └── person-addresses/ → Exemplo completo
```

## 🌿 Branches

- `main` — Versão estável
- `develop` — Desenvolvimento principal
- `feature/*` — Novas funcionalidades
- `hotfix/*` — Correções urgentes

## 🛠️ Desenvolvimento

```bash
# Instalar dependências
pnpm install

# Build todos os pacotes
pnpm build

# Modo desenvolvimento (watch)
pnpm dev

# Lint
pnpm lint

# Format
pnpm format
```

## 📝 Conceitos

### Modos de Formulário

- **create**: Criação de novo registro
- **edit**: Edição de registro existente
- **view**: Visualização (readonly)

### Tipos de Campos

- `identifier()` — ID (sempre readonly)
- `text()` — Texto
- `number()` — Número
- `date()` — Data
- `email()` — E-mail
- `password()` — Senha
- `boolean()` — Boolean
- `select()` — Seleção
- `relation()` — Relação/Associação
- `grid()` — Grid (sublista 1:N)

### Comportamentos Declarativos

- `readOnly` — Campo somente leitura
- `readOnlyIn` — Readonly em modos específicos
- `hiddenIn` — Oculto em modos específicos
- `derived` — Campo calculado
- `transient` — Não persistido
- `required` — Campo obrigatório

## 📄 Licença

MIT License - veja [LICENSE](LICENSE)

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

Desenvolvido com ❤️ usando React, TypeScript, Zod, Tailwind CSS
