# 🚀 Guia de Início Rápido

> Configure o KUI Framework em seu projeto em poucos minutos

## 📋 Pré-requisitos

- Node.js 18+ 
- React 18+
- TypeScript 4.9+
- Tailwind CSS 3.0+

## ⚡ Instalação Rápida

### 1. Instalar Pacotes

```bash
# Usando pnpm (recomendado)
pnpm add @kui-framework/forms @kui-framework/ui @kui-framework/core @kui-framework/zod-extension @kui-framework/theme

# Ou usando npm
npm install @kui-framework/forms @kui-framework/ui @kui-framework/core @kui-framework/zod-extension @kui-framework/theme

# Ou usando yarn
yarn add @kui-framework/forms @kui-framework/ui @kui-framework/core @kui-framework/zod-extension @kui-framework/theme
```

### 2. Configurar Tailwind CSS

```javascript
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

### 3. Importar CSS Global

```css
/* src/app/globals.css ou src/index.css */
@import '@kui-framework/theme/globals.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 🎯 Primeiro Formulário

### 1. Criar Schema

```typescript
// src/schemas/user.schema.ts
import { zKUI } from "@kui-framework/zod-extension";

export const userSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  name: zKUI.text("Nome", { required: true }),
  email: zKUI.email("E-mail", { required: true }),
  age: zKUI.number("Idade"),
  active: zKUI.switch("Ativo"),
});

export type User = typeof userSchema._type;
```

### 2. Criar Componente

```tsx
// src/components/UserForm.tsx
import { FormBuilder } from "@kui-framework/forms";
import { userSchema, type User } from "../schemas/user.schema";

export function UserForm() {
  const handleSubmit = async (data: User) => {
    console.log("Dados enviados:", data);
    // Aqui você faria a chamada para o backend
  };

  return (
    <FormBuilder
      schema={userSchema}
      mode="create"
      onSubmit={handleSubmit}
    />
  );
}
```

### 3. Usar na Página

```tsx
// src/app/page.tsx
import { UserForm } from "@/components/UserForm";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Criar Usuário</h1>
      <UserForm />
    </div>
  );
}
```

## 🎨 Personalização Básica

### Modos de Formulário

```tsx
// Modo Create - Formulário vazio
<FormBuilder
  schema={userSchema}
  mode="create"
  onSubmit={handleSubmit}
/>

// Modo Edit - Formulário preenchido
<FormBuilder
  schema={userSchema}
  mode="edit"
  defaultValues={existingUser}
  onSubmit={handleSubmit}
/>

// Modo View - Somente leitura
<FormBuilder
  schema={userSchema}
  mode="view"
  defaultValues={existingUser}
  onSubmit={() => {}}
/>
```

### Campos Personalizados

```typescript
const customSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  
  // Campo obrigatório com placeholder
  name: zKUI.text("Nome Completo", {
    required: true,
    placeholder: "Digite seu nome completo"
  }),
  
  // Campo com validação
  email: zKUI.email("E-mail", {
    required: true,
    helperText: "Usaremos este e-mail para contato"
  }),
  
  // Campo condicional
  phone: zKUI.text("Telefone", {
    mask: "(99) 99999-9999",
    showIf: (values) => values.email // só aparece se email preenchido
  }),
  
  // Campo calculado
  age: zKUI.number("Idade", {
    derived: true,
    readOnly: true,
    compute: (values) => {
      if (!values.birthDate) return null;
      const today = new Date();
      const birth = new Date(values.birthDate);
      return Math.floor((today - birth) / (365.25 * 24 * 60 * 60 * 1000));
    }
  })
});
```

## 🔌 Integração com Backend

### REST API

```typescript
// src/providers/userProvider.ts
import { createRestProvider, KuiDataProvider } from '@kui-framework/core';

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

// Envolver app
export function App() {
  return (
    <KuiDataProvider providers={[
      { name: 'userProvider', provider: userProvider }
    ]}>
      <UserForm />
    </KuiDataProvider>
  );
}
```

### tRPC

```typescript
// src/providers/userTrpcProvider.ts
import { createTrpcProvider } from '@kui-framework/core';
import { trpc } from '@/lib/trpc';

export const userTrpcProvider = createTrpcProvider({
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
```

## 📱 Layout Responsivo

```typescript
const responsiveSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  
  // Campo ocupa largura total em mobile, metade em desktop
  fullName: zKUI.text("Nome Completo", {
    required: true,
    layout: { xs: 12, md: 6 }
  }),
  
  email: zKUI.email("E-mail", {
    required: true,
    layout: { xs: 12, md: 6 }
  }),
  
  // Campos de 1/3 em desktop
  city: zKUI.text("Cidade", {
    layout: { xs: 12, md: 4 }
  }),
  
  state: zKUI.text("Estado", {
    layout: { xs: 12, md: 4 }
  }),
  
  zipCode: zKUI.text("CEP", {
    mask: "99999-999",
    layout: { xs: 12, md: 4 }
  })
});
```

## 🎯 Próximos Passos

1. **Explore os Componentes**: Veja [Componentes](./components/) para todos os tipos de campos
2. **Aprenda Formulários**: Consulte [Formulários](./forms/) para casos avançados
3. **Customize Temas**: Veja [Temas](./theming/) para personalização
4. **Integre Backend**: Consulte [Integrações](./integrations/) para APIs
5. **Veja Exemplos**: Explore [Exemplos](./examples/) para casos reais

## 🆘 Precisa de Ajuda?

- 📖 **Documentação**: Explore os guias detalhados
- 💬 **Discord**: Junte-se à nossa comunidade
- 🐛 **Issues**: Reporte bugs no GitHub
- 💡 **Discussões**: Partilhe ideias e sugestões

---

**Pronto para começar?** 🚀 Explore os [exemplos completos](../examples/) para ver o KUI Framework em ação!
