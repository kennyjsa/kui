# @kui-framework/ui

Componentes UI KUI Framework - Biblioteca React com Radix UI e Tailwind CSS.

## 📦 Instalação

```bash
npm install @kui-framework/ui @kui-framework/theme react react-dom
# or
pnpm add @kui-framework/ui @kui-framework/theme react react-dom
```

## 🚀 Uso

```typescript
import { Button, Input, Label, Card } from '@kui-framework/ui';

function MyForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Meu Formulário</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input id="name" placeholder="Digite seu nome" />
          </div>
          
          <Button type="submit">Salvar</Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

## 🎨 Componentes Disponíveis

### Form Elements
- `Input` - Campo de texto
- `MaskedInput` - Input com máscara
- `Textarea` - Área de texto
- `CurrencyInput` - Input monetário
- `Label` - Rótulo de campo

### Selection
- `Select` - Seletor dropdown
- `Checkbox` - Caixa de seleção
- `RadioGroup` - Grupo de opções
- `Switch` - Toggle on/off

### Specialized
- `Rating` - Avaliação com estrelas
- `ColorPicker` - Seletor de cores
- `FileUpload` - Upload de arquivos

### Layout
- `Card` - Container de conteúdo
- `Badge` - Tags e status
- `Dialog` - Modal/Dialog
- `Button` - Botões com variantes

### Feedback
- `Skeleton` - Loading placeholder
- `FormSkeleton` - Skeleton de formulário
- `GridSkeleton` - Skeleton de tabela
- `ErrorBoundary` - Tratamento de erros

### Navigation
- `SimplePagination` - Paginação simples

## 🎯 Features

- ✅ Baseado em **Radix UI** (acessibilidade)
- ✅ Estilizado com **Tailwind CSS**
- ✅ **Variantes** configuráveis
- ✅ **TypeScript** com tipos completos
- ✅ **Tree-shakeable**
- ✅ **SSR-ready**

## 📄 Licença

MIT © Kenny JSA
