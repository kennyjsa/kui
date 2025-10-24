# 🧩 Componentes

> Documentação completa de todos os componentes disponíveis no KUI Framework

## 📋 Índice

- [Campos Básicos](./fields-basic.md) - Inputs, selects, checkboxes
- [Campos Avançados](./fields-advanced.md) - Upload, rating, color picker
- [Layout](./layout.md) - Grid, sections, tabs, accordion
- [Feedback](./feedback.md) - Toast, dialogs, loading states
- [Navegação](./navigation.md) - Breadcrumbs, pagination
- [Acessibilidade](./accessibility.md) - ARIA, focus management
- [Elevation](./elevation.md) - Sistema de elevação e profundidade

## 🎯 Visão Geral

O KUI Framework oferece mais de 50 componentes prontos para uso, todos baseados no Radix UI para máxima acessibilidade e customização.

### ✨ Características

- **Type-Safe**: Todos os componentes são totalmente tipados
- **Acessível**: Baseado no Radix UI com ARIA completo
- **Customizável**: Variantes, tamanhos e temas
- **Elevation**: Sistema de elevação para hierarquia visual
- **Responsivo**: Layout adaptativo automático
- **SSR Safe**: Compatível com Next.js e outros frameworks

## 🚀 Uso Rápido

```tsx
import { 
  Button, 
  Input, 
  Select, 
  Checkbox,
  Toast,
  Dialog 
} from "@kui-framework/ui";

// Componentes básicos
<Button variant="primary" size="lg">Clique aqui</Button>
<Input placeholder="Digite algo..." />
<Select options={options} />

// Feedback
<Toast.success("Operação realizada!") />
<Dialog.confirm("Deseja continuar?") />
```

## 📦 Instalação

```bash
pnpm add @kui-framework/ui @kui-framework/theme
```

## 🎨 Personalização

Todos os componentes suportam:

- **Variantes**: `default`, `primary`, `secondary`, `destructive`
- **Tamanhos**: `sm`, `md`, `lg`
- **Estados**: `default`, `hover`, `focus`, `disabled`
- **Temas**: Customização completa via CSS variables

## 📚 Próximos Passos

1. **Campos Básicos**: Comece com inputs e selects
2. **Layout**: Organize com grid e sections
3. **Feedback**: Adicione toast e dialogs
4. **Navegação**: Implemente breadcrumbs e pagination
5. **Acessibilidade**: Garanta experiência inclusiva

---

**Explore os componentes individuais para exemplos detalhados e casos de uso!**
