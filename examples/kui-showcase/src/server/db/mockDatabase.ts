/**
 * Mock database - simulação de banco de dados em memória
 * Em produção, substitua por Prisma, Drizzle, etc.
 */

export interface Pessoa {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  dataNascimento: string;
  idade?: number;
  observacoes?: string;
  salario?: number;
  aceitaTermos: boolean;
  estadoCivil?: string;
  ativo: boolean;
  avaliacaoAtendimento?: number;
  corFavorita?: string;
  foto?: string;
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
}

// Database em memória
let pessoas: Pessoa[] = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@example.com",
    cpf: "123.456.789-00",
    telefone: "(11) 98765-4321",
    dataNascimento: "1990-01-15",
    idade: 34,
    observacoes: "Cliente VIP",
    salario: 5000.00,
    aceitaTermos: true,
    estadoCivil: "casado",
    ativo: true,
    avaliacaoAtendimento: 5,
    corFavorita: "#3b82f6",
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria@example.com",
    cpf: "987.654.321-00",
    telefone: "(11) 91234-5678",
    dataNascimento: "1985-05-20",
    idade: 39,
    salario: 7500.00,
    aceitaTermos: true,
    estadoCivil: "solteiro",
    ativo: true,
    avaliacaoAtendimento: 4.5,
    corFavorita: "#ec4899",
  },
];

let usuarios: Usuario[] = [
  { id: 1, nome: "Admin", email: "admin@example.com" },
  { id: 2, nome: "User", email: "user@example.com" },
];

let nextPessoaId = 3;

// Simulate async operations
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const db = {
  pessoa: {
    async findMany(params?: { skip?: number; take?: number }) {
      await delay(100); // Simula latência
      const { skip = 0, take = 10 } = params || {};
      return pessoas.slice(skip, skip + take);
    },

    async count() {
      await delay(50);
      return pessoas.length;
    },

    async findUnique(params: { where: { id: number } }) {
      await delay(50);
      return pessoas.find(p => p.id === params.where.id) || null;
    },

    async create(params: { data: Omit<Pessoa, 'id'> }) {
      await delay(100);
      const newPessoa = {
        ...params.data,
        id: nextPessoaId++,
      };
      pessoas.push(newPessoa);
      return newPessoa;
    },

    async update(params: { where: { id: number }; data: Partial<Pessoa> }) {
      await delay(100);
      const index = pessoas.findIndex(p => p.id === params.where.id);
      if (index === -1) throw new Error('Pessoa não encontrada');

      pessoas[index] = { ...pessoas[index], ...params.data };
      return pessoas[index];
    },

    async delete(params: { where: { id: number } }) {
      await delay(100);
      const index = pessoas.findIndex(p => p.id === params.where.id);
      if (index === -1) throw new Error('Pessoa não encontrada');

      const deleted = pessoas[index];
      pessoas = pessoas.filter(p => p.id !== params.where.id);
      return deleted;
    },
  },

  usuario: {
    async findMany(params?: { skip?: number; take?: number }) {
      await delay(50);
      const { skip = 0, take = 10 } = params || {};
      return usuarios.slice(skip, skip + take);
    },

    async count() {
      await delay(30);
      return usuarios.length;
    },
  },
};

