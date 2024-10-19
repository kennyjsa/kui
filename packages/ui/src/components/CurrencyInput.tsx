import * as React from "react";
import { cn } from "../lib/utils";

export interface CurrencyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value?: number;
  onChange?: (value: number | null) => void;
  currency?: string;
  locale?: string;
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, value, onChange, currency = "BRL", locale = "pt-BR", ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState("");

    // Formata o valor para exibição
    const formatCurrency = (val: number) => {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
      }).format(val);
    };

    // Atualiza display quando value muda externamente
    React.useEffect(() => {
      if (value !== undefined && value !== null) {
        setDisplayValue(formatCurrency(value));
      } else {
        setDisplayValue("");
      }
    }, [value, currency, locale]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      
      // Remove tudo exceto dígitos
      const numbersOnly = input.replace(/\D/g, "");
      
      if (numbersOnly === "") {
        setDisplayValue("");
        onChange?.(null);
        return;
      }

      // Converte para número (centavos para reais)
      const numericValue = parseInt(numbersOnly, 10) / 100;
      
      // Formata para exibição
      setDisplayValue(formatCurrency(numericValue));
      
      // Chama onChange com o valor numérico
      onChange?.(numericValue);
    };

    return (
      <input
        {...props}
        ref={ref}
        type="text"
        value={displayValue}
        onChange={handleChange}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      />
    );
  }
);
CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };

