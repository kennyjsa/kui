# 🎨 KUI Framework - Padrões e Receitas

> Exemplos completos e prontos para uso de padrões comuns no KUI Framework.

## 📋 Índice

1. [CRUD Completo](#crud-completo)
2. [Formulários com Validação](#formulários-com-validação)
3. [Campos Derivados e Calculados](#campos-derivados-e-calculados)
4. [Relacionamentos](#relacionamentos)
5. [Grids e Sublistas](#grids-e-sublistas)
6. [Campos Condicionais](#campos-condicionais)
7. [Integração com Backend](#integração-com-backend)
8. [Máscaras e Formatação](#máscaras-e-formatação)
9. [Layouts Responsivos](#layouts-responsivos)
10. [Casos Especiais](#casos-especiais)

---

## CRUD Completo

### Padrão: CRUD Básico com Estados

```tsx
// src/schemas/product.schema.ts
import { zKUI } from "@kui-framework/zod-extension";

export const productSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  name: zKUI.text("Nome do Produto", { 
    required: true,
    placeholder: "Ex: Notebook Dell"
  }),
  description: zKUI.textarea("Descrição", {
    placeholder: "Descreva o produto...",
    rows: 4,
  }),
  price: zKUI.currency("Preço", { 
    required: true,
    currency: "BRL",
    locale: "pt-BR",
  }),
  stock: zKUI.number("Estoque", { 
    required: true,
    min: 0,
  }),
  category: zKUI.select("Categoria", [
    "electronics",
    "clothing",
    "books",
    "food"
  ], {
    required: true,
  }),
  active: zKUI.switch("Produto Ativo"),
  createdAt: zKUI.systemDate("Criado em"),
  updatedAt: zKUI.systemDate("Atualizado em"),
});

export type Product = typeof productSchema._type;
```

```tsx
// src/components/ProductForm.tsx
import { FormBuilder } from "@kui-framework/forms";
import { productSchema, type Product } from "../schemas/product.schema";

interface ProductFormProps {
  mode: "create" | "edit" | "view";
  initialData?: Product;
  onSubmit: (data: Product) => Promise<void>;
  onCancel?: () => void;
}

export function ProductForm({ 
  mode, 
  initialData, 
  onSubmit, 
  onCancel 
}: ProductFormProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <FormBuilder
        schema={productSchema}
        mode={mode}
        defaultValues={initialData}
        onSubmit={onSubmit}
      />
      
      {onCancel && (
        <button 
          onClick={onCancel}
          className="mt-4 px-4 py-2 border rounded"
        >
          Cancelar
        </button>
      )}
    </div>
  );
}
```

```tsx
// src/pages/products/create.tsx
import { ProductForm } from "@/components/ProductForm";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {
  const router = useRouter();
  
  const handleSubmit = async (data: any) => {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    
    if (response.ok) {
      router.push("/products");
    }
  };
  
  return <ProductForm mode="create" onSubmit={handleSubmit} />;
}
```

```tsx
// src/pages/products/[id]/edit.tsx
import { ProductForm } from "@/components/ProductForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [params.id]);
  
  const handleSubmit = async (data: any) => {
    await fetch(`/api/products/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    router.push("/products");
  };
  
  if (!product) return <div>Carregando...</div>;
  
  return (
    <ProductForm 
      mode="edit" 
      initialData={product}
      onSubmit={handleSubmit} 
    />
  );
}
```

---

## Formulários com Validação

### Padrão: Validação Cross-Field

```tsx
import { zKUI } from "@kui-framework/zod-extension";

export const registrationSchema = zKUI
  .object({
    id: zKUI.identifier("ID"),
    username: zKUI.text("Nome de Usuário", { 
      required: true,
      minLength: 3,
      maxLength: 20,
    }),
    email: zKUI.email("E-mail", { required: true }),
    password: zKUI.password("Senha", { 
      required: true,
      minLength: 8,
      helperText: "Mínimo 8 caracteres"
    }),
    confirmPassword: zKUI.password("Confirmar Senha", { 
      required: true,
      transient: true, // não será persistido
    }),
    age: zKUI.number("Idade", { required: true }),
    acceptTerms: zKUI.checkbox("Aceito os termos de uso", { 
      required: true 
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  })
  .refine((data) => data.age >= 18, {
    message: "Você deve ter pelo menos 18 anos",
    path: ["age"],
  });
```

### Padrão: Validação com Regex

```tsx
export const contactSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  phone: zKUI.text("Telefone", {
    required: true,
    mask: "(99) 99999-9999",
    pattern: /^\(\d{2}\) \d{5}-\d{4}$/,
    helperText: "Formato: (11) 98765-4321"
  }),
  cpf: zKUI.text("CPF", {
    required: true,
    mask: "999.999.999-99",
    readOnlyIn: ["edit"], // não pode mudar CPF em edição
  }),
});
```

---

## Campos Derivados e Calculados

### Padrão: Cálculo de Idade

```tsx
export const personSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  name: zKUI.text("Nome Completo", { required: true }),
  birthDate: zKUI.date("Data de Nascimento", { required: true }),
  age: zKUI.number("Idade", {
    derived: true,
    readOnly: true,
    compute: (values) => {
      if (!values.birthDate) return null;
      
      const today = new Date();
      const birth = new Date(values.birthDate);
      const age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        return age - 1;
      }
      
      return age;
    },
  }),
});
```

### Padrão: Cálculo de Total

```tsx
export const invoiceItemSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  product: zKUI.text("Produto", { required: true }),
  quantity: zKUI.number("Quantidade", { 
    required: true, 
    min: 1,
    default: 1,
  }),
  unitPrice: zKUI.currency("Preço Unitário", { 
    required: true,
    currency: "BRL"
  }),
  total: zKUI.currency("Total", {
    derived: true,
    readOnly: true,
    currency: "BRL",
    compute: (values) => {
      return (values.quantity || 0) * (values.unitPrice || 0);
    },
  }),
});
```

### Padrão: Campo Dependente de Outro

```tsx
export const discountSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  originalPrice: zKUI.currency("Preço Original", { 
    required: true,
    currency: "BRL"
  }),
  discountPercentage: zKUI.number("Desconto (%)", {
    min: 0,
    max: 100,
    default: 0,
  }),
  finalPrice: zKUI.currency("Preço Final", {
    derived: true,
    readOnly: true,
    currency: "BRL",
    compute: (values) => {
      const original = values.originalPrice || 0;
      const discount = values.discountPercentage || 0;
      return original - (original * discount / 100);
    },
  }),
  savings: zKUI.currency("Economia", {
    derived: true,
    readOnly: true,
    currency: "BRL",
    compute: (values) => {
      const original = values.originalPrice || 0;
      const final = values.finalPrice || 0;
      return original - final;
    },
  }),
});
```

---

## Relacionamentos

### Padrão: Relacionamento N:1 (Many-to-One)

```tsx
// 1. Criar o provider
import { createRestProvider, KuiDataProvider } from '@kui-framework/core';

const categoryProvider = createRestProvider({
  name: 'categoryProvider',
  baseUrl: 'https://api.example.com',
  endpoints: {
    list: '/categories',
    get: '/categories/:id',
    create: '/categories',
    update: '/categories/:id',
    delete: '/categories/:id',
  },
});

// 2. Schema com relacionamento
export const productSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  name: zKUI.text("Nome", { required: true }),
  category: zKUI.relation("Categoria", {
    relation: "category",
    provider: "categoryProvider",
    displayField: "name",
    valueField: "id",
    required: true,
    placeholder: "Selecione uma categoria",
  }),
});

