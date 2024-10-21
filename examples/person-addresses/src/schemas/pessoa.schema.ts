import { zKUI } from "@kui-framework/zod-extension";

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
  aceitaTermos: zKUI.checkbox("Aceito os termos de uso", {
    required: true,
  }),
  estadoCivil: zKUI.radio("Estado Civil", [
    { label: "Solteiro(a)", value: "solteiro" },
    { label: "Casado(a)", value: "casado" },
    { label: "Divorciado(a)", value: "divorciado" },
    { label: "Viúvo(a)", value: "viuvo" },
  ]),
  ativo: zKUI.switch("Cadastro Ativo"),
  avaliacaoAtendimento: zKUI.rating("Avaliação do Atendimento", {
    max: 5,
    helperText: "Como você avalia nosso atendimento?",
  }),
  corFavorita: zKUI.color("Cor Favorita", {
    helperText: "Escolha sua cor favorita",
  }),
  foto: zKUI.file("Foto de Perfil", {
    accept: "image/*",
    maxSize: 5 * 1024 * 1024, // 5MB
    preview: true,
    helperText: "Formatos aceitos: JPG, PNG, GIF (máx. 5MB)",
  }),
});

export type Pessoa = typeof pessoaSchema._type;

