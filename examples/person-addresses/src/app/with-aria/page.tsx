"use client";

import { useState } from "react";
import {
  ARIALiveRegion,
  ARIASkipLink,
  ARIAFocusTrap,
  ARIAScreenReaderOnly,
  ARIAHidden,
  ARIADescribedBy,
  ARIAErrorMessage,
  ARIALoading,
  ARIAStatus,
  useARIAAnnouncements,
} from "@kui-framework/ui";
import { Button } from "@kui-framework/ui";

export default function ARIAExample() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const { announce } = useARIAAnnouncements();

  const handleAnnounce = () => {
    announce("Esta é uma mensagem de anúncio para screen readers!");
  };

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  const handleError = () => {
    setError("Este é um erro de exemplo");
    setTimeout(() => setError(""), 5000);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">ARIA Components</h1>
        <p className="text-muted-foreground">
          Componentes de acessibilidade complementares ao Radix UI
        </p>
      </div>

      {/* Skip Links */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Skip Links</h2>
        <div className="border rounded-lg p-6">
          <ARIASkipLink href="#main-content">
            Pular para conteúdo principal
          </ARIASkipLink>
          <ARIASkipLink href="#navigation">
            Pular para navegação
          </ARIASkipLink>
        </div>
      </div>

      {/* Live Regions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Live Regions</h2>
        <div className="border rounded-lg p-6 space-y-4">
          <Button onClick={handleAnnounce}>
            Anunciar Mensagem
          </Button>
          <ARIALiveRegion politeness="assertive">
            Mensagem importante para screen readers
          </ARIALiveRegion>
        </div>
      </div>

      {/* Focus Trap */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Focus Trap</h2>
        <div className="border rounded-lg p-6">
          <Button onClick={() => setShowModal(true)}>
            Abrir Modal
          </Button>
          {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <ARIAFocusTrap active={true} className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Modal com Focus Trap</h3>
                <p className="mb-4">Este modal prende o foco dentro dele.</p>
                <div className="flex gap-2">
                  <Button onClick={() => setShowModal(false)}>
                    Fechar
                  </Button>
                  <Button variant="outline">
                    Ação
                  </Button>
                </div>
              </ARIAFocusTrap>
            </div>
          )}
        </div>
      </div>

      {/* Loading States */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Loading States</h2>
        <div className="border rounded-lg p-6">
          <ARIALoading loading={loading} loadingText="Carregando dados...">
            <Button onClick={handleLoading}>
              {loading ? "Carregando..." : "Iniciar Carregamento"}
            </Button>
          </ARIALoading>
        </div>
      </div>

      {/* Error Messages */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Error Messages</h2>
        <div className="border rounded-lg p-6">
          <Button onClick={handleError}>
            Simular Erro
          </Button>
          {error && (
            <ARIAErrorMessage id="error-message">
              {error}
            </ARIAErrorMessage>
          )}
        </div>
      </div>

      {/* Status Messages */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Status Messages</h2>
        <div className="border rounded-lg p-6 space-y-4">
          <ARIAStatus status="success">
            <div className="text-green-600">Operação realizada com sucesso!</div>
          </ARIAStatus>
          <ARIAStatus status="error">
            <div className="text-red-600">Erro na operação!</div>
          </ARIAStatus>
          <ARIAStatus status="warning">
            <div className="text-yellow-600">Atenção necessária!</div>
          </ARIAStatus>
        </div>
      </div>

      {/* Screen Reader Only */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Screen Reader Only</h2>
        <div className="border rounded-lg p-6">
          <p>
            Este texto é visível para todos.
            <ARIAScreenReaderOnly>
              Este texto só é lido por screen readers.
            </ARIAScreenReaderOnly>
          </p>
        </div>
      </div>

      {/* Hidden Elements */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Hidden Elements</h2>
        <div className="border rounded-lg p-6">
          <p>Este conteúdo é visível.</p>
          <ARIAHidden>
            <p>Este conteúdo está oculto de screen readers.</p>
          </ARIAHidden>
        </div>
      </div>

      {/* Described By */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Described By</h2>
        <div className="border rounded-lg p-6">
          <input
            type="text"
            aria-describedby="input-description"
            placeholder="Digite seu nome"
            className="w-full p-2 border rounded"
          />
          <ARIADescribedBy id="input-description">
            Este campo é obrigatório e deve conter seu nome completo.
          </ARIADescribedBy>
        </div>
      </div>
    </div>
  );
}
