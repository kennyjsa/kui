"use client";

import {
  Section,
  SectionGroup,
} from "@kui-framework/ui";

export default function SectionsExample() {

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Sections</h1>
        <p className="text-muted-foreground">
          Componentes para agrupar campos e organizar formulários
        </p>
      </div>

      <div className="grid gap-8">
        {/* Section Básica */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Section Básica</h2>
          <div className="border rounded-lg p-6">
            <Section title="Dados Pessoais" description="Informações básicas do usuário">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Digite seu nome"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">E-mail</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Digite seu e-mail"
                  />
                </div>
              </div>
            </Section>
          </div>
        </div>

        {/* Section com Variantes */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Section com Variantes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <Section title="Card Style" variant="card">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Campo 1</label>
                  <input type="text" className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Campo 2</label>
                  <input type="text" className="w-full px-3 py-2 border rounded-md" />
                </div>
              </Section>
            </div>
            <div className="border rounded-lg p-4">
              <Section title="Flat Style" variant="flat">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Campo 1</label>
                  <input type="text" className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Campo 2</label>
                  <input type="text" className="w-full px-3 py-2 border rounded-md" />
                </div>
              </Section>
            </div>
            <div className="border rounded-lg p-4">
              <Section title="Bordered Style" variant="bordered">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Campo 1</label>
                  <input type="text" className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Campo 2</label>
                  <input type="text" className="w-full px-3 py-2 border rounded-md" />
                </div>
              </Section>
            </div>
            <div className="border rounded-lg p-4">
              <Section title="Default Style" variant="default">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Campo 1</label>
                  <input type="text" className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Campo 2</label>
                  <input type="text" className="w-full px-3 py-2 border rounded-md" />
                </div>
              </Section>
            </div>
          </div>
        </div>

        {/* Section Collapsible */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Section Collapsible</h2>
          <div className="border rounded-lg p-6">
            <SectionGroup>
              <Section
                title="Informações Básicas"
                description="Dados pessoais do usuário"
                collapsible
                defaultCollapsed={false}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome Completo</label>
                    <input type="text" className="w-full px-3 py-2 border rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">CPF</label>
                    <input type="text" className="w-full px-3 py-2 border rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Data de Nascimento</label>
                    <input type="date" className="w-full px-3 py-2 border rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Telefone</label>
                    <input type="tel" className="w-full px-3 py-2 border rounded-md" />
                  </div>
                </div>
              </Section>

              <Section
                title="Endereço"
                description="Informações de localização"
                collapsible
                defaultCollapsed={true}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bairro</label>
                    <input type="text" className="w-full px-3 py-2 border rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Cidade</label>
                    <input type="text" className="w-full px-3 py-2 border rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Estado</label>
                    <select className="w-full px-3 py-2 border rounded-md">
                      <option>Selecione</option>
                      <option>SP</option>
                      <option>RJ</option>
                      <option>MG</option>
                    </select>
                  </div>
                </div>
              </Section>

              <Section
                title="Informações Adicionais"
                description="Dados opcionais e observações"
                collapsible
                defaultCollapsed={true}
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Observações</label>
                    <textarea
                      className="w-full px-3 py-2 border rounded-md h-24"
                      placeholder="Digite observações adicionais..."
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span className="text-sm">Aceito os termos de uso</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span className="text-sm">Desejo receber notificações</span>
                    </label>
                  </div>
                </div>
              </Section>
            </SectionGroup>
          </div>
        </div>

        {/* Section com Tamanhos */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Section com Tamanhos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <Section title="Pequeno" spacing="sm">
                <div className="space-y-2">
                  <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="Campo 1" />
                  <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="Campo 2" />
                </div>
              </Section>
            </div>
            <div className="border rounded-lg p-4">
              <Section title="Médio" spacing="md">
                <div className="space-y-4">
                  <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="Campo 1" />
                  <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="Campo 2" />
                </div>
              </Section>
            </div>
            <div className="border rounded-lg p-4">
              <Section title="Grande" spacing="lg">
                <div className="space-y-6">
                  <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="Campo 1" />
                  <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="Campo 2" />
                </div>
              </Section>
            </div>
          </div>
        </div>

        {/* SectionGroup Example */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">SectionGroup Example</h2>
          <div className="border rounded-lg p-6">
            <SectionGroup>
              <Section
                title="Dados Pessoais"
                description="Informações básicas"
                variant="card"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome</label>
                    <input type="text" className="w-full px-3 py-2 border rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">E-mail</label>
                    <input type="email" className="w-full px-3 py-2 border rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Telefone</label>
                    <input type="tel" className="w-full px-3 py-2 border rounded-md" />
                  </div>
                </div>
              </Section>

              <Section
                title="Endereço"
                description="Informações de localização"
                variant="flat"
              >
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
              </Section>
            </SectionGroup>
          </div>
        </div>

        {/* Modo Declarativo */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Modo Declarativo (Schema)</h2>
          <div className="border rounded-lg p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Exemplo de Schema com Sections</h3>
              <p className="text-sm text-muted-foreground">
                As sections podem ser definidas diretamente no schema usando metadata
              </p>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <pre className="text-sm">
{`// Exemplo de schema com sections
const userSchema = zKUI.object({
  // Section: Dados Pessoais
  nome: zKUI.text("Nome", {
    section: {
      title: "Dados Pessoais",
      description: "Informações básicas",
      variant: "card"
    }
  }),
  email: zKUI.email("E-mail", {
    section: { title: "Dados Pessoais" }
  }),

  // Section: Endereço
  cep: zKUI.text("CEP", {
    section: {
      title: "Endereço",
      description: "Informações de localização",
      collapsible: true,
      defaultCollapsed: true
    }
  }),
  rua: zKUI.text("Rua", {
    section: { title: "Endereço" }
  }),
});`}
              </pre>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Dados Pessoais</h4>
                <div className="space-y-2">
                  <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="Nome" />
                  <input type="email" className="w-full px-3 py-2 border rounded-md" placeholder="E-mail" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Endereço</h4>
                <div className="space-y-2">
                  <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="CEP" />
                  <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="Rua" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Código de Exemplo */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Como Usar</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`import { Section, SectionGroup } from "@kui-framework/ui";

// Section básica
<Section title="Dados Pessoais" description="Informações básicas">
  {/* Campos aqui */}
</Section>

// Section com variantes
<Section title="Card Style" variant="card">
  {/* Campos aqui */}
</Section>

// Section collapsible
<Section
  title="Endereço"
  collapsible
  defaultCollapsed={true}
>
  {/* Campos aqui */}
</Section>

// SectionGroup para organizar múltiplas seções
<SectionGroup>
  <Section title="Seção 1">...</Section>
  <Section title="Seção 2">...</Section>
</SectionGroup>

// Modo Declarativo com zKUI.section() (FUTURO)
const userSchema = zKUI.object({
  // Section: Dados Pessoais
  ...zKUI.section("Dados Pessoais", {
    title: "Dados Pessoais",
    description: "Informações básicas do usuário",
    variant: "card",
    collapsible: true,
    defaultCollapsed: false
  }, {
    nome: zKUI.text("Nome"),
    email: zKUI.email("E-mail"),
    telefone: zKUI.text("Telefone")
  }),

  // Section: Endereço
  ...zKUI.section("Endereço", {
    title: "Endereço",
    description: "Informações de localização",
    variant: "flat",
    collapsible: true,
    defaultCollapsed: true
  }, {
    cep: zKUI.text("CEP"),
    rua: zKUI.text("Rua"),
    cidade: zKUI.text("Cidade"),
    estado: zKUI.select("Estado", { choices: estados })
  })
});`}
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
                <li>• Agrupe campos relacionados logicamente</li>
                <li>• Use seções collapsible para formulários longos</li>
                <li>• Mantenha consistência visual</li>
                <li>• Use descrições para orientar o usuário</li>
              </ul>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold text-red-600 mb-2">❌ Evite</h3>
              <ul className="text-sm space-y-1">
                <li>• Muitas seções pequenas</li>
                <li>• Títulos genéricos demais</li>
                <li>• Seções muito longas</li>
                <li>• Inconsistência de variantes</li>
                <li>• Falta de hierarquia visual</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
