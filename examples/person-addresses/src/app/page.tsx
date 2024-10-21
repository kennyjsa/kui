"use client";

import { KuiDataProvider } from "@kui-framework/core";
import { FormBuilder } from "@kui-framework/forms";
import { pessoaSchema } from "@/schemas/pessoa.schema";
import { mockUserProvider } from "@/providers/mockUserProvider";

export default function Home() {
  const handleSubmit = async (data: any) => {
    console.log("=== DADOS DO FORMULÁRIO ===");
    console.log(JSON.stringify(data, null, 2));
    alert("✅ Formulário enviado com sucesso! Veja o console para os dados completos.");
  };

  // Dados de exemplo completos
  const exampleData = {
    id: "1",
    cpf: "123.456.789-00",
    nome: "João Silva",
    dataNascimento: new Date("1990-05-15"),
    idade: 34,
    email: "joao.silva@example.com",
    telefone: "(11) 98765-4321",
    observacoes: "Cliente VIP com histórico de compras recorrentes.",
    salario: 7500.50,
    usuarioResponsavel: 2,
    aceitaTermos: true,
    estadoCivil: "casado",
    ativo: true,
    avaliacaoAtendimento: 5,
    corFavorita: "#0EA5E9",
  };

  return (
    <KuiDataProvider providers={[{ name: "userProvider", provider: mockUserProvider }]}>
      <main className="bg-slate-50 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="bg-white rounded-lg p-6 border shadow-sm">
            <h2 className="text-xl font-semibold mb-2">📝 Demonstração de Campos</h2>
            <p className="text-muted-foreground text-sm">
              Esta página demonstra todos os tipos de campos disponíveis no KUI Framework,
              nos três modos: <strong>Create</strong>, <strong>Edit</strong> e <strong>View</strong>.
            </p>
          </div>

          <div className="space-y-8">
            {/* Modo Create */}
            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-semibold">Modo: Create</h2>
                <p className="text-sm text-muted-foreground">
                  Formulário vazio para criação de novo registro
                </p>
              </div>
              <FormBuilder
                schema={pessoaSchema}
                mode="create"
                onSubmit={handleSubmit}
              />
            </div>

            {/* Modo Edit */}
            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-semibold">Modo: Edit</h2>
                <p className="text-sm text-muted-foreground">
                  Formulário preenchido com dados existentes para edição
                </p>
              </div>
              <FormBuilder
                schema={pessoaSchema}
                mode="edit"
                defaultValues={exampleData}
                onSubmit={handleSubmit}
              />
            </div>

            {/* Modo View */}
            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-semibold">Modo: View</h2>
                <p className="text-sm text-muted-foreground">
                  Todos os campos em modo somente leitura
                </p>
              </div>
              <FormBuilder
                schema={pessoaSchema}
                mode="view"
                defaultValues={exampleData}
                onSubmit={() => {}}
              />
            </div>
          </div>
        </div>
      </main>
    </KuiDataProvider>
  );
}

