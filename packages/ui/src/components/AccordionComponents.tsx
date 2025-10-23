"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { Accordion } from "./Accordion";
import { Badge } from "./Badge";
import { 
  FileText, 
  Settings, 
  User, 
  Shield, 
  Bell,
  Palette,
  Database,
  BarChart3,
  Users,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock
} from "lucide-react";

// FAQ Accordion - Para perguntas frequentes
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  tags?: string[];
}

export interface FAQAccordionProps {
  items: FAQItem[];
  defaultOpen?: string;
  className?: string;
}

export function FAQAccordion({ items, defaultOpen, className }: FAQAccordionProps) {
  const accordionItems = items.map(item => ({
    id: item.id,
    title: item.question,
    content: (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">{item.answer}</p>
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    ),
    description: item.category,
  }));

  return (
    <Accordion
      items={accordionItems}
      type="single"
      defaultValue={defaultOpen}
      variant="card"
      className={className}
    />
  );
}

// Settings Accordion - Para configurações
export interface SettingsAccordionProps {
  sections: SettingsSection[];
  defaultOpen?: string;
  className?: string;
}

export interface SettingsSection {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  badge?: string | number;
  status?: "default" | "success" | "warning" | "error" | "info";
}

export function SettingsAccordion({ sections, defaultOpen, className }: SettingsAccordionProps) {
  const accordionItems = sections.map(section => ({
    id: section.id,
    title: section.title,
    content: section.content,
    description: section.description,
    icon: section.icon,
    badge: section.badge,
    status: section.status,
  }));

  return (
    <Accordion
      items={accordionItems}
      type="single"
      defaultValue={defaultOpen}
      variant="card"
      className={className}
    />
  );
}

// Profile Accordion - Para perfis de usuário
export interface ProfileAccordionProps {
  sections: ProfileSection[];
  defaultOpen?: string;
  className?: string;
}

export interface ProfileSection {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  badge?: string | number;
  status?: "default" | "success" | "warning" | "error" | "info";
}

export function ProfileAccordion({ sections, defaultOpen, className }: ProfileAccordionProps) {
  const accordionItems = sections.map(section => ({
    id: section.id,
    title: section.title,
    content: section.content,
    description: section.description,
    icon: section.icon,
    badge: section.badge,
    status: section.status,
  }));

  return (
    <Accordion
      items={accordionItems}
      type="single"
      defaultValue={defaultOpen}
      variant="default"
      className={className}
    />
  );
}

// Data Accordion - Para visualização de dados
export interface DataAccordionProps {
  datasets: DataSection[];
  defaultOpen?: string;
  className?: string;
}

export interface DataSection {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  count?: number;
  trend?: "up" | "down" | "stable";
  color?: string;
}

export function DataAccordion({ datasets, defaultOpen, className }: DataAccordionProps) {
  const accordionItems = datasets.map(dataset => ({
    id: dataset.id,
    title: dataset.title,
    content: dataset.content,
    description: dataset.description,
    icon: dataset.icon,
    badge: dataset.count,
  }));

  return (
    <Accordion
      items={accordionItems}
      type="single"
      defaultValue={defaultOpen}
      variant="card"
      className={className}
    />
  );
}

// Timeline Accordion - Para histórico
export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  user?: string;
  type?: "create" | "update" | "delete" | "status";
  status?: "default" | "success" | "warning" | "error" | "info";
}

export interface TimelineAccordionProps {
  items: TimelineItem[];
  defaultOpen?: string;
  className?: string;
}

export function TimelineAccordion({ items, defaultOpen, className }: TimelineAccordionProps) {
  const accordionItems = items.map(item => ({
    id: item.id,
    title: item.title,
    content: (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">{item.description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{item.timestamp}</span>
          {item.user && <span>por {item.user}</span>}
        </div>
      </div>
    ),
    description: item.timestamp,
    status: item.status,
  }));

  return (
    <Accordion
      items={accordionItems}
      type="single"
      defaultValue={defaultOpen}
      variant="flat"
      className={className}
    />
  );
}

