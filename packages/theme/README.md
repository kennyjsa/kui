# @kui/theme

Sistema de temas KUI Framework - Design tokens, Tailwind preset e estilos globais.

## 📦 Instalação

```bash
npm install @kui/theme tailwindcss
# or
pnpm add @kui/theme tailwindcss
```

## 🚀 Setup

### 1. Configurar Tailwind

```js
// tailwind.config.js
import kuiPreset from '@kui/theme/tailwind';

export default {
  presets: [kuiPreset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@kui/**/*.{js,mjs}',
  ],
};
```

### 2. Importar Estilos Globais

```css
/* app/globals.css */
@import '@kui/theme/globals.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 🎨 Design Tokens

### Cores

```css
/* Light mode */
--background: 0 0% 100%;
--foreground: 222.2 84% 4.9%;
--primary: 222.2 47.4% 11.2%;
--muted: 210 40% 96.1%;
--destructive: 0 84.2% 60.2%;

/* Dark mode */
[class~="dark"] {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... */
}
```

### Espaçamentos

Usa escala padrão do Tailwind:
- `spacing`: 0.25rem increments
- `borderRadius`: sm, md, lg, xl

### Tipografia

```css
--font-sans: 'Inter', system-ui, sans-serif;
```

## 🎯 Features

- ✅ **Design system** completo
- ✅ **Dark mode** pronto
- ✅ **Tailwind preset** configurado
- ✅ **CSS variables** customizáveis
- ✅ **Animações** incluídas

## 📄 Licença

MIT © Kenny JSA
