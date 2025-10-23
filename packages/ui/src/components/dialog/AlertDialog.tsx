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
import type { AlertOptions, DialogVariant } from "./types";

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  options: AlertOptions;
  onClose: () => void;
}

const variantStyles: Record<DialogVariant, string> = {
  default: "",
  warning: "border-yellow-500",
  error: "border-red-500",
  info: "border-blue-500",
  success: "border-green-500",
};

const variantButtonVariants: Record<DialogVariant, "default" | "destructive"> = {
  default: "default",
  warning: "default",
  error: "destructive",
  info: "default",
  success: "default",
};

export function AlertDialog({ open, onOpenChange, options, onClose }: AlertDialogProps) {
  const handleOk = () => {
    options.onOk?.();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={variantStyles[options.variant || "default"]}>
        <DialogHeader>
          <DialogTitle>{options.title || "Atenção"}</DialogTitle>
          <DialogDescription>
            {typeof options.message === "string" ? options.message : options.message}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant={variantButtonVariants[options.variant || "default"]}
            onClick={handleOk}
          >
            {options.okLabel || "OK"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
