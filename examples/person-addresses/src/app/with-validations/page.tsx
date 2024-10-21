"use client";

import { FormBuilder } from "@kui/forms";
import { cadastroSchema } from "@/schemas/cadastro.schema";

export default function WithValidationsPage() {
  const handleSubmit = (data: any) => {
    console.log("✅ Dados validados:", data);
    alert(`✅ Cadastro realizado com sucesso!\n\nNome: ${data.nome}\nE-mail: ${data.email}\nTipo: ${data.tipoPessoa}`);
  };

  return (
    <main className="max-w-4xl mx-auto p-8">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold">🔐 Validações Avançadas</h2>
          <p className="text-muted-foreground mt-2">
            Demonstração de campos condicionais e validações cross-field
          </p>
        </div>

        {/* Formulário */}
        <div className="border rounded-lg p-6 bg-white">
          <FormBuilder
            schema={cadastroSchema}
            mode="create"
            onSubmit={handleSubmit}
          />
        </div>

        {/* Explicação */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Campos Condicionais */}
          <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded">
            <p className="text-sm font-medium text-purple-900">🔀 Campos Condicionais</p>
            <ul className="text-sm text-purple-800 mt-2 space-y-1 list-disc list-inside">
              <li>
                Selecione <strong>"Pessoa Física"</strong> → exibe <strong>CPF</strong>
              </li>
              <li>
                Selecione <strong>"Pessoa Jurídica"</strong> → exibe <strong>CNPJ</strong> e <strong>Nome Fantasia</strong>
              </li>
              <li>
                Implementado com <code className="bg-purple-100 px-1 rounded">showIf</code>
              </li>
            </ul>
          </div>

          {/* Validações Cross-Field */}
          <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
            <p className="text-sm font-medium text-blue-900">✅ Validações Cross-Field</p>
            <ul className="text-sm text-blue-800 mt-2 space-y-1 list-disc list-inside">
              <li>
                <strong>Senha</strong> deve ter no mínimo 6 caracteres
              </li>
              <li>
                <strong>Confirmar Senha</strong> deve ser igual à Senha
              </li>
              <li>
                Implementado com <code className="bg-blue-100 px-1 rounded">.refine()</code>
              </li>
            </ul>
          </div>
        </div>

        {/* Código Exemplo */}
        <div className="border rounded-lg p-6 bg-gray-50">
          <p className="text-sm font-semibold mb-3">📄 Código do Schema</p>
          <pre className="text-xs bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
{`const cadastroSchema = zKUI
  .object({
    tipoPessoa: zKUI.select("Tipo", ["fisica", "juridica"]),
    
    // Campo condicional
    cpf: zKUI.text("CPF", {
      showIf: (values) => values.tipoPessoa === "fisica"
    }),
    
    senha: zKUI.password("Senha"),
    confirmarSenha: zKUI.password("Confirmar Senha"),
  })
  // Validação cross-field
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não conferem",
    path: ["confirmarSenha"],
  });`}
          </pre>
        </div>
      </div>
    </main>
  );
}

