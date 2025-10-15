# 🎨 Temas - Design System

O KUI Framework oferece um sistema completo de temas com tokens, variantes e personalização.

## 🚀 Características

- ✅ **Design Tokens**: Cores, espaçamento, tipografia
- ✅ **Temas**: Light, dark, custom
- ✅ **Variantes**: Primary, secondary, destructive
- ✅ **Elevação**: 5 níveis de profundidade
- ✅ **Responsividade**: Mobile-first design
- ✅ **Customização**: CSS variables e Tailwind

## 📦 Instalação

```bash
pnpm add @kui-framework/theme
```

## 🎯 Configuração

### 1. Tailwind CSS

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

### 2. CSS Global

```css
/* globals.css */
@import '@kui-framework/theme/globals.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 🎨 Design Tokens

### Cores

```tsx
// Cores primárias
<div className="bg-primary text-primary-foreground">Primário</div>
<div className="bg-secondary text-secondary-foreground">Secundário</div>
<div className="bg-muted text-muted-foreground">Muted</div>

// Cores de estado
<div className="bg-destructive text-destructive-foreground">Erro</div>
<div className="bg-success text-success-foreground">Sucesso</div>
<div className="bg-warning text-warning-foreground">Aviso</div>
<div className="bg-info text-info-foreground">Info</div>
```

### Espaçamento

```tsx
// Padding
<div className="p-4">Padding 4</div>
<div className="p-6">Padding 6</div>
<div className="p-8">Padding 8</div>

// Margin
<div className="m-4">Margin 4</div>
<div className="m-6">Margin 6</div>
<div className="m-8">Margin 8</div>

// Gap
<div className="gap-4">Gap 4</div>
<div className="gap-6">Gap 6</div>
<div className="gap-8">Gap 8</div>
```

### Tipografia

```tsx
// Títulos
<h1 className="text-4xl font-bold">Título Grande</h1>
<h2 className="text-3xl font-semibold">Título Médio</h2>
<h3 className="text-2xl font-medium">Título Pequeno</h3>

// Texto
<p className="text-lg">Texto Grande</p>
<p className="text-base">Texto Normal</p>
<p className="text-sm">Texto Pequeno</p>
<p className="text-xs">Texto Muito Pequeno</p>

// Cores de texto
<p className="text-muted-foreground">Texto Muted</p>
<p className="text-destructive">Texto de Erro</p>
<p className="text-success">Texto de Sucesso</p>
```

## 🌙 Temas

### Light Theme (Padrão)

```tsx
// O tema light é aplicado por padrão
<div className="bg-background text-foreground">
  <h1 className="text-foreground">Título</h1>
  <p className="text-muted-foreground">Descrição</p>
</div>
```

### Dark Theme

```tsx
// Aplicar tema dark
<html className="dark">
  <body>
    <div className="bg-background text-foreground">
      <h1 className="text-foreground">Título</h1>
      <p className="text-muted-foreground">Descrição</p>
    </div>
  </body>
</html>
```

### Toggle de Tema

```tsx
import { useTheme } from '@kui-framework/ui';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? '☀️' : '🌙'}
    </Button>
  );
}
```

## 🎛️ Variantes

### Botões

```tsx
// Variantes de botão
<Button variant="default">Padrão</Button>
<Button variant="secondary">Secundário</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destrutivo</Button>

// Tamanhos
<Button size="sm">Pequeno</Button>
<Button size="md">Médio</Button>
<Button size="lg">Grande</Button>
```

### Cards

```tsx
// Variantes de card
<Card variant="default">Padrão</Card>
<Card variant="outline">Outline</Card>
<Card variant="ghost">Ghost</Card>

// Tamanhos
<Card size="sm">Pequeno</Card>
<Card size="md">Médio</Card>
<Card size="lg">Grande</Card>
```

### Badges

```tsx
// Variantes de badge
<Badge variant="default">Padrão</Badge>
<Badge variant="secondary">Secundário</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destrutivo</Badge>

