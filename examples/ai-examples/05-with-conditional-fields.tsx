/**
 * EXEMPLO: Campos Condicionais
 *
 * Demonstra campos que aparecem/desaparecem baseado em outros campos
 *
 * Features:
 * - showIf para mostrar campos condicionalmente
 * - Formulários dinâmicos que mudam conforme seleções
 * - Validações condicionais
 *
 * Para usar:
 * 1. Use showIf: (values) => boolean
 * 2. Combine com .refine() para validações condicionais
 */

// ===== IMPORTS =====
import { FormBuilder } from "@kui-framework/forms";
import { zKUI } from "@kui-framework/zod-extension";

// ===== EXEMPLO 1: Formulário de Envio =====
export const shippingSchema = zKUI.object({
  id: zKUI.identifier("ID"),

  shippingMethod: zKUI.select("Método de Envio", [
    "pickup",
    "standard",
    "express"
  ], {
    required: true,
    placeholder: "Escolha o método de envio"
  }),

  // Só aparece se NÃO for retirada
  address: zKUI.text("Endereço de Entrega", {
    required: true,
    showIf: (values) => values.shippingMethod !== "pickup",
    placeholder: "Rua, número, complemento"
  }),

  city: zKUI.text("Cidade", {
    required: true,
    showIf: (values) => values.shippingMethod !== "pickup",
  }),

  // Só aparece para envio expresso
  deliveryTime: zKUI.select("Horário de Entrega", [
    "morning",
    "afternoon",
    "night"
  ], {
    required: true,
    showIf: (values) => values.shippingMethod === "express",
    placeholder: "Escolha o horário"
  }),

  // Só aparece para retirada
  pickupLocation: zKUI.select("Local de Retirada", [
    "store_1",
    "store_2",
    "store_3"
  ], {
    required: true,
    showIf: (values) => values.shippingMethod === "pickup",
    placeholder: "Escolha a loja"
  }),
});

// ===== EXEMPLO 2: Pessoa Física vs Jurídica =====
export const contactSchema = zKUI.object({
  id: zKUI.identifier("ID"),

  contactType: zKUI.radio("Tipo de Cadastro", [
    { label: "Pessoa Física", value: "individual" },
    { label: "Pessoa Jurídica", value: "company" }
  ], {
    required: true
  }),

  // ===== Campos para Pessoa Física =====
  cpf: zKUI.text("CPF", {
    mask: "999.999.999-99",
    showIf: (values) => values.contactType === "individual",
    placeholder: "000.000.000-00"
  }),

  rg: zKUI.text("RG", {
    showIf: (values) => values.contactType === "individual",
  }),

  birthDate: zKUI.date("Data de Nascimento", {
    showIf: (values) => values.contactType === "individual",
  }),

  // ===== Campos para Pessoa Jurídica =====
  cnpj: zKUI.text("CNPJ", {
    mask: "99.999.999/9999-99",
    showIf: (values) => values.contactType === "company",
    placeholder: "00.000.000/0000-00"
  }),

  companyName: zKUI.text("Razão Social", {
    showIf: (values) => values.contactType === "company",
  }),

  stateRegistration: zKUI.text("Inscrição Estadual", {
    showIf: (values) => values.contactType === "company",
  }),

  foundingDate: zKUI.date("Data de Fundação", {
    showIf: (values) => values.contactType === "company",
  }),
})
.refine(
  (data) => {
    // CPF obrigatório para Pessoa Física
    if (data.contactType === "individual") {
      return !!data.cpf && data.cpf.length > 0;
    }
    return true;
  },
  {
    message: "CPF é obrigatório",
    path: ["cpf"],
  }
)
.refine(
  (data) => {
    // CNPJ obrigatório para Pessoa Jurídica
    if (data.contactType === "company") {
      return !!data.cnpj && data.cnpj.length > 0;
    }
    return true;
  },
  {
    message: "CNPJ é obrigatório",
    path: ["cnpj"],
  }
);

