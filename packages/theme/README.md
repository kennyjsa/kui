# @kui/theme

Tema e design tokens do KUI Framework.

## Instalação

```bash
pnpm add @kui/theme tailwindcss
```

## Configuração

### Tailwind

```javascript
// tailwind.config.js
module.exports = {
  presets: [require("@kui/theme/tailwind")],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@kui/**/*.{js,jsx,ts,tsx}",
  ],
};
```

### CSS Global

```css
/* globals.css */
@import "@kui/theme/dist/globals.css";
```

## Tokens

```typescript
import { kuiTokens } from "@kui/theme";

console.log(kuiTokens.colors.primary[500]); // #0ea5e9
```

## Cores

- `primary` - Azul (cor principal)
- `secondary` - Cinza
- `success` - Verde
- `warning` - Amarelo
- `error` - Vermelho

