import { zKUI } from "@kui-framework/zod-extension";

/**
 * Schema de Endereço
 * Usado como itemSchema no grid de endereços
 */
export const enderecoSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  cep: zKUI.text("CEP", {
    mask: "99999-999",
    required: true,
    placeholder: "00000-000",
  }),
  rua: zKUI.text("Rua", {
    required: true,
    placeholder: "Nome da rua",
  }),
  numero: zKUI.text("Número", {
    required: true,
    placeholder: "123",
  }),
  complemento: zKUI.text("Complemento", {
    placeholder: "Apto, sala, etc",
  }),
  bairro: zKUI.text("Bairro", {
    required: true,
  }),
  cidade: zKUI.text("Cidade", {
    required: true,
  }),
  uf: zKUI.select("UF", [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
    "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ], {
    required: true,
  }),
  principal: zKUI.switch("Endereço Principal"),
});

export type Endereco = typeof enderecoSchema._type;

