"use client";

import * as React from "react";
import { cn } from "../lib/utils";

// ARIA Live Region - Para anúncios dinâmicos
export interface ARIALiveRegionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  politeness?: "polite" | "assertive" | "off";
  className?: string;
}

export const ARIALiveRegion = React.forwardRef<HTMLDivElement, ARIALiveRegionProps>(
  ({ className, children, politeness = "polite", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("sr-only", className)}
        aria-live={politeness}
        aria-atomic="true"
        {...props}
      >
        {children}
      </div>
    );
  }
);

ARIALiveRegion.displayName = "ARIALiveRegion";

// ARIA Announcements - Hook para anúncios
export interface ARIAAssertion {
  id: string;
  message: string;
  politeness: "polite" | "assertive";
  timestamp: number;
}

export const useARIAAnnouncements = () => {
  const [assertions, setAssertions] = React.useState<ARIAAssertion[]>([]);

  const announce = React.useCallback((message: string, politeness: "polite" | "assertive" = "polite") => {
    const assertion: ARIAAssertion = {
      id: Math.random().toString(36).substr(2, 9),
      message,
      politeness,
      timestamp: Date.now(),
    };

    setAssertions(prev => [...prev, assertion]);

    // Remove after 5 seconds
    setTimeout(() => {
      setAssertions(prev => prev.filter(a => a.id !== assertion.id));
    }, 5000);
  }, []);

  const clear = React.useCallback(() => {
    setAssertions([]);
  }, []);

  return { assertions, announce, clear };
};

// ARIA Announcements Provider
export interface ARIAAssertionsProviderProps {
  children: React.ReactNode;
}

export const ARIAAssertionsProvider = ({ children }: ARIAAssertionsProviderProps) => {
  const { assertions } = useARIAAnnouncements();

  return (
    <>
      {children}
      {assertions.map((assertion) => (
        <ARIALiveRegion
          key={assertion.id}
          politeness={assertion.politeness}
        >
          {assertion.message}
        </ARIALiveRegion>
      ))}
    </>
  );
};

// ARIA Skip Links - Para navegação por teclado
export interface ARIASkipLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const ARIASkipLink = React.forwardRef<HTMLAnchorElement, ARIASkipLinkProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4",
          "bg-primary text-primary-foreground px-4 py-2 rounded-md",
          "z-50 focus:z-50",
          className
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
);

ARIASkipLink.displayName = "ARIASkipLink";

// ARIA Focus Trap - Para modais e dialogs
export interface ARIAFocusTrapProps {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}

export const ARIAFocusTrap = React.forwardRef<HTMLDivElement, ARIAFocusTrapProps>(
  ({ className, children, active = true, ...props }, _ref) => {
    const trapRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (!active || !trapRef.current) return;

      const focusableElements = trapRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      firstElement?.focus();

      return () => {
        document.removeEventListener('keydown', handleTabKey);
      };
    }, [active]);

    return (
      <div
        ref={trapRef}
        className={cn(className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ARIAFocusTrap.displayName = "ARIAFocusTrap";

// ARIA Screen Reader Only - Para texto apenas para screen readers
export interface ARIAScreenReaderOnlyProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
}

export const ARIAScreenReaderOnly = React.forwardRef<HTMLSpanElement, ARIAScreenReaderOnlyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("sr-only", className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

ARIAScreenReaderOnly.displayName = "ARIAScreenReaderOnly";

// ARIA Hidden - Para ocultar elementos de screen readers
export interface ARIAHiddenProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

export const ARIAHidden = React.forwardRef<HTMLDivElement, ARIAHiddenProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(className)}
        aria-hidden="true"
        {...props}
      >
        {children}
      </div>
    );
  }
);

ARIAHidden.displayName = "ARIAHidden";

