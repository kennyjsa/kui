/**
 * Design tokens do KUI
 */
export const kuiTokens = {
  colors: {
    primary: {
      50: "#e6f2ff",
      100: "#b3d9ff",
      200: "#80bfff",
      300: "#4da6ff",
      400: "#1a8cff",
      500: "#0066cc", // Atlassian Blue
      600: "#0052a3",
      700: "#003d7a",
      800: "#002952",
      900: "#001429",
      950: "#000a14",
    },
    secondary: {
      50: "#f8f9fa",
      100: "#f1f3f4",
      200: "#e8eaed",
      300: "#dadce0",
      400: "#bdc1c6",
      500: "#9aa0a6",
      600: "#80868b",
      700: "#5f6368",
      800: "#3c4043",
      900: "#202124",
      950: "#171717",
    },
    success: {
      50: "#e8f5e8",
      100: "#c3e6c3",
      200: "#9dd79d",
      300: "#77c877",
      400: "#51b951",
      500: "#2e7d32", // Atlassian Green
      600: "#256329",
      700: "#1c4a20",
      800: "#133117",
      900: "#0a180e",
    },
    warning: {
      50: "#fff8e1",
      100: "#ffecb3",
      200: "#ffe082",
      300: "#ffd54f",
      400: "#ffca28",
      500: "#ffc107", // Atlassian Yellow
      600: "#ffb300",
      700: "#ff8f00",
      800: "#ff6f00",
      900: "#e65100",
    },
    error: {
      50: "#ffebee",
      100: "#ffcdd2",
      200: "#ef9a9a",
      300: "#e57373",
      400: "#ef5350",
      500: "#f44336", // Atlassian Red
      600: "#e53935",
      700: "#d32f2f",
      800: "#c62828",
      900: "#b71c1c",
    },
  },
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    "2xl": "3rem", // 48px
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    full: "9999px",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
  },
  elevation: {
    0: {
      shadow: "none",
      zIndex: 0,
    },
    1: {
      shadow: "0 1px 2px 0 rgb(0 0 0 / 0.05), 0 1px 3px 0 rgb(0 0 0 / 0.1)",
      zIndex: 1,
    },
    2: {
      shadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px 0 rgb(0 0 0 / 0.06)",
      zIndex: 10,
    },
    3: {
      shadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)",
      zIndex: 20,
    },
    4: {
      shadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)",
      zIndex: 30,
    },
    5: {
      shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)",
      zIndex: 40,
    },
  },
};

