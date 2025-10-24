import { zKUI } from "@kui-framework/zod-extension";
import { enderecoSchema } from "./endereco.schema";
import { contatoSchema } from "./contato.schema";

/**
 * Schema completo de usuário
 * Demonstra todas as funcionalidades do KUI Framework:
 * - Dados pessoais com validações
 * - Campos derivados (idade)
 * - Grids de sublistas (endereços e contatos)
 * - Campos de relação
 * - Sections para organização
 */
export const userSchema = zKUI.object({
  // Section: Dados Pessoais
  id: zKUI.identifier("ID"),

  nome: zKUI.text("Nome Completo", {
    required: true,
    placeholder: "Digite seu nome completo",
    helperText: "Nome completo do usuário",
  }),

  email: zKUI.email("E-mail", {
    required: true,
    placeholder: "usuario@exemplo.com",
    helperText: "E-mail principal do usuário",
  }),

  cpf: zKUI.text("CPF", {
    mask: "999.999.999-99",
    required: true,
    placeholder: "000.000.000-00",
    helperText: "CPF com 11 dígitos",
  }),

  dataNascimento: zKUI.date("Data de Nascimento", {
    required: true,
    helperText: "Data de nascimento do usuário",
  }),

  idade: zKUI.number("Idade", {
    derived: true,
    readOnly: true,
    compute: (values) => {
      if (!values.dataNascimento) return null;
      const today = new Date();
      const birthDate = new Date(values.dataNascimento);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    helperText: "Calculada automaticamente baseada na data de nascimento",
  }),

  telefone: zKUI.text("Telefone", {
    mask: "(99) 99999-9999",
    placeholder: "(11) 99999-9999",
    helperText: "Telefone principal do usuário",
  }),

  foto: zKUI.file("Foto do Perfil", {
    accept: "image/*",
    maxSize: 5 * 1024 * 1024, // 5MB
    preview: true,
    helperText: "Imagem do perfil (máximo 5MB)",
  }),

  // Section: Endereços (Grid 1:N)
  enderecos: zKUI.grid("Endereços", {
    itemSchema: enderecoSchema,
    columns: [
      { key: "cep", label: "CEP" },
      { key: "rua", label: "Rua" },
      { key: "qtdEnderecos", label: "Número" },
      { key: "cidade", label: "Cidade" },
      { key: "uf", label: "Estado" },
      { key: "principal", label: "Principal" },
    ],
    allowCreate: true,
    allowEdit: true,
    allowDelete: true,
    minItems: 1,
    maxItems: 5,
    helperText: "Adicione pelo menos um endereço",
  }),

  // Section: Contatos (Grid 1:N)
  contatos: zKUI.grid("Contatos", {
    itemSchema: contatoSchema,
    columns: [
      { key: "tipo", label: "Tipo" },
      { key: "valor", label: "Valor" },
      { key: "descricao", label: "Descrição" },
      { key: "preferencial", label: "Preferencial" },
    ],
    allowCreate: true,
    allowEdit: true,
    allowDelete: true,
    minItems: 1,
    helperText: "Adicione pelo menos um contato",
  }),

  // Section: Configurações
  ativo: zKUI.switch("Usuário Ativo", {
    helperText: "Marque se o usuário está ativo no sistema",
  }),

  receberNotificacoes: zKUI.switch("Receber Notificações", {
    helperText: "Marque se o usuário deseja receber notificações por e-mail",
  }),

  idioma: zKUI.select("Idioma Preferido", {
    options: [
      { label: "Português (Brasil)", value: "pt-BR" },
      { label: "English (US)", value: "en-US" },
      { label: "Español", value: "es-ES" },
      { label: "Français", value: "fr-FR" },
    ],
    helperText: "Idioma preferido para a interface",
  }),

  observacoes: zKUI.textarea("Observações", {
    rows: 4,
    maxLength: 500,
    placeholder: "Observações adicionais sobre o usuário...",
    helperText: "Observações opcionais (máximo 500 caracteres)",
  }),
});

export type User = zKUI.infer<typeof userSchema>;
