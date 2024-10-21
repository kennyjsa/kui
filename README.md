# 🧩 KUI Framework

> **KUI (Kinetic UI Framework)** — Framework declarativo para construção de formulários, grids e CRUD em React com type-safety completo.

[![Version](https://img.shields.io/npm/v/@kui-framework/forms?label=version)](https://www.npmjs.com/package/@kui-framework/forms)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/kennyjsa/kui/blob/develop/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://www.typescriptlang.org/)

---

## ✨ Features

- 🎯 **Geração automática de UI** a partir de schemas Zod
- 🎨 **18 tipos de campos** prontos para uso
- 🔐 **Type-safety** completo end-to-end
- 🔄 **Integração backend** (REST e tRPC)
- 📱 **Responsivo** por padrão
- ♿ **Acessível** com Radix UI
- ⚡ **Performance** otimizada
- 🎭 **3 modos** (create, edit, view)

---

## 📦 Instalação

```bash
npm install @kui-framework/forms @kui-framework/ui @kui-framework/core @kui-framework/zod-extension
# ou
pnpm add @kui-framework/forms @kui-framework/ui @kui-framework/core @kui-framework/zod-extension
# ou
yarn add @kui-framework/forms @kui-framework/ui @kui-framework/core @kui-framework/zod-extension
```

### Setup Tailwind

```js
// tailwind.config.js
import kuiPreset from '@kui-framework/theme/tailwind';

export default {
  presets: [kuiPreset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@kui-framework/**/*.{js,mjs}',
  ],
};
```

```css
/* globals.css */
@import '@kui-framework/theme/globals.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🚀 Quick Start

### Desenvolvimento Local

```bash
# Clone o repositório
git clone https://github.com/kennyjsa/kui.git
cd kui

# Instalar dependências
pnpm install

# Build
pnpm build

# Executar exemplo
cd examples/person-addresses
pnpm dev
```

Acesse: http://localhost:3000

## 📖 Exemplo de Uso

### 1. Defina um Schema

```typescript
import { zKUI } from "@kui-framework/zod-extension";

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
import { FormBuilder } from "@kui-framework/forms";

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

### 📋 Tipos de Campos (18)

**Básicos:**  
`identifier` • `text` • `number` • `date` • `email` • `password` • `boolean` • `select`

**Avançados:**  
`textarea` • `currency` • `checkbox` • `radio` • `switch` • `rating` • `color` • `file`

**Especiais:**  
`relation` (relacionamentos) • `grid` (sublistas 1:N)

### ⚙️ Opções Declarativas

**Visibilidade:**  
`hiddenIn` • `readOnly` • `readOnlyIn` • `showIf` (condicional)

**Validação:**  
`required` • `mask` • `.refine()` (cross-field)

**Comportamento:**  
`derived` (calculado) • `compute` (função) • `transient` (não persistido)

**Grid:**  
`pageSize` • `columns` • `allowCreate` • `allowEdit` • `allowDelete`

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
