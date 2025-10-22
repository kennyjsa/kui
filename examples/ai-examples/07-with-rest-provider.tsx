/**
 * EXEMPLO: Integração com REST API
 *
 * Demonstra integração completa com REST API usando createRestProvider
 *
 * Features:
 * - Configuração de provider REST
 * - CRUD completo com API
 * - Headers customizados (autenticação)
 * - Transformação de dados
 *
 * Para usar:
 * 1. Configure o provider com sua API
 * 2. Registre no KuiDataProvider
 * 3. Use os métodos list, get, create, update, delete
 */

// ===== IMPORTS =====
import { FormBuilder } from "@kui-framework/forms";
import { createRestProvider, KuiDataProvider } from "@kui-framework/core";
import { zKUI } from "@kui-framework/zod-extension";
import { useState, useEffect } from "react";

// ===== SCHEMA =====
export const userSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  name: zKUI.text("Nome", { required: true }),
  email: zKUI.email("E-mail", { required: true }),
  username: zKUI.text("Nome de Usuário", { required: true }),
  role: zKUI.select("Perfil", ["admin", "user", "guest"], {
    required: true,
  }),
  active: zKUI.switch("Ativo"),
  createdAt: zKUI.systemDate("Criado em"),
});

export type User = typeof userSchema._type;

// ===== PROVIDER CONFIGURATION =====

/**
 * Provider para API REST
 *
 * Configure baseUrl e endpoints conforme sua API
 */
export const userProvider = createRestProvider({
  name: "userProvider",
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",

  // Endpoints da API
  endpoints: {
    list: "/api/users",              // GET /api/users?page=1&pageSize=10
    get: "/api/users/:id",            // GET /api/users/123
    create: "/api/users",             // POST /api/users
    update: "/api/users/:id",         // PUT /api/users/123
    delete: "/api/users/:id",         // DELETE /api/users/123
  },

  // Headers customizados (ex: autenticação)
  headers: () => ({
    "Content-Type": "application/json",
    // Token de autenticação
    "Authorization": `Bearer ${getAuthToken()}`,
    // Outros headers necessários
  }),

  // Transformar resposta da API para formato do form
  transformResponse: (data: any) => {
    // Se sua API retorna dados em formato diferente, transforme aqui
    // Exemplo: API retorna { user: {...} }, mas você quer apenas {...}
    return data.user || data;
  },

  // Transformar dados do form para formato da API
  transformRequest: (data: any) => {
    // Se sua API espera formato diferente, transforme aqui
    // Exemplo: remover campos que a API não aceita
    const { createdAt, updatedAt, ...apiData } = data;
    return apiData;
  },
});

// Função auxiliar para obter token (ajuste conforme seu auth)
function getAuthToken(): string {
  // Exemplo: pegar do localStorage
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken") || "";
  }
  return "";
}

// ===== APP WRAPPER =====

/**
 * Wrapper do app com providers
 * Coloque isso no layout.tsx ou _app.tsx
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <KuiDataProvider
      providers={[
        { name: "userProvider", provider: userProvider }
      ]}
    >
      {children}
    </KuiDataProvider>
  );
}

// ===== COMPONENTS =====

/**
 * Página de Criação
 */
