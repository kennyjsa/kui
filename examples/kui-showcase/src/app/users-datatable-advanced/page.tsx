"use client";

import { DataTable, extractColumns, DataTableAdvanced, DataTableVirtualized } from "@kui-framework/forms";
import { extractFiltersFromSchema } from "@kui-framework/core";
import { zKUI } from "@kui-framework/zod-extension";
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@kui-framework/ui";
import { useRouter } from "next/navigation";
import { trpc } from "@/lib/trpc";
import { useToast } from "@kui-framework/ui";
import { useState } from "react";

// Define a Zod schema for the User entity
const userSchema = zKUI.object({
  id: zKUI.identifier("ID"),
  nome: zKUI.text("Nome Completo"),
  email: zKUI.email("E-mail"),
  telefone: zKUI.text("Telefone").optional(),
  ativo: zKUI.boolean("Ativo"),
  dataNascimento: zKUI.date("Data de Nascimento"),
  cpf: zKUI.text("CPF"),
  receberNotificacoes: zKUI.boolean("Receber Notificações"),
  idioma: zKUI.text("Idioma"),
  observacoes: zKUI.text("Observações").optional(),
});

type User = zKUI.infer<typeof userSchema>;

export default function UsersAdvancedPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"standard" | "advanced" | "virtualized">("standard");

  // Extract columns automatically from schema
  const columns = extractColumns(userSchema, {
    exclude: ["cpf", "receberNotificacoes", "idioma", "observacoes", "telefone"],
    overrides: {
      ativo: {
        render: (value) =>
          value ? <Badge>Ativo</Badge> : <Badge variant="secondary">Inativo</Badge>,
      },
      dataNascimento: {
        render: (value) => value ? new Date(value).toLocaleDateString("pt-BR") : "-",
      },
    },
  });

  // Extract filters automatically from schema
  const filters = extractFiltersFromSchema(userSchema, {
    include: ["nome", "email", "ativo", "dataNascimento"],
    overrides: {
      ativo: {
        type: "select",
        options: [
          { label: "Ativo", value: true },
          { label: "Inativo", value: false },
        ],
      },
      dataNascimento: { type: "daterange" },
    },
  });

  const deleteUserMutation = trpc.user.delete.useMutation({
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description: "Usuário excluído com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: `Falha ao excluir usuário: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateUserMutation = trpc.user.update.useMutation({
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description: "Usuário atualizado com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: `Falha ao atualizar usuário: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleEdit = (user: User) => {
    console.log("Edit user:", user);
    toast({ title: "Editar", description: `Editando usuário: ${user.nome}` });
  };

  const handleDelete = async (user: User, context: any) => {
    if (confirm(`Tem certeza que deseja excluir o usuário ${user.nome}?`)) {
      context.optimisticRemove(user.id);
      try {
        await deleteUserMutation.mutateAsync({ id: user.id });
        context.invalidate();
      } catch (error) {
        context.invalidate();
      }
    }
  };

  const handleToggleStatus = async (user: User, context: any) => {
    context.optimisticPatch(user.id, { ativo: !user.ativo });
    try {
      await updateUserMutation.mutateAsync({ ...user, ativo: !user.ativo });
      context.invalidate();
    } catch (error) {
      context.invalidate();
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Lista Avançada de Usuários</h1>

        <div className="flex space-x-2">
          <Button
            variant={viewMode === "standard" ? "default" : "outline"}
            onClick={() => setViewMode("standard")}
          >
            Padrão
          </Button>
          <Button
            variant={viewMode === "advanced" ? "default" : "outline"}
            onClick={() => setViewMode("advanced")}
          >
            TanStack
          </Button>
          <Button
            variant={viewMode === "virtualized" ? "default" : "outline"}
            onClick={() => setViewMode("virtualized")}
          >
            Virtualizado
          </Button>
        </div>
      </div>

      {viewMode === "standard" && (
        <DataTable<User>
          providerName="userProvider"
          columns={columns}
          filters={filters}
          enableSearch
          enableViews
          initialView="table"
          pageSize={10}
          enableUrlState
          renderCard={(user) => (
            <Card key={user.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{user.nome}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <Badge>{user.ativo ? "Ativo" : "Inativo"}</Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  Nascimento: {user.dataNascimento ? new Date(user.dataNascimento).toLocaleDateString("pt-BR") : "-"}
                </p>
              </CardContent>
              <div className="p-4 border-t flex justify-end gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(user)}>
                  Editar
                </Button>
                <Button size="sm" variant="secondary" onClick={() => handleToggleStatus(user, { invalidate: () => {}, optimisticPatch: () => {} })}>
                  {user.ativo ? "Desativar" : "Ativar"}
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(user, { invalidate: () => {}, optimisticRemove: () => {} })}>
                  Excluir
                </Button>
              </div>
            </Card>
          )}
          actions={(user, context) => (
            <>
              <Button variant="ghost" size="icon" onClick={() => handleEdit(user)} title="Editar">
                E
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleToggleStatus(user, context)} title={user.ativo ? "Desativar" : "Ativar"}>
                S
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(user, context)} title="Excluir">
                X
              </Button>
            </>
          )}
        />
      )}

      {viewMode === "advanced" && (
        <div className="space-y-4">
          <DataTable<User>
            providerName="userProvider"
            columns={columns}
            filters={filters}
            enableSearch
            enableViews
            initialView="table"
            pageSize={10}
            enableUrlState
            useTanStackTable
            actions={(user, context) => (
              <>
                <Button variant="ghost" size="icon" onClick={() => handleEdit(user)} title="Editar">
                  E
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleToggleStatus(user, context)} title={user.ativo ? "Desativar" : "Ativar"}>
                  S
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(user, context)} title="Excluir">
                  X
                </Button>
              </>
            )}
          />
        </div>
      )}

      {viewMode === "virtualized" && (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Modo virtualizado para listas grandes - renderiza apenas itens visíveis para melhor performance.
          </p>
          <DataTableVirtualized<User>
            data={[]} // Será preenchido pelo provider
            columns={columns}
            height={600}
            itemHeight={60}
            actions={(user, context) => (
              <>
                <Button variant="ghost" size="sm" onClick={() => handleEdit(user)}>
                  Editar
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleToggleStatus(user, context)}>
                  {user.ativo ? "Desativar" : "Ativar"}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(user, context)}>
                  Excluir
                </Button>
              </>
            )}
          />
        </div>
      )}
    </div>
  );
}
