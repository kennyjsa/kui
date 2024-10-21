"use client";

import { FormBuilder } from "@kui-framework/forms";
import { KuiDataProvider } from "@kui-framework/core";
import { pessoaSchema } from "@/schemas/pessoa.schema";
import { pessoaTrpcProvider, usuarioTrpcProvider } from "@/providers/kuiTrpcProviders";
import { trpc } from "@/lib/trpc";
import { useState } from "react";

export default function WithTrpcPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  // Query tRPC para listar pessoas
  const { data: pessoas, isLoading } = trpc.pessoa.list.useQuery({
    page: 1,
    pageSize: 10,
  });

  // Mutation para criar pessoa
  const createMutation = trpc.pessoa.create.useMutation({
    onSuccess: () => {
      setRefreshKey(prev => prev + 1);
      alert("✅ Pessoa criada com sucesso!");
    },
    onError: (error) => {
      alert(`❌ Erro: ${error.message}`);
    },
  });

  const handleSubmit = async (data: any) => {
    console.log("📤 Enviando dados via tRPC:", data);
    await createMutation.mutateAsync(data);
  };

  return (
    <main className="max-w-4xl mx-auto p-8">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold">🚀 Integração tRPC</h2>
          <p className="text-muted-foreground mt-2">
            Demonstração do KUI Framework com backend tRPC + React Query
          </p>
        </div>

        {/* Lista de Pessoas */}
        <div className="border rounded-lg p-6 bg-white">
          <h3 className="text-lg font-semibold mb-4">📋 Pessoas Cadastradas</h3>

          {isLoading ? (
            <p className="text-muted-foreground">Carregando...</p>
          ) : pessoas?.data && pessoas.data.length > 0 ? (
            <div className="space-y-2">
              {pessoas.data.map((pessoa: any) => (
                <div
                  key={pessoa.id}
                  className="flex justify-between items-center p-3 bg-muted rounded-md"
                >
                  <div>
                    <p className="font-medium">{pessoa.nome}</p>
                    <p className="text-sm text-muted-foreground">{pessoa.email}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">ID: {pessoa.id}</span>
                </div>
              ))}
              <p className="text-sm text-muted-foreground mt-4">Total: {pessoas.total} pessoa(s)</p>
            </div>
          ) : (
            <p className="text-muted-foreground">Nenhuma pessoa cadastrada</p>
          )}
        </div>

        {/* Formulário */}
        <div className="border rounded-lg p-6 bg-white">
          <h3 className="text-lg font-semibold mb-4">➕ Nova Pessoa</h3>

          <KuiDataProvider
            providers={[
              { name: pessoaTrpcProvider.name, provider: pessoaTrpcProvider },
              { name: usuarioTrpcProvider.name, provider: usuarioTrpcProvider },
            ]}
          >
            <FormBuilder
              key={refreshKey}
              schema={pessoaSchema}
              mode="create"
              onSubmit={handleSubmit}
            />
          </KuiDataProvider>
        </div>

        {/* Info */}
        <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
          <p className="text-sm font-medium text-blue-900">💡 Como funciona</p>
          <ul className="text-sm text-blue-800 mt-2 space-y-1 list-disc list-inside">
            <li>
              Backend tRPC em <code className="bg-blue-100 px-1 rounded">/api/trpc</code>
            </li>
            <li>React Query para cache e estado</li>
            <li>Type-safety end-to-end com TypeScript</li>
            <li>createTrpcProvider integra tRPC + KUI</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

