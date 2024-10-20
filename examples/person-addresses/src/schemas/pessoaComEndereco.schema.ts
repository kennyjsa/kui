import { zKUI } from "@kui/zod-extension";
import { pessoaSchema } from "./pessoa.schema";
import { enderecoSchema } from "./endereco.schema";

/**
 * Schema de Pessoa com Endereços (Grid 1:N)
 */
export const pessoaComEnderecoSchema = zKUI.object({
  ...pessoaSchema.shape,
  enderecos: zKUI.grid("Endereços", {
    itemSchema: enderecoSchema,
    columns: ["cep", "rua", "numero", "cidade", "uf", "principal"],
    displayFields: ["rua", "numero", "cidade", "uf"], // Para cards mobile
    allowCreate: true,
    allowEdit: true,
    allowDelete: true,
    minItems: 1, // Pelo menos um endereço
    maxItems: 10, // Máximo 10 endereços
    breakpoint: "md",
  }),
});

export type PessoaComEndereco = typeof pessoaComEnderecoSchema._type;

