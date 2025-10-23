# 📚 Exemplos

> Projetos completos e casos de uso reais com o KUI Framework

## 🎯 Visão Geral

Esta seção contém exemplos práticos e projetos completos que demonstram o poder e flexibilidade do KUI Framework em cenários reais.

## 📁 Estrutura dos Exemplos

### 🚀 [Exemplos Básicos](./basic/)
- **01-minimal-form**: Formulário mínimo funcional
- **02-crud-basic**: CRUD completo (create, edit, view)
- **03-with-validation**: Validações avançadas
- **04-with-derived-fields**: Campos calculados
- **05-with-conditional-fields**: Campos condicionais
- **06-with-grid**: Sublistas e relacionamentos
- **07-with-rest-provider**: Integração REST completa

### 🏢 [Casos de Uso Empresariais](./enterprise/)
- **CRM System**: Sistema de gestão de clientes
- **E-commerce**: Loja online completa
- **Admin Dashboard**: Painel administrativo
- **HR Management**: Sistema de recursos humanos
- **Inventory System**: Controle de estoque

### 🎨 [Temas e Customização](./theming/)
- **Dark Mode**: Tema escuro completo
- **Brand Colors**: Cores corporativas
- **Custom Components**: Componentes personalizados
- **Responsive Design**: Layout adaptativo

### 🔌 [Integrações](./integrations/)
- **REST API**: Integração com APIs REST
- **tRPC**: Type-safe APIs
- **GraphQL**: Integração GraphQL
- **Real-time**: WebSockets e SSE
- **Authentication**: Sistemas de autenticação

## 🚀 Como Usar os Exemplos

### 1. Clone o Repositório

```bash
git clone https://github.com/kennyjsa/kui.git
cd kui
```

### 2. Instale Dependências

```bash
pnpm install
```

### 3. Execute um Exemplo

```bash
# Exemplo básico
cd examples/person-addresses
pnpm dev

# Ou navegue para /examples/ai-examples/
cd examples/ai-examples
```

### 4. Explore o Código

Cada exemplo inclui:
- ✅ **Código completo** e funcional
- ✅ **Comentários detalhados**
- ✅ **Explicações passo a passo**
- ✅ **Casos de uso reais**
- ✅ **Boas práticas**

## 📖 Exemplos Detalhados

### 🎯 Formulário Mínimo

```tsx
// Exemplo mais simples possível
import { FormBuilder } from "@kui-framework/forms";
import { zKUI } from "@kui-framework/zod-extension";

const userSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  name: zKUI.text("Nome", { required: true }),
  email: zKUI.email("E-mail", { required: true }),
});

export function UserForm() {
  return (
    <FormBuilder
      schema={userSchema}
      mode="create"
      onSubmit={(data) => console.log(data)}
    />
  );
}
```

### 🔄 CRUD Completo

```tsx
// Create, Edit, View em um componente
interface ProductFormProps {
  mode: "create" | "edit" | "view";
  productId?: number;
  initialData?: Product;
}

export function ProductForm({ mode, productId, initialData }: ProductFormProps) {
  return (
    <FormBuilder
      schema={productSchema}
      mode={mode}
      defaultValues={initialData}
      onSubmit={handleSubmit}
    />
  );
}
```

### 🔗 Integração REST

```tsx
// Provider REST
const userProvider = createRestProvider({
  name: 'userProvider',
  baseUrl: 'https://api.example.com',
  endpoints: {
    list: '/users',
    get: '/users/:id',
    create: '/users',
    update: '/users/:id',
    delete: '/users/:id',
  },
});

// Uso no formulário
<FormBuilder
  schema={userSchema}
  mode="create"
  onSubmit={async (data) => {
    await userProvider.create(data);
  }}
/>
```

## 🎨 Personalização

### Temas Customizados

```typescript
// tailwind.config.js
export default {
  presets: [kuiPreset],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      }
    }
  }
};
```

### Componentes Personalizados

```tsx
// Componente customizado
export function CustomButton({ children, ...props }) {
  return (
    <Button
      className="bg-gradient-to-r from-blue-500 to-purple-600"
      {...props}
    >
      {children}
    </Button>
  );
}
```

## 🔧 Configuração Avançada

### Múltiplos Providers

```tsx
// Múltiplos providers
<KuiDataProvider providers={[
  { name: 'userProvider', provider: userProvider },
  { name: 'productProvider', provider: productProvider },
  { name: 'categoryProvider', provider: categoryProvider },
]}>
  <App />
</KuiDataProvider>
```

### Validação Customizada

```typescript
// Validação cross-field
const schema = zKUI
  .object({
    password: zKUI.password("Senha", { required: true }),
    confirmPassword: zKUI.password("Confirmar Senha", { 
      required: true,
      transient: true
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"]
  });
```

## 📱 Responsividade

### Layout Adaptativo

```typescript
// Campos responsivos
const schema = zKUI.object({
  // Largura total em mobile, metade em desktop
  fullName: zKUI.text("Nome Completo", {
    layout: { xs: 12, md: 6 }
  }),
  
  email: zKUI.email("E-mail", {
    layout: { xs: 12, md: 6 }
  }),
  
  // Campos de 1/3 em desktop
  city: zKUI.text("Cidade", {
    layout: { xs: 12, md: 4 }
  })
});
```

## 🎯 Próximos Passos

1. **Explore os Exemplos**: Comece com os básicos
2. **Adapte para Seu Caso**: Modifique conforme necessário
3. **Contribua**: Adicione seus próprios exemplos
4. **Compartilhe**: Ajude outros desenvolvedores

## 🤝 Contribuindo

Quer adicionar um exemplo? Siga estes passos:

1. **Crie uma pasta** com nome descritivo
2. **Adicione README.md** explicando o exemplo
3. **Inclua código completo** e funcional
4. **Documente casos de uso** e boas práticas
5. **Teste tudo** antes de enviar

---

**Explore os exemplos e descubra o poder do KUI Framework!** 🚀
