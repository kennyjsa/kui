"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { Badge } from "./Badge";
import {
  ChevronDown,
  Lock,
  AlertCircle,
  CheckCircle,
  Info
} from "lucide-react";

const accordionVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "border border-border rounded-lg",
        card: "bg-card border border-border rounded-lg shadow-sm",
        flat: "bg-muted/30 rounded-lg",
        bordered: "border-l-4 border-l-primary",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const accordionItemVariants = cva(
  "border-b border-border last:border-b-0",
  {
    variants: {
      variant: {
        default: "",
        card: "bg-card",
        flat: "bg-muted/30",
        bordered: "border-l-4 border-l-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const accordionTriggerVariants = cva(
  "flex flex-1 items-center justify-between py-4 px-4 font-medium transition-all hover:bg-muted/50 [&[data-state=open]>svg]:rotate-180",
  {
    variants: {
      size: {
        sm: "py-2 px-3 text-sm",
        md: "py-4 px-4 text-base",
        lg: "py-6 px-6 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const accordionContentVariants = cva(
  "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
  {
    variants: {
      size: {
        sm: "px-3 pb-2",
        md: "px-4 pb-4",
        lg: "px-6 pb-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  description?: string;
  disabled?: boolean;
  badge?: string | number;
  icon?: React.ReactNode;
  status?: "default" | "success" | "warning" | "error" | "info";
  defaultOpen?: boolean;
}

export interface AccordionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionVariants> {
  items: AccordionItem[];
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  collapsible?: boolean;
  className?: string;
}

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(({
  className,
  variant = "default",
  size = "md",
  items,
  type = "single",
  defaultValue,
  value,
  onValueChange,
  collapsible = true,
  ...props
}, ref) => {
  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "info":
        return <Info className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  if (type === "single") {
    const { dir, ...singleProps } = props;
    return (
      <AccordionPrimitive.Root
        ref={ref}
        type="single"
        collapsible={collapsible}
        defaultValue={defaultValue as string}
        value={value as string}
        onValueChange={onValueChange as (value: string) => void}
        className={cn(accordionVariants({ variant, size }), className)}
        {...singleProps}
      >
        {items.map((item) => (
          <AccordionItem key={item.id} value={item.id} variant={variant}>
            <AccordionTrigger
              size={size}
              disabled={item.disabled}
              className="w-full text-left"
            >
              <div className="flex items-center gap-3 flex-1">
                {item.icon && (
                  <div className="flex-shrink-0">
                    {item.icon}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    {getStatusIcon(item.status)}
                  </div>
                  {item.description && (
                    <p className="text-sm text-muted-foreground mt-1 truncate">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {item.disabled && (
                  <Lock className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </AccordionTrigger>

            <AccordionContent size={size}>
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </AccordionPrimitive.Root>
    );
  }

  const { dir, ...multipleProps } = props;
  return (
    <AccordionPrimitive.Root
      ref={ref}
      type="multiple"
      defaultValue={defaultValue as string[]}
      value={value as string[]}
      onValueChange={onValueChange as (value: string[]) => void}
      className={cn(accordionVariants({ variant, size }), className)}
      {...multipleProps}
    >
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id} variant={variant}>
          <AccordionTrigger
            size={size}
            disabled={item.disabled}
            className="w-full text-left"
          >
            <div className="flex items-center gap-3 flex-1">
              {item.icon && (
                <div className="flex-shrink-0">
                  {item.icon}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium truncate">{item.title}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                  {getStatusIcon(item.status)}
                </div>
                {item.description && (
                  <p className="text-sm text-muted-foreground mt-1 truncate">
                    {item.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {item.disabled && (
                <Lock className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </AccordionTrigger>

          <AccordionContent size={size}>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionPrimitive.Root>
  );
});

Accordion.displayName = "Accordion";

// AccordionItem - Para uso manual
export interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
  variant?: VariantProps<typeof accordionItemVariants>["variant"];
}

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, variant, children, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(accordionItemVariants({ variant }), className)}
    {...props}
  >
    {children}
  </AccordionPrimitive.Item>
));

AccordionItem.displayName = "AccordionItem";

// AccordionTrigger - Para uso manual
export interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  size?: VariantProps<typeof accordionTriggerVariants>["size"];
}

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, size, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(accordionTriggerVariants({ size }), className)}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));

AccordionTrigger.displayName = "AccordionTrigger";

// AccordionContent - Para uso manual
export interface AccordionContentProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
  size?: VariantProps<typeof accordionContentVariants>["size"];
}

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, children, size, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(accordionContentVariants({ size }), className)}
    {...props}
  >
    {children}
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = "AccordionContent";

// Collapsible - Versão simplificada usando Radix UI
export interface CollapsibleProps extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root> {
  title: string;
  description?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
  badge?: string | number;
  icon?: React.ReactNode;
  status?: "default" | "success" | "warning" | "error" | "info";
  variant?: "default" | "card" | "flat" | "bordered";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Collapsible = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  CollapsibleProps
>(({
  className,
  title,
  description,
  children,
  defaultOpen = false,
  disabled = false,
  badge,
  icon,
  status,
  variant = "default",
  size = "md",
  ...props
}, ref) => {
  const [open, setOpen] = React.useState(defaultOpen);

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "info":
        return <Info className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <CollapsiblePrimitive.Root
      ref={ref}
      open={open}
      onOpenChange={setOpen}
      className={cn(accordionVariants({ variant, size }), className)}
      {...props}
    >
      <div className={cn(accordionItemVariants({ variant }))}>
        <CollapsiblePrimitive.Trigger
          disabled={disabled}
          className={cn(
            accordionTriggerVariants({ size }),
            disabled && "opacity-50 cursor-not-allowed",
            "w-full text-left"
          )}
        >
          <div className="flex items-center gap-3 flex-1">
            {icon && (
              <div className="flex-shrink-0">
                {icon}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium truncate">{title}</span>
                {badge && (
                  <Badge variant="secondary" className="text-xs">
                    {badge}
                  </Badge>
                )}
                {getStatusIcon(status)}
              </div>
              {description && (
                <p className="text-sm text-muted-foreground mt-1 truncate">
                  {description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {disabled && (
              <Lock className="h-4 w-4 text-muted-foreground" />
            )}
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform duration-200",
              open && "rotate-180"
            )} />
          </div>
        </CollapsiblePrimitive.Trigger>

        <CollapsiblePrimitive.Content className={cn(accordionContentVariants({ size }))}>
          {children}
        </CollapsiblePrimitive.Content>
      </div>
    </CollapsiblePrimitive.Root>
  );
});

Collapsible.displayName = "Collapsible";

export {
  Accordion,
  accordionVariants,
  accordionItemVariants,
  accordionTriggerVariants,
  accordionContentVariants
};
