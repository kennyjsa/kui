"use client";

import { FormBuilder } from "@kui-framework/forms";
import { pessoaSchema } from "@/schemas/pessoa.schema";
import { Button } from "@kui-framework/ui";
import { useState } from "react";

/**
 * Exemplo demonstrando o loading state automático do FormBuilder
 * 
 * O skeleton é gerado automaticamente baseado no schema,
 * mantendo o layout idêntico ao formulário real.
 */
export default function WithLoadingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [mockData, setMockData] = useState<any | null>(null);

  // Simula carregamento de dados
  const handleLoadData = () => {
    setIsLoading(true);
    setMockData(null);
    
    // Simula requisição à API (2 segundos)
    setTimeout(() => {
      setMockData({
        id: 1,
        nome: "João Silva",
        cpf: "123.456.789-00",
        email: "joao@example.com",
        dataNascimento: new Date("1990-01-15"),
        telefone: "(11) 98765-4321",
        observacoes: "Cliente desde 2020",
        salario: 5000,
        aceitaTermos: true,
        estadoCivil: "casado",
        ativo: true,
        avaliacaoAtendimento: 4,
        corFavorita: "#3B82F6",
      });
      setIsLoading(false);
    }, 2000);
  };

  // Limpa dados (volta ao estado inicial)
  const handleClear = () => {
    setMockData(null);
    setIsLoading(false);
  };

  const handleSubmit = async (data: any) => {
    console.log("Dados enviados:", data);
    alert("Form submetido! Veja o console.");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Loading State Automático</h1>
          <p className="text-gray-600 mt-2">
            Demonstração do skeleton automático gerado a partir do schema
          </p>
        </div>

        {/* Controles */}
        <div className="flex gap-4">
          <Button onClick={handleLoadData} disabled={isLoading}>
            {isLoading ? "Carregando..." : "Simular Carregamento (2s)"}
          </Button>
          <Button onClick={handleClear} variant="outline" disabled={isLoading}>
            Limpar
          </Button>
        </div>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Como funciona:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• O skeleton é gerado automaticamente do schema (sem configuração extra)</li>
            <li>• Cada tipo de campo tem seu skeleton correspondente (text, grid, etc)</li>
            <li>• O layout permanece idêntico ao formulário real</li>
            <li>• Totalmente responsivo e schema-aware</li>
          </ul>
        </div>

        {/* FormBuilder com Loading State */}
        <FormBuilder
          schema={pessoaSchema}
          mode="edit"
          loading={isLoading}  // ← Magic happens here!
          defaultValues={mockData || undefined}
          onSubmit={handleSubmit}
        />

        {/* Código Exemplo */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-white font-mono text-sm mb-4">Código:</h3>
          <pre className="text-green-400 font-mono text-xs overflow-x-auto">
{`<FormBuilder
  schema={pessoaSchema}
  mode="edit"
  loading={isLoading}  // ← Skeleton automático!
  defaultValues={data}
  onSubmit={handleSubmit}
/>

// Com React Query / tRPC
const { data, isLoading } = trpc.pessoa.getById.useQuery(id);

<FormBuilder
  schema={pessoaSchema}
  loading={isLoading}
  defaultValues={data}
  ...
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
}

