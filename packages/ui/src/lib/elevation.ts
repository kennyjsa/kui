// Import dos tokens será feito via import relativo para evitar problemas de build
// import { kuiTokens } from "@kui/theme";

/**
 * Tipos de elevation disponíveis
 */
export type ElevationLevel = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * Props para elevation
 */
export interface ElevationProps {
  elevation?: ElevationLevel;
}

/**
 * Configuração de elevation (copiada dos tokens para evitar dependência circular)
 */
const elevationConfig = {
  0: { shadow: "none", zIndex: 0 },
  1: { shadow: "0 1px 2px 0 rgb(0 0 0 / 0.05), 0 1px 3px 0 rgb(0 0 0 / 0.1)", zIndex: 1 },
  2: { shadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px 0 rgb(0 0 0 / 0.06)", zIndex: 10 },
  3: { shadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)", zIndex: 20 },
  4: { shadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)", zIndex: 30 },
  5: { shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)", zIndex: 40 },
};

/**
 * Obtém as classes CSS para um nível de elevation específico
 */
export function getElevationClasses(elevation: ElevationLevel = 0) {
  const config = elevationConfig[elevation];

  return {
    shadow: config.shadow,
    zIndex: config.zIndex,
  };
}

/**
 * Aplica elevation a um elemento usando Tailwind CSS
 */
export function applyElevation(elevation: ElevationLevel = 0) {
  const { shadow, zIndex } = getElevationClasses(elevation);

  return {
    boxShadow: shadow,
    zIndex,
  };
}

/**
 * Gera classes Tailwind para elevation
 */
export function getElevationTailwindClasses(elevation: ElevationLevel = 0) {
  const elevationClasses = {
    0: "shadow-none z-0",
    1: "shadow-[0_1px_2px_0_rgb(0_0_0_/_0.05),0_1px_3px_0_rgb(0_0_0_/_0.1)] z-[1]",
    2: "shadow-[0_1px_3px_0_rgb(0_0_0_/_0.1),0_1px_2px_0_rgb(0_0_0_/_0.06)] z-[10]",
    3: "shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_2px_4px_-1px_rgb(0_0_0_/_0.06)] z-[20]",
    4: "shadow-[0_10px_15px_-3px_rgb(0_0_0_/_0.1),0_4px_6px_-2px_rgb(0_0_0_/_0.05)] z-[30]",
    5: "shadow-[0_20px_25px_-5px_rgb(0_0_0_/_0.1),0_10px_10px_-5px_rgb(0_0_0_/_0.04)] z-[40]",
  };

  return elevationClasses[elevation];
}

/**
 * Hook para usar elevation em componentes React
 */
export function useElevation(elevation: ElevationLevel = 0) {
  return {
    elevationClasses: getElevationTailwindClasses(elevation),
    elevationStyles: applyElevation(elevation),
  };
}
