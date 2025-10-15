"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@kui-framework/ui";
import {
  Home,
  Grid3X3,
  Database,
  CheckCircle,
  Loader2,
  Bell,
  MessageSquare,
  FileX,
  FolderOpen,
  Layout,
  PanelLeft,
  ChevronDown,
  ChevronRight,
  Grid,
  Navigation,
  Hash,
  Accessibility,
  Type,
  FileText,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  {
    title: "Getting Started",
    items: [{ href: "/", label: "Home", icon: Home }],
  },
  {
    title: "Forms",
    items: [
      { href: "/forms/input-types", label: "Input Types", icon: Type },
      { href: "/forms/simple-forms", label: "Simple Forms", icon: FileText },
      { href: "/forms/with-validations", label: "With Validations", icon: CheckCircle },
      { href: "/forms/with-grid", label: "With Grid (1:N)", icon: Grid3X3 },
      { href: "/forms/full-crud", label: "Full CRUD", icon: Database },
    ],
  },
  {
    title: "Core Features",
    items: [
      { href: "/with-basic-components", label: "Basic Components", icon: Layout },
      { href: "/with-trpc", label: "Integração tRPC", icon: Database },
      { href: "/with-loading", label: "Loading State", icon: Loader2 },
    ],
  },
  {
    title: "Notifications & Feedback",
    items: [
      { href: "/with-toast", label: "Toast Notifications", icon: Bell },
      { href: "/with-dialogs", label: "Dialogs", icon: MessageSquare },
      { href: "/with-empty-states", label: "Empty States", icon: FileX },
    ],
  },
  {
    title: "Layout & Organization",
    items: [
      { href: "/with-sections", label: "Sections", icon: FolderOpen },
      { href: "/with-sidebar", label: "Sidebar Layouts", icon: Layout },
      { href: "/with-tabs", label: "Tabs Organization", icon: PanelLeft },
      { href: "/with-accordion", label: "Accordion/Collapse", icon: ChevronDown },
      { href: "/with-grid-layout", label: "Grid Layout", icon: Grid },
    ],
  },
  {
    title: "Navigation & UX",
    items: [
      { href: "/with-breadcrumbs", label: "Breadcrumbs", icon: Navigation },
      { href: "/with-pagination", label: "Pagination", icon: Hash },
      { href: "/with-aria", label: "ARIA Components", icon: Accessibility },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "Getting Started",
    "Forms",
    "Core Features",
    "Notifications & Feedback",
    "Layout & Organization",
    "Navigation & UX",
  ]);

  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title)
        ? prev.filter(s => s !== title)
        : [...prev, title]
    );
  };

  return (
    <div className="w-64 bg-card border-r border-border h-full overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">K</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-card-foreground">KUI Framework</h1>
            <p className="text-xs text-muted-foreground">v1.0.0</p>
          </div>
        </div>

        <nav className="space-y-1">
          {navigation.map((section) => {
            const isExpanded = expandedSections.includes(section.title);

            return (
              <div key={section.title}>
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-card-foreground hover:bg-accent rounded-md transition-colors"
                >
                  <span>{section.title}</span>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>

                {isExpanded && (
                  <div className="ml-4 space-y-1 mt-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors",
                            isActive
                              ? "bg-primary/10 text-primary border-r-2 border-primary"
                              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          )}
                        >
                          <Icon className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
