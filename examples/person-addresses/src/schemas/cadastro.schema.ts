import { zKUI } from "@kui/zod-extension";

/**
 * Schema com validações cross-field e campos condicionais
 * 
 * Demonstra:
 * - Campos condicionais (showIf)
 * - Validações cross-field (.refine)
 * - Validações customizadas
 */
export const cadastroSchema = zKUI
  .object({
    // Dados básicos
    nome: zKUI.text("Nome Completo", {
      required: true,
      placeholder: "Digite seu nome completo",
    }),

    email: zKUI.email("E-mail", {
      required: true,
      placeholder: "seu@email.com",
    }),

    // Tipo de pessoa
    tipoPessoa: zKUI.select("Tipo de Pessoa", ["fisica", "juridica"], {
      required: true,
      helperText: "Selecione o tipo de pessoa",
    }),

    // CPF - apenas se física
    cpf: zKUI.text("CPF", {
      mask: "999.999.999-99",
      placeholder: "000.000.000-00",
      showIf: (values) => values.tipoPessoa === "fisica",
      required: true,
    }),

    // CNPJ - apenas se jurídica
    cnpj: zKUI.text("CNPJ", {
      mask: "99.999.999/9999-99",
      placeholder: "00.000.000/0000-00",
      showIf: (values) => values.tipoPessoa === "juridica",
      required: true,
    }),

    // Nome Fantasia - apenas se jurídica
    nomeFantasia: zKUI.text("Nome Fantasia", {
      placeholder: "Nome comercial da empresa",
      showIf: (values) => values.tipoPessoa === "juridica",
    }),

    // Senha
    senha: zKUI.password("Senha", {
      required: true,
      placeholder: "Mínimo 6 caracteres",
    }),

    // Confirmar senha
    confirmarSenha: zKUI.password("Confirmar Senha", {
      required: true,
      placeholder: "Digite a senha novamente",
    }),

    // Termos
    aceitaTermos: zKUI.checkbox("Aceito os termos e condições", {
      required: true,
    }),
  })
  // Validação cross-field: senha deve ser igual a confirmarSenha
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não conferem",
    path: ["confirmarSenha"],
  })
  // Validação: senha deve ter no mínimo 6 caracteres
  .refine((data) => !data.senha || data.senha.length >= 6, {
    message: "A senha deve ter no mínimo 6 caracteres",
    path: ["senha"],
  });