// 3. Envolver na aplicação
export function App() {
  return (
    <KuiDataProvider providers={[
      { name: 'categoryProvider', provider: categoryProvider }
    ]}>
      <ProductForm />
    </KuiDataProvider>
  );
}
```

### Padrão: Relacionamento N:M (Many-to-Many)

```tsx
const tagProvider = createRestProvider({
  name: 'tagProvider',
  baseUrl: 'https://api.example.com',
  endpoints: {
    list: '/tags',
    get: '/tags/:id',
    create: '/tags',
    update: '/tags/:id',
    delete: '/tags/:id',
  },
});

export const postSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  title: zKUI.text("Título", { required: true }),
  tags: zKUI.relation("Tags", {
    relation: "tag",
    provider: "tagProvider",
    displayField: "name",
    valueField: "id",
    multiple: true, // permite seleção múltipla
    placeholder: "Selecione as tags",
  }),
});
```

### Padrão: Relacionamento com Filtro

```tsx
export const orderSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  customer: zKUI.relation("Cliente", {
    relation: "customer",
    provider: "customerProvider",
    displayField: "name",
    valueField: "id",
    required: true,
  }),
  // Produtos apenas do cliente selecionado
  products: zKUI.relation("Produtos", {
    relation: "product",
    provider: "productProvider",
    displayField: "name",
    valueField: "id",
    multiple: true,
    // Filtro dinâmico baseado em outro campo
    filter: (values) => ({
      customerId: values.customer,
    }),
    showIf: (values) => !!values.customer, // só mostra se cliente selecionado
  }),
});
```

---

## Grids e Sublistas

### Padrão: Grid Simples (1:N)

```tsx
// Schema do item
const phoneSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  type: zKUI.select("Tipo", ["mobile", "home", "work"], { required: true }),
  number: zKUI.text("Número", { 
    required: true,
    mask: "(99) 99999-9999"
  }),
});

