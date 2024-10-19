# 🧩 Project Context — KUI Framework

> **KUI (Kinetic UI Framework)**  
> Framework de UI declarativa para construção de formulários, grids e layouts administrativos em React, integrando **Zod**, **tRPC**, **Tailwind** e **ShadCN**.  
> Foco em **reutilização de componentes**, **declaração via schema**, e **coerência full-stack** (do domínio ao front).

---

## 🏗️ Estrutura do Repositório

kui/
  packages/
    zod-extension/   → @kui/zod-extension (tipos e metadados declarativos)
    forms/           → @kui/forms (FormBuilder, FieldRenderer, CrudGrid)
    ui/              → @kui/ui (componentes visuais, inputs, layout)
    core/            → @kui/core (providers, registry, integração tRPC)
    theme/           → @kui/theme (tokens, Tailwind config)
  examples/
    person-addresses/ → exemplo: Pessoa + Endereços + Relation(usuário)
  .github/workflows/ci.yml
  turbo.json
  tsconfig.base.json
  pnpm-workspace.yaml
  package.json
  README.md
  LICENSE

---

## 🌱 Branch Strategy

| Branch | Função | Política |
|---------|---------|-----------|
| **main** | versão estável | protegida, merge apenas via PR |
| **develop** | linha de desenvolvimento principal | branch padrão para features |
| **feature/*** | novas funcionalidades | merge → develop |
| **hotfix/*** | correções de produção | merge → main + develop |

---

## 🎯 Objetivo do KUI

- Criar uma camada **genérica e declarativa** de UI baseada em **Zod schemas**.  
- Permitir que formulários e grids sejam **gerados automaticamente** conforme o schema.  
- Centralizar comportamentos comuns como:
  - `readonly`, `derived`, `transient`
  - layouts responsivos (`xs`, `md`, `lg`)
  - integração nativa com tRPC
  - associações (`relation()`)
  - sublistas 1..N (`grid()`)
- Reuso futuro: componentes poderão ser publicados em pacotes independentes.

---

## 🧩 Principais Módulos

| Pacote | Função principal |
|---------|------------------|
| **@kui/zod-extension** | Extensões declarativas ao Zod (`zKUI.text`, `zKUI.relation`, etc.) |
| **@kui/forms** | `FormBuilder`, `useKuiForm`, `FieldRenderer`, `CrudGrid` |
| **@kui/ui** | Componentes visuais base (inputs, modais, grids, badges) |
| **@kui/core** | Providers (tRPC, REST), registro global (`KuiDataProvider`) |
| **@kui/theme** | Tokens de tema, integração Tailwind + ShadCN |

---

## 🧱 Estrutura Declarativa (Exemplo)

export const pessoaSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  cpf: zKUI.text("CPF", { readOnlyIn: ["edit"] }),
  nome: zKUI.text("Nome Completo"),
  dataNascimento: zKUI.date("Data de Nascimento"),
  idade: zKUI.number("Idade", {
    derived: true,
    compute: (values) => {
      if (!values.dataNascimento) return null;
      return Math.floor(
        (Date.now() - new Date(values.dataNascimento).getTime()) / (1000 * 60 * 60 * 24 * 365)
      );
    },
  }),
  confirmarSenha: zKUI.text("Confirmar Senha", { transient: true }),
});

---

## ⚙️ Tipos e Metadados

export type KuiOptions = {
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  mask?: string;
  modes?: ("create" | "edit" | "view")[];
  readOnly?: boolean;
  readOnlyIn?: ("create" | "edit" | "view")[];
  hiddenIn?: ("create" | "edit" | "view")[];
  transient?: boolean;
  derived?: boolean;
  compute?: (values: any) => any;
  layout?: { xs?: number; sm?: number; md?: number; lg?: number };
};

---

## 🔒 Campos Padrão e Regras Declarativas

| Tipo | Comportamento padrão |
|------|----------------------|
| `identifier()` | readonly sempre |
| `text(label, { readOnlyIn })` | controla editabilidade por modo |
| `systemDate()` | data automática, somente leitura |
| `readonly()` | visível, mas travado |
| `derived()` | calculado no front, não persistido |
| `transient()` | não pertence à entidade persistida |

Esses comportamentos são **declarativos**, não automáticos.  
Nada é inferido por nome de campo — tudo explícito no schema.

---

## 🧠 Modo de Operação dos Formulários

| Modo | Descrição |
|------|------------|
| **create** | Campos editáveis, IDs e metadados ocultos |
| **edit** | Campos editáveis, exceto `readOnlyIn: ["edit"]` |
| **view** | Todos os campos readonly |
| **grid** | Exibição tabular (1..N) com controle de itens novos/editados/excluídos |

---

## 🔗 Campo de Associação (`relation()`)

zKUI.relation("Usuário Responsável", {
  relation: "user",
  provider: "userProvider",
  displayField: "nome",
  valueField: "id",
});
