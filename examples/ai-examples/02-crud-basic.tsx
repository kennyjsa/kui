/**
 * EXEMPLO: CRUD Básico
 *
 * Exemplo completo de CRUD com 3 modos: create, edit, view
 *
 * Features:
 * - Schema com múltiplos tipos de campos
 * - Componente reutilizável para 3 modos
 * - Exemplo de uso em páginas create/edit/view
 *
 * Para usar:
 * 1. Copie o schema e adapte os campos
 * 2. Use o componente ProductForm nas suas páginas
 * 3. Implemente as chamadas de API
 */

// ===== IMPORTS =====
import { FormBuilder } from "@kui-framework/forms";
import { zKUI } from "@kui-framework/zod-extension";
import { useState, useEffect } from "react";

// ===== SCHEMA =====
export const productSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  name: zKUI.text("Nome do Produto", {
    required: true,
    placeholder: "Ex: Notebook Dell Inspiron"
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

// ===== TYPES =====
export type Product = typeof productSchema._type;

// ===== COMPONENT =====
interface ProductFormProps {
  mode: "create" | "edit" | "view";
  productId?: number;
  initialData?: Product;
  onSuccess?: () => void;
}

export function ProductForm({
  mode,
  productId,
  initialData,
  onSuccess
}: ProductFormProps) {
  const [data, setData] = useState<Product | undefined>(initialData);

  // Carregar dados em modo edit/view
  useEffect(() => {
    if ((mode === "edit" || mode === "view") && productId && !initialData) {
      fetch(`/api/products/${productId}`)
        .then(res => res.json())
        .then(setData)
        .catch(err => console.error("Erro ao carregar produto:", err));
    }
  }, [mode, productId, initialData]);

  const handleSubmit = async (formData: Product) => {
    try {
      if (mode === "create") {
        // Criar novo produto
        const response = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Erro ao criar produto");

        console.log("Produto criado com sucesso!");
        onSuccess?.();

      } else if (mode === "edit") {
        // Atualizar produto existente
        const response = await fetch(`/api/products/${productId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Erro ao atualizar produto");

        console.log("Produto atualizado com sucesso!");
        onSuccess?.();
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao salvar produto");
    }
  };

  // Loading state
  if ((mode === "edit" || mode === "view") && !data) {
    return <div className="p-6">Carregando...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <FormBuilder
        schema={productSchema}
        mode={mode}
        defaultValues={data}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

// ===== USAGE =====
/*
// ===== Página de Criação =====
// app/products/create/page.tsx
import { ProductForm } from "@/components/ProductForm";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {
  const router = useRouter();

  return (
    <ProductForm
      mode="create"
      onSuccess={() => router.push("/products")}
    />
  );
}

// ===== Página de Edição =====
// app/products/[id]/edit/page.tsx
import { ProductForm } from "@/components/ProductForm";
import { useRouter } from "next/navigation";

export default function EditProductPage({
  params
}: {
  params: { id: string }
}) {
  const router = useRouter();

  return (
    <ProductForm
      mode="edit"
      productId={Number(params.id)}
      onSuccess={() => router.push("/products")}
    />
  );
}

// ===== Página de Visualização =====
// app/products/[id]/page.tsx
import { ProductForm } from "@/components/ProductForm";

export default function ViewProductPage({
  params
}: {
  params: { id: string }
}) {
  return (
    <ProductForm
      mode="view"
      productId={Number(params.id)}
    />
  );
}
*/

