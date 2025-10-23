"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@kui-framework/ui";

const routes = [
  { href: "/", label: "Campos Básicos" },
  { href: "/with-grid", label: "Grid (Endereços)" },
  { href: "/with-trpc", label: "Integração tRPC" },
  { href: "/with-validations", label: "Validações Avançadas" },
  { href: "/with-loading", label: "Loading State" },
  { href: "/with-toast", label: "Toast Notifications" },
  { href: "/with-dialogs", label: "Dialogs" },
  { href: "/with-empty-states", label: "Empty States" },
  { href: "/with-sections", label: "Sections" },
  { href: "/with-sidebar", label: "Sidebar Layouts" },
  { href: "/with-tabs", label: "Tabs Organization" },
  { href: "/with-accordion", label: "Accordion/Collapse" },
  { href: "/with-grid-layout", label: "Grid Layout" },
  { href: "/with-breadcrumbs", label: "Breadcrumbs" },
  { href: "/with-pagination", label: "Pagination" },
  { href: "/with-aria", label: "ARIA Components" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <div className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-8">
        <nav className="flex gap-6 py-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary pb-2 border-b-2",
                pathname === route.href
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

