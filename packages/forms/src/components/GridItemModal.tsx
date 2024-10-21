"use client";

import React from "react";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
} from "@kui-framework/ui";
import type { FormMode } from "../types";
import { extractFields } from "../utils/extractFields";
import { FieldRenderer } from "./FieldRenderer";

export interface GridItemModalProps<T extends z.ZodObject<any>> {
  isOpen: boolean;
  onClose: () => void;
  mode: FormMode;
  schema: T;
  defaultValues?: Partial<z.infer<T>>;
  onSave: (data: z.infer<T>) => void;
  title?: string;
}

export function GridItemModal<T extends z.ZodObject<any>>({
  isOpen,
  onClose,
  mode,
  schema,
  defaultValues,
  onSave,
  title,
}: GridItemModalProps<T>) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as any,
  });

  const fields = extractFields(schema);

  // Reset form quando abre
  React.useEffect(() => {
    if (isOpen) {
      reset(defaultValues as any);
    }
  }, [isOpen, defaultValues, reset]);

  const onSubmit = (data: z.infer<T>) => {
    onSave(data);
    onClose();
  };

  const modalTitle = title || (
    mode === "create" ? "Adicionar Item" :
    mode === "edit" ? "Editar Item" :
    "Visualizar Item"
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Grid de campos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <FieldRenderer
                key={field.name}
                config={field}
                mode={mode}
                control={control}
                errors={errors}
              />
            ))}
          </div>

          {/* Footer com botões */}
          {mode !== "view" && (
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar"}
              </Button>
            </DialogFooter>
          )}

          {mode === "view" && (
            <DialogFooter>
              <Button type="button" onClick={onClose}>
                Fechar
              </Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}

