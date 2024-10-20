import { useState, useEffect } from "react";

/**
 * Hook para detectar media queries
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Atualiza estado inicial
    setMatches(media.matches);

    // Listener para mudanças
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Modern API
    if (media.addEventListener) {
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }

    // Fallback para navegadores antigos
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [query]);

  return matches;
}

/**
 * Breakpoints padrão do Tailwind
 */
export const breakpoints: Record<string, string> = {
  xs: "(min-width: 475px)",
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
};

