"use client";

import { Button } from "@kui-framework/ui";
import { useDialog } from "@kui-framework/ui";
import { useState, useEffect } from "react";

export default function DialogExample() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Carregando...</div>;
  }

  return <DialogExampleContent />;
}

function DialogExampleContent() {
  const { dialog } = useDialog();
  const [result, setResult] = useState<string>("");

  const handleAlert = async () => {
    await dialog.alert("Operação concluída com sucesso!");
  };

  const handleAlertDetailed = async () => {
    await dialog.alert({
      title: "Erro de Validação",
      message: "Os seguintes campos são obrigatórios:\n• Nome\n• E-mail\n• Telefone",
      variant: "error"
    });
  };

  const handleConfirm = async () => {
    const confirmed = await dialog.confirm({
      title: "Excluir Registro",
      message: "Tem certeza que deseja excluir este registro? Esta ação não pode ser desfeita.",
      variant: "warning",
      confirmText: "Excluir",
      cancelText: "Cancelar"
    });

    setResult(confirmed ? "Usuário confirmou a exclusão" : "Usuário cancelou a operação");
  };

  const handleConfirmSuccess = async () => {
    const confirmed = await dialog.confirm({
      title: "Salvar Alterações",
      message: "Deseja salvar as alterações feitas no formulário?",
      variant: "success",
      confirmText: "Salvar",
      cancelText: "Descartar"
    });

    setResult(confirmed ? "Alterações salvas com sucesso" : "Alterações descartadas");
  };

  const handleOptions = async () => {
    const choice = await dialog.options({
      title: "Operação Concluída",
      message: "O registro foi criado com sucesso. O que deseja fazer agora?",
      variant: "success",
      choices: [
        { label: "Visualizar Registro", value: "view" },
        { label: "Criar Novo Registro", value: "create" },
        { label: "Editar Registro", value: "edit" },
        { label: "Voltar à Lista", value: "list" }
      ]
    });

    setResult(`Usuário escolheu: ${choice || "Cancelou"}`);
  };

  const handleOptionsError = async () => {
    const choice = await dialog.options({
      title: "Erro de Processamento",
      message: "Ocorreu um erro ao processar sua solicitação. Como deseja proceder?",
      variant: "error",
      choices: [
        { label: "Tentar Novamente", value: "retry" },
        { label: "Contatar Suporte", value: "support" },
        { label: "Cancelar Operação", value: "cancel" }
      ]
    });

    setResult(`Ação escolhida: ${choice || "Cancelou"}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Dialog System</h1>
        <p className="text-muted-foreground">
          Sistema de interações bloqueantes com API fluida
        </p>
      </div>

      <div className="grid gap-6">
        {/* Alert Dialogs */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Alert Dialogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={handleAlert}
              variant="outline"
            >
              Alert Simples
            </Button>
            <Button
              onClick={handleAlertDetailed}
              variant="destructive"
            >
              Alert Detalhado
            </Button>
          </div>
        </div>

        {/* Confirm Dialogs */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Confirm Dialogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={handleConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Confirmar Exclusão
            </Button>
            <Button
              onClick={handleConfirmSuccess}
              className="bg-green-600 hover:bg-green-700"
            >
              Confirmar Salvamento
            </Button>
          </div>
        </div>

        {/* Options Dialogs */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Options Dialogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={handleOptions}
              className="bg-green-600 hover:bg-green-700"
            >
              Opções de Sucesso
            </Button>
            <Button
              onClick={handleOptionsError}
              variant="destructive"
            >
              Opções de Erro
            </Button>
          </div>
        </div>

        {/* Resultado */}
        {result && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Resultado</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="font-medium">{result}</p>
            </div>
          </div>
        )}

        {/* Código de Exemplo */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Como Usar</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`import { useDialog } from "@kui-framework/ui";

const { dialog } = useDialog();

// Alert simples
await dialog.alert("Mensagem simples");

// Alert detalhado
await dialog.alert({
  title: "Título",
  message: "Mensagem detalhada",
  variant: "error"
});

// Confirmação
const confirmed = await dialog.confirm({
  title: "Confirmar?",
  message: "Deseja continuar?",
  variant: "warning"
});

// Múltiplas opções
const choice = await dialog.options({
  title: "Escolha uma opção",
  message: "O que deseja fazer?",
  choices: [
    { label: "Opção 1", value: "option1" },
    { label: "Opção 2", value: "option2" }
  ]
});`}
            </pre>
          </div>
        </div>

        {/* Diferenças entre Toast e Dialog */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Toast vs Dialog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold text-green-600 mb-2">Toast (Notificações)</h3>
              <ul className="text-sm space-y-1">
                <li>• Não bloqueante</li>
                <li>• Desaparece automaticamente</li>
                <li>• Para feedback rápido</li>
                <li>• Exemplo: "Salvo com sucesso"</li>
              </ul>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold text-blue-600 mb-2">Dialog (Interações)</h3>
              <ul className="text-sm space-y-1">
                <li>• Bloqueante</li>
                <li>• Exige resposta do usuário</li>
                <li>• Para decisões importantes</li>
                <li>• Exemplo: "Deseja excluir?"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
