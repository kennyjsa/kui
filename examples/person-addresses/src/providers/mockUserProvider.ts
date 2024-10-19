import type { DataProvider } from "@kui/core";

export interface User {
  id: number;
  nome: string;
  email: string;
}

// Mock de usuários
const mockUsers: User[] = [
  { id: 1, nome: "Admin Sistema", email: "admin@system.com" },
  { id: 2, nome: "João Silva", email: "joao@example.com" },
  { id: 3, nome: "Maria Santos", email: "maria@example.com" },
  { id: 4, nome: "Pedro Oliveira", email: "pedro@example.com" },
  { id: 5, nome: "Ana Costa", email: "ana@example.com" },
];

/**
 * Provider mock para demonstração de relações
 */
export const mockUserProvider: DataProvider<User> = {
  name: "userProvider",

  async list(params) {
    // Simula delay de rede
    await new Promise((resolve) => setTimeout(resolve, 300));

    let filteredUsers = [...mockUsers];

    // Busca por nome
    if (params?.search) {
      const search = params.search.toLowerCase();
      filteredUsers = filteredUsers.filter((user) =>
        user.nome.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
      );
    }

    return {
      data: filteredUsers,
      total: filteredUsers.length,
      page: params?.page || 1,
      pageSize: params?.pageSize || 1000,
    };
  },

  async get(id) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const user = mockUsers.find((u) => u.id === Number(id));
    if (!user) throw new Error("Usuário não encontrado");
    return user;
  },

  async create(data) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newUser = {
      id: Math.max(...mockUsers.map((u) => u.id)) + 1,
      ...data,
    } as User;
    mockUsers.push(newUser);
    return newUser;
  },

  async update(id, data) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mockUsers.findIndex((u) => u.id === Number(id));
    if (index === -1) throw new Error("Usuário não encontrado");
    mockUsers[index] = { ...mockUsers[index], ...data };
    return mockUsers[index];
  },

  async delete(id) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mockUsers.findIndex((u) => u.id === Number(id));
    if (index === -1) throw new Error("Usuário não encontrado");
    mockUsers.splice(index, 1);
  },
};

