# 📚 KUI Framework - Documentação

> Framework de UI Declarativa para React - Documentação completa e exemplos práticos

## 🎯 Visão Geral

O **KUI Framework** é uma solução moderna para construção de formulários e interfaces CRUD em React, baseada em schemas declarativos com Zod e metadados.

### ✨ Principais Características

- 🚀 **Declarativo**: Defina schemas e gere interfaces automaticamente
- 🔒 **Type-Safe**: TypeScript completo com validação Zod
- 🎨 **Customizável**: Temas e componentes personalizáveis
- 📱 **Responsivo**: Layout adaptativo para todos os dispositivos
- ♿ **Acessível**: Baseado no Radix UI para máxima acessibilidade
- 🔌 **Integrável**: Suporte nativo para REST APIs e tRPC

## 📖 Documentação

### 🚀 [Guia de Início Rápido](./getting-started.md)
Comece aqui para configurar o KUI Framework em seu projeto.

### 🧩 [Componentes](./components/)
Documentação completa de todos os componentes disponíveis.

### 📝 [Formulários](./forms/)
Como criar e gerenciar formulários com o KUI Framework.

### 🎨 [Temas e Customização](./theming/)
Personalize a aparência dos componentes.

### 🔌 [Integrações](./integrations/)
Conecte com REST APIs, tRPC e outros backends.

### 📚 [Exemplos](./examples/)
Projetos completos e casos de uso reais.

## 🏗️ Arquitetura

```
Schema (Zod + Metadados)
    ↓
FormBuilder (Gerador de UI)
    ↓
Componentes UI (Inputs, Selects, etc)
```

## 🚀 Exemplo Rápido

```tsx
import { FormBuilder } from "@kui-framework/forms";
import { zKUI } from "@kui-framework/zod-extension";

// 1. Defina o schema
const userSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  name: zKUI.text("Nome", { required: true }),
  email: zKUI.email("E-mail", { required: true }),
  age: zKUI.number("Idade"),
});

// 2. Use o FormBuilder
export function UserForm() {
  return (
    <FormBuilder
      schema={userSchema}
      mode="create"
      onSubmit={(data) => console.log(data)}
    />
  );
}
```

## 📦 Instalação

```bash
# Instalar pacotes principais
pnpm add @kui-framework/forms @kui-framework/ui @kui-framework/core @kui-framework/zod-extension @kui-framework/theme

# Configurar Tailwind
# Adicionar ao tailwind.config.js
import kuiPreset from '@kui-framework/theme/tailwind';

export default {
  presets: [kuiPreset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@kui-framework/**/*.{js,mjs}',
  ],
};

# Importar CSS global
@import '@kui-framework/theme/globals.css';
```

## 🎯 Casos de Uso

- **Formulários de Cadastro**: Criação rápida de formulários complexos
- **CRUD Completo**: Interfaces de gestão de dados
- **Dashboards**: Painéis administrativos
- **APIs de Integração**: Conecte com qualquer backend
- **Aplicações Empresariais**: Soluções robustas e escaláveis

## 🤝 Contribuindo

Contribuições são bem-vindas! Veja nosso [Guia de Contribuição](./contributing.md) para mais detalhes.

## 📄 Licença

MIT License - veja [LICENSE](../LICENSE) para detalhes.

---

**Desenvolvido com ❤️ pela equipe KUI Framework**
