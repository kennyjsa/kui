import { z } from "zod";
import { router as createTRPCRouter, publicProcedure } from "../trpc";
import { createDataTableRouter } from "@kui/core";

export interface User {
  id: string;
  nome: string;
  email: string;
  telefone?: string | null;
  ativo?: boolean | null;
  dataNascimento?: Date | null;
  cpf?: string | null;
  enderecos: {
    id: string;
    cep: string;
    rua: string;
    qtdEnderecos: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    principal: boolean;
  }[];
  contatos: {
    id: string;
    tipo: string;
    valor: string;
    descricao: string;
    preferencial: boolean;
  }[];
  receberNotificacoes: boolean;
  idioma: string;
  observacoes?: string | null;
}

// Mock data para demonstração
let mockUsers: User[] = [
  {
    id: "1",
    nome: "João Silva",
    email: "joao.silva@example.com",
    telefone: "(11) 98765-4321",
    ativo: true,
    dataNascimento: new Date("1990-05-15"),
    cpf: "123.456.789-00",
    enderecos: [
      {
        id: "1",
        cep: "01310-100",
        rua: "Avenida Paulista",
        qtdEnderecos: "1578",
        complemento: "Conjunto 101",
        bairro: "Bela Vista",
        cidade: "São Paulo",
        uf: "SP",
        principal: true,
      },
    ],
    contatos: [
      {
        id: "1",
        tipo: "telefone",
        valor: "(11) 98765-4321",
        descricao: "Principal",
        preferencial: true,
      },
    ],
    receberNotificacoes: true,
    idioma: "pt-BR",
    observacoes: "Cliente VIP",
  },
  {
    id: "2",
    nome: "Maria Santos",
    email: "maria.santos@example.com",
    telefone: "(21) 99876-5432",
    ativo: false,
    dataNascimento: new Date("1985-03-22"),
    cpf: "987.654.321-00",
    enderecos: [],
    contatos: [],
    receberNotificacoes: false,
    idioma: "pt-BR",
    observacoes: "",
  },
  {
    id: "3",
    nome: "Pedro Costa",
    email: "pedro.costa@example.com",
    telefone: "(31) 91234-5678",
    ativo: true,
    dataNascimento: new Date("1992-11-08"),
    cpf: "456.789.123-00",
    enderecos: [],
    contatos: [],
    receberNotificacoes: true,
    idioma: "pt-BR",
    observacoes: "",
  },
];

export const userRouter = createTRPCRouter({
  // Listar usuários com paginação usando o helper do DataTable
  list: createDataTableRouter({
    procedure: publicProcedure,
    handler: async (input) => {
      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 500));

      let filteredUsers = mockUsers;

      // Aplicar filtro de busca
      if (input.search) {
        const searchLower = input.search.toLowerCase();
        filteredUsers = filteredUsers.filter(
          (user) =>
            user.nome.toLowerCase().includes(searchLower) ||
            user.email.toLowerCase().includes(searchLower)
        );
      }

      // Aplicar filtros adicionais (futuro: implementar lógica baseada em input.filters)
      if (input.filters) {
        for (const filter of input.filters) {
          if (filter.key === "ativo" && filter.operator === "eq") {
            filteredUsers = filteredUsers.filter((user) => user.ativo === filter.value);
          }
        }
      }

      // Ordenação
      if (input.sortBy) {
        filteredUsers.sort((a, b) => {
          const aVal = a[input.sortBy as keyof typeof a];
          const bVal = b[input.sortBy as keyof typeof b];

          // Tratar valores null/undefined
          if (aVal == null && bVal == null) return 0;
          if (aVal == null) return input.sortOrder === "asc" ? -1 : 1;
          if (bVal == null) return input.sortOrder === "asc" ? 1 : -1;

          if (aVal < bVal) return input.sortOrder === "asc" ? -1 : 1;
          if (aVal > bVal) return input.sortOrder === "asc" ? 1 : -1;
          return 0;
        });
      }

      // Paginação
      const total = filteredUsers.length;
      const start = (input.page - 1) * input.pageSize;
      const end = start + input.pageSize;
      const data = filteredUsers.slice(start, end);

      return {
        data,
        total,
      };
    },
  }),

  // Buscar usuário por ID
  getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 300));

    const user = mockUsers.find((u) => u.id === input.id);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }),

  // Criar novo usuário
  create: publicProcedure
    .input(
      z.object({
        nome: z.string().min(1, "Nome é obrigatório"),
        email: z.string().email("E-mail inválido"),
        cpf: z.string().min(1, "CPF é obrigatório"),
        dataNascimento: z.date(),
        telefone: z.string().optional(),
        ativo: z.boolean().default(true),
        enderecos: z.array(z.any()).default([]),
        contatos: z.array(z.any()).default([]),
        receberNotificacoes: z.boolean().default(true),
        idioma: z.string().default("pt-BR"),
        observacoes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser = {
        ...input,
        id: (mockUsers.length + 1).toString(),
      };

      mockUsers.push(newUser);

      return newUser;
    }),

  // Atualizar usuário
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        nome: z.string().min(1, "Nome é obrigatório"),
        email: z.string().email("E-mail inválido"),
        cpf: z.string().min(1, "CPF é obrigatório"),
        dataNascimento: z.date(),
        telefone: z.string().optional(),
        ativo: z.boolean(),
        enderecos: z.array(z.any()),
        contatos: z.array(z.any()),
        receberNotificacoes: z.boolean(),
        idioma: z.string(),
        observacoes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userIndex = mockUsers.findIndex((u) => u.id === input.id);
      if (userIndex === -1) {
        throw new Error("Usuário não encontrado");
      }

      mockUsers[userIndex] = { ...input };

      return mockUsers[userIndex];
    }),

  // Excluir usuário
  delete: publicProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 800));

    const userIndex = mockUsers.findIndex((u) => u.id === input.id);
    if (userIndex === -1) {
      throw new Error("Usuário não encontrado");
    }

    const deletedUser = mockUsers[userIndex];
    mockUsers.splice(userIndex, 1);

    return deletedUser;
  }),
});
