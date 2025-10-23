"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../Dialog";
import { Button } from "../Button";
import type { ConfirmOptions, DialogVariant } from "./types";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  options: ConfirmOptions;
  onConfirm: () => void;
  onCancel: () => void;
}

const variantStyles: Record<DialogVariant, string> = {
  default: "",
  warning: "border-yellow-500",
  error: "border-red-500",
  info: "border-blue-500",
  success: "border-green-500",
};

const confirmButtonVariants: Record<DialogVariant, "default" | "destructive"> = {
  default: "default",
  warning: "default",
  error: "destructive",
  info: "default",
  success: "default",
};

export function ConfirmDialog({
  open,
  onOpenChange,
  options,
  onConfirm,
  onCancel
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={variantStyles[options.variant || "default"]}>
        <DialogHeader>
          <DialogTitle>{options.title || "Confirmar"}</DialogTitle>
          <DialogDescription>
            {typeof options.message === "string" ? options.message : options.message}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            {options.cancelText || "Cancelar"}
          </Button>
          <Button
            type="button"
            variant={confirmButtonVariants[options.variant || "default"]}
            onClick={onConfirm}
          >
            {options.confirmText || "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
