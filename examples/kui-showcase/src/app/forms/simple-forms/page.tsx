"use client";

import React from "react";
import { FormBuilder } from "@kui-framework/forms";
import { zKUI } from "@kui-framework/zod-extension";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@kui-framework/ui";

// Schema para formulário de login
const loginSchema = zKUI.object({
  email: zKUI.email("E-mail", {
    required: true,
    placeholder: "seu@email.com",
  }),
  senha: zKUI.password("Senha", {
    required: true,
    placeholder: "Digite sua senha",
  }),
});

// Schema para cadastro rápido
const cadastroRapidoSchema = zKUI.object({
  nome: zKUI.text("Nome Completo", {
    required: true,
    placeholder: "Seu nome completo",
  }),
  email: zKUI.email("E-mail", {
    required: true,
    placeholder: "seu@email.com",
  }),
  senha: zKUI.password("Senha", {
    required: true,
    placeholder: "Mínimo 6 caracteres",
  }),
});

// Schema para formulário de contato
const contatoSchema = zKUI.object({
  nome: zKUI.text("Nome", {
    required: true,
    placeholder: "Seu nome",
  }),
  email: zKUI.email("E-mail", {
    required: true,
    placeholder: "seu@email.com",
  }),
  telefone: zKUI.text("Telefone", {
    mask: "(99) 99999-9999",
    placeholder: "(11) 99999-9999",
  }),
  mensagem: zKUI.textarea("Mensagem", {
    required: true,
    rows: 4,
    placeholder: "Digite sua mensagem...",
  }),
});

// Schema para busca avançada
const buscaAvancadaSchema = zKUI.object({
  termo: zKUI.text("Termo de Busca", {
    required: true,
    placeholder: "Digite o que você procura",
  }),
  categoria: zKUI.select("Categoria", {
    options: [
      { label: "Todas as categorias", value: "todas" },
      { label: "Produtos", value: "produtos" },
      { label: "Serviços", value: "servicos" },
      { label: "Notícias", value: "noticias" },
    ],
  }),
  dataInicio: zKUI.date("Data Início", {
    placeholder: "Data inicial",
  }),
  dataFim: zKUI.date("Data Fim", {
    placeholder: "Data final",
  }),
  apenasAtivos: zKUI.switch("Apenas Ativos", {
    helperText: "Mostrar apenas resultados ativos",
  }),
});

export default function SimpleFormsPage() {
  const handleSubmit = (data: any, formName: string) => {
    console.log(`=== DADOS DO FORMULÁRIO ${formName.toUpperCase()} ===`);
    console.log(JSON.stringify(data, null, 2));
    alert(`✅ Formulário ${formName} enviado com sucesso! Veja o console para os dados completos.`);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Formulários Simples</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Exemplos de formulários básicos e progressivos, demonstrando o sistema de grid configurável
          e diferentes layouts responsivos.
        </p>
      </div>

      {/* Grid de Exemplos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulário de Login */}
        <Card elevation={2}>
          <CardHeader>
            <CardTitle>1. Formulário de Login</CardTitle>
            <CardDescription>
              Formulário simples com 2 campos: e-mail e senha
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormBuilder
              schema={loginSchema}
              mode="create"
              onSubmit={(data) => handleSubmit(data, "login")}
              grid={1}
            />
          </CardContent>
        </Card>

        {/* Cadastro Rápido */}
        <Card elevation={2}>
          <CardHeader>
            <CardTitle>2. Cadastro Rápido</CardTitle>
            <CardDescription>
              Formulário com 3 campos: nome, e-mail e senha
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormBuilder
              schema={cadastroRapidoSchema}
              mode="create"
              onSubmit={(data) => handleSubmit(data, "cadastro")}
              grid={1}
            />
          </CardContent>
        </Card>

        {/* Formulário de Contato */}
        <Card elevation={2}>
          <CardHeader>
            <CardTitle>3. Formulário de Contato</CardTitle>
            <CardDescription>
              Formulário com 4 campos: nome, e-mail, telefone e mensagem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormBuilder
              schema={contatoSchema}
              mode="create"
              onSubmit={(data) => handleSubmit(data, "contato")}
              grid={2}
            />
          </CardContent>
        </Card>

        {/* Busca Avançada */}
        <Card elevation={2}>
          <CardHeader>
            <CardTitle>4. Busca Avançada</CardTitle>
            <CardDescription>
              Formulário com 5 campos: termo, categoria, datas e filtro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormBuilder
              schema={buscaAvancadaSchema}
              mode="create"
              onSubmit={(data) => handleSubmit(data, "busca")}
              grid={{ xs: 1, md: 2 }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Demonstração de Grid Responsivo */}
      <Card elevation={2}>
        <CardHeader>
          <CardTitle>Demonstração de Grid Responsivo</CardTitle>
          <CardDescription>
            Exemplos de diferentes configurações de grid
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Grid Simples</h4>
              <p className="text-sm text-muted-foreground mb-3">
                <code>grid={2}</code> - 2 colunas em todos os tamanhos
              </p>
              <FormBuilder
                schema={contatoSchema}
                mode="create"
                onSubmit={(data) => handleSubmit(data, "grid-simples")}
                grid={2}
              />
            </div>

            <div>
              <h4 className="font-semibold mb-2">Grid Responsivo</h4>
              <p className="text-sm text-muted-foreground mb-3">
                <code>grid={{"{ xs: 1, md: 2, lg: 3 }"}}</code> - Responsivo
              </p>
              <FormBuilder
                schema={buscaAvancadaSchema}
                mode="create"
                onSubmit={(data) => handleSubmit(data, "grid-responsivo")}
                grid={{ xs: 1, md: 2, lg: 3 }}
              />
            </div>

            <div>
              <h4 className="font-semibold mb-2">Grid Padrão</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Sem grid - 1 coluna em todos os tamanhos
              </p>
              <FormBuilder
                schema={loginSchema}
                mode="create"
                onSubmit={(data) => handleSubmit(data, "grid-padrao")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações sobre Grid */}
      <Card elevation={1}>
        <CardHeader>
          <CardTitle>Sistema de Grid</CardTitle>
          <CardDescription>
            Como usar o sistema de grid configurável
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Configurações Disponíveis</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <code>grid={1}</code> - 1 coluna</li>
                <li>• <code>grid={2}</code> - 2 colunas</li>
                <li>• <code>grid={3}</code> - 3 colunas</li>
                <li>• <code>grid={4}</code> - 4 colunas</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Grid Responsivo</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <code>xs</code> - Mobile (padrão: 1)</li>
                <li>• <code>sm</code> - Tablet pequeno</li>
                <li>• <code>md</code> - Tablet grande</li>
                <li>• <code>lg</code> - Desktop</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h5 className="font-semibold mb-2">Exemplo de Uso</h5>
            <pre className="text-sm">
{`<FormBuilder
  schema={meuSchema}
  mode="create"
  onSubmit={handleSubmit}
  grid={{ xs: 1, md: 2, lg: 3 }}
/>`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
