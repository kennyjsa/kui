"use client";

import React from "react";
import { useKuiProvider } from "@kui/core";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@kui/ui";
import type { RelationOptions } from "@kui/zod-extension";

export interface RelationSelectProps {
  id: string;
  value?: any;
  onChange: (value: any) => void;
  options: RelationOptions;
  disabled?: boolean;
  placeholder?: string;
}

export function RelationSelect({
  id,
  value,
  onChange,
  options,
  disabled,
  placeholder = "Selecione...",
}: RelationSelectProps) {
  const [items, setItems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);

  // Hook para prevenir erro de SSR
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Sempre chama o hook, mas trata o erro internamente
  let provider = null;
  try {
    provider = useKuiProvider(options.provider);
  } catch (err: any) {
    // Captura o erro mas não lança - será tratado no useEffect
    console.warn(`Provider "${options.provider}" não encontrado no registry.`);
  }

  // Carrega os itens do provider
  React.useEffect(() => {
    if (!mounted || !provider) {
      setLoading(false);
      return;
    }

    const loadItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await provider.list({ pageSize: 1000 });
        setItems(response.data);
      } catch (err: any) {
        setError(err.message || "Erro ao carregar opções");
        console.error(`Erro ao carregar ${options.provider}:`, err);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [mounted, provider, options.provider]);

  if (loading) {
    return (
      <Select disabled>
        <SelectTrigger id={id}>
          <SelectValue placeholder="Carregando..." />
        </SelectTrigger>
      </Select>
    );
  }

  if (error) {
    return (
      <Select disabled>
        <SelectTrigger id={id} className="border-destructive">
          <SelectValue placeholder={error} />
        </SelectTrigger>
      </Select>
    );
  }

  const handleValueChange = (selectedValue: string) => {
    // Encontra o item completo pelo valueField
    const selectedItem = items.find(
      (item) => String(item[options.valueField]) === selectedValue
    );

    // Retorna apenas o valor ou o item completo (dependendo do comportamento desejado)
    onChange(selectedItem ? selectedItem[options.valueField] : null);
  };

  return (
    <Select
      value={value ? String(value) : undefined}
      onValueChange={handleValueChange}
      disabled={disabled}
    >
      <SelectTrigger id={id}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.length === 0 ? (
          <div className="p-2 text-sm text-muted-foreground">Nenhum item encontrado</div>
        ) : (
          items.map((item) => (
            <SelectItem
              key={item[options.valueField]}
              value={String(item[options.valueField])}
            >
              {item[options.displayField]}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}

