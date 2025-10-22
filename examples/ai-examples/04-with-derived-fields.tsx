/**
 * EXEMPLO: Campos Derivados (Calculados)
 *
 * Demonstra uso de campos calculados automaticamente (derived fields)
 *
 * Features:
 * - Cálculo de idade a partir da data de nascimento
 * - Cálculo de total (quantidade × preço)
 * - Cálculo de desconto e economia
 * - Campos readonly automáticos
 *
 * Para usar:
 * 1. Copie o schema do exemplo que se encaixa
 * 2. Adapte a função compute conforme sua necessidade
 * 3. Sempre use derived: true + readOnly: true + compute
 */

// ===== IMPORTS =====
import { FormBuilder } from "@kui-framework/forms";
import { zKUI } from "@kui-framework/zod-extension";

// ===== EXEMPLO 1: Cálculo de Idade =====
export const personSchema = zKUI.object({
  id: zKUI.identifier("ID"),

  name: zKUI.text("Nome Completo", { required: true }),

  birthDate: zKUI.date("Data de Nascimento", { required: true }),

  // Campo derivado: calculado automaticamente
  age: zKUI.number("Idade", {
    derived: true,
    readOnly: true,
    compute: (values) => {
      if (!values.birthDate) return null;

      const today = new Date();
      const birth = new Date(values.birthDate);

      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();

      // Ajustar se ainda não fez aniversário este ano
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }

      return age;
    },
  }),
});

// ===== EXEMPLO 2: Cálculo de Total =====
export const orderItemSchema = zKUI.object({
  id: zKUI.identifier("ID"),

  product: zKUI.text("Produto", { required: true }),

  quantity: zKUI.number("Quantidade", {
    required: true,
    min: 1,
    default: 1,
  }),

  unitPrice: zKUI.currency("Preço Unitário", {
    required: true,
    currency: "BRL",
  }),

  // Total = Quantidade × Preço Unitário
  total: zKUI.currency("Total", {
    derived: true,
    readOnly: true,
    currency: "BRL",
    compute: (values) => {
      const qty = values.quantity || 0;
      const price = values.unitPrice || 0;
      return qty * price;
    },
  }),
});

// ===== EXEMPLO 3: Cálculo com Desconto =====
export const productWithDiscountSchema = zKUI.object({
  id: zKUI.identifier("ID"),

  name: zKUI.text("Produto", { required: true }),

  originalPrice: zKUI.currency("Preço Original", {
    required: true,
    currency: "BRL",
  }),

  discountPercentage: zKUI.number("Desconto (%)", {
    min: 0,
    max: 100,
    default: 0,
    helperText: "Desconto em porcentagem (0-100)",
  }),

  // Preço com desconto
  finalPrice: zKUI.currency("Preço Final", {
    derived: true,
    readOnly: true,
    currency: "BRL",
    compute: (values) => {
      const original = values.originalPrice || 0;
      const discount = values.discountPercentage || 0;
      return original - (original * discount / 100);
    },
  }),

  // Quanto economiza
  savings: zKUI.currency("Economia", {
    derived: true,
    readOnly: true,
    currency: "BRL",
    compute: (values) => {
      const original = values.originalPrice || 0;
      const discount = values.discountPercentage || 0;
      return (original * discount / 100);
    },
  }),
});

// ===== EXEMPLO 4: Múltiplos Cálculos Dependentes =====
export const salarySchema = zKUI.object({
  id: zKUI.identifier("ID"),

  name: zKUI.text("Nome", { required: true }),

  baseSalary: zKUI.currency("Salário Base", {
    required: true,
    currency: "BRL",
  }),

  bonus: zKUI.currency("Bônus", {
    currency: "BRL",
    default: 0,
  }),

  // Salário Bruto = Base + Bônus
  grossSalary: zKUI.currency("Salário Bruto", {
    derived: true,
    readOnly: true,
    currency: "BRL",
    compute: (values) => {
      const base = values.baseSalary || 0;
      const bonus = values.bonus || 0;
      return base + bonus;
    },
  }),

  // INSS (11% do bruto, simplificado)
  inss: zKUI.currency("INSS (11%)", {
    derived: true,
    readOnly: true,
    currency: "BRL",
    compute: (values) => {
      const gross = values.grossSalary || 0;
      return gross * 0.11;
    },
  }),

  // IR (27.5% simplificado, apenas exemplo)
  irrf: zKUI.currency("IRRF (27.5%)", {
    derived: true,
    readOnly: true,
    currency: "BRL",
    compute: (values) => {
      const gross = values.grossSalary || 0;
      return gross * 0.275;
    },
  }),

  // Salário Líquido = Bruto - INSS - IR
  netSalary: zKUI.currency("Salário Líquido", {
    derived: true,
    readOnly: true,
    currency: "BRL",
    compute: (values) => {
      const gross = values.grossSalary || 0;
      const inss = values.inss || 0;
      const irrf = values.irrf || 0;
      return gross - inss - irrf;
    },
  }),
});

// ===== COMPONENT =====
export function PersonForm() {
  const handleSubmit = async (data: any) => {
    console.log("Dados enviados:", data);
    // Note que campos derived são incluídos no data
    // Se você não quer persistí-los, filtre no backend
    // ou adicione transient: true
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Cadastro de Pessoa</h1>

      <FormBuilder
        schema={personSchema}
        mode="create"
        onSubmit={handleSubmit}
      />

      <div className="mt-4 p-4 bg-blue-50 rounded">
        <h3 className="font-semibold">Como funciona:</h3>
        <ul className="list-disc list-inside mt-2 text-sm">
          <li>Selecione uma data de nascimento</li>
          <li>O campo "Idade" será calculado automaticamente</li>
          <li>A idade atualiza em tempo real</li>
        </ul>
      </div>
    </div>
  );
}

export function OrderItemForm() {
  const handleSubmit = async (data: any) => {
    console.log("Item do pedido:", data);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Item do Pedido</h1>

      <FormBuilder
        schema={orderItemSchema}
        mode="create"
        onSubmit={handleSubmit}
      />

      <div className="mt-4 p-4 bg-green-50 rounded">
        <h3 className="font-semibold">Como funciona:</h3>
        <ul className="list-disc list-inside mt-2 text-sm">
          <li>Digite a quantidade e o preço unitário</li>
          <li>O total será calculado automaticamente</li>
          <li>Total = Quantidade × Preço Unitário</li>
        </ul>
      </div>
    </div>
  );
}

// ===== DICAS =====
/*
### Boas Práticas para Campos Derivados

1. **Sempre use estas 3 opções juntas:**
   - derived: true
   - readOnly: true
   - compute: (values) => ...

2. **Função compute recebe todos os valores do formulário:**
   compute: (values) => {
     // values contém todos os campos do schema
     return calculoAqui;
   }

3. **Retorne null se não puder calcular:**
   compute: (values) => {
     if (!values.requiredField) return null;
     return calculation;
   }

4. **Campos derivados SÃO incluídos no submit:**
   - Se não quer persistir, adicione: transient: true
   - Ou filtre no backend

5. **Cálculos atualizam em tempo real:**
   - Use useDerivedFields do KUI (já incluído no FormBuilder)
   - Atualiza quando campos dependentes mudam

6. **Para cálculos complexos:**
   - Pode acessar qualquer campo do formulário
   - Pode usar bibliotecas externas
   - Mantenha a função pura (sem side effects)
*/

// ===== USAGE =====
/*
export default function Page() {
  return <PersonForm />;
}

// Ou use qualquer um dos outros exemplos:
export default function Page() {
  return <OrderItemForm />;
}
*/

