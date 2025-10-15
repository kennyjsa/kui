# 🤝 Contribuindo com o KUI Framework

Obrigado por considerar contribuir com o KUI Framework! Sua contribuição é muito importante para o crescimento e melhoria do projeto.

## 🚀 Como Contribuir

### 1. Fork e Clone

```bash
# Fork o repositório no GitHub
# Clone seu fork
git clone https://github.com/SEU_USUARIO/kui.git
cd kui

# Adicionar upstream
git remote add upstream https://github.com/kennyjsa/kui.git
```

### 2. Instalar Dependências

```bash
# Instalar dependências
pnpm install

# Build dos pacotes
pnpm build

# Executar showcase
cd examples/kui-showcase
pnpm dev
```

### 3. Criar Branch

```bash
# Criar branch para sua feature
git checkout -b feature/nova-funcionalidade

# Ou para bugfix
git checkout -b fix/corrigir-bug
```

### 4. Desenvolver

```bash
# Modo desenvolvimento com watch
pnpm dev

# Lint
pnpm lint

# Testes
pnpm test

# Format
pnpm format
```

### 5. Commit e Push

```bash
# Adicionar mudanças
git add .

# Commit com mensagem descritiva
git commit -m "feat: adicionar novo componente Button"

# Push para seu fork
git push origin feature/nova-funcionalidade
```

### 6. Pull Request

1. Abra um Pull Request no GitHub
2. Descreva as mudanças
3. Referencie issues relacionadas
4. Aguarde review

## 📋 Tipos de Contribuição

### 🐛 Bug Reports

**Antes de reportar um bug:**

1. Verifique se já existe uma issue
2. Teste na versão mais recente
3. Verifique a documentação

**Ao reportar um bug, inclua:**

- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots/vídeos se aplicável
- Informações do ambiente

### ✨ Feature Requests

**Antes de sugerir uma feature:**

1. Verifique se já foi sugerida
2. Considere se é realmente necessária
3. Pense na implementação

**Ao sugerir uma feature, inclua:**

- Descrição clara da funcionalidade
- Casos de uso
- Exemplos de implementação
- Impacto na API existente

### 🔧 Pull Requests

**Antes de abrir um PR:**

1. Siga as convenções de código
2. Adicione testes se necessário
3. Atualize documentação
4. Teste localmente

**Ao abrir um PR, inclua:**

- Descrição clara das mudanças
- Referência a issues
- Screenshots se aplicável
- Checklist de verificação

## 🎯 Áreas de Contribuição

### 🧩 Componentes UI

- Novos componentes
- Melhorias em componentes existentes
- Acessibilidade
- Responsividade
- Performance

### 📝 Formulários

- Novos tipos de campos
- Validações
- Integrações
- Performance

### 📊 DataTable

- Novas funcionalidades
- Melhorias de performance
- Integrações
- Responsividade

### 🎨 Design System

- Tokens
- Temas
- Elevação
- Tipografia

### 📚 Documentação

- Exemplos
- Guias
- API reference
- Tutorials

### 🔧 Ferramentas

- CLI
- DevTools
- Templates
- Scripts

## 📝 Convenções de Código

### TypeScript

```typescript
// Use interfaces para props
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

// Use types para unions
type ButtonVariant = 'primary' | 'secondary' | 'destructive';

// Use const assertions
const BUTTON_VARIANTS = ['primary', 'secondary'] as const;
```

### React

```tsx
// Use function components
export function Button({ variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn('btn', `btn-${variant}`)}
      {...props}
    />
  );
}

// Use forwardRef para refs
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn('btn', `btn-${variant}`)}
        {...props}
      />
    );
  }
);
```

### CSS/Tailwind

```tsx
// Use cn() para classes condicionais
const buttonClass = cn(
  'btn',
  {
    'btn-primary': variant === 'primary',
    'btn-secondary': variant === 'secondary',
  },
  className
);

// Use design tokens
<div className="bg-primary text-primary-foreground p-4 rounded-lg">
  <h2 className="text-2xl font-bold">Título</h2>
</div>
```

### Commits

```bash
# Use conventional commits
feat: adicionar novo componente Button
fix: corrigir bug no DataTable
docs: atualizar documentação
style: formatar código
refactor: refatorar componente
test: adicionar testes
chore: atualizar dependências
```

## 🧪 Testes

### Estrutura de Testes

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
```

### Exemplo de Teste

```tsx
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies correct variant class', () => {
    render(<Button variant="secondary">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-secondary');
  });
});
```

### Executar Testes

```bash
# Todos os testes
pnpm test

# Testes com watch
pnpm test:watch

# Testes com coverage
pnpm test:coverage
```

## 📚 Documentação

### Estrutura

```
docs/
├── components/
│   ├── README.md
│   └── button.md
├── forms/
│   └── README.md
├── datatable.md
└── getting-started.md
```

### Exemplo de Documentação

```markdown
# Button

Componente de botão com múltiplas variantes e tamanhos.

## Uso

```tsx
<Button variant="primary" size="md">
  Clique aqui
</Button>
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| variant | 'primary' \| 'secondary' | 'primary' | Variante do botão |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Tamanho do botão |
```

## 🚀 Release Process

### Versioning

- **Major**: Breaking changes
- **Minor**: New features
- **Patch**: Bug fixes

### Changelog

```markdown
## [1.2.0] - 2024-01-15

### Added
- Novo componente Button
- Suporte a dark mode

### Changed
- Melhorada performance do DataTable

### Fixed
- Bug no FormBuilder
```

### Release

```bash
# Bump version
pnpm version patch

# Build
pnpm build

# Publish
pnpm publish
```

## 🎯 Roadmap

### Fase 1 - Consolidação
- [x] Componentes básicos
- [x] FormBuilder
- [x] DataTable
- [x] Documentação

### Fase 2 - Campos Avançados
- [ ] Campos derivados
- [ ] Campos condicionais
- [ ] Validação cross-field
- [ ] Máscaras avançadas

### Fase 3 - CRUD e Grid
- [ ] CRUD automático
- [ ] Grid inline
- [ ] Bulk actions
- [ ] Export/Import

### Fase 4 - Integração Backend
- [ ] tRPC helpers
- [ ] REST helpers
- [ ] GraphQL support
- [ ] Real-time updates

### Fase 5 - UX Refinamentos
- [ ] Drag & drop
- [ ] Keyboard shortcuts
- [ ] Accessibility
- [ ] Performance

### Fase 6 - Qualidade e Testes
- [ ] Testes unitários
- [ ] Testes de integração
- [ ] E2E tests
- [ ] Performance tests

### Fase 7 - Distribuição
- [ ] NPM packages
- [ ] CDN
- [ ] Templates
- [ ] CLI tools

## 🆘 Precisa de Ajuda?

### Comunidade

- **[GitHub Discussions](https://github.com/kennyjsa/kui/discussions)** - Discussões gerais
- **[GitHub Issues](https://github.com/kennyjsa/kui/issues)** - Bugs e features
- **[Discord](https://discord.gg/kui)** - Chat da comunidade

### Recursos

- **[Documentação](../README.md)** - Documentação completa
- **[Exemplos](../examples/README.md)** - Exemplos práticos
- **[Showcase](../examples/kui-showcase/)** - Demonstração interativa

### Contato

- **Email**: kui@example.com
- **Twitter**: @kui_framework
- **LinkedIn**: KUI Framework

---

**🎉 Obrigado por contribuir com o KUI Framework! Juntos construímos algo incrível!**
