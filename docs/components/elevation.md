# Sistema de Elevation

O sistema de elevation do KUI foi projetado para criar hierarquia visual e profundidade na interface, seguindo as melhores práticas do Material UI e Atlassian Design System.

## Visão Geral

O elevation é uma propriedade que controla a sombra e o z-index dos componentes, criando a ilusão de profundidade e ajudando a estabelecer a hierarquia visual na interface.

## Níveis de Elevation

### 0 - Plano
- **Shadow**: `none`
- **Z-Index**: `0`
- **Uso**: Elementos no mesmo nível, sem elevação

### 1 - Sutil
- **Shadow**: `0 1px 2px 0 rgb(0 0 0 / 0.05), 0 1px 3px 0 rgb(0 0 0 / 0.1)`
- **Z-Index**: `1`
- **Uso**: Estados de hover, elementos discretos

### 2 - Baixo
- **Shadow**: `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px 0 rgb(0 0 0 / 0.06)`
- **Z-Index**: `10`
- **Uso**: Cards padrão, elementos principais

### 3 - Médio
- **Shadow**: `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)`
- **Z-Index**: `20`
- **Uso**: Dropdowns, selects, elementos destacados

### 4 - Alto
- **Shadow**: `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)`
- **Z-Index**: `30`
- **Uso**: Modais, dialogs, elementos flutuantes

### 5 - Máximo
- **Shadow**: `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)`
- **Z-Index**: `40`
- **Uso**: Overlays, elementos que ficam acima de tudo

## Componentes que Suportam Elevation

### Card
```tsx
import { Card } from "@kui/ui";

// Elevation padrão: 2
<Card>Conteúdo</Card>

// Elevation customizada
<Card elevation={4}>Conteúdo com elevation alta</Card>
```

### Dialog/DialogContent
```tsx
import { Dialog, DialogContent } from "@kui/ui";

// Elevation padrão: 4
<Dialog>
  <DialogContent elevation={4}>
    Conteúdo do dialog
  </DialogContent>
</Dialog>
```

### SelectContent
```tsx
import { Select, SelectContent } from "@kui/ui";

// Elevation padrão: 3
<Select>
  <SelectContent elevation={3}>
    <SelectItem value="option1">Opção 1</SelectItem>
  </SelectContent>
</Select>
```

### Button
```tsx
import { Button } from "@kui/ui";

// Elevation opcional (apenas para variantes default, destructive, secondary)
<Button elevation={2}>Botão com elevation</Button>
<Button variant="ghost">Botão sem elevation (não aplicável)</Button>
```

### Badge
```tsx
import { Badge } from "@kui/ui";

// Elevation opcional
<Badge elevation={2}>Badge com elevation</Badge>
<Badge>Badge sem elevation</Badge>
```

### Tabs
```tsx
import { Tabs } from "@kui/ui";

// Elevation opcional (apenas para variantes card e pills)
<Tabs variant="card" elevation={2}>
  {/* itens das tabs */}
</Tabs>
```

## Utilitários de Elevation

### useElevation Hook
```tsx
import { useElevation } from "@kui/ui";

function MyComponent() {
  const { elevationClasses, elevationStyles } = useElevation(3);
  
  return (
    <div 
      className={elevationClasses}
      style={elevationStyles}
    >
      Conteúdo com elevation
    </div>
  );
}
```

### Funções Utilitárias
```tsx
import { 
  getElevationClasses, 
  applyElevation, 
  getElevationTailwindClasses 
} from "@kui/ui";

// Obter configuração de elevation
const config = getElevationClasses(3);
console.log(config.shadow, config.zIndex);

// Aplicar elevation como estilos inline
const styles = applyElevation(3);

// Obter classes Tailwind para elevation
const classes = getElevationTailwindClasses(3);
```

## Melhores Práticas

### 1. Hierarquia Visual
- Use elevation para criar hierarquia visual clara
- Elementos mais importantes devem ter elevation maior
- Mantenha consistência na aplicação de elevation

### 2. Contexto de Uso
- **Elevation 0-1**: Elementos no mesmo nível ou estados de hover
- **Elevation 2**: Cards e elementos principais da interface
- **Elevation 3**: Dropdowns e elementos interativos
- **Elevation 4**: Modais e dialogs
- **Elevation 5**: Overlays e elementos de sistema

### 3. Acessibilidade
- Não dependa apenas de elevation para comunicar hierarquia
- Combine elevation com outras indicações visuais (cores, tipografia)
- Mantenha contraste adequado para usuários com dificuldades visuais

### 4. Performance
- Use elevation apenas quando necessário
- Evite mudanças frequentes de elevation em animações
- Prefira elevation estática para elementos que não mudam de estado

## Exemplos de Uso

### Dashboard com Cards
```tsx
function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <Card elevation={2}>
        <CardHeader>
          <CardTitle>Estatísticas Gerais</CardTitle>
        </CardHeader>
        <CardContent>
          {/* conteúdo */}
        </CardContent>
      </Card>
      
      <Card elevation={3}>
        <CardHeader>
          <CardTitle>Alertas Importantes</CardTitle>
        </CardHeader>
        <CardContent>
          {/* conteúdo */}
        </CardContent>
      </Card>
    </div>
  );
}
```

### Modal com Elevation
```tsx
function UserModal() {
  return (
    <Dialog>
      <DialogContent elevation={4}>
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
        </DialogHeader>
        {/* formulário */}
      </DialogContent>
    </Dialog>
  );
}
```

### Tabs com Elevation
```tsx
function SettingsPage() {
  const tabs = [
    { id: "general", label: "Geral", content: <GeneralSettings /> },
    { id: "security", label: "Segurança", content: <SecuritySettings /> },
  ];

  return (
    <Tabs variant="card" elevation={2} items={tabs} />
  );
}
```

## Considerações Técnicas

### Tailwind CSS
O sistema de elevation usa classes Tailwind CSS customizadas para aplicar sombras e z-index:

```css
/* Exemplo de classes geradas */
.elevation-2 {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px 0 rgb(0 0 0 / 0.06);
  z-index: 10;
}
```

### Z-Index Management
O sistema de elevation inclui um sistema de z-index hierárquico que evita conflitos:

- Elevation 0: z-index 0
- Elevation 1: z-index 1  
- Elevation 2: z-index 10
- Elevation 3: z-index 20
- Elevation 4: z-index 30
- Elevation 5: z-index 40

### Responsividade
O sistema de elevation funciona consistentemente em diferentes tamanhos de tela, mantendo a hierarquia visual em dispositivos móveis e desktop.
