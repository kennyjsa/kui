import { zKUI } from "@kui-framework/zod-extension";

/**
 * Schema para contato
 * Usado no grid de contatos do usuário
 */
export const contatoSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  tipo: zKUI.select("Tipo de Contato", {
    options: [
      { label: "Telefone", value: "telefone" },
      { label: "E-mail", value: "email" },
      { label: "WhatsApp", value: "whatsapp" },
      { label: "LinkedIn", value: "linkedin" },
      { label: "Instagram", value: "instagram" },
      { label: "Facebook", value: "facebook" },
      { label: "Twitter", value: "twitter" },
    ],
    required: true,
  }),
  valor: zKUI.text("Valor", {
    required: true,
    placeholder: "Digite o contato",
    helperText: "Ex: (11) 99999-9999 ou usuario@email.com",
  }),
  descricao: zKUI.text("Descrição", {
    placeholder: "Ex: Casa, Trabalho, Pessoal",
    helperText: "Descrição opcional para identificar o contato",
  }),
  preferencial: zKUI.switch("Contato Preferencial", {
    helperText: "Marque se este é o contato preferencial do usuário",
  }),
});

export type Contato = zKUI.infer<typeof contatoSchema>;
