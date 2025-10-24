import { Button, Card, CardContent, CardHeader, CardTitle, Skeleton } from "@kui-framework/ui";
import type { FormBuilderProps, AcceptedSchema } from "../types";
import { useKuiForm } from "../hooks/useKuiForm";
import { useDerivedFields } from "../hooks/useDerivedFields";
import { extractFields } from "../utils/extractFields";
import { shouldShowField } from "../utils/shouldShowField";
import { getGridClasses } from "../utils/gridUtils";
import { FieldRenderer } from "./FieldRenderer";
import { FieldSkeleton } from "./FieldSkeleton";

/**
 * Construtor de formulários baseado em schema Zod
 *
 * @example
 * ```tsx
 * // Com loading state automático
 * const { data, isLoading } = useQuery(...);
 *
 * <FormBuilder
 *   schema={userSchema}
 *   mode="edit"
 *   loading={isLoading}  // ← Skeleton automático
 *   defaultValues={data}
 *   onSubmit={handleSubmit}
 * />
 * ```
 */
export function FormBuilder<T extends AcceptedSchema>({
  schema,
  mode = "create",
  defaultValues,
  onSubmit,
  loading = false,
  className,
  grid,
}: FormBuilderProps<T>) {
  const fields = extractFields(schema);

  // Se está carregando, renderiza skeleton
  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <Skeleton className="h-8 w-48" /> {/* Title skeleton */}
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Grid responsivo de campos (skeleton) */}
          <div className={getGridClasses(grid)}>
            {fields
              .filter((field) => shouldShowField(field, mode, {}))
              .map((field) => (
                <FieldSkeleton key={field.name} config={field} />
              ))}
          </div>

          {/* Ações skeleton */}
          {mode !== "view" && (
            <div className="flex justify-end gap-2 pt-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Estado normal - formulário real
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
          <div className={getGridClasses(grid)}>
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

