"use client";

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
 * Alert Dialog
 *
 * Usado para exibir informações importantes que requerem apenas reconhecimento
 *
 * @example
 * ```tsx
 * <AlertDialog
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Atenção"
 *   description="Esta ação não pode ser desfeita."
 *   variant="warning"
 * />
 * ```
 */
export interface AlertDialogProps {
  /** Estado aberto/fechado do dialog */
  open: boolean;
  /** Callback quando estado muda */
  onOpenChange: (open: boolean) => void;
  /** Título do alert */
  title: string;
  /** Descrição/mensagem */
  description?: string;
  /** Label do botão de fechar */
  okLabel?: string;
  /** Callback ao fechar */
  onOk?: () => void;
  /** Variante visual */
  variant?: "default" | "warning" | "error" | "info";
}

const variantStyles = {
  default: "",
  warning: "border-yellow-500",
  error: "border-red-500",
  info: "border-blue-500",
};

const variantButtonVariants = {
  default: "default" as const,
  warning: "default" as const,
  error: "destructive" as const,
  info: "default" as const,
};

export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  okLabel = "OK",
  onOk,
  variant = "default",
}: AlertDialogProps) {
  const handleOk = () => {
    onOk?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={variantStyles[variant]}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant={variantButtonVariants[variant]}
            onClick={handleOk}
          >
            {okLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
