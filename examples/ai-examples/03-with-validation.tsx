/**
 * EXEMPLO: Formulário com Validações
 *
 * Demonstra validações cross-field (entre campos) usando .refine()
 *
 * Features:
 * - Validação de senha e confirmação
 * - Validação de idade mínima
 * - Validação de termos obrigatórios
 * - Campo transiente (confirmPassword não persiste)
 *
 * Para usar:
 * 1. Copie o schema
 * 2. Adapte as validações conforme sua necessidade
 * 3. Use .refine() para validações customizadas
 */

// ===== IMPORTS =====
import { FormBuilder } from "@kui-framework/forms";
import { zKUI } from "@kui-framework/zod-extension";

// ===== SCHEMA =====
export const registrationSchema = zKUI
  .object({
    id: zKUI.identifier("ID"),

    username: zKUI.text("Nome de Usuário", {
      required: true,
      minLength: 3,
      maxLength: 20,
      placeholder: "mínimo 3 caracteres",
    }),

    email: zKUI.email("E-mail", {
      required: true,
      placeholder: "seu@email.com"
    }),

    password: zKUI.password("Senha", {
      required: true,
      minLength: 8,
      helperText: "Mínimo 8 caracteres"
    }),

    // Campo transiente - não será persistido no backend
    confirmPassword: zKUI.password("Confirmar Senha", {
      required: true,
      transient: true,
    }),

    age: zKUI.number("Idade", {
      required: true,
      min: 0,
      max: 150,
    }),

    acceptTerms: zKUI.checkbox("Aceito os termos de uso e política de privacidade", {
      required: true
    }),
  })
  // Validação 1: Senhas devem conferir
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"], // mostra erro no campo confirmPassword
  })
  // Validação 2: Idade mínima de 18 anos
  .refine((data) => data.age >= 18, {
    message: "Você deve ter pelo menos 18 anos para se cadastrar",
    path: ["age"], // mostra erro no campo age
  });

// ===== TYPES =====
export type Registration = typeof registrationSchema._type;

// ===== COMPONENT =====
export function RegistrationForm() {
  const handleSubmit = async (data: Registration) => {
    console.log("Dados do registro:", data);
    // Note que 'confirmPassword' não estará presente aqui (transient: true)

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Erro ao registrar");

      console.log("Registro realizado com sucesso!");
      // Redirecionar para login ou dashboard

    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao realizar registro");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Criar Conta</h1>

      <FormBuilder
        schema={registrationSchema}
        mode="create"
        onSubmit={handleSubmit}
      />
    </div>
  );
}

// ===== OUTRO EXEMPLO: Validação de Datas =====
export const eventSchema = zKUI
  .object({
    id: zKUI.identifier("ID"),
    name: zKUI.text("Nome do Evento", { required: true }),
    startDate: zKUI.date("Data de Início", { required: true }),
    endDate: zKUI.date("Data de Término", { required: true }),
  })
  // Data de término deve ser após data de início
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) return true;
      return new Date(data.endDate) > new Date(data.startDate);
    },
    {
      message: "A data de término deve ser posterior à data de início",
      path: ["endDate"],
    }
  );

// ===== OUTRO EXEMPLO: Validação Condicional =====
export const contactSchema = zKUI
  .object({
    id: zKUI.identifier("ID"),
    name: zKUI.text("Nome", { required: true }),

    contactType: zKUI.radio("Tipo de Contato", [
      { label: "Pessoa Física", value: "individual" },
      { label: "Pessoa Jurídica", value: "company" }
    ], { required: true }),

    cpf: zKUI.text("CPF", {
      mask: "999.999.999-99",
      showIf: (values) => values.contactType === "individual",
    }),

    cnpj: zKUI.text("CNPJ", {
      mask: "99.999.999/9999-99",
      showIf: (values) => values.contactType === "company",
    }),
  })
  // CPF obrigatório para Pessoa Física
  .refine(
    (data) => {
      if (data.contactType === "individual") {
        return !!data.cpf && data.cpf.length > 0;
      }
      return true;
    },
    {
      message: "CPF é obrigatório para Pessoa Física",
      path: ["cpf"],
    }
  )
  // CNPJ obrigatório para Pessoa Jurídica
  .refine(
    (data) => {
      if (data.contactType === "company") {
        return !!data.cnpj && data.cnpj.length > 0;
      }
      return true;
    },
    {
      message: "CNPJ é obrigatório para Pessoa Jurídica",
      path: ["cnpj"],
    }
  );

// ===== USAGE =====
/*
// Use como qualquer outro formulário
export default function RegisterPage() {
  return <RegistrationForm />;
}

// Os erros de validação aparecem automaticamente
// quando o usuário tenta submeter o formulário
*/

