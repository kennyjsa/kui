import { Controller } from "react-hook-form";
import { Input, Label, MaskedInput, Textarea } from "@kui/ui";
import type { FieldRendererProps } from "../types";
import { isFieldReadOnly, shouldShowField } from "../utils/shouldShowField";

/**
 * Renderiza um campo baseado na configuração
 */
export function FieldRenderer({ config, mode, control, errors }: FieldRendererProps) {
  // Verifica se o campo deve ser exibido
  if (!shouldShowField(config, mode)) {
    return null;
  }

  const isReadOnly = isFieldReadOnly(config, mode);
  const error = errors[config.name];

  return (
    <div className="space-y-2">
      <Label htmlFor={config.name}>
        {config.label}
        {config.options.required && <span className="text-destructive ml-1">*</span>}
      </Label>

      <Controller
        name={config.name}
        control={control}
        render={({ field }) => {
          // Renderiza baseado no tipo do campo
          switch (config.type) {
            case "text":
            case "email":
              // Se tem máscara, usa MaskedInput
              if (config.options.mask) {
                return (
                  <MaskedInput
                    id={config.name}
                    mask={config.options.mask}
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder={config.options.placeholder}
                    disabled={isReadOnly}
                    aria-invalid={!!error}
                  />
                );
              }
              
              return (
                <Input
                  {...field}
                  id={config.name}
                  type={config.type}
                  placeholder={config.options.placeholder}
                  disabled={isReadOnly}
                  aria-invalid={!!error}
                />
              );

            case "password":
              return (
                <Input
                  {...field}
                  id={config.name}
                  type="password"
                  placeholder={config.options.placeholder}
                  disabled={isReadOnly}
                  aria-invalid={!!error}
                />
              );

            case "textarea":
              return (
                <Textarea
                  {...field}
                  id={config.name}
                  placeholder={config.options.placeholder}
                  disabled={isReadOnly}
                  aria-invalid={!!error}
                  rows={config.options.rows || 4}
                  maxLength={config.options.maxLength}
                />
              );

            case "number":
              // Campos derivados são exibidos como readonly
              if (config.options.derived) {
                return (
                  <Input
                    {...field}
                    id={config.name}
                    type="text"
                    disabled
                    value={field.value ?? ""}
                    className="bg-muted"
                  />
                );
              }
              return (
                <Input
                  {...field}
                  id={config.name}
                  type="number"
                  placeholder={config.options.placeholder}
                  disabled={isReadOnly}
                  aria-invalid={!!error}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              );

            case "date":
              return (
                <Input
                  {...field}
                  id={config.name}
                  type="date"
                  disabled={isReadOnly}
                  aria-invalid={!!error}
                  value={
                    field.value
                      ? new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                />
              );

            case "boolean":
              return (
                <input
                  {...field}
                  id={config.name}
                  type="checkbox"
                  disabled={isReadOnly}
                  checked={field.value || false}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="h-4 w-4 rounded border-input"
                />
              );

            case "identifier":
            case "systemDate":
              return (
                <Input
                  {...field}
                  id={config.name}
                  disabled
                  value={field.value || ""}
                />
              );

            default:
              return (
                <Input
                  {...field}
                  id={config.name}
                  placeholder={config.options.placeholder}
                  disabled={isReadOnly}
                  aria-invalid={!!error}
                />
              );
          }
        }}
      />

      {/* Helper text */}
      {config.options.helperText && (
        <p className="text-sm text-muted-foreground">{config.options.helperText}</p>
      )}

      {/* Error message */}
      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
}

