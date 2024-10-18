import type { FormMode, FieldConfig } from "../types";

/**
 * Determina se um campo deve ser exibido no modo atual
 */
export function shouldShowField(config: FieldConfig, mode: FormMode): boolean {
  const { options } = config;

  // Campos ocultos em determinados modos
  if (options.hiddenIn && options.hiddenIn.includes(mode)) {
    return false;
  }

  // Campos com modos específicos
  if (options.modes && !options.modes.includes(mode)) {
    return false;
  }

  return true;
}

/**
 * Determina se um campo deve ser readonly no modo atual
 */
export function isFieldReadOnly(config: FieldConfig, mode: FormMode): boolean {
  const { options } = config;

  // Modo view: tudo é readonly
  if (mode === "view") {
    return true;
  }

  // Campo marcado como readonly
  if (options.readOnly) {
    return true;
  }

  // Campo readonly em modos específicos
  if (options.readOnlyIn && options.readOnlyIn.includes(mode)) {
    return true;
  }

  // Campos derivados são sempre readonly
  if (options.derived) {
    return true;
  }

  return false;
}

