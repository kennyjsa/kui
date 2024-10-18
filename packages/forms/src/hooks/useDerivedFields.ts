import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import type { FieldConfig } from "../types";

/**
 * Hook para calcular campos derivados automaticamente
 */
export function useDerivedFields(
  form: UseFormReturn<any>,
  fields: FieldConfig[]
) {
  const { watch, setValue } = form;

  useEffect(() => {
    const subscription = watch((formValues) => {
      fields.forEach((field) => {
        // Processa apenas campos derivados com função de computação
        if (field.options.derived && field.options.compute) {
          try {
            const computedValue = field.options.compute(formValues);
            const currentValue = formValues[field.name];

            // Só atualiza se o valor mudou
            if (computedValue !== currentValue) {
              setValue(field.name, computedValue, {
                shouldValidate: false,
                shouldDirty: false
              });
            }
          } catch (error) {
            console.error(`Erro ao calcular campo derivado "${field.name}":`, error);
          }
        }
      });
    });

    return () => subscription.unsubscribe();
  }, [watch, fields, setValue]);
}

