"use client";

import { Menu, X, Github, ExternalLink } from "lucide-react";
import { Button } from "@kui-framework/ui";

interface HeaderProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export function Header({ onToggleSidebar, sidebarOpen }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="lg:hidden"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">K</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-card-foreground">KUI Framework</h1>
            <p className="text-xs text-muted-foreground">Examples & Documentation</p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.open("https://github.com/kennyjsa/kui", "_blank")}
          className="text-muted-foreground hover:text-accent-foreground"
        >
          <Github className="h-4 w-4 mr-2" />
          GitHub
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open("/docs", "_blank")}
          className="text-muted-foreground hover:text-accent-foreground"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Docs
        </Button>
      </div>
    </header>
  );
}
