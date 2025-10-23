import type { ReactNode } from "react";

export type DialogVariant = "default" | "warning" | "error" | "info" | "success";

export interface DialogChoice {
  label: string;
  value: string;
}

export interface AlertOptions {
  title?: string;
  message: string | ReactNode;
  variant?: DialogVariant;
  okLabel?: string;
  onOk?: () => void;
}

export interface ConfirmOptions {
  title?: string;
  message: string | ReactNode;
  variant?: DialogVariant;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
}

export interface OptionsOptions {
  title?: string;
  message: string | ReactNode;
  variant?: DialogVariant;
  choices: DialogChoice[];
}

export interface DialogAPI {
  alert: (message: string | AlertOptions) => Promise<void>;
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  options: (options: OptionsOptions) => Promise<string>;
}
