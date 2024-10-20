"use client";

import { KuiDataProvider } from "@kui/core";
import { FormBuilder } from "@kui/forms";
import { pessoaComEnderecoSchema } from "@/schemas/pessoaComEndereco.schema";
import { mockUserProvider } from "@/providers/mockUserProvider";

export default function WithGridPage() {
  const handleSubmit = async (data: any) => {
    console.log("=== DADOS COMPLETOS DO FORMULÁRIO ===");
    console.log(data);
    console.log("=== ENDEREÇOS ===");
    console.log(data.enderecos);

    alert("Formulário enviado! Veja o console para os dados completos.");
  };

  return (
    <KuiDataProvider providers={[{ name: "userProvider", provider: mockUserProvider }]}>
      <main className="min-h-screen p-8 bg-slate-50">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">🧩 KUI Framework</h1>
            <p className="text-muted-foreground">
              Exemplo: Formulário com Grid (Pessoa + Endereços)
            </p>
          </div>

          <div className="space-y-6">
            {/* Modo Create com Grid */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Modo: Create (com Grid de Endereços)</h2>
              <FormBuilder
                schema={pessoaComEnderecoSchema}
                mode="create"
                onSubmit={handleSubmit}
              />
            </div>

            {/* Modo Edit com Grid */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Modo: Edit (com Endereços Existentes)</h2>
              <FormBuilder
                schema={pessoaComEnderecoSchema}
                mode="edit"
                defaultValues={{
                  id: "1",
                  cpf: "123.456.789-00",
                  nome: "João Silva",
                  dataNascimento: new Date("1990-05-15"),
                  email: "joao@example.com",
                  telefone: "(11) 98765-4321",
                  enderecos: [
                    {
                      id: "1",
                      cep: "01310-100",
                      rua: "Avenida Paulista",
                      numero: "1578",
                      bairro: "Bela Vista",
                      cidade: "São Paulo",
                      uf: "SP",
                      principal: true,
                    },
                    {
                      id: "2",
                      cep: "22041-001",
                      rua: "Avenida Atlântica",
                      numero: "1702",
                      complemento: "Apto 501",
                      bairro: "Copacabana",
                      cidade: "Rio de Janeiro",
                      uf: "RJ",
                      principal: false,
                    },
                  ],
                }}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </main>
    </KuiDataProvider>
  );
}