// Schema principal
export const contactSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  name: zKUI.text("Nome", { required: true }),
  phones: zKUI.grid("Telefones", {
    itemSchema: phoneSchema,
    columns: [
      { key: "type", label: "Tipo" },
      { key: "number", label: "Número" },
    ],
    allowCreate: true,
    allowEdit: true,
    allowDelete: true,
    minItems: 1, // pelo menos 1 telefone obrigatório
  }),
});
```

### Padrão: Grid com Cálculo de Totais

```tsx
const orderItemSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  product: zKUI.text("Produto", { required: true }),
  quantity: zKUI.number("Qtd", { required: true, min: 1 }),
  unitPrice: zKUI.currency("Preço Unit.", { required: true }),
  total: zKUI.currency("Total", {
    derived: true,
    readOnly: true,
    compute: (values) => (values.quantity || 0) * (values.unitPrice || 0),
  }),
});

export const orderSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  customer: zKUI.text("Cliente", { required: true }),
  items: zKUI.grid("Itens do Pedido", {
    itemSchema: orderItemSchema,
    columns: [
      { key: "product", label: "Produto" },
      { key: "quantity", label: "Quantidade" },
      { key: "unitPrice", label: "Preço Unit." },
      { key: "total", label: "Total" },
    ],
    minItems: 1,
  }),
  // Total geral calculado
  totalOrder: zKUI.currency("Total do Pedido", {
    derived: true,
    readOnly: true,
    compute: (values) => {
      if (!values.items || values.items.length === 0) return 0;
      return values.items.reduce((sum: number, item: any) => {
        return sum + ((item.quantity || 0) * (item.unitPrice || 0));
      }, 0);
    },
  }),
});
```

### Padrão: Grid com Validação

```tsx
const addressSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  type: zKUI.select("Tipo", ["residential", "commercial"], { required: true }),
  street: zKUI.text("Rua", { required: true }),
  number: zKUI.text("Número", { required: true }),
  zipCode: zKUI.text("CEP", { 
    required: true,
    mask: "99999-999"
  }),
  isMain: zKUI.checkbox("Endereço Principal"),
});

export const personSchema = zKUI
  .object({
    id: zKUI.identifier("ID"),
    name: zKUI.text("Nome", { required: true }),
    addresses: zKUI.grid("Endereços", {
      itemSchema: addressSchema,
      columns: [
        { key: "type", label: "Tipo" },
        { key: "street", label: "Rua" },
        { key: "number", label: "Número" },
        { key: "isMain", label: "Principal" },
      ],
      minItems: 1,
      maxItems: 5,
    }),
  })
  .refine(
    (data) => {
      // Validar que existe exatamente 1 endereço principal
      const mainAddresses = data.addresses?.filter((a: any) => a.isMain) || [];
      return mainAddresses.length === 1;
    },
    {
      message: "Deve haver exatamente um endereço principal",
      path: ["addresses"],
    }
  );
```

---

## Campos Condicionais

### Padrão: Mostrar Campo Baseado em Outro

```tsx
export const shippingSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  shippingMethod: zKUI.select("Método de Envio", [
    "pickup",
    "standard",
    "express"
  ], { required: true }),
  
  // Só mostra se não for retirada
  address: zKUI.text("Endereço", {
    required: true,
    showIf: (values) => values.shippingMethod !== "pickup",
  }),
  
  // Só mostra para envio expresso
  deliveryTime: zKUI.select("Horário de Entrega", [
    "morning",
    "afternoon",
    "night"
  ], {
    required: true,
    showIf: (values) => values.shippingMethod === "express",
  }),
});
```

### Padrão: Campos Dinâmicos por Tipo

```tsx
export const contactSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  contactType: zKUI.radio("Tipo de Contato", [
    { label: "Pessoa Física", value: "individual" },
    { label: "Pessoa Jurídica", value: "company" }
  ], { required: true }),
  
  // Campos para Pessoa Física
  cpf: zKUI.text("CPF", {
    required: true,
    mask: "999.999.999-99",
    showIf: (values) => values.contactType === "individual",
  }),
  rg: zKUI.text("RG", {
    showIf: (values) => values.contactType === "individual",
  }),
  
  // Campos para Pessoa Jurídica
  cnpj: zKUI.text("CNPJ", {
    required: true,
    mask: "99.999.999/9999-99",
    showIf: (values) => values.contactType === "company",
  }),
  companyName: zKUI.text("Razão Social", {
    required: true,
    showIf: (values) => values.contactType === "company",
  }),
});
```

---

## Integração com Backend

### Padrão: REST API

```tsx
// src/providers/userProvider.ts
import { createRestProvider } from '@kui-framework/core';

