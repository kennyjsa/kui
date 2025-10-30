"use client";

import { useState } from "react";
import {
  Accordion,
  Collapsible,
  FAQAccordion,
  SettingsAccordion,
  ProfileAccordion,
  DataAccordion,
  TimelineAccordion,
  FormAccordion,
  NavigationAccordion,
  AccordionIcons,
} from "@kui-framework/ui";

export default function AccordionExample() {
  const [activeAccordion, setActiveAccordion] = useState("item1");

  // Basic Accordion
  const basicItems = [
    {
      id: "item1",
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
    },
    {
      id: "item2",
      title: "Endereço",
      description: "Informações de localização",
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
    },
    {
      id: "item3",
      title: "Documentos",
      description: "Documentos pessoais",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

  // FAQ Items
  const faqItems = [
    {
      id: "faq1",
      question: "Como posso redefinir minha senha?",
      answer: "Para redefinir sua senha, acesse a página de login e clique em 'Esqueci minha senha'. Você receberá um e-mail com instruções para criar uma nova senha.",
      category: "Conta",
      tags: ["senha", "conta", "segurança"],
    },
    {
      id: "faq2",
      question: "Como posso alterar meus dados pessoais?",
      answer: "Acesse o menu 'Perfil' e clique em 'Editar Dados'. Você pode alterar suas informações pessoais a qualquer momento.",
      category: "Perfil",
      tags: ["perfil", "dados", "edição"],
    },
    {
      id: "faq3",
      question: "Como posso entrar em contato com o suporte?",
      answer: "Você pode entrar em contato conosco através do e-mail suporte@empresa.com ou pelo telefone (11) 99999-9999.",
      category: "Suporte",
      tags: ["suporte", "contato", "ajuda"],
    },
  ];

  // Settings Sections
  const settingsSections = [
    {
      id: "general",
      title: "Configurações Gerais",
      description: "Configurações básicas do sistema",
      icon: AccordionIcons.general,
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
      icon: AccordionIcons.notifications,
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
      id: "security",
      title: "Segurança",
      description: "Configurações de segurança",
      icon: AccordionIcons.security,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Autenticação de dois fatores</label>
            <select className="w-full px-3 py-2 border rounded-md">
              <option>Desabilitado</option>
              <option>Habilitado</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Sessão</label>
            <select className="w-full px-3 py-2 border rounded-md">
              <option>30 minutos</option>
              <option>1 hora</option>
              <option>24 horas</option>
            </select>
          </div>
        </div>
      ),
    },
  ];

  // Profile Sections
  const profileSections = [
    {
      id: "personal",
      title: "Dados Pessoais",
      description: "Informações básicas",
      icon: AccordionIcons.profile,
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
    },
    {
      id: "contact",
      title: "Contato",
      description: "Informações de contato",
      icon: AccordionIcons.contact,
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
    },
    {
      id: "location",
      title: "Localização",
      description: "Endereço e localização",
      icon: AccordionIcons.location,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">CEP</label>
              <input type="text" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Cidade</label>
              <input type="text" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Estado</label>
              <input type="text" className="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  // Data Sections
  const dataSections = [
    {
      id: "overview",
      title: "Visão Geral",
      description: "Métricas principais",
      icon: AccordionIcons.analytics,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">Total de Usuários</h4>
              <p className="text-2xl font-bold text-primary">1,234</p>
              <p className="text-sm text-green-600">+12% vs mês anterior</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">Ativos Hoje</h4>
              <p className="text-2xl font-bold text-green-600">456</p>
              <p className="text-sm text-muted-foreground">+8% vs ontem</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">Novos Esta Semana</h4>
              <p className="text-2xl font-bold text-blue-600">89</p>
              <p className="text-sm text-muted-foreground">+15% vs semana anterior</p>
            </div>
          </div>
        </div>
      ),
      count: 1234,
      trend: "up" as const,
      color: "#3b82f6",
    },
    {
      id: "users",
      title: "Usuários",
      description: "Análise de usuários",
      icon: AccordionIcons.users,
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
      color: "#10b981",
    },
  ];

  // Timeline Items
  const timelineItems = [
    {
      id: "timeline1",
      title: "Registro criado",
      description: "Usuário foi criado no sistema",
      timestamp: "2 horas atrás",
      user: "João Silva",
      type: "create" as const,
      status: "success" as const,
    },
    {
      id: "timeline2",
      title: "Status atualizado",
      description: "Status alterado para ativo",
      timestamp: "1 hora atrás",
      user: "Maria Santos",
      type: "status" as const,
      status: "info" as const,
    },
    {
      id: "timeline3",
      title: "Dados atualizados",
      description: "Informações pessoais foram modificadas",
      timestamp: "30 min atrás",
      user: "Pedro Costa",
      type: "update" as const,
      status: "default" as const,
    },
  ];

  // Form Sections
  const formSections = [
    {
      id: "personal",
      title: "Dados Pessoais",
      description: "Informações básicas do usuário",
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
      title: "Contato",
      description: "Informações de contato",
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
      title: "Endereço",
      description: "Informações de localização",
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
              <label className="text-sm font-medium">Cidade</label>
              <input type="text" className="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </div>
      ),
      required: false,
      completed: false,
    },
  ];

  // Navigation Sections
  const navigationSections = [
    {
      id: "main",
      title: "Principal",
      description: "Navegação principal",
      icon: AccordionIcons.general,
      items: [
        { id: "dashboard", label: "Dashboard", href: "/dashboard" },
        { id: "users", label: "Usuários", href: "/users", badge: "12" },
        { id: "reports", label: "Relatórios", href: "/reports" },
      ],
    },
    {
      id: "settings",
      title: "Configurações",
      description: "Configurações do sistema",
      icon: AccordionIcons.general,
      items: [
        { id: "general", label: "Geral", href: "/settings/general" },
        { id: "security", label: "Segurança", href: "/settings/security" },
        { id: "notifications", label: "Notificações", href: "/settings/notifications" },
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Accordion/Collapse</h1>
        <p className="text-muted-foreground">
          Sistema completo de accordion para organizar conteúdo colapsável
        </p>
      </div>

      <div className="grid gap-8">
        {/* Basic Accordion */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Accordion Básico</h2>
          <div className="border rounded-lg p-6">
            <Accordion
              items={basicItems}
              type="single"
              value={activeAccordion}
              onValueChange={(value) => setActiveAccordion(value as string)}
              variant="default"
            />
          </div>
        </div>

        {/* Collapsible */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Collapsible Simples</h2>
          <div className="border rounded-lg p-6">
            <Collapsible
              title="Configurações Avançadas"
              description="Opções avançadas do sistema"
              icon={AccordionIcons.general}
              badge="3"
              status="info"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Modo Debug</label>
                  <input type="checkbox" className="rounded" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Log Level</label>
                  <select className="w-full px-3 py-2 border rounded-md">
                    <option>Error</option>
                    <option>Warning</option>
                    <option>Info</option>
                    <option>Debug</option>
                  </select>
                </div>
              </div>
            </Collapsible>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">FAQ Accordion</h2>
          <div className="border rounded-lg p-6">
            <FAQAccordion
              items={faqItems}
              defaultOpen="faq1"
            />
          </div>
        </div>

        {/* Settings Accordion */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Settings Accordion</h2>
          <div className="border rounded-lg p-6">
            <SettingsAccordion
              sections={settingsSections}
              defaultOpen="general"
            />
          </div>
        </div>

        {/* Profile Accordion */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Profile Accordion</h2>
          <div className="border rounded-lg p-6">
            <ProfileAccordion
              sections={profileSections}
              defaultOpen="personal"
            />
          </div>
        </div>

        {/* Data Accordion */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Data Accordion</h2>
          <div className="border rounded-lg p-6">
            <DataAccordion
              datasets={dataSections}
              defaultOpen="overview"
            />
          </div>
        </div>

        {/* Timeline Accordion */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Timeline Accordion</h2>
          <div className="border rounded-lg p-6">
            <TimelineAccordion
              items={timelineItems}
              defaultOpen="timeline1"
            />
          </div>
        </div>

        {/* Form Accordion */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Form Accordion</h2>
          <div className="border rounded-lg p-6">
            <FormAccordion
              sections={formSections}
              defaultOpen="personal"
            />
          </div>
        </div>

        {/* Navigation Accordion */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Navigation Accordion</h2>
          <div className="border rounded-lg p-6">
            <NavigationAccordion
              sections={navigationSections}
              defaultOpen="main"
            />
          </div>
        </div>

        {/* Código de Exemplo */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Como Usar</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`import {
  Accordion,
  Collapsible,
  FAQAccordion,
  SettingsAccordion,
  ProfileAccordion,
  DataAccordion,
  TimelineAccordion,
  FormAccordion,
  NavigationAccordion,
  AccordionIcons,
  CommonAccordionConfigs
} from "@kui-framework/ui";

// Accordion básico
<Accordion
  items={[
    {
      id: "item1",
      title: "Título",
      content: <div>Conteúdo</div>,
      description: "Descrição",
      icon: <Icon />,
      badge: "3",
      status: "success"
    }
  ]}
  type="single" // ou "multiple"
  variant="default" // default, card, flat, bordered
  size="md" // sm, md, lg
/>

// Collapsible simples
<Collapsible
  title="Título"
  description="Descrição"
  icon={<Icon />}
  badge="3"
  status="success"
>
  <div>Conteúdo</div>
</Collapsible>

// FAQ Accordion
<FAQAccordion
  items={[
    {
      id: "faq1",
      question: "Pergunta?",
      answer: "Resposta...",
      category: "Categoria",
      tags: ["tag1", "tag2"]
    }
  ]}
/>

// Settings Accordion
<SettingsAccordion
  sections={[
    {
      id: "general",
      title: "Geral",
      description: "Configurações gerais",
      icon: AccordionIcons.general,
      content: <SettingsContent />
    }
  ]}
/>

// Form Accordion com validação
<FormAccordion
  sections={[
    {
      id: "personal",
      title: "Dados Pessoais",
      content: <PersonalForm />,
      required: true,
      completed: true,
      error: false,
      warning: false
    }
  ]}
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
                <li>• Use accordions para organizar conteúdo relacionado</li>
                <li>• Mantenha títulos claros e descritivos</li>
                <li>• Use ícones e badges para melhor identificação</li>
                <li>• Implemente estados visuais (success, error, warning)</li>
                <li>• Considere o uso de múltiplas seções abertas</li>
              </ul>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold text-red-600 mb-2">❌ Evite</h3>
              <ul className="text-sm space-y-1">
                <li>• Sobrecarregar com muitas seções</li>
                <li>• Usar accordions para conteúdo crítico</li>
                <li>• Ignorar acessibilidade (ARIA)</li>
                <li>• Esconder informações importantes</li>
                <li>• Usar accordions em mobile sem otimização</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
