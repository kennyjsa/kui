# @kui/ui

Componentes visuais base do KUI Framework.

## Instalação

```bash
pnpm add @kui/ui
```

## Componentes

### Button

```tsx
import { Button } from "@kui/ui";

<Button variant="default">Click me</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost" size="sm">Small Ghost</Button>
```

### Input

```tsx
import { Input } from "@kui/ui";

<Input type="text" placeholder="Digite aqui..." />
<Input type="email" />
```

### Label

```tsx
import { Label } from "@kui/ui";

<Label htmlFor="name">Nome</Label>
<Input id="name" />
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@kui/ui";

<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent>
    Conteúdo do card
  </CardContent>
</Card>
```

### Badge

```tsx
import { Badge } from "@kui/ui";

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
```

