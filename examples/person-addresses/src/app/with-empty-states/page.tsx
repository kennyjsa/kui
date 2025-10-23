"use client";

import {
  EmptyState,
  EmptyStateIcons,
} from "@kui-framework/ui";

export default function EmptyStatesExample() {

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Empty States</h1>
        <p className="text-muted-foreground">
          Componentes para exibir estados vazios de forma elegante e útil
        </p>
      </div>

      <div className="grid gap-8">
        {/* Empty State Básico */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Empty State Básico</h2>
          <div className="border rounded-lg p-4">
            <EmptyState
              title="Nenhum conteúdo"
              description="Este é um exemplo de empty state básico."
              action={{
                label: "Adicionar Item",
                onClick: () => console.log("Adicionar item")
              }}
            />
          </div>
        </div>

        {/* Empty States com Ícones */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Empty States com Ícones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <EmptyState
                icon={EmptyStateIcons.database}
                title="Nenhum registro"
                description="Não há dados para exibir no momento."
                action={{
                  label: "Criar Registro",
                  onClick: () => console.log("Criar registro")
                }}
              />
            </div>
            <div className="border rounded-lg p-4">
              <EmptyState
                icon={EmptyStateIcons.search}
                title="Nenhum resultado"
                description="Tente ajustar os filtros de busca."
                action={{
                  label: "Limpar Filtros",
                  onClick: () => console.log("Limpar filtros")
                }}
                secondaryAction={{
                  label: "Nova Busca",
                  onClick: () => console.log("Nova busca"),
                  variant: "outline"
                }}
              />
            </div>
            <div className="border rounded-lg p-4">
              <EmptyState
                icon={EmptyStateIcons.users}
                title="Nenhum usuário"
                description="Convide pessoas para começar a colaborar."
                action={{
                  label: "Convidar Usuários",
                  onClick: () => console.log("Convidar usuários")
                }}
              />
            </div>
            <div className="border rounded-lg p-4">
              <EmptyState
                icon={EmptyStateIcons.package}
                title="Catálogo vazio"
                description="Adicione produtos para começar a vender."
                action={{
                  label: "Adicionar Produto",
                  onClick: () => console.log("Adicionar produto")
                }}
              />
            </div>
            <div className="border rounded-lg p-4">
              <EmptyState
                icon={EmptyStateIcons.cart}
                title="Nenhum pedido"
                description="Os pedidos aparecerão aqui quando forem criados."
                action={{
                  label: "Novo Pedido",
                  onClick: () => console.log("Novo pedido")
                }}
              />
            </div>
            <div className="border rounded-lg p-4">
              <EmptyState
                icon={EmptyStateIcons.calendar}
                title="Nenhum evento"
                description="Crie eventos para organizar sua agenda."
                action={{
                  label: "Criar Evento",
                  onClick: () => console.log("Criar evento")
                }}
              />
            </div>
          </div>
        </div>

        {/* Empty States com Variantes */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Empty States com Variantes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <EmptyState
                icon={EmptyStateIcons.error}
                title="Erro de conexão"
                description="Não foi possível carregar os dados."
                variant="error"
                action={{
                  label: "Tentar Novamente",
                  onClick: () => console.log("Tentar novamente")
                }}
                secondaryAction={{
                  label: "Suporte",
                  onClick: () => console.log("Suporte"),
                  variant: "outline"
                }}
              />
            </div>
            <div className="border rounded-lg p-4">
              <EmptyState
                icon={EmptyStateIcons.upload}
                title="Nenhum arquivo"
                description="Faça upload de arquivos para começar."
                variant="primary"
                action={{
                  label: "Fazer Upload",
                  onClick: () => console.log("Upload")
                }}
              />
            </div>
          </div>
        </div>

        {/* Empty States com Tamanhos */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Empty States com Tamanhos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <EmptyState
                icon={EmptyStateIcons.file}
                title="Pequeno"
                description="Empty state compacto."
                size="sm"
                simple
              />
            </div>
            <div className="border rounded-lg p-4">
              <EmptyState
                icon={EmptyStateIcons.database}
                title="Médio"
                description="Empty state padrão."
                size="md"
              />
            </div>
            <div className="border rounded-lg p-4">
              <EmptyState
                icon={EmptyStateIcons.image}
                title="Grande"
                description="Empty state espaçoso."
                size="lg"
              />
            </div>
          </div>
        </div>

        {/* Empty States Customizados */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Empty States Customizados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <EmptyState
                title="Configuração necessária"
                description="Configure suas preferências para começar a usar o sistema."
                action={{
                  label: "Configurar",
                  onClick: () => console.log("Configurar")
                }}
                secondaryAction={{
                  label: "Pular por agora",
                  onClick: () => console.log("Pular"),
                  variant: "outline"
                }}
                size="lg"
              />
            </div>
            <div className="border rounded-lg p-4">
              <EmptyState
                title="Acesso restrito"
                description="Você não tem permissão para visualizar este conteúdo."
                action={{
                  label: "Solicitar Acesso",
                  onClick: () => console.log("Solicitar acesso"),
                  variant: "outline"
                }}
                variant="muted"
                size="sm"
              />
            </div>
          </div>
        </div>

        {/* Código de Exemplo */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Como Usar</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`import { EmptyState, EmptyStateIcons } from "@kui-framework/ui";

// Empty State básico
<EmptyState
  title="Nenhum item"
  description="Adicione itens para começar."
  action={{ label: "Adicionar", onClick: handleAdd }}
/>

// Empty State com ícone
<EmptyState
  icon={EmptyStateIcons.database}
  title="Nenhum registro"
  description="Não há dados para exibir."
  action={{ label: "Criar Registro", onClick: handleCreate }}
/>

// Empty State com duas ações
<EmptyState
  icon={EmptyStateIcons.search}
  title="Nenhum resultado"
  description="Tente ajustar os filtros."
  action={{ label: "Limpar Filtros", onClick: handleClear }}
  secondaryAction={{ label: "Nova Busca", onClick: handleNewSearch, variant: "outline" }}
/>

// Empty State com variante de erro
<EmptyState
  icon={EmptyStateIcons.error}
  title="Erro de conexão"
  description="Não foi possível carregar os dados."
  variant="error"
  action={{ label: "Tentar Novamente", onClick: handleRetry }}
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
                <li>• Use títulos claros e descritivos</li>
                <li>• Forneça ações contextuais</li>
                <li>• Use ícones apropriados</li>
                <li>• Mantenha consistência visual</li>
                <li>• Seja específico ao domínio</li>
              </ul>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold text-red-600 mb-2">❌ Evite</h3>
              <ul className="text-sm space-y-1">
                <li>• Mensagens genéricas demais</li>
                <li>• Muitas ações simultâneas</li>
                <li>• Ícones confusos</li>
                <li>• Texto muito longo</li>
                <li>• Falta de contexto</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
