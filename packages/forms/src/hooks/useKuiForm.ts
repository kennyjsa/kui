import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import type { FormMode, AcceptedSchema } from "../types";

/**
 * Opções do hook useKuiForm
 */
export interface UseKuiFormOptions<T extends AcceptedSchema> {
  schema: T;
  mode?: FormMode;
  defaultValues?: Partial<z.infer<T>>;
}

/**
 * Hook customizado para formulários KUI
 */
export function useKuiForm<T extends AcceptedSchema>({
  schema,
  mode = "create",
  defaultValues,
}: UseKuiFormOptions<T>) {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as any,
    mode: "onChange",
  });

  return {
    ...form,
    mode,
  };
}

