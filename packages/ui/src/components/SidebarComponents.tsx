"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { Badge } from "./Badge";
import { Button } from "./Button";
import {
  Clock,
  FileText,
  Paperclip,
  Activity,
  ChevronRight,
  Upload
} from "lucide-react";

// SidebarSection - Container com título
export interface SidebarSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function SidebarSection({ title, description, children, className }: SidebarSectionProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div>
        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}

// StatusWidget - Badge + informações
export interface StatusWidgetProps {
  status: "draft" | "published" | "archived" | "pending" | "approved" | "rejected";
  label?: string;
  description?: string;
  className?: string;
}

export function StatusWidget({ status, label, description, className }: StatusWidgetProps) {
  const statusConfig = {
    draft: { variant: "secondary" as const, label: "Rascunho", icon: FileText },
    published: { variant: "default" as const, label: "Publicado", icon: Activity },
    archived: { variant: "outline" as const, label: "Arquivado", icon: FileText },
    pending: { variant: "secondary" as const, label: "Pendente", icon: Clock },
    approved: { variant: "default" as const, label: "Aprovado", icon: Activity },
    rejected: { variant: "destructive" as const, label: "Rejeitado", icon: Activity },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        <Badge variant={config.variant}>{label || config.label}</Badge>
      </div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

// Timeline - Histórico de mudanças
export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  user?: string;
  type?: "create" | "update" | "delete" | "status";
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => (
        <div key={item.id} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-2 h-2 bg-primary rounded-full mt-1" />
            {index < items.length - 1 && (
              <div className="w-px h-6 bg-border mt-1" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">{item.title}</p>
              <span className="text-xs text-muted-foreground">{item.timestamp}</span>
            </div>
            {item.description && (
              <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
            )}
            {item.user && (
              <p className="text-xs text-muted-foreground mt-1">por {item.user}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// CategoryList - Seleção de categorias/tags
export interface CategoryItem {
  id: string;
  label: string;
  color?: string;
}

export interface CategoryListProps {
  categories: CategoryItem[];
  selected: string[];
  onChange: (selected: string[]) => void;
  className?: string;
}

export function CategoryList({ categories, selected, onChange, className }: CategoryListProps) {
  const toggleCategory = (categoryId: string) => {
    if (selected.includes(categoryId)) {
      onChange(selected.filter(id => id !== categoryId));
    } else {
      onChange([...selected, categoryId]);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => toggleCategory(category.id)}
          className={cn(
            "w-full flex items-center gap-2 p-2 rounded-md text-left transition-colors",
            selected.includes(category.id)
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          )}
        >
          {category.color && (
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: category.color }}
            />
          )}
          <span className="text-sm">{category.label}</span>
        </button>
      ))}
    </div>
  );
}

// AttachmentList - Lista de arquivos anexados
export interface AttachmentItem {
  id: string;
  name: string;
  size: string;
  type: string;
  url?: string;
}

export interface AttachmentListProps {
  files: AttachmentItem[];
  onRemove?: (id: string) => void;
  onDownload?: (id: string) => void;
  className?: string;
}

export function AttachmentList({ files, onRemove, onDownload, className }: AttachmentListProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {files.map((file) => (
        <div key={file.id} className="flex items-center gap-2 p-2 border rounded-md">
          <Paperclip className="h-4 w-4 text-muted-foreground" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground">{file.size} • {file.type}</p>
          </div>
          <div className="flex gap-1">
            {onDownload && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDownload(file.id)}
              >
                <Upload className="h-3 w-3" />
              </Button>
            )}
            {onRemove && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(file.id)}
              >
                ×
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// SidebarTabs - Abas dentro do sidebar
export interface SidebarTabProps {
  label: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export function SidebarTab({ label, children, active, onClick }: SidebarTabProps) {
  return (
    <div className="space-y-2">
      <button
        onClick={onClick}
        className={cn(
          "w-full flex items-center justify-between p-2 rounded-md text-left transition-colors",
          active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
        )}
      >
        <span className="text-sm font-medium">{label}</span>
        <ChevronRight className="h-4 w-4" />
      </button>
      {active && (
        <div className="p-2">
          {children}
        </div>
      )}
    </div>
  );
}

export interface SidebarTabsProps {
  children: React.ReactNode;
  className?: string;
}

export function SidebarTabs({ children, className }: SidebarTabsProps) {
  return (
    <div className={cn("space-y-1", className)}>
      {children}
    </div>
  );
}

// MetadataPanel - Infos técnicas
export interface MetadataItem {
  label: string;
  value: string;
}

export interface MetadataPanelProps {
  items: MetadataItem[];
  className?: string;
}

export function MetadataPanel({ items, className }: MetadataPanelProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item, index) => (
        <div key={index} className="flex justify-between text-xs">
          <span className="text-muted-foreground">{item.label}:</span>
          <span className="font-medium">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

// QuickActions - Ações rápidas
export interface QuickAction {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
}

export interface QuickActionsProps {
  actions: QuickAction[];
  className?: string;
}

export function QuickActions({ actions, className }: QuickActionsProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {actions.map((action, index) => (
        <Button
          key={index}
          variant={action.variant || "outline"}
          size="sm"
          onClick={action.onClick}
          className="w-full justify-start"
        >
          {action.icon}
          <span className="ml-2">{action.label}</span>
        </Button>
      ))}
    </div>
  );
}