export const userProvider = createRestProvider({
  name: 'userProvider',
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  endpoints: {
    list: '/api/users',
    get: '/api/users/:id',
    create: '/api/users',
    update: '/api/users/:id',
    delete: '/api/users/:id',
  },
  // Headers personalizados
  headers: {
    'Authorization': `Bearer ${getToken()}`,
  },
  // Transformação de dados
  transformResponse: (data) => {
    // Transformar formato da API para formato do form
    return data;
  },
  transformRequest: (data) => {
    // Transformar formato do form para formato da API
    return data;
  },
});

// src/app/layout.tsx
import { KuiDataProvider } from '@kui-framework/core';
import { userProvider } from '@/providers/userProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <KuiDataProvider providers={[
          { name: 'userProvider', provider: userProvider }
        ]}>
          {children}
        </KuiDataProvider>
      </body>
    </html>
  );
}
```

### Padrão: tRPC

```tsx
// src/server/routers/user.ts
import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

export const userRouter = router({
  getAll: publicProcedure
    .input(z.object({
      page: z.number().optional(),
      pageSize: z.number().optional(),
    }).optional())
    .query(async ({ input }) => {
      // Buscar usuários do banco
      return { data: users, total: users.length };
    }),
    
  getById: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      return users.find(u => u.id === input);
    }),
    
  create: publicProcedure
    .input(userSchema)
    .mutation(async ({ input }) => {
      const newUser = { ...input, id: generateId() };
      users.push(newUser);
      return newUser;
    }),
    
  update: publicProcedure
    .input(z.object({
      id: z.number(),
      data: userSchema.partial(),
    }))
    .mutation(async ({ input }) => {
      const index = users.findIndex(u => u.id === input.id);
      if (index !== -1) {
        users[index] = { ...users[index], ...input.data };
        return users[index];
      }
      throw new Error('User not found');
    }),
    
  delete: publicProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const index = users.findIndex(u => u.id === input);
      if (index !== -1) {
        users.splice(index, 1);
      }
    }),
});

// src/providers/userTrpcProvider.ts
import { createTrpcProvider } from '@kui-framework/core';
import { trpc } from '@/lib/trpc';

export const userTrpcProvider = createTrpcProvider({
  name: 'userProvider',
  router: trpc.user,
  procedures: {
    list: 'getAll',
    get: 'getById',
    create: 'create',
    update: 'update',
    delete: 'delete',
  },
});

