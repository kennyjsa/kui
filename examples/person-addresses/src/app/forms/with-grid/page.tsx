"use client";

import { KuiDataProvider } from "@kui-framework/core";
import { FormBuilder } from "@kui-framework/forms";
import { pessoaComEnderecoSchema } from "@/schemas/pessoaComEndereco.schema";
import { mockUserProvider } from "@/providers/mockUserProvider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@kui-framework/ui";

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
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Grid de Endereços (1:N)</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Demonstração do campo grid() para gerenciar sublistas (Pessoa → Endereços).
            Todas as operações são feitas localmente com tracking de mudanças.
          </p>
        </div>

        {/* Informações sobre Grid */}
        <Card elevation={2}>
          <CardHeader>
            <CardTitle>🏘️ Campo Grid - Relação 1:N</CardTitle>
            <CardDescription>
              Funcionalidades do campo grid() para gerenciar sublistas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              <li>• <strong>Estado local:</strong> Todas as operações (adicionar, editar, excluir) são feitas localmente</li>
              <li>• <strong>Modal CRUD:</strong> Crie/edite endereços sem sair do formulário</li>
              <li>• <strong>Tracking:</strong> Badges indicam itens novos, editados ou excluídos</li>
              <li>• <strong>Persistência única:</strong> Ao salvar o formulário, tudo é enviado de uma vez</li>
              <li>• <strong>Responsivo:</strong> Tabela em desktop, cards em mobile</li>
            </ul>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {/* Modo Create com Grid */}
          <Card elevation={2}>
            <CardHeader>
              <CardTitle>Modo: Create</CardTitle>
              <CardDescription>
                Crie uma nova pessoa e adicione endereços no grid
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormBuilder
                schema={pessoaComEnderecoSchema}
                mode="create"
                onSubmit={handleSubmit}
              />
            </CardContent>
          </Card>

          {/* Modo Edit com Grid */}
          <Card elevation={2}>
            <CardHeader>
              <CardTitle>Modo: Edit</CardTitle>
              <CardDescription>
                Edite dados e gerencie endereços (adicionar, editar, excluir)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormBuilder
                schema={pessoaComEnderecoSchema}
                mode="edit"
                defaultValues={exampleDataWithAddresses}
                onSubmit={handleSubmit}
              />
            </CardContent>
          </Card>

          {/* Modo View com Grid */}
          <Card elevation={2}>
            <CardHeader>
              <CardTitle>Modo: View</CardTitle>
              <CardDescription>
                Visualização somente leitura de dados e endereços
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormBuilder
                schema={pessoaComEnderecoSchema}
                mode="view"
                defaultValues={exampleDataWithAddresses}
                onSubmit={() => {}}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </KuiDataProvider>
  );
}
