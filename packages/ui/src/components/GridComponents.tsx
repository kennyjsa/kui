"use client";

import * as React from "react";
import { cn } from "../lib/utils";
// Grid components are used in the component implementations
import { Card } from "./Card";
import { Button } from "./Button";
import { Badge } from "./Badge";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Star,
  Heart,
  ShoppingCart,
  Package,
  Truck,
  CreditCard,
  Shield,
  Bell,
  Settings
} from "lucide-react";

// Card Grid - Grid para cards
export interface CardGridProps {
  cards: CardItem[];
  columns?: number;
  gap?: "sm" | "md" | "lg";
  responsive?: boolean;
  className?: string;
}

export interface CardItem {
  id: string;
  title: string;
  description?: string;
  image?: string;
  badge?: string;
  price?: string;
  rating?: number;
  onClick?: () => void;
}

export function CardGrid({ cards, gap = "md", responsive = true, className }: CardGridProps) {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  const responsiveClasses = responsive ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "";

  return (
    <div className={cn("grid grid-cols-1", gapClasses[gap], responsiveClasses, className)}>
      {cards.map((card) => (
        <Card key={card.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={card.onClick}>
          {card.image && (
            <div className="aspect-video bg-muted rounded-md mb-4 overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{card.title}</h3>
              {card.badge && (
                <Badge variant="secondary">{card.badge}</Badge>
              )}
            </div>
            {card.description && (
              <p className="text-sm text-muted-foreground">{card.description}</p>
            )}
            {card.price && (
              <p className="font-semibold text-primary">{card.price}</p>
            )}
            {card.rating && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{card.rating}</span>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}

// Stats Grid - Grid para estatísticas
export interface StatsGridProps {
  stats: StatItem[];
  columns?: number;
  gap?: "sm" | "md" | "lg";
  responsive?: boolean;
  className?: string;
}

export interface StatItem {
  id: string;
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: "increase" | "decrease" | "neutral";
  };
  icon?: React.ReactNode;
  color?: "default" | "primary" | "success" | "warning" | "error";
}

export function StatsGrid({ stats, gap = "md", responsive = true, className }: StatsGridProps) {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  const responsiveClasses = responsive ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "";

  const colorClasses = {
    default: "text-foreground",
    primary: "text-primary",
    success: "text-green-600",
    warning: "text-yellow-600",
    error: "text-red-600",
  };

  return (
    <div className={cn("grid grid-cols-1", gapClasses[gap], responsiveClasses, className)}>
      {stats.map((stat) => (
        <Card key={stat.id} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className={cn("text-2xl font-bold", colorClasses[stat.color || "default"])}>
                {stat.value}
              </p>
              {stat.change && (
                <p className={cn(
                  "text-sm",
                  stat.change.type === "increase" ? "text-green-600" :
                  stat.change.type === "decrease" ? "text-red-600" :
                  "text-muted-foreground"
                )}>
                  {stat.change.type === "increase" ? "+" : stat.change.type === "decrease" ? "-" : ""}
                  {Math.abs(stat.change.value)}%
                </p>
              )}
            </div>
            {stat.icon && (
              <div className={cn("p-2 rounded-lg", colorClasses[stat.color || "default"])}>
                {stat.icon}
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}

// Feature Grid - Grid para features
export interface FeatureGridProps {
  features: FeatureItem[];
  columns?: number;
  gap?: "sm" | "md" | "lg";
  responsive?: boolean;
  className?: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  badge?: string;
}

export function FeatureGrid({ features, gap = "md", responsive = true, className }: FeatureGridProps) {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  const responsiveClasses = responsive ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "";

  return (
    <div className={cn("grid grid-cols-1", gapClasses[gap], responsiveClasses, className)}>
      {features.map((feature) => (
        <div key={feature.id} className="text-center space-y-4">
          {feature.icon && (
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              {feature.icon}
            </div>
          )}
          <div>
            <h3 className="font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
          {feature.badge && (
            <Badge variant="outline">{feature.badge}</Badge>
          )}
        </div>
      ))}
    </div>
  );
}

// Product Grid - Grid para produtos
export interface ProductGridProps {
  products: ProductItem[];
  columns?: number;
  gap?: "sm" | "md" | "lg";
  responsive?: boolean;
  className?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  image?: string;
  rating?: number;
  reviews?: number;
  badge?: string;
  onAddToCart?: () => void;
  onFavorite?: () => void;
}

export function ProductGrid({ products, gap = "md", responsive = true, className }: ProductGridProps) {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  const responsiveClasses = responsive ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "";

  return (
    <div className={cn("grid grid-cols-1", gapClasses[gap], responsiveClasses, className)}>
      {products.map((product) => (
        <Card key={product.id} className="p-4 hover:shadow-md transition-shadow">
          <div className="space-y-4">
            {product.image && (
              <div className="aspect-square bg-muted rounded-md overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{product.name}</h3>
                {product.badge && (
                  <Badge variant="secondary">{product.badge}</Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>
              {product.rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{product.rating}</span>
                  {product.reviews && (
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  )}
                </div>
              )}
              <div className="flex gap-2">
                <Button size="sm" className="flex-1" onClick={product.onAddToCart}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Adicionar
                </Button>
                <Button size="sm" variant="outline" onClick={product.onFavorite}>
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// Team Grid - Grid para equipe
export interface TeamGridProps {
  members: TeamMember[];
  columns?: number;
  gap?: "sm" | "md" | "lg";
  responsive?: boolean;
  className?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  email?: string;
  phone?: string;
  location?: string;
  bio?: string;
}

export function TeamGrid({ members, gap = "md", responsive = true, className }: TeamGridProps) {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  const responsiveClasses = responsive ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "";

  return (
    <div className={cn("grid grid-cols-1", gapClasses[gap], responsiveClasses, className)}>
      {members.map((member) => (
        <Card key={member.id} className="p-6 text-center">
          <div className="space-y-4">
            {member.avatar ? (
              <img
                src={member.avatar}
                alt={member.name}
                className="w-20 h-20 rounded-full mx-auto object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-muted mx-auto flex items-center justify-center">
                <User className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
            <div>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
            {member.bio && (
              <p className="text-sm text-muted-foreground">{member.bio}</p>
            )}
            <div className="flex justify-center gap-2">
              {member.email && (
                <Button size="sm" variant="outline">
                  <Mail className="h-4 w-4" />
                </Button>
              )}
              {member.phone && (
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4" />
                </Button>
              )}
              {member.location && (
                <Button size="sm" variant="outline">
                  <MapPin className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// Dashboard Grid - Grid para dashboard
export interface DashboardGridProps {
  widgets: DashboardWidget[];
  layout?: "default" | "compact" | "spacious";
  className?: string;
}

export interface DashboardWidget {
  id: string;
  title: string;
  content: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  className?: string;
}

export function DashboardGrid({ widgets, layout = "default", className }: DashboardGridProps) {
  const layoutClasses = {
    default: "gap-4",
    compact: "gap-2",
    spacious: "gap-6",
  };

  return (
    <div className={cn("grid grid-cols-12", layoutClasses[layout], className)}>
      {widgets.map((widget) => (
        <Card
          key={widget.id}
          className={cn(
            "p-4",
            widget.colSpan ? `col-span-${widget.colSpan}` : "col-span-12",
            widget.rowSpan ? `row-span-${widget.rowSpan}` : "",
            widget.className
          )}
        >
          <h3 className="font-semibold mb-4">{widget.title}</h3>
          {widget.content}
        </Card>
      ))}
    </div>
  );
}

// Grid Icons
export const GridIcons = {
  user: <User className="h-6 w-6" />,
  mail: <Mail className="h-6 w-6" />,
  phone: <Phone className="h-6 w-6" />,
  location: <MapPin className="h-6 w-6" />,
  calendar: <Calendar className="h-6 w-6" />,
  clock: <Clock className="h-6 w-6" />,
  star: <Star className="h-6 w-6" />,
  heart: <Heart className="h-6 w-6" />,
  cart: <ShoppingCart className="h-6 w-6" />,
  package: <Package className="h-6 w-6" />,
  truck: <Truck className="h-6 w-6" />,
  card: <CreditCard className="h-6 w-6" />,
  shield: <Shield className="h-6 w-6" />,
  bell: <Bell className="h-6 w-6" />,
  settings: <Settings className="h-6 w-6" />,
};

// Grid Presets
export const GridPresets = {
  // Layouts comuns
  "1-col": { cols: 1, responsive: "none" },
  "2-col": { cols: 2, responsive: "sm" },
  "3-col": { cols: 3, responsive: "md" },
  "4-col": { cols: 4, responsive: "lg" },
  "6-col": { cols: 6, responsive: "xl" },

  // Layouts responsivos
  "responsive-2": { cols: 1, responsive: "sm" },
  "responsive-3": { cols: 1, responsive: "sm-md" },
  "responsive-4": { cols: 1, responsive: "sm-lg" },
  "responsive-6": { cols: 1, responsive: "sm-xl" },

  // Layouts automáticos
  "auto": { cols: "auto", responsive: "none" },
  "auto-sm": { cols: "auto-sm", responsive: "none" },
  "auto-lg": { cols: "auto-lg", responsive: "none" },
} as const;