// ===== EXEMPLO 3: Pagamento =====
export const paymentSchema = zKUI.object({
  id: zKUI.identifier("ID"),

  amount: zKUI.currency("Valor Total", {
    required: true,
    currency: "BRL",
    readOnly: true,
  }),

  paymentMethod: zKUI.radio("Forma de Pagamento", [
    { label: "Cartão de Crédito", value: "credit_card" },
    { label: "Boleto Bancário", value: "boleto" },
    { label: "PIX", value: "pix" }
  ], {
    required: true,
  }),

  // ===== Campos para Cartão de Crédito =====
  cardNumber: zKUI.text("Número do Cartão", {
    mask: "9999 9999 9999 9999",
    showIf: (values) => values.paymentMethod === "credit_card",
    placeholder: "0000 0000 0000 0000",
  }),

  cardName: zKUI.text("Nome no Cartão", {
    showIf: (values) => values.paymentMethod === "credit_card",
    placeholder: "Como está impresso no cartão",
  }),

  cardExpiry: zKUI.text("Validade", {
    mask: "99/99",
    showIf: (values) => values.paymentMethod === "credit_card",
    placeholder: "MM/AA",
  }),

  cardCVV: zKUI.text("CVV", {
    mask: "999",
    showIf: (values) => values.paymentMethod === "credit_card",
    placeholder: "000",
  }),

  installments: zKUI.select("Parcelas", [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "10",
    "12"
  ], {
    showIf: (values) => values.paymentMethod === "credit_card",
    default: "1",
  }),

  // ===== Campos para PIX =====
  pixKey: zKUI.text("Chave PIX", {
    showIf: (values) => values.paymentMethod === "pix",
    readOnly: true,
    helperText: "Chave será gerada após confirmação",
  }),

  // ===== Campos para Boleto =====
  boletoCode: zKUI.text("Código do Boleto", {
    showIf: (values) => values.paymentMethod === "boleto",
    readOnly: true,
    helperText: "Boleto será gerado após confirmação",
  }),
})
.refine(
  (data) => {
    // Validar cartão de crédito
    if (data.paymentMethod === "credit_card") {
      return !!(data.cardNumber && data.cardName && data.cardExpiry && data.cardCVV);
    }
    return true;
  },
  {
    message: "Preencha todos os dados do cartão",
    path: ["cardNumber"],
  }
);

// ===== EXEMPLO 4: Formulário com Dependências em Cadeia =====
export const productConfigSchema = zKUI.object({
  id: zKUI.identifier("ID"),

  productType: zKUI.select("Tipo de Produto", [
    "physical",
    "digital",
    "service"
  ], {
    required: true,
  }),

  // Só para produtos físicos
  weight: zKUI.number("Peso (kg)", {
    showIf: (values) => values.productType === "physical",
    min: 0,
  }),

  requiresShipping: zKUI.checkbox("Requer Envio", {
    showIf: (values) => values.productType === "physical",
  }),

  // Só se requer envio
  shippingClass: zKUI.select("Classe de Envio", [
    "standard",
    "express",
    "overnight"
  ], {
    showIf: (values) =>
      values.productType === "physical" && values.requiresShipping === true,
  }),

  // Só para produtos digitais
  fileFormat: zKUI.select("Formato do Arquivo", [
    "pdf",
    "epub",
    "video",
    "audio"
  ], {
    showIf: (values) => values.productType === "digital",
  }),

  downloadLimit: zKUI.number("Limite de Downloads", {
    showIf: (values) => values.productType === "digital",
    min: -1, // -1 = ilimitado
    helperText: "Use -1 para ilimitado",
  }),

  // Só para serviços
  duration: zKUI.number("Duração (horas)", {
    showIf: (values) => values.productType === "service",
    min: 0.5,
    step: 0.5,
  }),

  requiresAppointment: zKUI.checkbox("Requer Agendamento", {
    showIf: (values) => values.productType === "service",
  }),
});

// ===== COMPONENT =====
export function ShippingForm() {
  const handleSubmit = async (data: any) => {
    console.log("Dados de envio:", data);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Opções de Envio</h1>

      <FormBuilder
        schema={shippingSchema}
        mode="create"
        onSubmit={handleSubmit}
      />

      <div className="mt-4 p-4 bg-blue-50 rounded">
        <h3 className="font-semibold">Como funciona:</h3>
        <ul className="list-disc list-inside mt-2 text-sm">
          <li>Escolha um método de envio</li>
          <li>Os campos mudarão dinamicamente</li>
          <li>Apenas campos relevantes serão mostrados</li>
        </ul>
      </div>
    </div>
  );
}

export function ContactForm() {
  const handleSubmit = async (data: any) => {
    console.log("Dados do contato:", data);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Cadastro de Contato</h1>

      <FormBuilder
        schema={contactSchema}
        mode="create"
        onSubmit={handleSubmit}
      />
    </div>
  );
}

// ===== DICAS =====
/*
### Boas Práticas para Campos Condicionais

1. **Sempre use showIf com função:**
   showIf: (values) => boolean

2. **Acesse qualquer campo do formulário:**
   showIf: (values) => values.otherField === "value"

3. **Combine múltiplas condições:**
   showIf: (values) =>
     values.field1 === "x" && values.field2 > 10

4. **Validações condicionais com .refine():**
   - Use quando campo condicional precisa ser obrigatório
   - Aplique após o .object()

5. **Campos condicionais podem ter required: true:**
   - Mas só será validado se o campo estiver visível
   - Combine com .refine() para garantir

6. **Performance:**
   - showIf é reavaliado toda vez que o formulário muda
   - Mantenha a função simples e rápida
   - Não faça chamadas async dentro de showIf

7. **Debugging:**
   - console.log dentro de showIf para ver valores
   - Verifique se o campo de controle existe
*/

// ===== USAGE =====
/*
export default function Page() {
  return <ShippingForm />;
}

// Ou qualquer outro exemplo:
export default function Page() {
  return <ContactForm />;
}
*/

