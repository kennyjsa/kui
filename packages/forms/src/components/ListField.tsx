"use client";

import React from "react";
import { Plus, Pencil, Trash2, RotateCcw } from "lucide-react";
import { Button, Badge, Card, CardHeader, CardTitle, CardContent } from "@kui/ui";
import type { GridOptions } from "@kui/zod-extension";
import type { FormMode } from "../types";
import { extractFields } from "../utils/extractFields";
import { GridItemModal } from "./GridItemModal";
import type { GridItem } from "./GridField";

export interface ListFieldProps {
  value?: any[];
  onChange: (items: any[]) => void;
  options: GridOptions;
  mode: FormMode;
}

export function ListField({ value = [], onChange, options, mode }: ListFieldProps) {
  const [items, setItems] = React.useState<GridItem[]>([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalMode, setModalMode] = React.useState<FormMode>("create");
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const isReadOnly = mode === "view";
  const fields = extractFields(options.itemSchema);
  const displayFields = options.displayFields || options.columns.slice(0, 3); // Primeiros 3 campos

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
    const validItems = newItems.filter((item) => item.status !== "deleted" || item.data.id);
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

  const handleDelete = (index: number) => {
    const item = items[index];
    const newItems = [...items];

    if (item.status === "new") {
      newItems.splice(index, 1);
    } else {
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
      newItems.push({
        data,
        status: "new",
        _tempId: `temp-${Date.now()}`,
      });
    } else if (selectedIndex !== null) {
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

  const getFieldValue = (item: any, fieldName: string) => {
    const value = item[fieldName];

    if (typeof value === "boolean") {
      return value ? "Sim" : "Não";
    }

    if (value instanceof Date) {
      return value.toLocaleDateString("pt-BR");
    }

    return value ?? "-";
  };

  const getFieldLabel = (fieldName: string) => {
    const field = fields.find((f) => f.name === fieldName);
    return field?.label || fieldName;
  };

  const visibleItems = items.filter((item) => item.status !== "deleted" || true);

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
    <div className="space-y-3">
      {/* Cards */}
      {visibleItems.map((item, index) => (
        <Card
          key={item._tempId || item.data.id || index}
          className={item.status === "deleted" ? "opacity-50" : ""}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                {getFieldValue(item.data, displayFields[0])}
              </CardTitle>
              <div className="flex items-center gap-2">
                {/* Status Badge */}
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

                {/* Ações */}
                {!isReadOnly && (
                  <div className="flex gap-1">
                    {item.status === "deleted" ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRestore(index)}
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    ) : (
                      <>
                        {options.allowEdit !== false && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(index)}
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
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-1 text-sm">
              {displayFields.slice(1).map((fieldName) => (
                <div key={fieldName} className="flex justify-between">
                  <span className="text-muted-foreground">{getFieldLabel(fieldName)}:</span>
                  <span className="font-medium">{getFieldValue(item.data, fieldName)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Botão adicionar */}
      {!isReadOnly && options.allowCreate !== false && (
        <Button type="button" onClick={handleAdd} size="sm" variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar
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

