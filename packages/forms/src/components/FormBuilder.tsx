import { Button, Card, CardContent, CardHeader, CardTitle } from "@kui-framework/ui";
import type { FormBuilderProps, AcceptedSchema } from "../types";
import { useKuiForm } from "../hooks/useKuiForm";
import { useDerivedFields } from "../hooks/useDerivedFields";
import { extractFields } from "../utils/extractFields";
import { FieldRenderer } from "./FieldRenderer";

/**
 * Construtor de formulários baseado em schema Zod
 */
export function FormBuilder<T extends AcceptedSchema>({
  schema,
  mode = "create",
  defaultValues,
  onSubmit,
  className,
}: FormBuilderProps<T>) {
  const form = useKuiForm({
    schema,
    mode,
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const fields = extractFields(schema);

  // Calcula campos derivados automaticamente
  useDerivedFields(form, fields);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <Card>
        <CardHeader>
          <CardTitle>
            {mode === "create" && "Criar Registro"}
            {mode === "edit" && "Editar Registro"}
            {mode === "view" && "Visualizar Registro"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Grid responsivo de campos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <FieldRenderer
                key={field.name}
                config={field}
                mode={mode}
                control={control}
                errors={errors}
              />
            ))}
          </div>

          {/* Ações */}
          {mode !== "view" && (
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline">
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </form>
  );
}