// src/app/layout.tsx
import { TrpcProvider } from '@/providers/TrpcProvider';
import { KuiDataProvider } from '@kui-framework/core';
import { userTrpcProvider } from '@/providers/userTrpcProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <TrpcProvider>
          <KuiDataProvider providers={[
            { name: 'userProvider', provider: userTrpcProvider }
          ]}>
            {children}
          </KuiDataProvider>
        </TrpcProvider>
      </body>
    </html>
  );
}
```

---

## Máscaras e Formatação

### Padrão: Máscaras Brasileiras

```tsx
export const brazilianSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  cpf: zKUI.text("CPF", {
    mask: "999.999.999-99",
    placeholder: "000.000.000-00"
  }),
  cnpj: zKUI.text("CNPJ", {
    mask: "99.999.999/9999-99",
    placeholder: "00.000.000/0000-00"
  }),
  phone: zKUI.text("Telefone", {
    mask: "(99) 99999-9999",
    placeholder: "(00) 00000-0000"
  }),
  zipCode: zKUI.text("CEP", {
    mask: "99999-999",
    placeholder: "00000-000"
  }),
  date: zKUI.text("Data", {
    mask: "99/99/9999",
    placeholder: "dd/mm/aaaa"
  }),
});
```

### Padrão: Formatação de Moeda

```tsx
export const financialSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  priceReal: zKUI.currency("Preço (BRL)", {
    currency: "BRL",
    locale: "pt-BR",
  }),
  priceUSD: zKUI.currency("Preço (USD)", {
    currency: "USD",
    locale: "en-US",
  }),
  priceEUR: zKUI.currency("Preço (EUR)", {
    currency: "EUR",
    locale: "de-DE",
  }),
});
```

---

## Layouts Responsivos

### Padrão: Grid Responsivo Customizado

```tsx
export const profileSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  
  // Largura total em mobile, metade em desktop
  fullName: zKUI.text("Nome Completo", {
    required: true,
    layout: { xs: 12, md: 6 }, // 12 colunas em xs, 6 em md
  }),
  
  email: zKUI.email("E-mail", {
    required: true,
    layout: { xs: 12, md: 6 },
  }),
  
  // Campos de 1/3 em desktop
  city: zKUI.text("Cidade", {
    layout: { xs: 12, md: 4 },
  }),
  
  state: zKUI.text("Estado", {
    layout: { xs: 12, md: 4 },
  }),
  
  zipCode: zKUI.text("CEP", {
    mask: "99999-999",
    layout: { xs: 12, md: 4 },
  }),
  
  // Textarea ocupa largura total
  bio: zKUI.textarea("Biografia", {
    layout: { xs: 12, md: 12 },
    rows: 5,
  }),
});
```

---

## Casos Especiais

### Padrão: Upload de Múltiplos Arquivos

```tsx
export const documentSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  title: zKUI.text("Título", { required: true }),
  
  // Upload único
  mainDocument: zKUI.file("Documento Principal", {
    accept: ".pdf,.doc,.docx",
    maxSize: 10 * 1024 * 1024, // 10MB
    preview: true,
    required: true,
  }),
  
  // Upload múltiplo
  attachments: zKUI.file("Anexos", {
    multiple: true,
    accept: ".pdf,.jpg,.png",
    maxSize: 5 * 1024 * 1024, // 5MB cada
    preview: true,
  }),
});
```

### Padrão: Campo de Avaliação

```tsx
export const reviewSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  productName: zKUI.text("Produto", { readOnly: true }),
  rating: zKUI.rating("Avaliação", {
    max: 5,
    required: true,
    helperText: "Avalie de 1 a 5 estrelas"
  }),
  comment: zKUI.textarea("Comentário", {
    placeholder: "Conte-nos sua experiência...",
    maxLength: 500,
  }),
});
```

### Padrão: Seletor de Cor

```tsx
export const themeSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  themeName: zKUI.text("Nome do Tema", { required: true }),
  primaryColor: zKUI.color("Cor Primária", {
    required: true,
    helperText: "Cor principal do tema"
  }),
  secondaryColor: zKUI.color("Cor Secundária", {
    helperText: "Cor secundária do tema"
  }),
  backgroundColor: zKUI.color("Cor de Fundo"),
});
```

### Padrão: Campo ReadOnly Condicional

```tsx
export const orderSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  status: zKUI.select("Status", [
    "draft",
    "pending",
    "approved",
    "shipped",
    "delivered"
  ], { required: true }),
  
  // Campos editáveis apenas no rascunho
  items: zKUI.textarea("Itens", {
    readOnlyIn: ["edit"], // readonly quando status não é draft
    showIf: (values) => values.status === "draft",
  }),
  
  // Data de aprovação aparece quando aprovado
  approvedAt: zKUI.date("Aprovado em", {
    readOnly: true,
    showIf: (values) => ["approved", "shipped", "delivered"].includes(values.status),
  }),
});
```

---

## ✅ Dicas de Implementação

### Quando usar cada padrão:

1. **CRUD Completo** → aplicações com gestão de entidades
2. **Validação Cross-Field** → formulários com dependências entre campos
3. **Campos Derivados** → cálculos automáticos (totais, idades, etc)
4. **Relacionamentos** → quando há FK para outras tabelas
5. **Grids** → relacionamentos 1:N (pessoa tem vários endereços)
6. **Campos Condicionais** → formulários dinâmicos que mudam por tipo
7. **Backend Integration** → conectar com API real
8. **Máscaras** → dados com formato específico (CPF, telefone)
9. **Layouts** → formulários complexos que precisam de controle de grid
10. **Casos Especiais** → features específicas (upload, rating, color)

### Sempre lembre:

- ✅ Use `zKUI.object()` não `z.object()`
- ✅ Campos obrigatórios precisam de `required: true`
- ✅ IDs sempre com `zKUI.identifier()`
- ✅ Campos calculados precisam `derived: true` + `compute`
- ✅ Campos que não persistem precisam `transient: true`
- ✅ Providers devem estar no `KuiDataProvider`
- ✅ Grid precisa de `itemSchema` e `columns`

---

Para mais exemplos completos e funcionais, veja `/examples/ai-examples/` no repositório.

