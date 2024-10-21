"use client";

import { KuiDataProvider } from "@kui-framework/core";
import { FormBuilder } from "@kui-framework/forms";
import { pessoaComEnderecoSchema } from "@/schemas/pessoaComEndereco.schema";
import { mockUserProvider } from "@/providers/mockUserProvider";

export default function WithGridPage() {
  const handleSubmit = async (data: any) => {
    console.log("=== DADOS COMPLETOS DO FORMULÁRIO ===");
    console.log(JSON.stringify(data, null, 2));

    console.log("\n=== ARRAY DE ENDEREÇOS ===");
    console.log(JSON.stringify(data.enderecos, null, 2));

    alert("✅ Formulário com Grid enviado! Veja o console para os dados completos.");
  };

  const exampleDataWithAddresses = {
    id: "1",
    cpf: "123.456.789-00",
    nome: "João Silva",
    dataNascimento: new Date("1990-05-15"),
    idade: 34,
    email: "joao.silva@example.com",
    telefone: "(11) 98765-4321",
    observacoes: "Cliente VIP",
    salario: 7500.50,
    usuarioResponsavel: 2,
    aceitaTermos: true,
    estadoCivil: "casado",
    ativo: true,
    avaliacaoAtendimento: 5,
    corFavorita: "#0EA5E9",
    enderecos: [
      {
        id: "1",
        cep: "01310-100",
        rua: "Avenida Paulista",
        numero: "1578",
        complemento: "Conjunto 101",
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
  };

  return (
    <KuiDataProvider providers={[{ name: "userProvider", provider: mockUserProvider }]}>
      <main className="bg-slate-50 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="bg-white rounded-lg p-6 border shadow-sm">
            <h2 className="text-xl font-semibold mb-2">🏘️ Campo Grid - Relação 1:N</h2>
            <p className="text-muted-foreground text-sm">
              Esta página demonstra o campo <code className="bg-muted px-2 py-1 rounded">grid()</code>
              {" "}para gerenciar sublistas (Pessoa → Endereços).
            </p>
            <ul className="mt-3 text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li><strong>Estado local:</strong> Todas as operações (adicionar, editar, excluir) são feitas localmente</li>
              <li><strong>Modal CRUD:</strong> Crie/edite endereços sem sair do formulário</li>
              <li><strong>Tracking:</strong> Badges indicam itens novos, editados ou excluídos</li>
              <li><strong>Persistência única:</strong> Ao salvar o formulário, tudo é enviado de uma vez</li>
              <li><strong>Responsivo:</strong> Tabela em desktop, cards em mobile</li>
            </ul>
          </div>

          <div className="space-y-8">
            {/* Modo Create com Grid */}
            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-semibold">Modo: Create</h2>
                <p className="text-sm text-muted-foreground">
                  Crie uma nova pessoa e adicione endereços no grid
                </p>
              </div>
              <FormBuilder
                schema={pessoaComEnderecoSchema}
                mode="create"
                onSubmit={handleSubmit}
              />
            </div>

            {/* Modo Edit com Grid */}
            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-semibold">Modo: Edit</h2>
                <p className="text-sm text-muted-foreground">
                  Edite dados e gerencie endereços (adicionar, editar, excluir)
                </p>
              </div>
              <FormBuilder
                schema={pessoaComEnderecoSchema}
                mode="edit"
                defaultValues={exampleDataWithAddresses}
                onSubmit={handleSubmit}
              />
            </div>

            {/* Modo View com Grid */}
            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-semibold">Modo: View</h2>
                <p className="text-sm text-muted-foreground">
                  Visualização somente leitura de dados e endereços
                </p>
              </div>
              <FormBuilder
                schema={pessoaComEnderecoSchema}
                mode="view"
                defaultValues={exampleDataWithAddresses}
                onSubmit={() => {}}
              />
            </div>
          </div>
        </div>
      </main>
    </KuiDataProvider>
  );
}

