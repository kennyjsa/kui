"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { Button } from "./Button";
import { Badge } from "./Badge";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Plus
} from "lucide-react";

const tabsVariants = cva(
  "flex",
  {
    variants: {
      variant: {
        default: "border-b border-border",
        card: "bg-muted/30 rounded-lg p-1",
        underline: "border-b-2 border-primary",
        pills: "bg-muted/30 rounded-lg p-1",
      },
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      orientation: "horizontal",
      size: "md",
    },
  }
);

const tabVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-b-2 border-transparent hover:border-muted-foreground/50 data-[state=active]:border-primary data-[state=active]:text-primary",
        card: "hover:bg-background data-[state=active]:bg-background data-[state=active]:shadow-sm",
        underline: "border-b-2 border-transparent hover:border-muted-foreground/50 data-[state=active]:border-primary data-[state=active]:text-primary",
        pills: "hover:bg-background data-[state=active]:bg-background data-[state=active]:shadow-sm",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
  icon?: React.ReactNode;
  closable?: boolean;
}

export interface TabsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsVariants> {
  items: TabItem[];
  defaultActiveTab?: string;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  onTabClose?: (tabId: string) => void;
  onTabAdd?: () => void;
  scrollable?: boolean;
  showAddButton?: boolean;
  showCloseButtons?: boolean;
  className?: string;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({
    className,
    variant = "default",
    orientation = "horizontal",
    size = "md",
    items,
    defaultActiveTab,
    activeTab,
    onTabChange,
    onTabClose,
    onTabAdd,
    scrollable = false,
    showAddButton = false,
    showCloseButtons = false,
    ...props
  }, ref) => {
    const [internalActiveTab, setInternalActiveTab] = React.useState(
      defaultActiveTab || items[0]?.id || ""
    );

    const currentActiveTab = activeTab !== undefined ? activeTab : internalActiveTab;

    const handleTabChange = (tabId: string) => {
      if (activeTab === undefined) {
        setInternalActiveTab(tabId);
      }
      onTabChange?.(tabId);
    };

    const handleTabClose = (tabId: string, e: React.MouseEvent) => {
      e.stopPropagation();
      onTabClose?.(tabId);
    };

    const activeTabContent = items.find(item => item.id === currentActiveTab)?.content;

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {/* Tab List */}
        <div
          className={cn(
            tabsVariants({ variant, orientation, size }),
            scrollable && "overflow-x-auto scrollbar-hide"
          )}
        >
          <div className={cn(
            "flex",
            orientation === "vertical" ? "flex-col" : "flex-row",
            scrollable && "min-w-max"
          )}>
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => !item.disabled && handleTabChange(item.id)}
                disabled={item.disabled}
                data-state={currentActiveTab === item.id ? "active" : "inactive"}
                className={cn(
                  tabVariants({ variant, size }),
                  item.disabled && "opacity-50 cursor-not-allowed",
                  "relative group"
                )}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </div>

                {/* Close Button */}
                {showCloseButtons && item.closable && (
                  <button
                    onClick={(e) => handleTabClose(item.id, e)}
                    className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </button>
            ))}

            {/* Add Button */}
            {showAddButton && onTabAdd && (
              <button
                onClick={onTabAdd}
                className={cn(
                  tabVariants({ variant, size }),
                  "text-muted-foreground hover:text-foreground"
                )}
              >
                <Plus className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tab Content */}
        {activeTabContent && (
          <div className="mt-4">
            {activeTabContent}
          </div>
        )}
      </div>
    );
  }
);

Tabs.displayName = "Tabs";

// TabContent - Para uso manual
export interface TabContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

export const TabContent = React.forwardRef<HTMLDivElement, TabContentProps>(
  ({ className, value, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mt-4", className)}
        data-tab-content={value}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabContent.displayName = "TabContent";

// TabList - Para uso manual
export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const TabList = React.forwardRef<HTMLDivElement, TabListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex border-b border-border", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabList.displayName = "TabList";

// TabTrigger - Para uso manual
export interface TabTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  active?: boolean;
  badge?: string | number;
  icon?: React.ReactNode;
}

export const TabTrigger = React.forwardRef<HTMLButtonElement, TabTriggerProps>(
  ({ className, value, active, badge, icon, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        data-state={active ? "active" : "inactive"}
        className={cn(
          tabVariants({ variant: "default", size: "md" }),
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span>{children}</span>
          {badge && (
            <Badge variant="secondary" className="text-xs">
              {badge}
            </Badge>
          )}
        </div>
      </button>
    );
  }
);

TabTrigger.displayName = "TabTrigger";

// ScrollableTabs - Tabs com scroll
export interface ScrollableTabsProps extends Omit<TabsProps, 'scrollable'> {
  showScrollButtons?: boolean;
}

export const ScrollableTabs = React.forwardRef<HTMLDivElement, ScrollableTabsProps>(
  ({ showScrollButtons = true, ...props }, ref) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(false);

    const checkScrollability = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
      }
    };

    React.useEffect(() => {
      checkScrollability();
      const scrollElement = scrollRef.current;
      if (scrollElement) {
        scrollElement.addEventListener('scroll', checkScrollability);
        return () => scrollElement.removeEventListener('scroll', checkScrollability);
      }
      return undefined;
    }, [props.items]);

    const scroll = (direction: 'left' | 'right') => {
      if (scrollRef.current) {
        const scrollAmount = 200;
        scrollRef.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
        });
      }
    };

    return (
      <div className="relative">
        {showScrollButtons && canScrollLeft && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}

        <Tabs
          ref={ref}
          scrollable
          {...props}
        />

        {showScrollButtons && canScrollRight && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }
);

ScrollableTabs.displayName = "ScrollableTabs";

export { Tabs, tabsVariants, tabVariants };
