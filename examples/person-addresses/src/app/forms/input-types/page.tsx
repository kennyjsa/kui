"use client";

import React from "react";
import { FormBuilder } from "@kui-framework/forms";
import { zKUI } from "@kui-framework/zod-extension";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@kui-framework/ui";

// Schema para demonstrar todos os tipos de input
const inputTypesSchema = zKUI.object({
  // Campos de texto básicos
  textField: zKUI.text("Campo de Texto", {
    placeholder: "Digite algo aqui...",
    helperText: "Campo de texto simples",
  }),

  emailField: zKUI.email("E-mail", {
    placeholder: "usuario@exemplo.com",
    helperText: "Campo de e-mail com validação",
  }),

  passwordField: zKUI.password("Senha", {
    placeholder: "Digite sua senha",
    helperText: "Campo de senha",
  }),

  // Campos numéricos
  numberField: zKUI.number("Número", {
    placeholder: "123",
    helperText: "Campo numérico",
  }),

  currencyField: zKUI.currency("Valor Monetário", {
    currency: "BRL",
    locale: "pt-BR",
    placeholder: "0,00",
    helperText: "Campo de moeda em Real brasileiro",
  }),

  // Campos de data/hora
  dateField: zKUI.date("Data", {
    helperText: "Campo de data",
  }),

  timeField: zKUI.time("Hora", {
    helperText: "Campo de hora",
  }),

  datetimeField: zKUI.datetime("Data e Hora", {
    helperText: "Campo de data e hora",
  }),

  // Campo de texto longo
  textareaField: zKUI.textarea("Texto Longo", {
    rows: 4,
    maxLength: 500,
    placeholder: "Digite um texto longo aqui...",
    helperText: "Campo de texto longo com limite de caracteres",
  }),

  // Campos de seleção
  selectField: zKUI.select("Seleção", {
    options: [
      { label: "Opção 1", value: "opcao1" },
      { label: "Opção 2", value: "opcao2" },
      { label: "Opção 3", value: "opcao3" },
    ],
    helperText: "Campo de seleção",
  }),

  radioField: zKUI.radio("Opções", {
    options: [
      { label: "Opção A", value: "a" },
      { label: "Opção B", value: "b" },
      { label: "Opção C", value: "c" },
    ],
    helperText: "Campo de opções (radio)",
  }),

  // Campos booleanos
  checkboxField: zKUI.checkbox("Checkbox", {
    helperText: "Campo de checkbox",
  }),

  switchField: zKUI.switch("Switch", {
    helperText: "Campo de switch/toggle",
  }),

  // Campos especiais
  ratingField: zKUI.rating("Avaliação", {
    max: 5,
    allowHalf: true,
    helperText: "Campo de avaliação com estrelas",
  }),

  colorField: zKUI.color("Cor", {
    helperText: "Seletor de cor",
  }),

  fileField: zKUI.file("Arquivo", {
    accept: "image/*",
    maxSize: 5 * 1024 * 1024, // 5MB
    preview: true,
    helperText: "Upload de arquivo com preview",
  }),

  // Campos com máscara
  cpfField: zKUI.text("CPF", {
    mask: "999.999.999-99",
    placeholder: "000.000.000-00",
    helperText: "Campo com máscara de CPF",
  }),

  cnpjField: zKUI.text("CNPJ", {
    mask: "99.999.999/9999-99",
    placeholder: "00.000.000/0000-00",
    helperText: "Campo com máscara de CNPJ",
  }),

  phoneField: zKUI.text("Telefone", {
    mask: "(99) 99999-9999",
    placeholder: "(11) 99999-9999",
    helperText: "Campo com máscara de telefone",
  }),

  cepField: zKUI.text("CEP", {
    mask: "99999-999",
    placeholder: "00000-000",
    helperText: "Campo com máscara de CEP",
  }),
});

export default function InputTypesPage() {
  const handleSubmit = (data: any) => {
    console.log("=== DADOS DO FORMULÁRIO ===");
    console.log(JSON.stringify(data, null, 2));
    alert("✅ Formulário enviado com sucesso! Veja o console para os dados completos.");
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Tipos de Input</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Demonstração de todos os tipos de campos disponíveis no KUI Framework.
          Cada campo possui suas próprias características e validações.
        </p>
      </div>

      {/* Grid de Exemplos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Campos Básicos */}
        <Card elevation={2}>
          <CardHeader>
            <CardTitle>Campos Básicos</CardTitle>
            <CardDescription>
              Campos de texto, e-mail, senha e numéricos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormBuilder
              schema={inputTypesSchema}
              mode="create"
              onSubmit={handleSubmit}
              grid={1}
            />
          </CardContent>
        </Card>

        {/* Campos de Seleção */}
        <Card elevation={2}>
          <CardHeader>
            <CardTitle>Campos de Seleção</CardTitle>
            <CardDescription>
              Select, radio, checkbox e switch
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormBuilder
              schema={inputTypesSchema}
              mode="create"
              onSubmit={handleSubmit}
              grid={1}
            />
          </CardContent>
        </Card>

        {/* Campos Especiais */}
        <Card elevation={2}>
          <CardHeader>
            <CardTitle>Campos Especiais</CardTitle>
            <CardDescription>
              Rating, cor, arquivo e data/hora
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormBuilder
              schema={inputTypesSchema}
              mode="create"
              onSubmit={handleSubmit}
              grid={1}
            />
          </CardContent>
        </Card>

        {/* Campos com Máscara */}
        <Card elevation={2}>
          <CardHeader>
            <CardTitle>Campos com Máscara</CardTitle>
            <CardDescription>
              CPF, CNPJ, telefone e CEP
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormBuilder
              schema={inputTypesSchema}
              mode="create"
              onSubmit={handleSubmit}
              grid={1}
            />
          </CardContent>
        </Card>
      </div>

      {/* Informações Adicionais */}
      <Card elevation={1}>
        <CardHeader>
          <CardTitle>Informações dos Campos</CardTitle>
          <CardDescription>
            Detalhes sobre cada tipo de campo disponível
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Campos de Texto</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• text - Campo de texto simples</li>
                <li>• email - E-mail com validação</li>
                <li>• password - Senha com ocultação</li>
                <li>• textarea - Texto longo</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Campos Numéricos</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• number - Número inteiro/decimal</li>
                <li>• currency - Valor monetário</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Campos de Data/Hora</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• date - Data</li>
                <li>• time - Hora</li>
                <li>• datetime - Data e hora</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Campos de Seleção</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• select - Lista suspensa</li>
                <li>• radio - Opções únicas</li>
                <li>• checkbox - Múltipla seleção</li>
                <li>• switch - Toggle on/off</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Campos Especiais</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• rating - Avaliação com estrelas</li>
                <li>• color - Seletor de cor</li>
                <li>• file - Upload de arquivo</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Campos com Máscara</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• CPF - 999.999.999-99</li>
                <li>• CNPJ - 99.999.999/9999-99</li>
                <li>• Telefone - (99) 99999-9999</li>
                <li>• CEP - 99999-999</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