// ARIA Described By - Para descrições de elementos
export interface ARIADescribedByProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const ARIADescribedBy = React.forwardRef<HTMLDivElement, ARIADescribedByProps>(
  ({ className, children, id, ...props }, ref) => {
    return (
      <div
        ref={ref}
        id={id}
        className={cn("sr-only", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ARIADescribedBy.displayName = "ARIADescribedBy";

// ARIA Error Message - Para mensagens de erro
export interface ARIAErrorMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const ARIAErrorMessage = React.forwardRef<HTMLDivElement, ARIAErrorMessageProps>(
  ({ className, children, id, ...props }, ref) => {
    return (
      <div
        ref={ref}
        id={id}
        className={cn("text-destructive text-sm", className)}
        role="alert"
        aria-live="polite"
        {...props}
      >
        {children}
      </div>
    );
  }
);

ARIAErrorMessage.displayName = "ARIAErrorMessage";

// ARIA Loading - Para estados de carregamento
export interface ARIALoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
  className?: string;
}

export const ARIALoading = React.forwardRef<HTMLDivElement, ARIALoadingProps>(
  ({ className, children, loading = false, loadingText = "Carregando...", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(className)}
        aria-busy={loading}
        {...props}
      >
        {children}
        {loading && (
          <ARIALiveRegion politeness="polite">
            {loadingText}
          </ARIALiveRegion>
        )}
      </div>
    );
  }
);

ARIALoading.displayName = "ARIALoading";

// ARIA Status - Para status de operações
export interface ARIAStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  status?: "success" | "error" | "warning" | "info";
  className?: string;
}

export const ARIAStatus = React.forwardRef<HTMLDivElement, ARIAStatusProps>(
  ({ className, children, status, ...props }, ref) => {
    const statusText = {
      success: "Sucesso",
      error: "Erro",
      warning: "Aviso",
      info: "Informação",
    };

    return (
      <div
        ref={ref}
        className={cn(className)}
        role="status"
        aria-live="polite"
        {...props}
      >
        {children}
        <ARIALiveRegion politeness="polite">
          {status && statusText[status]}
        </ARIALiveRegion>
      </div>
    );
  }
);

ARIAStatus.displayName = "ARIAStatus";

// ARIA Utilities - Funções auxiliares
export const ARIAUtils = {
  // Gerar IDs únicos para ARIA
  generateId: (prefix: string = "aria") => `${prefix}-${Math.random().toString(36).substr(2, 9)}`,

  // Verificar se elemento é focusável
  isFocusable: (element: HTMLElement) => {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');

    return element.matches(focusableSelectors);
  },

  // Obter próximo elemento focusável
  getNextFocusable: (currentElement: HTMLElement) => {
    const focusableElements = Array.from(
      document.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')
    ) as HTMLElement[];

    const currentIndex = focusableElements.indexOf(currentElement);
    return focusableElements[currentIndex + 1] || focusableElements[0];
  },

  // Obter elemento focusável anterior
  getPreviousFocusable: (currentElement: HTMLElement) => {
    const focusableElements = Array.from(
      document.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')
    ) as HTMLElement[];

    const currentIndex = focusableElements.indexOf(currentElement);
    return focusableElements[currentIndex - 1] || focusableElements[focusableElements.length - 1];
  }
};

// ARIA Context - Para gerenciar estado global de acessibilidade
export interface ARIAContextType {
  announce: (message: string, politeness?: "polite" | "assertive") => void;
  clear: () => void;
  focusTrap: boolean;
  setFocusTrap: (active: boolean) => void;
}

const ARIAContext = React.createContext<ARIAContextType | undefined>(undefined);

export const useARIAContext = () => {
  const context = React.useContext(ARIAContext);
  if (!context) {
    throw new Error("useARIAContext must be used within an ARIAContextProvider");
  }
  return context;
};

export const ARIAContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { announce, clear } = useARIAAnnouncements();
  const [focusTrap, setFocusTrap] = React.useState(false);

  const value = React.useMemo(() => ({
    announce,
    clear,
    focusTrap,
    setFocusTrap,
  }), [announce, clear, focusTrap]);

  return (
    <ARIAContext.Provider value={value}>
      {children}
    </ARIAContext.Provider>
  );
};