export function CreateUserPage() {
  const handleSubmit = async (data: User) => {
    try {
      // O provider já está configurado, use diretamente
      const newUser = await userProvider.create(data);
      console.log("Usuário criado:", newUser);

      // Redirecionar ou mostrar sucesso
      alert("Usuário criado com sucesso!");

    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      alert("Erro ao criar usuário");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Criar Usuário</h1>

      <FormBuilder
        schema={userSchema}
        mode="create"
        onSubmit={handleSubmit}
      />
    </div>
  );
}

/**
 * Página de Edição
 */
export function EditUserPage({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carregar usuário
    userProvider.get(userId)
      .then(setUser)
      .catch((error) => {
        console.error("Erro ao carregar usuário:", error);
        alert("Erro ao carregar usuário");
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const handleSubmit = async (data: User) => {
    try {
      const updatedUser = await userProvider.update(userId, data);
      console.log("Usuário atualizado:", updatedUser);

      alert("Usuário atualizado com sucesso!");

    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      alert("Erro ao atualizar usuário");
    }
  };

  if (loading) {
    return <div className="p-6">Carregando...</div>;
  }

  if (!user) {
    return <div className="p-6">Usuário não encontrado</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Usuário</h1>

      <FormBuilder
        schema={userSchema}
        mode="edit"
        defaultValues={user}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

/**
 * Listagem de Usuários
 */
export function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    loadUsers();
  }, [page]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await userProvider.list({ page, pageSize });
      setUsers(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      alert("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) {
      return;
    }

    try {
      await userProvider.delete(id);
      alert("Usuário excluído com sucesso!");
      loadUsers(); // Recarregar lista
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      alert("Erro ao excluir usuário");
    }
  };

  if (loading) {
    return <div className="p-6">Carregando...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Usuários</h1>
        <a
          href="/users/create"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Novo Usuário
        </a>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                E-mail
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Perfil
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.active ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a
                    href={`/users/${user.id}`}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Ver
                  </a>
                  <a
                    href={`/users/${user.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </a>
                  <button
                    onClick={() => handleDelete(user.id!)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação simples */}
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-700">
          Mostrando {(page - 1) * pageSize + 1} até {Math.min(page * pageSize, total)} de {total} usuários
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page * pageSize >= total}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}

// ===== CONFIGURAÇÃO DA API (Backend) =====
/*
### Exemplo de API REST esperada

// GET /api/users?page=1&pageSize=10
{
  "data": [
    { "id": 1, "name": "João", "email": "joao@example.com", ... },
    { "id": 2, "name": "Maria", "email": "maria@example.com", ... }
  ],
  "total": 50
}

// GET /api/users/1
{
  "id": 1,
  "name": "João",
  "email": "joao@example.com",
  "username": "joao",
  "role": "admin",
  "active": true,
  "createdAt": "2024-01-01T00:00:00.000Z"
}

// POST /api/users
// Request body: { name, email, username, role, active }
// Response: { id: 123, name, email, ... }

// PUT /api/users/1
// Request body: { name, email, username, role, active }
// Response: { id: 1, name, email, ... }

// DELETE /api/users/1
// Response: 204 No Content ou { success: true }
*/

// ===== DICAS =====
/*
### Boas Práticas para REST Provider

1. **Configuração do baseUrl:**
   - Use variável de ambiente: process.env.NEXT_PUBLIC_API_URL
   - Diferentes por ambiente (dev, staging, prod)

2. **Autenticação:**
   - Configure headers com token
   - Atualize token quando expirar
   - Trate erros 401/403

3. **Transformações:**
   - transformResponse: API → Form
   - transformRequest: Form → API
   - Útil quando API tem formato diferente

4. **Endpoints dinâmicos:**
   - Use :id para parâmetros
   - Ex: "/api/users/:id" → "/api/users/123"

5. **Tratamento de erros:**
   - Provider lança exceções em erros
   - Use try/catch ao chamar métodos
   - Mostre mensagens amigáveis ao usuário

6. **Loading states:**
   - Sempre mostre loading durante requisições
   - Desabilite botões durante submit

7. **Paginação:**
   - list() aceita { page, pageSize }
   - Retorna { data, total }

8. **Headers customizados:**
   - Use função para headers dinâmicos
   - Ex: pegar token atualizado a cada requisição
*/

// ===== USAGE =====
/*
// ===== Layout ou _app.tsx =====
import { AppProviders } from "@/providers/AppProviders";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}

// ===== Páginas =====
// app/users/page.tsx
export default function UsersPage() {
  return <UserListPage />;
}

// app/users/create/page.tsx
export default function CreatePage() {
  return <CreateUserPage />;
}

// app/users/[id]/edit/page.tsx
export default function EditPage({ params }) {
  return <EditUserPage userId={Number(params.id)} />;
}
*/

