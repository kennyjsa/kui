"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { Tabs, TabItem } from "./Tabs";
import {
  User,
  MapPin,
  CreditCard,
  Settings,
  FileText,
  Shield,
  Bell,
  Palette
} from "lucide-react";

// FormTabs - Tabs especializados para formulários
export interface FormTabsProps {
  items: FormTabItem[];
  defaultActiveTab?: string;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

export interface FormTabItem extends Omit<TabItem, 'content'> {
  content: React.ReactNode;
  required?: boolean;
  completed?: boolean;
  error?: boolean;
  warning?: boolean;
}

export function FormTabs({ items, defaultActiveTab, activeTab, onTabChange, className }: FormTabsProps) {
  const enhancedItems: TabItem[] = items.map(item => ({
    ...item,
    badge: item.completed ? "✓" : item.error ? "!" : item.warning ? "⚠" : item.required ? "!" : undefined,
    icon: item.icon,
  }));

  return (
    <Tabs
      items={enhancedItems}
      defaultActiveTab={defaultActiveTab}
      activeTab={activeTab}
      onTabChange={onTabChange}
      variant="card"
      className={className}
    />
  );
}

// WizardTabs - Tabs para wizard/stepper
export interface WizardTabsProps {
  steps: WizardStep[];
  currentStep: number;
  onStepChange?: (step: number) => void;
  className?: string;
}

export interface WizardStep {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
  required?: boolean;
  completed?: boolean;
}

export function WizardTabs({ steps, currentStep, onStepChange, className }: WizardTabsProps) {
  const items: TabItem[] = steps.map((step, index) => ({
    id: step.id,
    label: step.title,
    content: step.content,
    disabled: index > currentStep,
    badge: step.completed ? "✓" : index === currentStep ? (index + 1).toString() : undefined,
    icon: step.completed ? undefined : undefined,
  }));

  return (
    <div className={cn("space-y-6", className)}>
      {/* Progress Indicator */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  step.completed
                    ? "bg-primary text-primary-foreground"
                    : index === currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {step.completed ? "✓" : index + 1}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{step.title}</p>
                {step.description && (
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-px bg-border mx-4" />
            )}
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <Tabs
        items={items}
        activeTab={steps[currentStep]?.id}
        onTabChange={(tabId) => {
          const stepIndex = steps.findIndex(step => step.id === tabId);
          if (stepIndex !== -1) {
            onStepChange?.(stepIndex);
          }
        }}
        variant="underline"
      />
    </div>
  );
}

// SettingsTabs - Tabs para configurações
export interface SettingsTabsProps {
  sections: SettingsSection[];
  defaultActiveTab?: string;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

export interface SettingsSection {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  badge?: string | number;
}

export function SettingsTabs({ sections, defaultActiveTab, activeTab, onTabChange, className }: SettingsTabsProps) {
  const items: TabItem[] = sections.map(section => ({
    id: section.id,
    label: section.title,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">{section.title}</h3>
          {section.description && (
            <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
          )}
        </div>
        {section.content}
      </div>
    ),
    icon: section.icon,
    badge: section.badge,
  }));

  return (
    <Tabs
      items={items}
      defaultActiveTab={defaultActiveTab}
      activeTab={activeTab}
      onTabChange={onTabChange}
      variant="card"
      orientation="vertical"
      className={className}
    />
  );
}

// ProfileTabs - Tabs para perfis de usuário
export interface ProfileTabsProps {
  tabs: ProfileTab[];
  defaultActiveTab?: string;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

export interface ProfileTab {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  badge?: string | number;
}

export function ProfileTabs({ tabs, defaultActiveTab, activeTab, onTabChange, className }: ProfileTabsProps) {
  const items: TabItem[] = tabs.map(tab => ({
    id: tab.id,
    label: tab.title,
    content: tab.content,
    icon: tab.icon,
    badge: tab.badge,
  }));

  return (
    <Tabs
      items={items}
      defaultActiveTab={defaultActiveTab}
      activeTab={activeTab}
      onTabChange={onTabChange}
      variant="pills"
      className={className}
    />
  );
}

// DataTabs - Tabs para visualização de dados
export interface DataTabsProps {
  datasets: DataTab[];
  defaultActiveTab?: string;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

export interface DataTab {
  id: string;
  title: string;
  content: React.ReactNode;
  count?: number;
  trend?: "up" | "down" | "stable";
  color?: string;
}

export function DataTabs({ datasets, defaultActiveTab, activeTab, onTabChange, className }: DataTabsProps) {
  const items: TabItem[] = datasets.map(dataset => ({
    id: dataset.id,
    label: dataset.title,
    content: dataset.content,
    badge: dataset.count,
    icon: dataset.color ? (
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: dataset.color }}
      />
    ) : undefined,
  }));

  return (
    <Tabs
      items={items}
      defaultActiveTab={defaultActiveTab}
      activeTab={activeTab}
      onTabChange={onTabChange}
      variant="default"
      className={className}
    />
  );
}

// Predefined Tab Icons
export const TabIcons = {
  profile: <User className="h-4 w-4" />,
  address: <MapPin className="h-4 w-4" />,
  payment: <CreditCard className="h-4 w-4" />,
  settings: <Settings className="h-4 w-4" />,
  documents: <FileText className="h-4 w-4" />,
  security: <Shield className="h-4 w-4" />,
  notifications: <Bell className="h-4 w-4" />,
  appearance: <Palette className="h-4 w-4" />,
};

// Common Tab Configurations
export const CommonTabConfigs = {
  userProfile: [
    { id: "personal", title: "Dados Pessoais", icon: TabIcons.profile },
    { id: "address", title: "Endereço", icon: TabIcons.address },
    { id: "documents", title: "Documentos", icon: TabIcons.documents },
    { id: "security", title: "Segurança", icon: TabIcons.security },
  ],
  settings: [
    { id: "general", title: "Geral", icon: TabIcons.settings },
    { id: "notifications", title: "Notificações", icon: TabIcons.notifications },
    { id: "appearance", title: "Aparência", icon: TabIcons.appearance },
    { id: "security", title: "Segurança", icon: TabIcons.security },
  ],
  checkout: [
    { id: "shipping", title: "Entrega", icon: TabIcons.address },
    { id: "payment", title: "Pagamento", icon: TabIcons.payment },
    { id: "review", title: "Revisão", icon: TabIcons.documents },
  ],
};
