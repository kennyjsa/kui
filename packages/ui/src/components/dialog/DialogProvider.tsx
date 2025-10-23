"use client";

import * as React from "react";
import { createContext, useContext } from "react";
import { AlertDialog } from "./AlertDialog";
import { ConfirmDialog } from "./ConfirmDialog";
import { OptionsDialog } from "./OptionsDialog";
import type { DialogAPI, AlertOptions, ConfirmOptions, OptionsOptions } from "./types";

interface DialogContextType {
  dialog: DialogAPI;
}

const DialogContext = createContext<DialogContextType | null>(null);

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  const [dialogState, setDialogState] = React.useState<{
    type: "alert" | "confirm" | "options" | null;
    open: boolean;
    options: any;
    resolve: ((value: any) => void) | null;
  }>({
    type: null,
    open: false,
    options: null,
    resolve: null,
  });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const dialog: DialogAPI = {
    alert: (message: string | AlertOptions) => {
      return new Promise<void>((resolve) => {
        const options = typeof message === "string"
          ? { message, variant: "warning" as const }
          : message;

        setDialogState({
          type: "alert",
          open: true,
          options,
          resolve,
        });
      });
    },

    confirm: (options: ConfirmOptions) => {
      return new Promise<boolean>((resolve) => {
        setDialogState({
          type: "confirm",
          open: true,
          options,
          resolve,
        });
      });
    },

    options: (options: OptionsOptions) => {
      return new Promise<string>((resolve) => {
        setDialogState({
          type: "options",
          open: true,
          options,
          resolve,
        });
      });
    },
  };

  const handleClose = () => {
    setDialogState(prev => ({ ...prev, open: false }));
  };

  const handleAlertOk = () => {
    dialogState.options.onOk?.();
    dialogState.resolve?.(undefined);
    handleClose();
  };

  const handleConfirm = () => {
    dialogState.options.onConfirm?.();
    dialogState.resolve?.(true);
    handleClose();
  };

  const handleCancel = () => {
    dialogState.options.onCancel?.();
    dialogState.resolve?.(false);
    handleClose();
  };

  const handleSelect = (value: string) => {
    dialogState.resolve?.(value);
    handleClose();
  };

  const renderDialog = () => {
    // Durante SSR, não renderiza dialogs
    if (!mounted || !dialogState.open || !dialogState.type) return null;

    switch (dialogState.type) {
      case "alert":
        return (
          <AlertDialog
            open={dialogState.open}
            onOpenChange={handleClose}
            options={dialogState.options}
            onClose={handleAlertOk}
          />
        );

      case "confirm":
        return (
          <ConfirmDialog
            open={dialogState.open}
            onOpenChange={handleClose}
            options={dialogState.options}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        );

      case "options":
        return (
          <OptionsDialog
            open={dialogState.open}
            onOpenChange={handleClose}
            options={dialogState.options}
            onSelect={handleSelect}
          />
        );

      default:
        return null;
    }
  };

  return (
    <DialogContext.Provider value={{ dialog }}>
      {children}
      {mounted && renderDialog()}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
}
