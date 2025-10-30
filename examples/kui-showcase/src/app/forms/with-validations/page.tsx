"use client";

import { FormBuilder } from "@kui/forms";
import { cadastroSchema } from "@/schemas/cadastro.schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@kui/ui";

export default function WithValidationsPage() {
  const handleSubmit = (data: any) => {
    console.log("✅ Dados validados:", data);
    alert(`✅ Cadastro realizado com sucesso!\n\nNome: ${data.nome}\nE-mail: ${data.email}\nTipo: ${data.tipoPessoa}`);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Validações Avançadas</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Demonstração de campos condicionais e validações cross-field com o KUI Framework.
        </p>
      </div>

      {/* Formulário */}
      <Card elevation={2}>
        <CardHeader>
          <CardTitle>Formulário com Validações</CardTitle>
          <CardDescription>Campos condicionais e validações cross-field</CardDescription>
        </CardHeader>
        <CardContent>
          <FormBuilder schema={cadastroSchema} mode="create" onSubmit={handleSubmit} />
        </CardContent>
      </Card>

      {/* Explicação */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campos Condicionais */}
        <Card elevation={1}>
          <CardHeader>
            <CardTitle className="text-purple-600">🔀 Campos Condicionais</CardTitle>
            <CardDescription>Campos que aparecem baseados em outros valores</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              <li>
                • Selecione <strong>"Pessoa Física"</strong> → exibe <strong>CPF</strong>
              </li>
              <li>
                • Selecione <strong>"Pessoa Jurídica"</strong> → exibe <strong>CNPJ</strong> e{" "}
                <strong>Nome Fantasia</strong>
              </li>
              <li>
                • Implementado com <code className="bg-purple-100 px-1 rounded">showIf</code>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Validações Cross-Field */}
        <Card elevation={1}>
          <CardHeader>
            <CardTitle className="text-blue-600">✅ Validações Cross-Field</CardTitle>
            <CardDescription>Validações que dependem de múltiplos campos</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              <li>
                • <strong>Senha</strong> deve ter no mínimo 6 caracteres
              </li>
              <li>
                • <strong>Confirmar Senha</strong> deve ser igual à Senha
              </li>
              <li>
                • Implementado com <code className="bg-blue-100 px-1 rounded">.refine()</code>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Código Exemplo */}
      <Card elevation={1}>
        <CardHeader>
          <CardTitle>Código do Schema</CardTitle>
          <CardDescription>Exemplo de implementação de validações avançadas</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="text-xs bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
            {`const cadastroSchema = zKUI
  .object({
    tipoPessoa: zKUI.select("Tipo", {
      options: [
        { label: "Física", value: "fisica" },
        { label: "Jurídica", value: "juridica" },
      ],
    }),

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
        </CardContent>
      </Card>
    </div>
  );
}
