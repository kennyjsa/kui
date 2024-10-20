"use client";

import React from "react";
import { Plus, Pencil, Trash2, RotateCcw } from "lucide-react";
import { Button, Badge } from "@kui/ui";
import type { GridOptions } from "@kui/zod-extension";
import type { FormMode } from "../types";
import { extractFields } from "../utils/extractFields";
import { GridItemModal } from "./GridItemModal";

export interface GridItem<T = any> {
  data: T;
  status: "new" | "updated" | "deleted" | "unchanged";
  _tempId?: string;
}

export interface GridFieldProps {
  value?: any[];
  onChange: (items: any[]) => void;
  options: GridOptions;
  mode: FormMode;
}

export function GridField({ value = [], onChange, options, mode }: GridFieldProps) {
  const [items, setItems] = React.useState<GridItem[]>([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalMode, setModalMode] = React.useState<FormMode>("create");
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const isReadOnly = mode === "view";
  const fields = extractFields(options.itemSchema);

  // Inicializa items do value
  React.useEffect(() => {
    if (Array.isArray(value) && value.length > 0) {
      setItems(
        value.map((data) => ({
          data,
          status: "unchanged" as const,
        }))
      );
    }
  }, []);

  // Sincroniza mudanças com formulário pai
  const syncToParent = (newItems: GridItem[]) => {
    // Filtra itens deletados se for hard delete de 'new'
    const validItems = newItems.filter((item) => item.status !== "deleted" || item.data.id);

    // Retorna apenas os dados (sem tracking)
    onChange(validItems.map((item) => item.data));
  };

  const handleAdd = () => {
    setSelectedIndex(null);
    setModalMode("create");
    setModalOpen(true);
  };

  const handleEdit = (index: number) => {
    setSelectedIndex(index);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleView = (index: number) => {
    setSelectedIndex(index);
    setModalMode("view");
    setModalOpen(true);
  };

  const handleDelete = (index: number) => {
    const item = items[index];

    const newItems = [...items];

    if (item.status === "new") {
      // Hard delete: remove do array
      newItems.splice(index, 1);
    } else {
      // Soft delete: marca como deleted
      newItems[index] = { ...item, status: "deleted" };
    }

    setItems(newItems);
    syncToParent(newItems);
  };

  const handleRestore = (index: number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], status: "unchanged" };
    setItems(newItems);
    syncToParent(newItems);
  };

  const handleSave = (data: any) => {
    const newItems = [...items];

    if (modalMode === "create") {
      // Adicionar novo
      newItems.push({
        data,
        status: "new",
        _tempId: `temp-${Date.now()}`,
      });
    } else if (selectedIndex !== null) {
      // Atualizar existente
      const currentItem = newItems[selectedIndex];
      newItems[selectedIndex] = {
        data,
        status: currentItem.status === "new" ? "new" : "updated",
        _tempId: currentItem._tempId,
      };
    }

    setItems(newItems);
    syncToParent(newItems);
  };

  const getColumnValue = (item: any, column: string) => {
    const value = item[column];

    // Formatar boolean
    if (typeof value === "boolean") {
      return value ? "Sim" : "Não";
    }

    // Formatar data
    if (value instanceof Date) {
      return value.toLocaleDateString("pt-BR");
    }

    return value ?? "-";
  };

  const getColumnLabel = (column: string) => {
    const field = fields.find((f) => f.name === column);
    return field?.label || column;
  };

  const visibleItems = items.filter((item) => item.status !== "deleted" || true); // Mostrar todos, inclusive deleted

  // Empty state
  if (items.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center">
        <p className="text-muted-foreground mb-4">Nenhum item adicionado</p>
        {!isReadOnly && options.allowCreate !== false && (
          <Button onClick={handleAdd} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        )}

        <GridItemModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          mode={modalMode}
          schema={options.itemSchema}
          defaultValues={selectedIndex !== null ? items[selectedIndex].data : undefined}
          onSave={handleSave}
        />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Tabela */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              {options.columns.map((column) => (
                <th key={column} className="text-left p-3 font-medium">
                  {getColumnLabel(column)}
                </th>
              ))}
              <th className="text-left p-3 font-medium w-10">Status</th>
              {!isReadOnly && <th className="text-right p-3 font-medium w-32">Ações</th>}
            </tr>
          </thead>
          <tbody>
            {visibleItems.map((item, index) => (
              <tr
                key={item._tempId || item.data.id || index}
                className={`border-t ${
                  item.status === "deleted" ? "opacity-50 line-through" : ""
                }`}
              >
                {options.columns.map((column) => (
                  <td key={column} className="p-3">
                    {getColumnValue(item.data, column)}
                  </td>
                ))}
                <td className="p-3">
                  {item.status === "new" && (
                    <Badge variant="default" className="bg-green-500">
                      Novo
                    </Badge>
                  )}
                  {item.status === "updated" && (
                    <Badge variant="default" className="bg-yellow-500">
                      Editado
                    </Badge>
                  )}
                  {item.status === "deleted" && (
                    <Badge variant="destructive">Excluído</Badge>
                  )}
                </td>
                <td className="p-3">
                  <div className="flex justify-end gap-1">
                    {item.status === "deleted" ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRestore(index)}
                        title="Restaurar"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    ) : (
                      <>
                        {mode === "view" ? (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleView(index)}
                            title="Visualizar"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        ) : (
                          <>
                            {options.allowEdit !== false && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(index)}
                                title="Editar"
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                            )}
                            {options.allowDelete !== false && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(index)}
                                title="Excluir"
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botão adicionar */}
      {!isReadOnly && options.allowCreate !== false && (
        <Button type="button" onClick={handleAdd} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar {options.itemSchema._def?.description || "Item"}
        </Button>
      )}

      {/* Modal */}
      <GridItemModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        schema={options.itemSchema}
        defaultValues={selectedIndex !== null ? items[selectedIndex].data : undefined}
        onSave={handleSave}
      />
    </div>
  );
}