// Form Accordion - Para formulários
export interface FormAccordionProps {
  sections: FormSection[];
  defaultOpen?: string;
  className?: string;
}

export interface FormSection {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
  required?: boolean;
  completed?: boolean;
  error?: boolean;
  warning?: boolean;
  badge?: string | number;
}

export function FormAccordion({ sections, defaultOpen, className }: FormAccordionProps) {
  const accordionItems = sections.map(section => {
    let status: "default" | "success" | "warning" | "error" | "info" = "default";
    if (section.completed) status = "success";
    else if (section.error) status = "error";
    else if (section.warning) status = "warning";
    
    return {
      id: section.id,
      title: section.title,
      content: section.content,
      description: section.description,
      badge: section.completed ? "✓" : section.error ? "!" : section.warning ? "⚠" : section.badge,
      status,
    };
  });

  return (
    <Accordion
      items={accordionItems}
      type="single"
      defaultValue={defaultOpen}
      variant="card"
      className={className}
    />
  );
}

// Navigation Accordion - Para navegação
export interface NavigationAccordionProps {
  sections: NavigationSection[];
  defaultOpen?: string;
  className?: string;
}

export interface NavigationSection {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  items: NavigationItem[];
  badge?: string | number;
}

export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  badge?: string | number;
  active?: boolean;
}

export function NavigationAccordion({ sections, defaultOpen, className }: NavigationAccordionProps) {
  const accordionItems = sections.map(section => ({
    id: section.id,
    title: section.title,
    content: (
      <div className="space-y-1">
        {section.items.map(item => (
          <button
            key={item.id}
            onClick={item.onClick}
            className={cn(
              "w-full flex items-center justify-between p-2 rounded-md text-left transition-colors",
              item.active
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            <span className="text-sm">{item.label}</span>
            {item.badge && (
              <Badge variant="secondary" className="text-xs">
                {item.badge}
              </Badge>
            )}
          </button>
        ))}
      </div>
    ),
    description: section.description,
    icon: section.icon,
    badge: section.badge,
  }));

  return (
    <Accordion
      items={accordionItems}
      type="single"
      defaultValue={defaultOpen}
      variant="flat"
      className={className}
    />
  );
}

// Predefined Icons
export const AccordionIcons = {
  general: <Settings className="h-4 w-4" />,
  profile: <User className="h-4 w-4" />,
  security: <Shield className="h-4 w-4" />,
  notifications: <Bell className="h-4 w-4" />,
  appearance: <Palette className="h-4 w-4" />,
  data: <Database className="h-4 w-4" />,
  analytics: <BarChart3 className="h-4 w-4" />,
  users: <Users className="h-4 w-4" />,
  contact: <Mail className="h-4 w-4" />,
  phone: <Phone className="h-4 w-4" />,
  location: <MapPin className="h-4 w-4" />,
  calendar: <Calendar className="h-4 w-4" />,
  time: <Clock className="h-4 w-4" />,
  document: <FileText className="h-4 w-4" />,
};

// Common Accordion Configurations
export const CommonAccordionConfigs = {
  settings: [
    { id: "general", title: "Geral", icon: AccordionIcons.general },
    { id: "profile", title: "Perfil", icon: AccordionIcons.profile },
    { id: "security", title: "Segurança", icon: AccordionIcons.security },
    { id: "notifications", title: "Notificações", icon: AccordionIcons.notifications },
    { id: "appearance", title: "Aparência", icon: AccordionIcons.appearance },
  ],
  profile: [
    { id: "personal", title: "Dados Pessoais", icon: AccordionIcons.profile },
    { id: "contact", title: "Contato", icon: AccordionIcons.contact },
    { id: "location", title: "Localização", icon: AccordionIcons.location },
    { id: "preferences", title: "Preferências", icon: AccordionIcons.general },
  ],
  data: [
    { id: "overview", title: "Visão Geral", icon: AccordionIcons.analytics },
    { id: "users", title: "Usuários", icon: AccordionIcons.users },
    { id: "reports", title: "Relatórios", icon: AccordionIcons.data },
    { id: "exports", title: "Exportações", icon: AccordionIcons.document },
  ],
};
