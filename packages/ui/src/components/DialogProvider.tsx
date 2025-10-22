"use client";

import { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { ConfirmDialog } from './ConfirmDialog';
import { AlertDialog } from './AlertDialog';
import { FormDialog } from './FormDialog';

interface DialogState {
  isOpen: boolean;
  type: 'confirm' | 'alert' | 'form' | null;
  props: any;
}

interface DialogContextType {
  // Confirm Dialog
  confirm: (options: {
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void | Promise<void>;
    onCancel?: () => void;
    confirmVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    loading?: boolean;
  }) => Promise<boolean>;

  // Alert Dialog
  alert: (options: {
    title: string;
    description?: string;
    okLabel?: string;
    onOk?: () => void;
    variant?: "default" | "warning" | "error" | "info";
  }) => Promise<void>;

  // Form Dialog
  form: (options: {
    title: string;
    description?: string;
    form: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xl" | "full";
    onClose?: () => void;
  }) => Promise<any>;

  // Close current dialog
  close: () => void;

  // Dialog state
  isOpen: boolean;
  type: "confirm" | "alert" | "form" | null;
}

const DialogContext = createContext<DialogContextType | null>(null);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    type: null,
    props: null,
  });

  const confirm = useCallback(
    (options: {
      title: string;
      description?: string;
      confirmLabel?: string;
      cancelLabel?: string;
      onConfirm: () => void | Promise<void>;
      onCancel?: () => void;
      confirmVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
      loading?: boolean;
    }): Promise<boolean> => {
      return new Promise((resolve) => {
        setDialogState({
          isOpen: true,
          type: "confirm",
          props: {
            ...options,
            onConfirm: async () => {
              await options.onConfirm();
              resolve(true);
            },
            onCancel: () => {
              options.onCancel?.();
              resolve(false);
            },
          },
        });
      });
    },
    []
  );

  const alert = useCallback(
    (options: {
      title: string;
      description?: string;
      okLabel?: string;
      onOk?: () => void;
      variant?: "default" | "warning" | "error" | "info";
    }): Promise<void> => {
      return new Promise((resolve) => {
        setDialogState({
          isOpen: true,
          type: "alert",
          props: {
            ...options,
            onOk: () => {
              options.onOk?.();
              resolve();
            },
          },
        });
      });
    },
    []
  );

  const form = useCallback(
    (options: {
      title: string;
      description?: string;
      form: React.ReactNode;
      size?: "sm" | "md" | "lg" | "xl" | "full";
      onClose?: () => void;
    }): Promise<any> => {
      return new Promise((resolve) => {
        setDialogState({
          isOpen: true,
          type: "form",
          props: {
            ...options,
            onClose: () => {
              options.onClose?.();
              resolve(null);
            },
          },
        });
      });
    },
    []
  );

  const close = useCallback(() => {
    setDialogState({
      isOpen: false,
      type: null,
      props: null,
    });
  }, []);

  const handleClose = () => {
    close();
  };

  const renderDialog = () => {
    if (!dialogState.isOpen || !dialogState.type) {
      return null;
    }

    switch (dialogState.type) {
      case "confirm":
        return (
          <ConfirmDialog
            open={dialogState.isOpen}
            onOpenChange={handleClose}
            title={dialogState.props.title}
            description={dialogState.props.description}
            confirmLabel={dialogState.props.confirmLabel}
            cancelLabel={dialogState.props.cancelLabel}
            onConfirm={dialogState.props.onConfirm}
            onCancel={dialogState.props.onCancel}
            confirmVariant={dialogState.props.confirmVariant}
            loading={dialogState.props.loading}
          />
        );

      case "alert":
        return (
          <AlertDialog
            open={dialogState.isOpen}
            onOpenChange={handleClose}
            title={dialogState.props.title}
            description={dialogState.props.description}
            okLabel={dialogState.props.okLabel}
            onOk={dialogState.props.onOk}
            variant={dialogState.props.variant}
          />
        );

      case "form":
        return (
          <FormDialog
            open={dialogState.isOpen}
            onOpenChange={handleClose}
            title={dialogState.props.title}
            description={dialogState.props.description}
            size={dialogState.props.size}
          >
            {dialogState.props.form}
          </FormDialog>
        );

      default:
        return null;
    }
  };

  return (
    <DialogContext.Provider
      value={{
        confirm,
        alert,
        form,
        close,
        isOpen: dialogState.isOpen,
        type: dialogState.type,
      }}
    >
      {children}
      {renderDialog()}
    </DialogContext.Provider>
  );
}

export function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }
  return context;
}
