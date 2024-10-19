import { zKUI } from "@kui/zod-extension";

/**
 * Schema de Pessoa
 * Exemplo do project-context.md
 */
export const pessoaSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  cpf: zKUI.text("CPF", {
    readOnlyIn: ["edit"],
    mask: "999.999.999-99",
    required: true,
  }),
  nome: zKUI.text("Nome Completo", {
    required: true,
    placeholder: "Digite o nome completo",
  }),
  dataNascimento: zKUI.date("Data de Nascimento", {
    required: true,
  }),
  idade: zKUI.number("Idade", {
    derived: true,
    readOnly: true,
    compute: (values: any) => {
      if (!values.dataNascimento) return null;
      return Math.floor(
        (Date.now() - new Date(values.dataNascimento).getTime()) / (1000 * 60 * 60 * 24 * 365)
      );
    },
  }),
  email: zKUI.email("E-mail", {
    required: true,
  }),
  telefone: zKUI.text("Telefone", {
    mask: "(99) 99999-9999",
  }),
  observacoes: zKUI.textarea("Observações", {
    placeholder: "Informações adicionais sobre a pessoa",
    rows: 3,
    maxLength: 500,
  }),
  salario: zKUI.currency("Salário Mensal", {
    currency: "BRL",
    locale: "pt-BR",
  }),
  usuarioResponsavel: zKUI.relation("Usuário Responsável", {
    relation: "user",
    provider: "userProvider",
    displayField: "nome",
    valueField: "id",
    placeholder: "Selecione o usuário responsável",
  }),
});

export type Pessoa = typeof pessoaSchema._type;

