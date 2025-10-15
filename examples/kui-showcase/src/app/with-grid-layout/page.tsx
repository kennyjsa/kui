"use client";
import {
  Grid,
  GridItem,
  GridContainer,
  ResponsiveGrid,
  MasonryGrid,
  CardGrid,
  StatsGrid,
  FeatureGrid,
  ProductGrid,
  TeamGrid,
  DashboardGrid,
  GridIcons,
} from "@kui-framework/ui";

export default function GridLayoutExample() {

  // Basic Grid Items
  const basicItems = [
    { id: "1", content: "Item 1", className: "bg-blue-100 p-4 rounded" },
    { id: "2", content: "Item 2", className: "bg-green-100 p-4 rounded" },
    { id: "3", content: "Item 3", className: "bg-yellow-100 p-4 rounded" },
    { id: "4", content: "Item 4", className: "bg-red-100 p-4 rounded" },
    { id: "5", content: "Item 5", className: "bg-purple-100 p-4 rounded" },
    { id: "6", content: "Item 6", className: "bg-pink-100 p-4 rounded" },
  ];

  // Card Grid Data
  const cardData = [
    {
      id: "1",
      title: "Card 1",
      description: "Descrição do card 1",
      badge: "Novo",
      price: "R$ 99,90",
      rating: 4.5,
    },
    {
      id: "2",
      title: "Card 2",
      description: "Descrição do card 2",
      badge: "Popular",
      price: "R$ 149,90",
      rating: 4.8,
    },
    {
      id: "3",
      title: "Card 3",
      description: "Descrição do card 3",
      badge: "Oferta",
      price: "R$ 79,90",
      rating: 4.2,
    },
    {
      id: "4",
      title: "Card 4",
      description: "Descrição do card 4",
      price: "R$ 199,90",
      rating: 4.9,
    },
  ];

  // Stats Grid Data
  const statsData = [
    {
      id: "1",
      title: "Total de Vendas",
      value: "R$ 45.678",
      change: { value: 12, type: "increase" as const },
      icon: GridIcons.cart,
      color: "success" as const,
    },
    {
      id: "2",
      title: "Novos Usuários",
      value: "1.234",
      change: { value: 8, type: "increase" as const },
      icon: GridIcons.user,
      color: "primary" as const,
    },
    {
      id: "3",
      title: "Taxa de Conversão",
      value: "3.2%",
      change: { value: 2, type: "decrease" as const },
      icon: GridIcons.star,
      color: "warning" as const,
    },
    {
      id: "4",
      title: "Satisfação",
      value: "4.8/5",
      change: { value: 0, type: "neutral" as const },
      icon: GridIcons.heart,
      color: "success" as const,
    },
  ];

  // Feature Grid Data
  const featuresData = [
    {
      id: "1",
      title: "Rápido",
      description: "Performance otimizada para máxima velocidade",
      icon: GridIcons.clock,
      badge: "Novo",
    },
    {
      id: "2",
      title: "Seguro",
      description: "Proteção avançada para seus dados",
      icon: GridIcons.shield,
      badge: "Recomendado",
    },
    {
      id: "3",
      title: "Fácil",
      description: "Interface intuitiva e simples de usar",
      icon: GridIcons.settings,
      badge: "Popular",
    },
    {
      id: "4",
      title: "Confiável",
      description: "99.9% de tempo de atividade garantido",
      icon: GridIcons.star,
      badge: "Premium",
    },
  ];

  // Product Grid Data
  const productsData = [
    {
      id: "1",
      name: "Produto 1",
      price: "R$ 99,90",
      originalPrice: "R$ 149,90",
      image: "https://via.placeholder.com/300x300",
      rating: 4.5,
      reviews: 128,
      badge: "Oferta",
      onAddToCart: () => console.log("Adicionar ao carrinho 1"),
      onFavorite: () => console.log("Favoritar 1"),
    },
    {
      id: "2",
      name: "Produto 2",
      price: "R$ 199,90",
      image: "https://via.placeholder.com/300x300",
      rating: 4.8,
      reviews: 256,
      badge: "Novo",
      onAddToCart: () => console.log("Adicionar ao carrinho 2"),
      onFavorite: () => console.log("Favoritar 2"),
    },
    {
      id: "3",
      name: "Produto 3",
      price: "R$ 299,90",
      image: "https://via.placeholder.com/300x300",
      rating: 4.2,
      reviews: 89,
      onAddToCart: () => console.log("Adicionar ao carrinho 3"),
      onFavorite: () => console.log("Favoritar 3"),
    },
    {
      id: "4",
      name: "Produto 4",
      price: "R$ 399,90",
      image: "https://via.placeholder.com/300x300",
      rating: 4.9,
      reviews: 512,
      badge: "Popular",
      onAddToCart: () => console.log("Adicionar ao carrinho 4"),
      onFavorite: () => console.log("Favoritar 4"),
    },
  ];

  // Team Grid Data
  const teamData = [
    {
      id: "1",
      name: "João Silva",
      role: "Desenvolvedor Frontend",
      avatar: "https://via.placeholder.com/80x80",
      email: "joao@empresa.com",
      phone: "(11) 99999-9999",
      location: "São Paulo, SP",
      bio: "Especialista em React e TypeScript",
    },
    {
      id: "2",
      name: "Maria Santos",
      role: "Designer UX/UI",
      email: "maria@empresa.com",
      phone: "(11) 88888-8888",
      location: "Rio de Janeiro, RJ",
      bio: "Criativa e apaixonada por design",
    },
    {
      id: "3",
      name: "Pedro Costa",
      role: "Desenvolvedor Backend",
      avatar: "https://via.placeholder.com/80x80",
      email: "pedro@empresa.com",
      phone: "(11) 77777-7777",
      location: "Belo Horizonte, MG",
      bio: "Especialista em Node.js e Python",
    },
    {
      id: "4",
      name: "Ana Oliveira",
      role: "Product Manager",
      email: "ana@empresa.com",
      phone: "(11) 66666-6666",
      location: "Porto Alegre, RS",
      bio: "Estratégica e orientada a resultados",
    },
  ];

  // Dashboard Widgets
  const dashboardWidgets = [
    {
      id: "1",
      title: "Vendas do Mês",
      content: (
        <div className="space-y-2">
          <div className="text-3xl font-bold text-primary">R$ 45.678</div>
          <div className="text-sm text-green-600">+12% vs mês anterior</div>
        </div>
      ),
      colSpan: 6,
    },
    {
      id: "2",
      title: "Novos Usuários",
      content: (
        <div className="space-y-2">
          <div className="text-3xl font-bold text-blue-600">1.234</div>
          <div className="text-sm text-green-600">+8% vs mês anterior</div>
        </div>
      ),
      colSpan: 6,
    },
    {
      id: "3",
      title: "Taxa de Conversão",
      content: (
        <div className="space-y-2">
          <div className="text-3xl font-bold text-yellow-600">3.2%</div>
          <div className="text-sm text-red-600">-2% vs mês anterior</div>
        </div>
      ),
      colSpan: 4,
    },
    {
      id: "4",
      title: "Satisfação",
      content: (
        <div className="space-y-2">
          <div className="text-3xl font-bold text-green-600">4.8/5</div>
          <div className="text-sm text-muted-foreground">Baseado em 1.234 avaliações</div>
        </div>
      ),
      colSpan: 4,
    },
    {
      id: "5",
      title: "Pedidos Pendentes",
      content: (
        <div className="space-y-2">
          <div className="text-3xl font-bold text-orange-600">23</div>
          <div className="text-sm text-muted-foreground">Aguardando processamento</div>
        </div>
      ),
      colSpan: 4,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Grid Layout Responsivo</h1>
        <p className="text-muted-foreground">
          Sistema completo de grid layout responsivo para organizar conteúdo
        </p>
      </div>

      <div className="grid gap-8">
        {/* Basic Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Grid Básico</h2>
          <div className="border rounded-lg p-6">
            <Grid cols={3} gap={4} responsive="sm-md">
              {basicItems.map((item) => (
                <GridItem key={item.id} className={item.className}>
                  {item.content}
                </GridItem>
              ))}
            </Grid>
          </div>
        </div>

        {/* Responsive Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Responsive Grid</h2>
          <div className="border rounded-lg p-6">
            <ResponsiveGrid minItemWidth={200} gap={4}>
              {basicItems.map((item) => (
                <div key={item.id} className={item.className}>
                  {item.content}
                </div>
              ))}
            </ResponsiveGrid>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Masonry Grid</h2>
          <div className="border rounded-lg p-6">
            <MasonryGrid columns={3} gap={4}>
              {basicItems.map((item) => (
                <div key={item.id} className={`${item.className} break-inside-avoid mb-4`}>
                  {item.content}
                </div>
              ))}
            </MasonryGrid>
          </div>
        </div>

        {/* Card Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Card Grid</h2>
          <div className="border rounded-lg p-6">
            <CardGrid cards={cardData} columns={4} gap="md" responsive />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Stats Grid</h2>
          <div className="border rounded-lg p-6">
            <StatsGrid stats={statsData} columns={4} gap="md" responsive />
          </div>
        </div>

        {/* Feature Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Feature Grid</h2>
          <div className="border rounded-lg p-6">
            <FeatureGrid features={featuresData} columns={4} gap="md" responsive />
          </div>
        </div>

        {/* Product Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Product Grid</h2>
          <div className="border rounded-lg p-6">
            <ProductGrid products={productsData} columns={4} gap="md" responsive />
          </div>
        </div>

        {/* Team Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Team Grid</h2>
          <div className="border rounded-lg p-6">
            <TeamGrid members={teamData} columns={4} gap="md" responsive />
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Dashboard Grid</h2>
          <div className="border rounded-lg p-6">
            <DashboardGrid widgets={dashboardWidgets} layout="default" />
          </div>
        </div>

        {/* Grid Container */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Grid Container</h2>
          <div className="border rounded-lg p-6">
            <GridContainer maxWidth="xl" padding="md">
              <Grid cols={3} gap={4}>
                {basicItems.slice(0, 3).map((item) => (
                  <GridItem key={item.id} className={item.className}>
                    {item.content}
                  </GridItem>
                ))}
              </Grid>
            </GridContainer>
          </div>
        </div>

        {/* Código de Exemplo */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Como Usar</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`import {
  Grid,
  GridItem,
  GridContainer,
  ResponsiveGrid,
  MasonryGrid,
  CardGrid,
  StatsGrid,
  FeatureGrid,
  ProductGrid,
  TeamGrid,
  DashboardGrid,
  GridIcons,
  GridPresets
} from "@kui-framework/ui";

// Grid básico
<Grid cols={3} gap={4} responsive="sm-md">
  <GridItem colSpan={2}>Item 1</GridItem>
  <GridItem>Item 2</GridItem>
  <GridItem>Item 3</GridItem>
</Grid>

// Responsive Grid
<ResponsiveGrid minItemWidth={200} gap={4}>
  {items.map(item => <div key={item.id}>{item.content}</div>)}
</ResponsiveGrid>

// Masonry Grid
<MasonryGrid columns={3} gap={4}>
  {items.map(item => <div key={item.id}>{item.content}</div>)}
</MasonryGrid>

// Card Grid
<CardGrid
  cards={cardData}
  columns={4}
  gap="md"
  responsive
/>

// Stats Grid
<StatsGrid
  stats={statsData}
  columns={4}
  gap="md"
  responsive
/>

// Feature Grid
<FeatureGrid
  features={featuresData}
  columns={4}
  gap="md"
  responsive
/>

// Product Grid
<ProductGrid
  products={productsData}
  columns={4}
  gap="md"
  responsive
/>

// Team Grid
<TeamGrid
  members={teamData}
  columns={4}
  gap="md"
  responsive
/>

// Dashboard Grid
<DashboardGrid
  widgets={dashboardWidgets}
  layout="default"
/>

// Grid Container
<GridContainer maxWidth="xl" padding="md">
  <Grid cols={3} gap={4}>
    {/* Grid items */}
  </Grid>
</GridContainer>`}
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
                <li>• Use breakpoints responsivos apropriados</li>
                <li>• Mantenha consistência nos espaçamentos</li>
                <li>• Teste em diferentes tamanhos de tela</li>
                <li>• Use GridContainer para layouts centralizados</li>
                <li>• Aproveite os componentes especializados</li>
              </ul>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold text-red-600 mb-2">❌ Evite</h3>
              <ul className="text-sm space-y-1">
                <li>• Sobrecarregar com muitas colunas</li>
                <li>• Ignorar responsividade</li>
                <li>• Usar grids fixos em mobile</li>
                <li>• Misturar diferentes sistemas de grid</li>
                <li>• Esquecer de testar acessibilidade</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
