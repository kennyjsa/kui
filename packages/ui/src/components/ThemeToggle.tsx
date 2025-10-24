"use client";

import { Sun, Moon } from "lucide-react";
import { Button } from "./Button";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9"
      title={`Alternar para tema ${theme === "light" ? "escuro" : "claro"}`}
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
      <span className="sr-only">
        {theme === "light" ? "Alternar para tema escuro" : "Alternar para tema claro"}
      </span>
    </Button>
  );
}
