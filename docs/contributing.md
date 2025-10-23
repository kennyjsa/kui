# 🤝 Contribuindo

> Guia completo para contribuir com o KUI Framework

## 🎯 Como Contribuir

Obrigado por considerar contribuir com o KUI Framework! Sua ajuda é fundamental para tornar o framework ainda melhor.

## 🚀 Primeiros Passos

### 1. Fork o Repositório

```bash
# Fork no GitHub, depois clone
git clone https://github.com/SEU_USUARIO/kui.git
cd kui
```

### 2. Instale Dependências

```bash
# Instalar dependências
pnpm install

# Build dos pacotes
pnpm build
```

### 3. Execute os Testes

```bash
# Testes unitários
pnpm test

# Testes de integração
pnpm test:integration

# Lint e type-check
pnpm lint
pnpm type-check
```

## 📋 Tipos de Contribuição

### 🐛 Reportar Bugs

1. **Verifique** se o bug já foi reportado
2. **Use o template** de bug report
3. **Inclua** informações detalhadas:
   - Versão do Node.js
   - Versão do React
   - Passos para reproduzir
   - Comportamento esperado vs atual
   - Screenshots/vídeos se aplicável

### 💡 Sugerir Melhorias

1. **Verifique** se a sugestão já existe
2. **Use o template** de feature request
3. **Descreva** claramente:
   - Problema que resolve
   - Solução proposta
   - Alternativas consideradas
   - Impacto na API existente

### 🔧 Corrigir Bugs

1. **Crie uma branch** para o fix
2. **Escreva testes** que reproduzem o bug
3. **Implemente** a correção
4. **Execute testes** para garantir que funciona
5. **Atualize documentação** se necessário

### ✨ Adicionar Features

1. **Discuta** a feature em uma issue primeiro
2. **Crie uma branch** para a feature
3. **Implemente** seguindo os padrões
4. **Adicione testes** completos
5. **Atualize documentação**
6. **Crie exemplos** se aplicável

## 🏗️ Estrutura do Projeto

```
kui/
├── packages/           # Pacotes principais
│   ├── core/          # Core do framework
│   ├── forms/         # FormBuilder e componentes
│   ├── ui/            # Componentes de UI
│   ├── theme/         # Sistema de temas
│   └── zod-extension/ # Extensões do Zod
├── examples/          # Exemplos e demos
├── docs/             # Documentação
└── scripts/          # Scripts de build
```

## 📝 Padrões de Código

### TypeScript

```typescript
// ✅ Bom
interface UserFormProps {
  mode: "create" | "edit" | "view";
  onSubmit: (data: User) => Promise<void>;
  defaultValues?: User;
}

// ❌ Evitar
interface UserFormProps {
  mode: any;
  onSubmit: Function;
  defaultValues?: any;
}
```

### React

```tsx
// ✅ Bom
export const UserForm = React.forwardRef<HTMLFormElement, UserFormProps>(
  ({ mode, onSubmit, defaultValues, ...props }, ref) => {
    return (
      <form ref={ref} {...props}>
        {/* conteúdo */}
      </form>
    );
  }
);

UserForm.displayName = "UserForm";

// ❌ Evitar
export function UserForm(props: any) {
  return <form>{/* conteúdo */}</form>;
}
```

### Styling

```tsx
// ✅ Bom - Use class-variance-authority
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// ❌ Evitar - Classes hardcoded
<button className="bg-blue-500 text-white px-4 py-2 rounded">
```

## 🧪 Testes

### Testes Unitários

```typescript
// src/components/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-destructive');
  });
});
```

### Testes de Integração

```typescript
// src/forms/FormBuilder.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FormBuilder } from './FormBuilder';
import { userSchema } from '../schemas/user.schema';

describe('FormBuilder', () => {
  it('submits form with valid data', async () => {
    const onSubmit = jest.fn();
    
    render(
      <FormBuilder
        schema={userSchema}
        mode="create"
        onSubmit={onSubmit}
      />
    );

    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'João Silva' }
    });
    
    fireEvent.change(screen.getByLabelText('E-mail'), {
      target: { value: 'joao@example.com' }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'João Silva',
        email: 'joao@example.com'
      });
    });
  });
});
```

## 📚 Documentação

### Componentes

```tsx
/**
 * Button component for user interactions
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="lg">
 *   Click me
 * </Button>
 * ```
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant of the button */
  variant?: "default" | "primary" | "secondary" | "destructive";
  /** Size of the button */
  size?: "sm" | "md" | "lg";
  /** Whether the button is loading */
  loading?: boolean;
}
```

### Exemplos

```tsx
// Sempre inclua exemplos completos
/**
 * EXEMPLO: Formulário com Validação
 * 
 * Demonstra validações cross-field usando .refine()
 * 
 * Features:
 * - Validação de senha e confirmação
 * - Validação de idade mínima
 * - Campo transiente (confirmPassword não persiste)
 * 
 * Para usar:
 * 1. Copie o schema
 * 2. Adapte as validações conforme sua necessidade
 * 3. Use .refine() para validações customizadas
 */
```

## 🔄 Processo de Pull Request

### 1. Prepare sua Branch

```bash
# Criar branch
git checkout -b feature/nova-feature

# Fazer commits
git add .
git commit -m "feat: adiciona nova feature"
```

### 2. Teste Localmente

```bash
# Execute todos os testes
pnpm test
pnpm lint
pnpm type-check
pnpm build
```

### 3. Crie o Pull Request

1. **Título claro**: `feat: adiciona componente X`
2. **Descrição detalhada**: O que foi feito e por quê
3. **Referencie issues**: `Fixes #123`
4. **Screenshots**: Se aplicável
5. **Checklist**: Marque itens concluídos

### 4. Template de PR

```markdown
## 📝 Descrição

Breve descrição das mudanças.

## 🔗 Issues Relacionadas

- Fixes #123
- Closes #456

## 🧪 Testes

- [ ] Testes unitários passando
- [ ] Testes de integração passando
- [ ] Lint passando
- [ ] Type-check passando

## 📸 Screenshots

Se aplicável, adicione screenshots.

## ✅ Checklist

- [ ] Código segue padrões do projeto
- [ ] Documentação atualizada
- [ ] Exemplos atualizados
- [ ] Testes adicionados
- [ ] Breaking changes documentados
```

## 🎯 Diretrizes Específicas

### Componentes

- ✅ Use `React.forwardRef`
- ✅ Suporte a `className` customizada
- ✅ Variantes com `class-variance-authority`
- ✅ Acessibilidade completa (ARIA)
- ✅ TypeScript strict
- ✅ Testes unitários

### Formulários

- ✅ Schemas com Zod
- ✅ Validação robusta
- ✅ Modos (create/edit/view)
- ✅ Layout responsivo
- ✅ Integração com providers

### Documentação

- ✅ Exemplos funcionais
- ✅ Casos de uso reais
- ✅ Boas práticas
- ✅ Troubleshooting

## 🆘 Precisa de Ajuda?

- 💬 **Discord**: Comunidade ativa
- 📖 **Documentação**: Guias detalhados
- 🐛 **Issues**: Reporte problemas
- 💡 **Discussões**: Ideias e sugestões

## 🏆 Reconhecimento

Contribuidores são reconhecidos em:
- README do projeto
- Release notes
- Documentação
- Comunidade

---

**Obrigado por contribuir com o KUI Framework!** 🚀
