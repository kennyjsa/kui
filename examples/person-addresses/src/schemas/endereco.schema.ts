import { zKUI } from "@kui-framework/zod-extension";

/**
 * Schema para endereço
 * Usado no grid de endereços do usuário
 */
export const enderecoSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  cep: zKUI.text("CEP", {
    mask: "99999-999",
    required: true,
    placeholder: "00000-000",
    helperText: "Digite o CEP com 8 dígitos",
  }),
  rua: zKUI.text("Rua", {
    required: true,
    placeholder: "Nome da rua",
  }),
  qtdEnderecos: zKUI.number("Número", {
    required: true,
    placeholder: "123",
    helperText: "Número do endereço",
  }),
  complemento: zKUI.text("Complemento", {
    placeholder: "Apto, sala, etc.",
  }),
  bairro: zKUI.text("Bairro", {
    required: true,
    placeholder: "Nome do bairro",
  }),
  cidade: zKUI.text("Cidade", {
    required: true,
    placeholder: "Nome da cidade",
  }),
  uf: zKUI.select("Estado", {
    options: [
      { label: "Acre", value: "AC" },
      { label: "Alagoas", value: "AL" },
      { label: "Amapá", value: "AP" },
      { label: "Amazonas", value: "AM" },
      { label: "Bahia", value: "BA" },
      { label: "Ceará", value: "CE" },
      { label: "Distrito Federal", value: "DF" },
      { label: "Espírito Santo", value: "ES" },
      { label: "Goiás", value: "GO" },
      { label: "Maranhão", value: "MA" },
      { label: "Mato Grosso", value: "MT" },
      { label: "Mato Grosso do Sul", value: "MS" },
      { label: "Minas Gerais", value: "MG" },
      { label: "Pará", value: "PA" },
      { label: "Paraíba", value: "PB" },
      { label: "Paraná", value: "PR" },
      { label: "Pernambuco", value: "PE" },
      { label: "Piauí", value: "PI" },
      { label: "Rio de Janeiro", value: "RJ" },
      { label: "Rio Grande do Norte", value: "RN" },
      { label: "Rio Grande do Sul", value: "RS" },
      { label: "Rondônia", value: "RO" },
      { label: "Roraima", value: "RR" },
      { label: "Santa Catarina", value: "SC" },
      { label: "São Paulo", value: "SP" },
      { label: "Sergipe", value: "SE" },
      { label: "Tocantins", value: "TO" },
    ],
    required: true,
  }),
  principal: zKUI.switch("Endereço Principal", {
    helperText: "Marque se este é o endereço principal do usuário",
  }),
});

export type Endereco = zKUI.infer<typeof enderecoSchema>;
