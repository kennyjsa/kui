"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./Dialog";
import { Button } from "./Button";

/**
 * Dialog de Confirmação
 *
 * Usado para ações que precisam de confirmação do usuário
 *
 * @example
 * ```tsx
 * <ConfirmDialog
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Confirmar exclusão"
 *   description="Tem certeza que deseja excluir este item?"
 *   onConfirm={handleDelete}
 * />
 * ```
 */
export interface ConfirmDialogProps {
  /** Estado aberto/fechado do dialog */
  open: boolean;
  /** Callback quando estado muda */
  onOpenChange: (open: boolean) => void;
  /** Título do dialog */
  title: string;
  /** Descrição/mensagem */
  description?: string;
  /** Label do botão de confirmação */
  confirmLabel?: string;
  /** Label do botão de cancelar */
  cancelLabel?: string;
  /** Callback ao confirmar */
  onConfirm: () => void | Promise<void>;
  /** Callback ao cancelar */
  onCancel?: () => void;
  /** Variante do botão de confirmação */
  confirmVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  /** Loading state */
  loading?: boolean;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  confirmVariant = "default",
  loading = false,
}: ConfirmDialogProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao confirmar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading || loading}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={confirmVariant}
            onClick={handleConfirm}
            disabled={isLoading || loading}
          >
            {isLoading || loading ? "Processando..." : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