// Tamanhos
<Badge size="sm">Pequeno</Badge>
<Badge size="md">Médio</Badge>
```

## 📐 Elevação

### Níveis de Elevação

```tsx
// 5 níveis de elevação
<Card elevation="none">Sem elevação</Card>
<Card elevation="sm">Elevação pequena</Card>
<Card elevation="md">Elevação média</Card>
<Card elevation="lg">Elevação grande</Card>
<Card elevation="xl">Elevação extra grande</Card>
```

### Uso Prático

```tsx
// Modal com alta elevação
<Dialog>
  <DialogContent elevation="xl">
    <DialogHeader>
      <DialogTitle>Modal</DialogTitle>
    </DialogHeader>
  </DialogContent>
</Dialog>

// Card com elevação média
<Card elevation="md">
  <CardContent>
    <p>Conteúdo do card</p>
  </CardContent>
</Card>

// Botão com elevação pequena
<Button elevation="sm">
  Botão com elevação
</Button>
```

## 📱 Responsividade

### Breakpoints

```tsx
// Grid responsivo
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</div>

// Espaçamento responsivo
<div className="p-4 md:p-6 lg:p-8">
  <h1 className="text-2xl md:text-3xl lg:text-4xl">Título</h1>
  <p className="text-sm md:text-base lg:text-lg">Descrição</p>
</div>

// Visibilidade responsiva
<div className="hidden md:block">Visível apenas em desktop</div>
<div className="block md:hidden">Visível apenas em mobile</div>
```

### Mobile-First

```tsx
// Abordagem mobile-first
<div className="
  flex flex-col
  md:flex-row
  lg:space-x-4
  space-y-4 md:space-y-0
">
  <div className="flex-1">Conteúdo principal</div>
  <div className="w-full md:w-64">Sidebar</div>
</div>
```

## 🎨 Customização

### CSS Variables

```css
/* globals.css */
:root {
  --primary: 210 40% 50%;
  --primary-foreground: 0 0% 100%;
  --secondary: 210 40% 90%;
  --secondary-foreground: 210 40% 10%;
}

.dark {
  --primary: 210 40% 60%;
  --primary-foreground: 0 0% 100%;
  --secondary: 210 40% 20%;
  --secondary-foreground: 210 40% 90%;
}
```

### Tailwind Config

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
      },
    },
  },
};
```

### Componentes Customizados

```tsx
// Botão customizado
<Button 
  className="bg-purple-600 hover:bg-purple-700 text-white"
  variant="custom"
>
  Botão Personalizado
</Button>

// Card customizado
<Card className="border-2 border-dashed border-gray-300">
  <CardContent>
    <p>Card com borda tracejada</p>
  </CardContent>
</Card>
```

## 🚀 Exemplos Completos

Veja exemplos completos no [Showcase](../examples/kui-showcase/):

- **[Sistema de Elevação](../examples/kui-showcase/src/app/with-elevation/page.tsx)**
- **[Temas e Tokens](../examples/kui-showcase/src/app/with-themes/page.tsx)**
- **[Responsividade](../examples/kui-showcase/src/app/with-responsive/page.tsx)**

## 🆘 Troubleshooting

### Problemas Comuns

1. **Tema não aplica**
   ```tsx
   // Certifique-se de que o CSS está importado
   @import '@kui-framework/theme/globals.css';
   ```

2. **Cores não funcionam**
   ```tsx
   // Verifique se o Tailwind está configurado
   import kuiPreset from '@kui-framework/theme/tailwind';
   ```

3. **Responsividade não funciona**
   ```tsx
   // Use classes responsivas do Tailwind
   <div className="grid grid-cols-1 md:grid-cols-2">
   ```

### Debug

```tsx
// Adicione logs para debug
const { theme } = useTheme();
console.log('Tema atual:', theme);
```

---

**🎉 Pronto!** Agora você tem um sistema completo de temas. Explore os [exemplos](../examples/kui-showcase/) para ver mais casos de uso!
