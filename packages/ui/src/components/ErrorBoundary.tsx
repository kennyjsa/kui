import React from "react";
import { Button } from "./Button";
import { Card, CardHeader, CardTitle, CardContent } from "./Card";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary para capturar erros em componentes filhos
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Se forneceu fallback customizado, usa ele
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Fallback padrão
      return (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">⚠️ Erro no Formulário</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-destructive/10 p-4 rounded-md">
              <p className="text-sm font-medium text-destructive">
                {this.state.error?.message || "Ocorreu um erro inesperado"}
              </p>
            </div>

            <Button
              variant="outline"
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              Tentar Novamente
            </Button>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}

