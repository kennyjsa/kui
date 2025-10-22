/**
 * EXEMPLO: Formulário Mínimo
 *
 * O exemplo mais simples possível de um formulário KUI funcional.
 * Use como ponto de partida para qualquer formulário básico.
 *
 * Features:
 * - Schema básico com 3 campos
 * - FormBuilder com modo create
 * - Submit simples
 *
 * Para usar:
 * 1. Copie este código
 * 2. Adapte os campos do schema
 * 3. Implemente o onSubmit conforme necessário
 */

// ===== IMPORTS =====
import { FormBuilder } from "@kui-framework/forms";
import { zKUI } from "@kui-framework/zod-extension";

// ===== SCHEMA =====
export const userSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  name: zKUI.text("Nome", { required: true }),
  email: zKUI.email("E-mail", { required: true }),
  age: zKUI.number("Idade"),
});

// ===== TYPES =====
export type User = typeof userSchema._type;

// ===== COMPONENT =====
export function MinimalForm() {
  const handleSubmit = async (data: User) => {
    console.log("Dados enviados:", data);
    // Aqui você faria a chamada para o backend
    // await fetch('/api/users', { method: 'POST', body: JSON.stringify(data) });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <FormBuilder
        schema={userSchema}
        mode="create"
        onSubmit={handleSubmit}
      />
    </div>
  );
}

// ===== USAGE =====
/*
// Em uma página Next.js:
export default function CreateUserPage() {
  return <MinimalForm />;
}

// Em um componente React:
function App() {
  return (
    <div>
      <h1>Criar Usuário</h1>
      <MinimalForm />
    </div>
  );
}
*/

