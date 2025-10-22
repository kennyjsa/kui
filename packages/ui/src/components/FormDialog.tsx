"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./Dialog";

/**
 * Form Dialog
 *
 * Dialog otimizado para exibir formulários
 * Aceita children para máxima flexibilidade
 *
 * @example
 * ```tsx
 * <FormDialog
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Adicionar Item"
 *   description="Preencha os dados abaixo"
 * >
 *   <FormBuilder schema={schema} onSubmit={handleSubmit} />
 * </FormDialog>
 * ```
 */
export interface FormDialogProps {
  /** Estado aberto/fechado do dialog */
  open: boolean;
  /** Callback quando estado muda */
  onOpenChange: (open: boolean) => void;
  /** Título do dialog */
  title: string;
  /** Descrição opcional */
  description?: string;
  /** Conteúdo do dialog (geralmente um form) */
  children: React.ReactNode;
  /** Tamanho do dialog */
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full mx-4",
};

export function FormDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  size = "lg",
}: FormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={sizeClasses[size]}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="py-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
