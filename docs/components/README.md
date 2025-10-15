# 🧩 Componentes UI - Biblioteca Completa

O KUI Framework oferece uma biblioteca completa de componentes UI baseados em Radix UI, com design system consistente e acessibilidade integrada.

## 🚀 Características

- ✅ **50+ Componentes**: Inputs, botões, cards, modais, etc.
- ✅ **Acessibilidade**: ARIA labels e navegação por teclado
- ✅ **Design System**: Tokens, temas e elevação
- ✅ **Responsivo**: Mobile-first design
- ✅ **Customizável**: Variantes e tamanhos
- ✅ **TypeScript**: Tipagem completa

## 📦 Instalação

```bash
pnpm add @kui-framework/ui @kui-framework/theme
```

## 🎯 Uso Básico

### 1. Importar Componentes

```tsx
import { 
  Button, 
  Input, 
  Card, 
  Badge,
  Dialog,
  Toast 
} from '@kui-framework/ui';
```

### 2. Usar Componentes

```tsx
export function ExampleComponents() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Componentes Básicos</h2>
      
      <div className="space-y-4">
        <Input placeholder="Digite algo..." />
        
        <div className="flex gap-2">
          <Button>Primário</Button>
          <Button variant="secondary">Secundário</Button>
          <Button variant="outline">Outline</Button>
        </div>
        
        <div className="flex gap-2">
          <Badge>Sucesso</Badge>
          <Badge variant="secondary">Info</Badge>
          <Badge variant="destructive">Erro</Badge>
        </div>
      </div>
    </Card>
  );
}
```

## 🎨 Componentes Disponíveis

### Inputs

```tsx
// Input básico
<Input placeholder="Digite algo..." />

// Input com label
<Input 
  label="Nome"
  placeholder="Seu nome"
  required
/>

// Input com erro
<Input 
  label="E-mail"
  type="email"
  error="E-mail inválido"
/>

// Textarea
<Textarea 
  label="Mensagem"
  placeholder="Sua mensagem..."
  rows={4}
/>

// Select
<Select
  label="Estado"
  options={[
    { label: 'São Paulo', value: 'SP' },
    { label: 'Rio de Janeiro', value: 'RJ' },
  ]}
/>

// Checkbox
<Checkbox label="Aceito os termos" />

// Switch
<Switch label="Receber notificações" />
```

### Botões

```tsx
// Variantes
<Button>Primário</Button>
<Button variant="secondary">Secundário</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destrutivo</Button>

// Tamanhos
<Button size="sm">Pequeno</Button>
<Button size="md">Médio</Button>
<Button size="lg">Grande</Button>

// Estados
<Button disabled>Desabilitado</Button>
<Button loading>Carregando</Button>
```

### Cards

```tsx
// Card básico
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descrição</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Conteúdo do card</p>
  </CardContent>
  <CardFooter>
    <Button>Ação</Button>
  </CardFooter>
</Card>

// Card com elevação
<Card elevation="lg">
  <CardContent>
    <p>Card com elevação</p>
  </CardContent>
</Card>
```

### Badges

```tsx
// Variantes
<Badge>Padrão</Badge>
<Badge variant="secondary">Secundário</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destrutivo</Badge>

// Tamanhos
<Badge size="sm">Pequeno</Badge>
<Badge size="md">Médio</Badge>
```

### Modais

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Abrir Modal</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirmar Ação</DialogTitle>
      <DialogDescription>
        Tem certeza que deseja continuar?
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancelar</Button>
      <Button>Confirmar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Toast

```tsx
import { useToast } from '@kui-framework/ui';

function ExampleToast() {
  const { toast } = useToast();

  return (
    <Button onClick={() => {
      toast({
        title: "Sucesso",
        description: "Operação realizada com sucesso!",
      });
    }}>
      Mostrar Toast
    </Button>
  );
}
```

## 🎨 Design System

### Tokens

```tsx
// Cores
<div className="bg-primary text-primary-foreground">Primário</div>
<div className="bg-secondary text-secondary-foreground">Secundário</div>
<div className="bg-muted text-muted-foreground">Muted</div>

// Espaçamento
<div className="p-4 m-2">Padding e margin</div>
<div className="space-y-4">Espaçamento vertical</div>
<div className="gap-4">Gap em grid</div>

// Tipografia
<h1 className="text-4xl font-bold">Título Grande</h1>
<h2 className="text-2xl font-semibold">Título Médio</h2>
<p className="text-sm text-muted-foreground">Texto pequeno</p>
```

### Elevação

```tsx
// Níveis de elevação
<Card elevation="none">Sem elevação</Card>
<Card elevation="sm">Elevação pequena</Card>
<Card elevation="md">Elevação média</Card>
<Card elevation="lg">Elevação grande</Card>
<Card elevation="xl">Elevação extra grande</Card>
```

