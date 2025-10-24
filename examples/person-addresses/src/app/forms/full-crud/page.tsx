"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Badge,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Pagination,
  PaginationInfo,
  Skeleton
} from "@kui-framework/ui";
import { FormBuilder } from "@kui-framework/forms";
import { KuiDataProvider } from "@kui-framework/core";
import { userSchema } from "@/schemas/user.schema";
import { userTrpcProvider } from "@/providers/userTrpcProvider";
import { trpc } from "@/lib/trpc";
import { Eye, Edit, Trash2, Plus, Search, Filter } from "lucide-react";

// Mock data para demonstração
const mockUsers = [
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
    ]
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
    contatos: []
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
    contatos: []
  }
];

export default function FullCRUDPage() {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">("create");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // Query tRPC para listar usuários
  const { data: usersData, isLoading, refetch } = trpc.user.list.useQuery({
    page: currentPage,
    pageSize: itemsPerPage,
    search: searchTerm,
    status: statusFilter as "all" | "active" | "inactive",
  });

  // Mutations tRPC
  const createMutation = trpc.user.create.useMutation({
    onSuccess: () => {
      refetch();
      setModalOpen(false);
    },
  });

  const updateMutation = trpc.user.update.useMutation({
    onSuccess: () => {
      refetch();
      setModalOpen(false);
    },
  });

  const deleteMutation = trpc.user.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleCreate = () => {
    setSelectedUser(null);
    setModalMode("create");
    setModalOpen(true);
  };

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleView = (user: any) => {
    setSelectedUser(user);
    setModalMode("view");
    setModalOpen(true);
  };

  const handleDelete = async (user: any) => {
    if (confirm(`Tem certeza que deseja excluir o usuário "${user.nome}"?`)) {
      try {
        await deleteMutation.mutateAsync({ id: user.id });
        alert("✅ Usuário excluído com sucesso!");
      } catch (error) {
        alert(`❌ Erro ao excluir usuário: ${error.message}`);
      }
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      if (modalMode === "create") {
        await createMutation.mutateAsync(data);
        alert("✅ Usuário criado com sucesso!");
      } else if (modalMode === "edit") {
        await updateMutation.mutateAsync({ id: selectedUser.id, ...data });
        alert("✅ Usuário atualizado com sucesso!");
      }
    } catch (error) {
      alert(`❌ Erro ao salvar usuário: ${error.message}`);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Full CRUD - Usuários</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Demonstração completa de um CRUD com grid de resultados, modal para operações,
          formulário completo com sections e grids, integração tRPC e estados de loading.
        </p>
      </div>

      {/* Controles */}
      <Card elevation={2}>
        <CardHeader>
          <CardTitle>Controles e Filtros</CardTitle>
          <CardDescription>
            Busque, filtre e gerencie usuários
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar por nome ou e-mail..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="inactive">Inativos</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleCreate} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Novo Usuário
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Grid de Resultados */}
      <Card elevation={2}>
        <CardHeader>
          <CardTitle>Usuários Cadastrados</CardTitle>
          <CardDescription>
            {usersData?.total || 0} usuário(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-8 w-20" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {usersData?.data.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold">
                        {user.nome.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{user.nome}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <p className="text-sm text-muted-foreground">{user.telefone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={user.ativo ? "default" : "secondary"}>
                      {user.ativo ? "Ativo" : "Inativo"}
                    </Badge>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleView(user)}
                        title="Visualizar"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(user)}
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(user)}
                        title="Excluir"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {paginatedUsers.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum usuário encontrado
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Paginação */}
      {usersData && usersData.totalPages > 1 && (
        <Card elevation={1}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <PaginationInfo
                currentPage={currentPage}
                totalPages={usersData.totalPages}
                totalItems={usersData.total}
                itemsPerPage={itemsPerPage}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={usersData.totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal CRUD */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent elevation={4} className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {modalMode === "create" && "Novo Usuário"}
              {modalMode === "edit" && "Editar Usuário"}
              {modalMode === "view" && "Visualizar Usuário"}
            </DialogTitle>
            <DialogDescription>
              {modalMode === "create" && "Preencha os dados para criar um novo usuário"}
              {modalMode === "edit" && "Edite os dados do usuário"}
              {modalMode === "view" && "Visualize os dados do usuário"}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <KuiDataProvider provider={userTrpcProvider}>
              <FormBuilder
                schema={userSchema}
                mode={modalMode}
                defaultValues={selectedUser}
                onSubmit={handleSubmit}
                loading={createMutation.isPending || updateMutation.isPending}
                grid={{ xs: 1, md: 2, lg: 3 }}
              />
            </KuiDataProvider>
          </div>
        </DialogContent>
      </Dialog>

      {/* Informações sobre o CRUD */}
      <Card elevation={1}>
        <CardHeader>
          <CardTitle>Funcionalidades do Full CRUD</CardTitle>
          <CardDescription>
            Demonstração completa das funcionalidades implementadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Grid de Resultados</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Listagem paginada</li>
                <li>• Busca em tempo real</li>
                <li>• Filtros por status</li>
                <li>• Ações (visualizar, editar, excluir)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Modal CRUD</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Modo create (novo)</li>
                <li>• Modo edit (editar)</li>
                <li>• Modo view (visualizar)</li>
                <li>• Confirmação de exclusão</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Formulário Completo</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Sections organizadas</li>
                <li>• Grids de sublistas</li>
                <li>• Validações completas</li>
                <li>• Campos derivados</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
