"use client";

import {
  Breadcrumbs,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@kui-framework/ui";
import { Home, User, Settings, FileText, Edit } from "lucide-react";

export default function BreadcrumbsExample() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Breadcrumbs</h1>
        <p className="text-muted-foreground">
          Sistema de navegação hierárquica baseado nos padrões do Radix UI
        </p>
      </div>

      <div className="space-y-8">
        {/* Breadcrumb Básico */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Breadcrumb Básico</h2>
          <div className="border rounded-lg p-6">
            <Breadcrumbs>
              <BreadcrumbLink href="/">
                <Home className="h-4 w-4" />
                Home
              </BreadcrumbLink>
              <BreadcrumbLink href="/pessoas">
                <User className="h-4 w-4" />
                Pessoas
              </BreadcrumbLink>
              <BreadcrumbPage>João Silva</BreadcrumbPage>
            </Breadcrumbs>
          </div>
        </div>

        {/* Breadcrumb com Separador Customizado */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Separador Customizado</h2>
          <div className="border rounded-lg p-6">
            <Breadcrumbs separator="/">
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
              <BreadcrumbLink href="/configuracoes">Configurações</BreadcrumbLink>
              <BreadcrumbLink href="/configuracoes/perfil">Perfil</BreadcrumbLink>
              <BreadcrumbPage>Editar</BreadcrumbPage>
            </Breadcrumbs>
          </div>
        </div>

        {/* Breadcrumb com Variantes */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Variantes</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Default</h3>
              <Breadcrumbs>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                <BreadcrumbLink href="/produtos">Produtos</BreadcrumbLink>
                <BreadcrumbPage>Detalhes</BreadcrumbPage>
              </Breadcrumbs>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Solid</h3>
              <Breadcrumbs variant="solid">
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                <BreadcrumbLink href="/vendas">Vendas</BreadcrumbLink>
                <BreadcrumbPage>Relatório</BreadcrumbPage>
              </Breadcrumbs>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Outline</h3>
              <Breadcrumbs variant="outline">
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                <BreadcrumbLink href="/financeiro">Financeiro</BreadcrumbLink>
                <BreadcrumbPage>Contas a Pagar</BreadcrumbPage>
              </Breadcrumbs>
            </div>
          </div>
        </div>

        {/* Breadcrumb com Tamanhos */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Tamanhos</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Small</h3>
              <Breadcrumbs size="sm">
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
                <BreadcrumbPage>Usuários</BreadcrumbPage>
              </Breadcrumbs>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Medium (Default)</h3>
              <Breadcrumbs size="md">
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
                <BreadcrumbPage>Usuários</BreadcrumbPage>
              </Breadcrumbs>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Large</h3>
              <Breadcrumbs size="lg">
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
                <BreadcrumbPage>Usuários</BreadcrumbPage>
              </Breadcrumbs>
            </div>
          </div>
        </div>

        {/* Breadcrumb com Muitos Itens */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Muitos Itens</h2>
          <div className="border rounded-lg p-6">
            <Breadcrumbs>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
              <BreadcrumbLink href="/empresa">Empresa</BreadcrumbLink>
              <BreadcrumbLink href="/empresa/departamentos">Departamentos</BreadcrumbLink>
              <BreadcrumbLink href="/empresa/departamentos/ti">TI</BreadcrumbLink>
              <BreadcrumbLink href="/empresa/departamentos/ti/projetos">Projetos</BreadcrumbLink>
              <BreadcrumbLink href="/empresa/departamentos/ti/projetos/sistema">Sistema</BreadcrumbLink>
              <BreadcrumbPage>Configurações</BreadcrumbPage>
            </Breadcrumbs>
          </div>
        </div>

        {/* Breadcrumb com Ícones */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Com Ícones</h2>
          <div className="border rounded-lg p-6">
            <Breadcrumbs>
              <BreadcrumbLink href="/">
                <Home className="h-4 w-4" />
                Home
              </BreadcrumbLink>
              <BreadcrumbLink href="/configuracoes">
                <Settings className="h-4 w-4" />
                Configurações
              </BreadcrumbLink>
              <BreadcrumbLink href="/configuracoes/usuarios">
                <User className="h-4 w-4" />
                Usuários
              </BreadcrumbLink>
              <BreadcrumbPage>
                <Edit className="h-4 w-4" />
                Editar
              </BreadcrumbPage>
            </Breadcrumbs>
          </div>
        </div>

        {/* Breadcrumb com Ações */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Com Ações</h2>
          <div className="border rounded-lg p-6">
            <Breadcrumbs>
              <BreadcrumbLink
                href="/"
                onClick={() => console.log("Navegar para Home")}
              >
                <Home className="h-4 w-4" />
                Home
              </BreadcrumbLink>
              <BreadcrumbLink
                href="/documentos"
                onClick={() => console.log("Navegar para Documentos")}
              >
                <FileText className="h-4 w-4" />
                Documentos
              </BreadcrumbLink>
              <BreadcrumbPage>Novo Documento</BreadcrumbPage>
            </Breadcrumbs>
          </div>
        </div>

        {/* Código de Exemplo */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Como Usar</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`import {
  Breadcrumbs,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis
} from "@kui-framework/ui";

// Breadcrumb básico
<Breadcrumbs>
  <BreadcrumbLink href="/">
    <Home className="h-4 w-4" />
    Home
  </BreadcrumbLink>
  <BreadcrumbLink href="/pessoas">
    <User className="h-4 w-4" />
    Pessoas
  </BreadcrumbLink>
  <BreadcrumbPage>João Silva</BreadcrumbPage>
</Breadcrumbs>

// Com separador customizado
<Breadcrumbs separator="/">
  <BreadcrumbLink href="/">Home</BreadcrumbLink>
  <BreadcrumbLink href="/configuracoes">Configurações</BreadcrumbLink>
  <BreadcrumbPage>Perfil</BreadcrumbPage>
</Breadcrumbs>

// Com variantes
<Breadcrumbs variant="solid" size="lg">
  <BreadcrumbLink href="/">Home</BreadcrumbLink>
  <BreadcrumbPage>Página Atual</BreadcrumbPage>
</Breadcrumbs>

// Com ações
<Breadcrumbs>
  <BreadcrumbLink
    href="/"
    onClick={() => console.log("Navegar")}
  >
    Home
  </BreadcrumbLink>
  <BreadcrumbPage>Atual</BreadcrumbPage>
</Breadcrumbs>`}
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
                <li>• Use breadcrumbs para navegação hierárquica</li>
                <li>• Mantenha o último item como página atual</li>
                <li>• Use ícones para melhor identificação</li>
                <li>• Mantenha consistência visual</li>
                <li>• Teste acessibilidade com screen readers</li>
              </ul>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold text-red-600 mb-2">❌ Evite</h3>
              <ul className="text-sm space-y-1">
                <li>• Usar breadcrumbs para navegação principal</li>
                <li>• Criar breadcrumbs muito longos</li>
                <li>• Usar breadcrumbs em páginas de nível único</li>
                <li>• Ignorar acessibilidade</li>
                <li>• Usar breadcrumbs como menu principal</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
