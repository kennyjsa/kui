import { Controller } from "react-hook-form";
import { Input, Label, MaskedInput, Textarea, CurrencyInput, Checkbox, RadioGroup, RadioGroupItem, Switch, Rating, ColorPicker } from "@kui/ui";
import type { RelationOptions } from "@kui/zod-extension";
import type { FieldRendererProps } from "../types";
import { isFieldReadOnly, shouldShowField } from "../utils/shouldShowField";
import { RelationSelect } from "./RelationSelect";

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

            case "currency":
              return (
                <CurrencyInput
                  id={config.name}
                  value={field.value}
                  onChange={field.onChange}
                  currency={config.options.currency}
                  locale={config.options.locale}
                  disabled={isReadOnly}
                  aria-invalid={!!error}
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

            case "checkbox":
              return (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={config.name}
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                    disabled={isReadOnly}
                  />
                  <label
                    htmlFor={config.name}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {config.label}
                  </label>
                </div>
              );

            case "radio":
              return (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isReadOnly}
                >
                  {config.options.options?.map((option: any) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`${config.name}-${option.value}`} />
                      <Label htmlFor={`${config.name}-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              );

            case "switch":
              return (
                <div className="flex items-center space-x-2">
                  <Switch
                    id={config.name}
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                    disabled={isReadOnly}
                  />
                  <Label htmlFor={config.name}>{config.label}</Label>
                </div>
              );

            case "rating":
              return (
                <Rating
                  id={config.name}
                  value={field.value || 0}
                  onChange={field.onChange}
                  max={config.options.max || 5}
                  disabled={isReadOnly}
                />
              );

            case "color":
              return (
                <ColorPicker
                  id={config.name}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isReadOnly}
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

            case "relation":
              return (
                <RelationSelect
                  id={config.name}
                  value={field.value}
                  onChange={field.onChange}
                  options={config.options as RelationOptions}
                  disabled={isReadOnly}
                  placeholder={config.options.placeholder}
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