### Responsividade

```tsx
// Breakpoints
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</div>

// Espaçamento responsivo
<div className="p-4 md:p-6 lg:p-8">
  Conteúdo responsivo
</div>
```

## 🎛️ Componentes Avançados

### Tabs

```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Aba 1</TabsTrigger>
    <TabsTrigger value="tab2">Aba 2</TabsTrigger>
    <TabsTrigger value="tab3">Aba 3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    <p>Conteúdo da aba 1</p>
  </TabsContent>
  <TabsContent value="tab2">
    <p>Conteúdo da aba 2</p>
  </TabsContent>
  <TabsContent value="tab3">
    <p>Conteúdo da aba 3</p>
  </TabsContent>
</Tabs>
```

### Accordion

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item1">
    <AccordionTrigger>Item 1</AccordionTrigger>
    <AccordionContent>
      <p>Conteúdo do item 1</p>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item2">
    <AccordionTrigger>Item 2</AccordionTrigger>
    <AccordionContent>
      <p>Conteúdo do item 2</p>
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Dropdown Menu

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Ações</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Editar</DropdownMenuItem>
    <DropdownMenuItem>Duplicar</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive">
      Excluir
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Popover

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Abrir</Button>
  </PopoverTrigger>
  <PopoverContent>
    <div className="space-y-2">
      <h4 className="font-medium">Título</h4>
      <p className="text-sm text-muted-foreground">
        Conteúdo do popover
      </p>
    </div>
  </PopoverContent>
</Popover>
```

## 🎯 Componentes de Layout

### Grid

```tsx
// Grid responsivo
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</div>

// Grid com tamanhos específicos
<div className="grid grid-cols-12 gap-4">
  <div className="col-span-8">
    <Card>Conteúdo principal</Card>
  </div>
  <div className="col-span-4">
    <Card>Sidebar</Card>
  </div>
</div>
```

### Sections

```tsx
<Section>
  <SectionHeader>
    <SectionTitle>Dados Pessoais</SectionTitle>
    <SectionDescription>
      Informações básicas do usuário
    </SectionDescription>
  </SectionHeader>
  <SectionContent>
    <div className="space-y-4">
      <Input label="Nome" />
      <Input label="E-mail" type="email" />
    </div>
  </SectionContent>
</Section>
```

### Breadcrumbs

```tsx
<Breadcrumbs>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbLink href="/users">Usuários</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbPage>Editar</BreadcrumbPage>
  </BreadcrumbItem>
</Breadcrumbs>
```

## 🎨 Customização

### Variantes Personalizadas

```tsx
// Button com variante personalizada
<Button 
  className="bg-purple-600 hover:bg-purple-700 text-white"
  variant="custom"
>
  Botão Personalizado
</Button>

// Card com estilo personalizado
<Card className="border-2 border-dashed border-gray-300">
  <CardContent>
    <p>Card com borda tracejada</p>
  </CardContent>
</Card>
```

### Tamanhos Personalizados

```tsx
// Input com tamanho personalizado
<Input 
  className="h-12 text-lg"
  placeholder="Input grande"
/>

// Button com tamanho personalizado
<Button 
  className="px-8 py-3 text-lg"
  size="custom"
>
  Botão Grande
</Button>
```

## 🚀 Exemplos Completos

Veja exemplos completos no [Showcase](../examples/kui-showcase/):

- **[Componentes Básicos](../examples/kui-showcase/src/app/with-basic-components/page.tsx)**
- **[Sistema de Elevação](../examples/kui-showcase/src/app/with-elevation/page.tsx)**
- **[Acessibilidade](../examples/kui-showcase/src/app/with-aria/page.tsx)**
- **[Modais e Dialogs](../examples/kui-showcase/src/app/with-dialogs/page.tsx)**
- **[Toast e Notificações](../examples/kui-showcase/src/app/with-toast/page.tsx)**

## 🆘 Troubleshooting

### Problemas Comuns

1. **Componente não renderiza**
   ```tsx
   // Verifique se o componente está importado
   import { Button } from '@kui-framework/ui';
   ```

2. **Estilos não aplicam**
   ```tsx
   // Certifique-se de que o Tailwind está configurado
   // tailwind.config.js
   import kuiPreset from '@kui-framework/theme/tailwind';
   ```

3. **Acessibilidade não funciona**
   ```tsx
   // Use os componentes do KUI que já incluem ARIA
   <Button aria-label="Fechar">×</Button>
   ```

### Debug

```tsx
// Adicione logs para debug
<Button onClick={() => {
  console.log('Botão clicado');
}}>
  Debug
</Button>
```

---

**🎉 Pronto!** Agora você tem uma biblioteca completa de componentes. Explore os [exemplos](../examples/kui-showcase/) para ver mais casos de uso!
