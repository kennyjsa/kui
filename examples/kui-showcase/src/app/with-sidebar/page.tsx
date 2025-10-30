"use client";

import { useState } from "react";
import {
  FormLayout,
  SidebarSection,
  StatusWidget,
  Timeline,
  CategoryList,
  AttachmentList,
  SidebarTabs,
  SidebarTab,
  MetadataPanel,
  QuickActions,
} from "@kui-framework/ui";

export default function SidebarExample() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["pessoal"]);
  const [activeTab, setActiveTab] = useState("status");

  const timelineItems = [
    {
      id: "1",
      title: "Registro criado",
      description: "Usuário foi criado no sistema",
      timestamp: "2 horas atrás",
      user: "João Silva",
      type: "create" as const,
    },
    {
      id: "2",
      title: "Status atualizado",
      description: "Status alterado para ativo",
      timestamp: "1 hora atrás",
      user: "Maria Santos",
      type: "status" as const,
    },
    {
      id: "3",
      title: "Dados atualizados",
      description: "Informações pessoais foram modificadas",
      timestamp: "30 min atrás",
      user: "Pedro Costa",
      type: "update" as const,
    },
  ];

  const categories = [
    { id: "pessoal", label: "Pessoal", color: "#3b82f6" },
    { id: "trabalho", label: "Trabalho", color: "#10b981" },
    { id: "importante", label: "Importante", color: "#f59e0b" },
    { id: "arquivado", label: "Arquivado", color: "#6b7280" },
  ];

  const attachments = [
    {
      id: "1",
      name: "documento.pdf",
      size: "2.4 MB",
      type: "PDF",
    },
    {
      id: "2",
      name: "foto-perfil.jpg",
      size: "1.2 MB",
      type: "JPEG",
    },
  ];

  const metadata = [
    { label: "Criado em", value: "15/10/2024" },
    { label: "Criado por", value: "João Silva" },
    { label: "Última atualização", value: "22/10/2024" },
    { label: "Atualizado por", value: "Maria Santos" },
  ];

  const quickActions = [
    {
      label: "Duplicar",
      onClick: () => console.log("Duplicar"),
    },
    {
      label: "Exportar",
      onClick: () => console.log("Exportar"),
    },
    {
      label: "Arquivar",
      onClick: () => console.log("Arquivar"),
      variant: "outline" as const,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Sidebar Layouts</h1>
        <p className="text-muted-foreground">
          Layouts com sidebar para formulários complexos
        </p>
      </div>

      <div className="grid gap-8">
        {/* FormLayout com Sidebar Direita */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">FormLayout com Sidebar Direita</h2>
          <div className="border rounded-lg h-96">
            <FormLayout
              sidebar="right"
              sidebarWidth="md"
              sidebarCollapsible
              sidebarContent={
                <>
                  <SidebarSection title="Status">
                    <StatusWidget
                      status="draft"
                      description="Documento em rascunho"
                    />
                  </SidebarSection>

                  <SidebarSection title="Histórico">
                    <Timeline items={timelineItems} />
                  </SidebarSection>

                  <SidebarSection title="Categorias">
                    <CategoryList
                      categories={categories}
                      selected={selectedCategories}
                      onChange={setSelectedCategories}
                    />
                  </SidebarSection>
                </>
              }
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Formulário Principal</h3>
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
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Descrição</label>
                    <textarea className="w-full px-3 py-2 border rounded-md h-24" />
                  </div>
                </div>
              </div>
            </FormLayout>
          </div>
        </div>

        {/* FormLayout com Sidebar Esquerda */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">FormLayout com Sidebar Esquerda</h2>
          <div className="border rounded-lg h-96">
            <FormLayout
              sidebar="left"
              sidebarWidth="lg"
              sidebarContent={
                <>
                  <SidebarSection title="Anexos">
                    <AttachmentList
                      files={attachments}
                      onDownload={(id) => console.log("Download", id)}
                      onRemove={(id) => console.log("Remove", id)}
                    />
                  </SidebarSection>

                  <SidebarSection title="Metadados">
                    <MetadataPanel items={metadata} />
                  </SidebarSection>

                  <SidebarSection title="Ações Rápidas">
                    <QuickActions actions={quickActions} />
                  </SidebarSection>
                </>
              }
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Conteúdo Principal</h3>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Este é o conteúdo principal do formulário. O sidebar à esquerda
                    contém informações complementares e ações.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold">Card 1</h4>
                      <p className="text-sm text-muted-foreground">Descrição do card</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold">Card 2</h4>
                      <p className="text-sm text-muted-foreground">Descrição do card</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold">Card 3</h4>
                      <p className="text-sm text-muted-foreground">Descrição do card</p>
                    </div>
                  </div>
                </div>
              </div>
            </FormLayout>
          </div>
        </div>

        {/* FormLayout com Sidebar Tabs */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">FormLayout com Sidebar Tabs</h2>
          <div className="border rounded-lg h-96">
            <FormLayout
              sidebar="right"
              sidebarWidth="md"
              sidebarContent={
                <SidebarTabs>
                  <SidebarTab
                    label="Status"
                    active={activeTab === "status"}
                    onClick={() => setActiveTab("status")}
                  >
                    <StatusWidget status="published" />
                    <Timeline items={timelineItems.slice(0, 2)} />
                  </SidebarTab>

                  <SidebarTab
                    label="Anexos"
                    active={activeTab === "attachments"}
                    onClick={() => setActiveTab("attachments")}
                  >
                    <AttachmentList files={attachments} />
                  </SidebarTab>

                  <SidebarTab
                    label="Comentários"
                    active={activeTab === "comments"}
                    onClick={() => setActiveTab("comments")}
                  >
                    <div className="space-y-2">
                      <div className="p-2 border rounded-md">
                        <p className="text-sm">Comentário 1</p>
                        <p className="text-xs text-muted-foreground">por João Silva</p>
                      </div>
                      <div className="p-2 border rounded-md">
                        <p className="text-sm">Comentário 2</p>
                        <p className="text-xs text-muted-foreground">por Maria Santos</p>
                      </div>
                    </div>
                  </SidebarTab>
                </SidebarTabs>
              }
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Formulário com Sidebar Tabs</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Título</label>
                      <input type="text" className="w-full px-3 py-2 border rounded-md" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Categoria</label>
                      <select className="w-full px-3 py-2 border rounded-md">
                        <option>Selecione</option>
                        <option>Pessoal</option>
                        <option>Trabalho</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Conteúdo</label>
                    <textarea className="w-full px-3 py-2 border rounded-md h-32" />
                  </div>
                </div>
              </div>
            </FormLayout>
          </div>
        </div>

        {/* Código de Exemplo */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Como Usar</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`import {
  FormLayout,
  SidebarSection,
  StatusWidget,
  Timeline,
  CategoryList,
  AttachmentList,
  SidebarTabs,
  SidebarTab,
  MetadataPanel,
  QuickActions
} from "@kui-framework/ui";

// FormLayout básico
<FormLayout
  sidebar="right"
  sidebarWidth="md"
  sidebarCollapsible
  sidebarContent={
    <SidebarSection title="Status">
      <StatusWidget status="draft" />
    </SidebarSection>
  }
>
  {/* Conteúdo principal */}
</FormLayout>

// Sidebar com múltiplas seções
<FormLayout
  sidebar="left"
  sidebarWidth="lg"
  sidebarContent={
    <>
      <SidebarSection title="Histórico">
        <Timeline items={timelineItems} />
      </SidebarSection>

      <SidebarSection title="Categorias">
        <CategoryList
          categories={categories}
          selected={selected}
          onChange={setSelected}
        />
      </SidebarSection>

      <SidebarSection title="Anexos">
        <AttachmentList files={attachments} />
      </SidebarSection>
    </>
  }
>
  {/* Conteúdo principal */}
</FormLayout>

// Sidebar com tabs
<FormLayout
  sidebar="right"
  sidebarContent={
    <SidebarTabs>
      <SidebarTab label="Status" active={activeTab === "status"}>
        <StatusWidget status="published" />
      </SidebarTab>
      <SidebarTab label="Anexos" active={activeTab === "attachments"}>
        <AttachmentList files={attachments} />
      </SidebarTab>
    </SidebarTabs>
  }
>
  {/* Conteúdo principal */}
</FormLayout>`}
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
                <li>• Use sidebar para informações complementares</li>
                <li>• Organize conteúdo em seções lógicas</li>
                <li>• Mantenha sidebar colapsível para mobile</li>
                <li>• Use tabs para organizar muitas informações</li>
                <li>• Inclua ações contextuais</li>
              </ul>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold text-red-600 mb-2">❌ Evite</h3>
              <ul className="text-sm space-y-1">
                <li>• Sobrecarregar o sidebar</li>
                <li>• Colocar conteúdo principal no sidebar</li>
                <li>• Usar sidebar em formulários simples</li>
                <li>• Ignorar responsividade</li>
                <li>• Misturar informações não relacionadas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
