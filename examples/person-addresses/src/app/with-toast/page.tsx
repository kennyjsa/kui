"use client";

import { Button } from "@kui-framework/ui";
import { useToast } from "@kui-framework/ui";
import { useEffect, useState } from "react";

export default function ToastExample() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Carregando...</div>;
  }

  return <ToastExampleContent />;
}

function ToastExampleContent() {
  const { toast } = useToast();

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Toast Notifications</h1>
        <p className="text-muted-foreground">
          Sistema de notificações não bloqueantes com API fluida
        </p>
      </div>

      <div className="grid gap-6">
        {/* Toast Básicos */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Toast Básicos</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              onClick={() => toast.info("Informação importante", "Esta é uma notificação informativa")}
              variant="outline"
            >
              Info
            </Button>
            <Button
              onClick={() => toast.success("Operação realizada!", "Dados salvos com sucesso")}
              className="bg-green-600 hover:bg-green-700"
            >
              Success
            </Button>
            <Button
              onClick={() => toast.warning("Atenção necessária", "Verifique os dados antes de continuar")}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              Warning
            </Button>
            <Button
              onClick={() => toast.error("Erro ao processar", "Não foi possível salvar os dados")}
              variant="destructive"
            >
              Error
            </Button>
          </div>
        </div>

        {/* Toast Customizados */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Toast Customizados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => toast.custom({
                title: "Upload em Progresso",
                description: "Enviando arquivo... 50%",
                variant: "info"
              })}
              variant="outline"
            >
              Toast com Variante Customizada
            </Button>
            <Button
              onClick={() => toast.custom({
                title: "Notificação Persistente",
                description: "Esta notificação não desaparece automaticamente",
                variant: "warning"
              })}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              Toast Persistente
            </Button>
          </div>
        </div>

        {/* Cenários Reais */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Cenários Reais</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={() => {
                toast.success("Formulário salvo", "Todos os dados foram salvos com sucesso");
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              Salvar Formulário
            </Button>
            <Button
              onClick={() => {
                toast.warning("Validação falhou", "Verifique os campos obrigatórios");
              }}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              Validar Dados
            </Button>
            <Button
              onClick={() => {
                toast.error("Erro de conexão", "Não foi possível conectar ao servidor");
              }}
              variant="destructive"
            >
              Erro de Conexão
            </Button>
          </div>
        </div>

        {/* Múltiplos Toasts */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Múltiplos Toasts</h2>
          <Button
            onClick={() => {
              toast.info("Processo iniciado", "Iniciando operação...");
              setTimeout(() => toast.success("Etapa 1 concluída", "Primeira etapa finalizada"), 1000);
              setTimeout(() => toast.success("Etapa 2 concluída", "Segunda etapa finalizada"), 2000);
              setTimeout(() => toast.success("Processo finalizado", "Todas as etapas foram concluídas"), 3000);
            }}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Simular Processo com Múltiplas Etapas
          </Button>
        </div>

        {/* Código de Exemplo */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Como Usar</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`import { useToast } from "@kui-framework/ui";

const { toast } = useToast();

// Toast básicos
toast.info("Mensagem informativa");
toast.success("Operação realizada!");
toast.warning("Atenção necessária");
toast.error("Erro ao processar");

// Toast customizado
toast.custom({
  title: "Título customizado",
  description: "Descrição customizada",
  variant: "info"
});`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
