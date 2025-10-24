import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

// Mock data para demonstração
let mockUsers = [
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
      }
    ],
    contatos: [
      {
        id: "1",
        tipo: "telefone",
        valor: "(11) 98765-4321",
        descricao: "Principal",
        preferencial: true,
      }
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
  }
];

export const userRouter = createTRPCRouter({
  // Listar usuários com paginação
  list: publicProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        pageSize: z.number().min(1).max(100).default(10),
        search: z.string().optional(),
        status: z.enum(["all", "active", "inactive"]).default("all"),
      })
    )
    .query(async ({ input }) => {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));

      let filteredUsers = mockUsers;

      // Aplicar filtro de busca
      if (input.search) {
        const searchLower = input.search.toLowerCase();
        filteredUsers = filteredUsers.filter(
          user =>
            user.nome.toLowerCase().includes(searchLower) ||
            user.email.toLowerCase().includes(searchLower)
        );
      }

      // Aplicar filtro de status
      if (input.status === "active") {
        filteredUsers = filteredUsers.filter(user => user.ativo);
      } else if (input.status === "inactive") {
        filteredUsers = filteredUsers.filter(user => !user.ativo);
      }

      // Paginação
      const total = filteredUsers.length;
      const start = (input.page - 1) * input.pageSize;
      const end = start + input.pageSize;
      const data = filteredUsers.slice(start, end);

      return {
        data,
        total,
        page: input.page,
        pageSize: input.pageSize,
        totalPages: Math.ceil(total / input.pageSize),
      };
    }),

  // Buscar usuário por ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 300));

      const user = mockUsers.find(u => u.id === input.id);
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
      await new Promise(resolve => setTimeout(resolve, 1000));

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
      await new Promise(resolve => setTimeout(resolve, 1000));

      const userIndex = mockUsers.findIndex(u => u.id === input.id);
      if (userIndex === -1) {
        throw new Error("Usuário não encontrado");
      }

      mockUsers[userIndex] = { ...input };

      return mockUsers[userIndex];
    }),

  // Excluir usuário
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 800));

      const userIndex = mockUsers.findIndex(u => u.id === input.id);
      if (userIndex === -1) {
        throw new Error("Usuário não encontrado");
      }

      const deletedUser = mockUsers[userIndex];
      mockUsers.splice(userIndex, 1);

      return deletedUser;
    }),
});
