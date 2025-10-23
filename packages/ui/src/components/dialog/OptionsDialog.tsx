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
import type { OptionsOptions, DialogVariant } from "./types";

interface OptionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  options: OptionsOptions;
  onSelect: (value: string) => void;
}

const variantStyles: Record<DialogVariant, string> = {
  default: "",
  warning: "border-yellow-500",
  error: "border-red-500",
  info: "border-blue-500",
  success: "border-green-500",
};

export function OptionsDialog({
  open,
  onOpenChange,
  options,
  onSelect
}: OptionsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={variantStyles[options.variant || "default"]}>
        <DialogHeader>
          <DialogTitle>{options.title || "Escolher opção"}</DialogTitle>
          <DialogDescription>
            {typeof options.message === "string" ? options.message : options.message}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2 py-4">
          {options.choices.map((choice) => (
            <Button
              key={choice.value}
              type="button"
              variant="outline"
              onClick={() => onSelect(choice.value)}
              className="justify-start"
            >
              {choice.label}
            </Button>
          ))}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onSelect("")}
          >
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
