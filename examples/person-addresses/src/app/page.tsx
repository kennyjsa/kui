"use client";

import { KuiDataProvider } from "@kui/core";
import { FormBuilder } from "@kui/forms";
import { pessoaSchema } from "@/schemas/pessoa.schema";
import { mockUserProvider } from "@/providers/mockUserProvider";

export default function Home() {
  const handleSubmit = async (data: any) => {
    console.log("Dados do formulário:", data);
    alert("Formulário enviado! Veja o console para os dados.");
  };

  return (
    <KuiDataProvider providers={[{ name: "userProvider", provider: mockUserProvider }]}>
      <main className="min-h-screen p-8 bg-slate-50">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">🧩 KUI Framework</h1>
            <p className="text-muted-foreground">
              Exemplo: Formulário de Pessoa
            </p>
          </div>

          <div className="space-y-6">
          {/* Modo Create */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Modo: Create</h2>
            <FormBuilder
              schema={pessoaSchema}
              mode="create"
              onSubmit={handleSubmit}
            />
          </div>

          {/* Modo Edit */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Modo: Edit</h2>
            <FormBuilder
              schema={pessoaSchema}
              mode="edit"
              defaultValues={{
                id: "1",
                cpf: "123.456.789-00",
                nome: "João Silva",
                dataNascimento: new Date("1990-05-15"),
                email: "joao@example.com",
                telefone: "(11) 98765-4321",
              }}
              onSubmit={handleSubmit}
            />
          </div>

          {/* Modo View */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Modo: View</h2>
            <FormBuilder
              schema={pessoaSchema}
              mode="view"
              defaultValues={{
                id: "1",
                cpf: "123.456.789-00",
                nome: "João Silva",
                dataNascimento: new Date("1990-05-15"),
                idade: 33,
                email: "joao@example.com",
                telefone: "(11) 98765-4321",
              }}
              onSubmit={() => {}}
            />
          </div>
          </div>
        </div>
      </main>
    </KuiDataProvider>
  );
}

