"use client";

import React from "react";
import { DataTable, extractColumns } from "@kui/forms";
import { extractFiltersFromSchema } from "@kui/core";
import { userSchema } from "@/schemas/user.schema";
import { Button } from "@kui/ui";

export default function UsersDataTablePage() {
  // Gerar colunas automaticamente do schema
  const columns = extractColumns(userSchema, {
    include: ["nome", "email", "ativo", "dataNascimento", "telefone"],
    overrides: {
      ativo: {
        label: "Status",
        render: (value: boolean) => (
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {value ? "Ativo" : "Inativo"}
          </span>
        )
      },
      dataNascimento: {
        label: "Data de Nascimento",
        render: (value: string) => {
          if (!value) return "-";
          return new Date(value).toLocaleDateString("pt-BR");
        }
      }
    }
  });

  // Gerar filtros automaticamente do schema
  const filters = extractFiltersFromSchema(userSchema, {
    include: ["nome", "email", "ativo"],
    overrides: {
      ativo: {
        type: "select",
        options: [
          { label: "Ativo", value: true },
          { label: "Inativo", value: false },
        ]
      }
    }
  });

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Usuários - DataTable</h1>
        <p className="text-gray-600">
          Exemplo de uso do DataTable com geração automática de colunas e filtros a partir do schema Zod.
        </p>
      </div>

      <DataTable
        providerName="userProvider"
        columns={columns}
        filters={filters}
        enableSearch={true}
        enableViews={true}
        initialView="table"
        pageSize={10}
        enableUrlState={true} // Habilitado para testar URL state
        useTanStackTable={true} // Habilitado para testar TanStack Table
        renderCard={(user) => (
          <div className="p-4">
            <h3 className="font-semibold text-lg">{user.nome}</h3>
            <p className="text-gray-600">{user.email}</p>
            <div className="mt-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                user.ativo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}>
                {user.ativo ? "Ativo" : "Inativo"}
              </span>
            </div>
            {user.telefone && (
              <p className="text-sm text-gray-500 mt-1">📞 {user.telefone}</p>
            )}
          </div>
        )}
        actions={(user, ctx) => (
          <div className="flex space-x-2">
            <Button
              size="sm"
              onClick={() => {
                console.log("Editar usuário:", user);
                // Implementar edição
              }}
            >
              Editar
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={async () => {
                if (!confirm(`Confirma a exclusão de ${user.nome}?`)) return;

                // Remove otimisticamente
                ctx.optimisticRemove(user.id);

                // Simular delete no backend
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Invalidar cache para garantir consistência
                ctx.invalidate();
              }}
            >
              Excluir
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={async () => {
                // Update otimista
                ctx.optimisticPatch(user.id, { ativo: !user.ativo });

                // Simular mutation no backend
                await new Promise(resolve => setTimeout(resolve, 500));

                // Invalidar cache para garantir consistência
                ctx.invalidate();
              }}
            >
              {user.ativo ? "Desativar" : "Ativar"}
            </Button>
          </div>
        )}
      />
    </div>
  );
}
