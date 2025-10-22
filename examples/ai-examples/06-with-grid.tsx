/**
 * EXEMPLO: Grid/Sublista (1:N)
 *
 * Demonstra uso de grids para sublistas (relacionamentos 1:N)
 * Ex: Pessoa tem vários Endereços, Pedido tem vários Itens
 *
 * Features:
 * - Grid com CRUD inline (criar/editar/excluir itens)
 * - Modal para adicionar/editar itens
 * - Validação de quantidade mínima/máxima
 * - Responsivo (grid → lista em mobile)
 *
 * Para usar:
 * 1. Crie o schema do item (sublista)
 * 2. Use zKUI.grid() no schema principal
 * 3. Configure columns, allowCreate, allowEdit, allowDelete
 */

// ===== IMPORTS =====
import { FormBuilder } from "@kui-framework/forms";
import { zKUI } from "@kui-framework/zod-extension";

// ===== EXEMPLO 1: Pessoa com Telefones =====

// Schema do item
const phoneSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  type: zKUI.select("Tipo", ["mobile", "home", "work"], {
    required: true
  }),
  number: zKUI.text("Número", {
    required: true,
    mask: "(99) 99999-9999",
    placeholder: "(00) 00000-0000"
  }),
  isMain: zKUI.checkbox("Principal"),
});

// Schema principal
export const personWithPhonesSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  name: zKUI.text("Nome Completo", { required: true }),
  email: zKUI.email("E-mail", { required: true }),

  phones: zKUI.grid("Telefones", {
    itemSchema: phoneSchema,
    columns: [
      { key: "type", label: "Tipo" },
      { key: "number", label: "Número" },
      { key: "isMain", label: "Principal" },
    ],
    allowCreate: true,
    allowEdit: true,
    allowDelete: true,
    minItems: 1, // Pelo menos 1 telefone
    maxItems: 5, // No máximo 5 telefones
  }),
});

// ===== EXEMPLO 2: Pessoa com Endereços =====

const addressSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  type: zKUI.select("Tipo", ["residential", "commercial"], {
    required: true
  }),
  street: zKUI.text("Rua", { required: true }),
  number: zKUI.text("Número", { required: true }),
  complement: zKUI.text("Complemento"),
  neighborhood: zKUI.text("Bairro", { required: true }),
  city: zKUI.text("Cidade", { required: true }),
  state: zKUI.select("Estado", [
    "SP", "RJ", "MG", "ES", "RS", "SC", "PR", "BA", "PE", "CE"
  ], { required: true }),
  zipCode: zKUI.text("CEP", {
    required: true,
    mask: "99999-999",
    placeholder: "00000-000"
  }),
  isMain: zKUI.checkbox("Endereço Principal"),
});

export const personWithAddressesSchema = zKUI
  .object({
    id: zKUI.identifier("ID"),
    name: zKUI.text("Nome Completo", { required: true }),
    email: zKUI.email("E-mail", { required: true }),

    addresses: zKUI.grid("Endereços", {
      itemSchema: addressSchema,
      columns: [
        { key: "type", label: "Tipo" },
        { key: "street", label: "Rua" },
        { key: "number", label: "Número" },
        { key: "city", label: "Cidade" },
        { key: "isMain", label: "Principal" },
      ],
      allowCreate: true,
      allowEdit: true,
      allowDelete: true,
      minItems: 1,
      pageSize: 10,
    }),
  })
  .refine(
    (data) => {
      // Deve haver exatamente 1 endereço principal
      const mainAddresses = data.addresses?.filter((a) => a.isMain) || [];
      return mainAddresses.length === 1;
    },
    {
      message: "Deve haver exatamente um endereço principal",
      path: ["addresses"],
    }
  );

// ===== EXEMPLO 3: Pedido com Itens (com cálculos) =====

const orderItemSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  product: zKUI.text("Produto", { required: true }),
  quantity: zKUI.number("Qtd", {
    required: true,
    min: 1,
    default: 1,
  }),
  unitPrice: zKUI.currency("Preço Unit.", {
    required: true,
    currency: "BRL",
  }),
  // Total calculado automaticamente
  total: zKUI.currency("Total", {
    derived: true,
    readOnly: true,
    currency: "BRL",
    compute: (values) => (values.quantity || 0) * (values.unitPrice || 0),
  }),
});

export const orderSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  customerName: zKUI.text("Cliente", { required: true }),
  orderDate: zKUI.date("Data do Pedido", {
    required: true,
    default: new Date(),
  }),

  items: zKUI.grid("Itens do Pedido", {
    itemSchema: orderItemSchema,
    columns: [
      { key: "product", label: "Produto" },
      { key: "quantity", label: "Qtd" },
      { key: "unitPrice", label: "Preço Unit." },
      { key: "total", label: "Total" },
    ],
    allowCreate: true,
    allowEdit: true,
    allowDelete: true,
    minItems: 1,
  }),

  // Total geral do pedido
  totalOrder: zKUI.currency("Total do Pedido", {
    derived: true,
    readOnly: true,
    currency: "BRL",
    compute: (values) => {
      if (!values.items || values.items.length === 0) return 0;
      return values.items.reduce((sum, item) => {
        return sum + ((item.quantity || 0) * (item.unitPrice || 0));
      }, 0);
    },
  }),

  notes: zKUI.textarea("Observações", {
    rows: 3,
    placeholder: "Observações sobre o pedido..."
  }),
});

// ===== EXEMPLO 4: Projeto com Tarefas =====

const taskSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  title: zKUI.text("Título", { required: true }),
  description: zKUI.textarea("Descrição"),
  status: zKUI.select("Status", [
    "pending",
    "in_progress",
    "done"
  ], {
    required: true,
    default: "pending",
  }),
  priority: zKUI.rating("Prioridade", {
    max: 5,
    required: true,
    default: 3,
  }),
  dueDate: zKUI.date("Prazo"),
});

export const projectSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  name: zKUI.text("Nome do Projeto", { required: true }),
  description: zKUI.textarea("Descrição"),
  startDate: zKUI.date("Data de Início", { required: true }),
  endDate: zKUI.date("Data de Término"),

  tasks: zKUI.grid("Tarefas", {
    itemSchema: taskSchema,
    columns: [
      { key: "title", label: "Título" },
      { key: "status", label: "Status" },
      { key: "priority", label: "Prioridade" },
      { key: "dueDate", label: "Prazo" },
    ],
    allowCreate: true,
    allowEdit: true,
    allowDelete: true,
    breakpoint: "md", // Muda para lista em telas < md
  }),
});

// ===== COMPONENTS =====

export function PersonWithPhonesForm() {
  const handleSubmit = async (data: any) => {
    console.log("Dados:", data);

    // O grid retorna os itens com metadata
    // Exemplo: data.phones
    // [
    //   { id: 1, type: "mobile", number: "...", __meta__: { action: "updated" } },
    //   { type: "home", number: "...", __meta__: { action: "new" } },
    //   { id: 3, __meta__: { action: "deleted" } }
    // ]

    // Processar no backend conforme necessário
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Cadastro de Pessoa</h1>

      <FormBuilder
        schema={personWithPhonesSchema}
        mode="create"
        onSubmit={handleSubmit}
      />

      <div className="mt-6 p-4 bg-blue-50 rounded">
        <h3 className="font-semibold">Como funciona:</h3>
        <ul className="list-disc list-inside mt-2 text-sm space-y-1">
          <li>Clique em "Adicionar" para incluir um telefone</li>
          <li>Edite ou exclua itens usando os botões na tabela</li>
          <li>É obrigatório ter pelo menos 1 telefone</li>
          <li>Máximo de 5 telefones permitidos</li>
        </ul>
      </div>
    </div>
  );
}

export function OrderForm() {
  const handleSubmit = async (data: any) => {
    console.log("Pedido:", data);
    console.log("Total calculado:", data.totalOrder);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Novo Pedido</h1>

      <FormBuilder
        schema={orderSchema}
        mode="create"
        onSubmit={handleSubmit}
      />

      <div className="mt-6 p-4 bg-green-50 rounded">
        <h3 className="font-semibold">Funcionalidades:</h3>
        <ul className="list-disc list-inside mt-2 text-sm space-y-1">
          <li>Adicione itens ao pedido</li>
          <li>Total de cada item é calculado automaticamente</li>
          <li>Total geral do pedido é atualizado em tempo real</li>
          <li>Mínimo de 1 item obrigatório</li>
        </ul>
      </div>
    </div>
  );
}

// ===== DICAS =====
/*
### Boas Práticas para Grids

1. **Estrutura básica:**
   - Crie schema do item separado
   - Use zKUI.grid() com itemSchema
   - Configure columns para exibição

2. **Columns:**
   - Use key exatamente como no schema do item
   - Label é o cabeçalho da coluna
   - Inclua apenas campos relevantes para visualização

3. **Controle de ações:**
   allowCreate: true,   // Botão "Adicionar"
   allowEdit: true,     // Botão de editar em cada linha
   allowDelete: true,   // Botão de excluir em cada linha

4. **Validações:**
   minItems: 1,  // Mínimo obrigatório
   maxItems: 10, // Máximo permitido

5. **Paginação:**
   pageSize: 10,  // Itens por página

6. **Responsividade:**
   breakpoint: "md",  // sm, md, lg - quando muda para lista

7. **Dados de retorno:**
   - Itens têm __meta__ com action: "new" | "updated" | "deleted"
   - Processar no backend conforme necessário
   - Novos itens não têm ID
   - Deletados retornam apenas ID + __meta__

8. **Validações customizadas:**
   - Use .refine() no schema principal
   - Valide array de itens (ex: ter 1 principal)

9. **Performance:**
   - Grid renderiza modal para add/edit
   - Items são paginados localmente
   - Use pageSize adequado ao caso de uso

10. **Campos derivados no item:**
    - Funciona normalmente
    - Cálculo é feito para cada item
    - Pode usar valores do próprio item
*/

// ===== PERSISTÊNCIA NO BACKEND =====
/*
### Como processar o grid no backend

// Exemplo com tRPC
const updatePerson = publicProcedure
  .input(personWithPhonesSchema)
  .mutation(async ({ input }) => {
    const { phones, ...personData } = input;

    // Atualizar dados da pessoa
    await db.person.update({
      where: { id: input.id },
      data: personData,
    });

    // Processar phones
    for (const phone of phones) {
      const meta = phone.__meta__;

      if (meta?.action === "new") {
        // Criar novo telefone
        await db.phone.create({
          data: {
            personId: input.id,
            type: phone.type,
            number: phone.number,
            isMain: phone.isMain,
          },
        });

      } else if (meta?.action === "updated") {
        // Atualizar telefone existente
        await db.phone.update({
          where: { id: phone.id },
          data: {
            type: phone.type,
            number: phone.number,
            isMain: phone.isMain,
          },
        });

      } else if (meta?.action === "deleted") {
        // Excluir telefone
        await db.phone.delete({
          where: { id: phone.id },
        });
      }
    }

    return { success: true };
  });
*/

// ===== USAGE =====
/*
export default function Page() {
  return <PersonWithPhonesForm />;
}

export default function OrderPage() {
  return <OrderForm />;
}
*/

