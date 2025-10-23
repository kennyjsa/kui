"use client";

import { useState } from "react";
import {
  Tabs,
  ScrollableTabs,
  FormTabs,
  WizardTabs,
  SettingsTabs,
  ProfileTabs,
  DataTabs,
  TabIcons,
} from "@kui-framework/ui";

export default function TabsExample() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [wizardStep, setWizardStep] = useState(0);
  const [settingsTab, setSettingsTab] = useState("general");

  // Basic Tabs
  const basicTabs = [
    {
      id: "tab1",
      label: "Informações",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Informações Básicas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome</label>
              <input type="text" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">E-mail</label>
              <input type="email" className="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "tab2",
      label: "Endereço",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Endereço</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Rua</label>
              <input type="text" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Cidade</label>
              <input type="text" className="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "tab3",
      label: "Documentos",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Documentos</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">CPF</label>
              <input type="text" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">RG</label>
              <input type="text" className="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  // Form Tabs with validation
  const formTabs = [
    {
      id: "personal",
      label: "Dados Pessoais",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome Completo</label>
              <input type="text" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Data de Nascimento</label>
              <input type="date" className="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </div>
      ),
      required: true,
      completed: true,
    },
    {
      id: "contact",
      label: "Contato",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">E-mail</label>
              <input type="email" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Telefone</label>
              <input type="tel" className="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </div>
      ),
      required: true,
      completed: false,
    },
    {
      id: "address",
      label: "Endereço",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">CEP</label>
              <input type="text" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Rua</label>
              <input type="text" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Número</label>
              <input type="text" className="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </div>
      ),
      required: false,
      completed: false,
    },
  ];

  // Wizard Steps
  const wizardSteps = [
    {
      id: "step1",
      title: "Informações Básicas",
      description: "Dados pessoais do usuário",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome</label>
              <input type="text" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">E-mail</label>
              <input type="email" className="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </div>
      ),
      required: true,
      completed: true,
    },
    {
      id: "step2",
      title: "Endereço",
      description: "Localização do usuário",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">CEP</label>
              <input type="text" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Cidade</label>
              <input type="text" className="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </div>
      ),
      required: true,
      completed: false,
    },
    {
      id: "step3",
      title: "Confirmação",
      description: "Revisar e confirmar dados",
      content: (
        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-muted/30">
            <h4 className="font-semibold mb-2">Resumo dos Dados</h4>
            <p className="text-sm text-muted-foreground">
              Revise todas as informações antes de finalizar.
            </p>
          </div>
        </div>
      ),
      required: true,
      completed: false,
    },
  ];

  // Settings Sections
  const settingsSections = [
    {
      id: "general",
      title: "Geral",
      description: "Configurações gerais do sistema",
      icon: TabIcons.settings,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nome da Empresa</label>
            <input type="text" className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Idioma</label>
            <select className="w-full px-3 py-2 border rounded-md">
              <option>Português</option>
              <option>English</option>
              <option>Español</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      id: "notifications",
      title: "Notificações",
      description: "Configurações de notificações",
      icon: TabIcons.notifications,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">E-mail</label>
              <p className="text-xs text-muted-foreground">Receber notificações por e-mail</p>
            </div>
            <input type="checkbox" className="rounded" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Push</label>
              <p className="text-xs text-muted-foreground">Receber notificações push</p>
            </div>
            <input type="checkbox" className="rounded" />
          </div>
        </div>
      ),
    },
    {
      id: "appearance",
      title: "Aparência",
      description: "Personalização visual",
      icon: TabIcons.appearance,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tema</label>
            <select className="w-full px-3 py-2 border rounded-md">
              <option>Claro</option>
              <option>Escuro</option>
              <option>Sistema</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Tamanho da Fonte</label>
            <select className="w-full px-3 py-2 border rounded-md">
              <option>Pequeno</option>
              <option>Médio</option>
              <option>Grande</option>
            </select>
          </div>
        </div>
      ),
    },
  ];

  // Profile Tabs
  const profileTabs = [
    {
      id: "overview",
      title: "Visão Geral",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">Total de Usuários</h4>
              <p className="text-2xl font-bold text-primary">1,234</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">Ativos Hoje</h4>
              <p className="text-2xl font-bold text-green-600">456</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">Novos Esta Semana</h4>
              <p className="text-2xl font-bold text-blue-600">89</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "activity",
      title: "Atividade",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 border rounded">
              <span className="text-sm">Usuário João criou conta</span>
              <span className="text-xs text-muted-foreground">2 min atrás</span>
            </div>
            <div className="flex items-center justify-between p-2 border rounded">
              <span className="text-sm">Usuário Maria atualizou perfil</span>
              <span className="text-xs text-muted-foreground">5 min atrás</span>
            </div>
            <div className="flex items-center justify-between p-2 border rounded">
              <span className="text-sm">Usuário Pedro fez login</span>
              <span className="text-xs text-muted-foreground">10 min atrás</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  // Data Tabs
  const dataTabs = [
    {
      id: "sales",
      title: "Vendas",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">Vendas do Mês</h4>
              <p className="text-2xl font-bold">R$ 45.678</p>
              <p className="text-sm text-green-600">+12% vs mês anterior</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">Meta</h4>
              <p className="text-2xl font-bold">R$ 50.000</p>
              <p className="text-sm text-muted-foreground">91% da meta</p>
            </div>
          </div>
        </div>
      ),
      count: 156,
      trend: "up" as const,
      color: "#10b981",
    },
    {
      id: "users",
      title: "Usuários",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">Usuários Ativos</h4>
              <p className="text-2xl font-bold">1,234</p>
              <p className="text-sm text-blue-600">+8% vs mês anterior</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">Novos Usuários</h4>
              <p className="text-2xl font-bold">89</p>
              <p className="text-sm text-green-600">Esta semana</p>
            </div>
          </div>
        </div>
      ),
      count: 1234,
      trend: "up" as const,
      color: "#3b82f6",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Tabs para Organização</h1>
        <p className="text-muted-foreground">
          Sistema completo de tabs para organizar conteúdo e formulários
        </p>
      </div>

      <div className="grid gap-8">
        {/* Basic Tabs */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Tabs Básicos</h2>
          <div className="border rounded-lg p-6">
            <Tabs
              items={basicTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              variant="default"
            />
          </div>
        </div>

        {/* Form Tabs */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Form Tabs com Validação</h2>
          <div className="border rounded-lg p-6">
            <FormTabs
              items={formTabs}
              defaultActiveTab="personal"
            />
          </div>
        </div>

        {/* Wizard Tabs */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Wizard Tabs</h2>
          <div className="border rounded-lg p-6">
            <WizardTabs
              steps={wizardSteps}
              currentStep={wizardStep}
              onStepChange={setWizardStep}
            />
          </div>
        </div>

        {/* Settings Tabs */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Settings Tabs</h2>
          <div className="border rounded-lg p-6">
            <SettingsTabs
              sections={settingsSections}
              activeTab={settingsTab}
              onTabChange={setSettingsTab}
            />
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Profile Tabs</h2>
          <div className="border rounded-lg p-6">
            <ProfileTabs
              tabs={profileTabs}
              defaultActiveTab="overview"
            />
          </div>
        </div>

        {/* Data Tabs */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Data Tabs</h2>
          <div className="border rounded-lg p-6">
            <DataTabs
              datasets={dataTabs}
              defaultActiveTab="sales"
            />
          </div>
        </div>

        {/* Scrollable Tabs */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Scrollable Tabs</h2>
          <div className="border rounded-lg p-6">
            <ScrollableTabs
              items={[
                ...basicTabs,
                { id: "tab4", label: "Configurações", content: <div>Configurações</div> },
                { id: "tab5", label: "Relatórios", content: <div>Relatórios</div> },
                { id: "tab6", label: "Histórico", content: <div>Histórico</div> },
                { id: "tab7", label: "Ajuda", content: <div>Ajuda</div> },
              ]}
              variant="pills"
              showScrollButtons
            />
          </div>
        </div>

        {/* Código de Exemplo */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Como Usar</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`import {
  Tabs,
  FormTabs,
  WizardTabs,
  SettingsTabs,
  ProfileTabs,
  DataTabs,
  ScrollableTabs,
  TabIcons,
  CommonTabConfigs
} from "@kui-framework/ui";

// Tabs básicos
<Tabs
  items={[
    { id: "tab1", label: "Tab 1", content: <div>Conteúdo 1</div> },
    { id: "tab2", label: "Tab 2", content: <div>Conteúdo 2</div> },
  ]}
  variant="default"
  onTabChange={(tabId) => console.log(tabId)}
/>

// Form Tabs com validação
<FormTabs
  items={[
    {
      id: "personal",
      label: "Dados Pessoais",
      content: <PersonalForm />,
      required: true,
      completed: true,
    },
    {
      id: "contact",
      label: "Contato",
      content: <ContactForm />,
      required: true,
      completed: false,
    },
  ]}
/>

// Wizard Tabs
<WizardTabs
  steps={wizardSteps}
  currentStep={currentStep}
  onStepChange={setCurrentStep}
/>

// Settings Tabs
<SettingsTabs
  sections={settingsSections}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>

// Scrollable Tabs
<ScrollableTabs
  items={manyTabs}
  variant="pills"
  showScrollButtons
/>`}
            </pre>
          </div>
        </div>

        {/* Best Practices */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Melhores Práticas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold text-green-600 mb-2">✅ Faça</h3>
              <ul className="text-sm space-y-1">
                <li>• Use tabs para organizar conteúdo relacionado</li>
                <li>• Mantenha títulos de tabs curtos e claros</li>
                <li>• Use badges para indicar status ou contadores</li>
                <li>• Implemente validação visual nos form tabs</li>
                <li>• Use scrollable tabs para muitas opções</li>
              </ul>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold text-red-600 mb-2">❌ Evite</h3>
              <ul className="text-sm space-y-1">
                <li>• Sobrecarregar com muitos tabs</li>
                <li>• Usar tabs para conteúdo não relacionado</li>
                <li>• Ignorar acessibilidade (ARIA)</li>
                <li>• Esconder conteúdo importante em tabs</li>
                <li>• Usar tabs em mobile sem scroll</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
