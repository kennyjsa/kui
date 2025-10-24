// Utilities
export { cn } from "./lib/utils";

// Components
export { Button, buttonVariants } from "./components/Button";
export type { ButtonProps } from "./components/Button";

export { Input } from "./components/Input";
export type { InputProps } from "./components/Input";

export { MaskedInput } from "./components/MaskedInput";
export type { MaskedInputProps } from "./components/MaskedInput";

export { Textarea } from "./components/Textarea";
export type { TextareaProps } from "./components/Textarea";

export { CurrencyInput } from "./components/CurrencyInput";
export type { CurrencyInputProps } from "./components/CurrencyInput";

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "./components/Select";

export { Label } from "./components/Label";

export { Checkbox } from "./components/Checkbox";

export { RadioGroup, RadioGroupItem } from "./components/RadioGroup";

export { Switch } from "./components/Switch";

export { Rating } from "./components/Rating";
export type { RatingProps } from "./components/Rating";

export { ColorPicker } from "./components/ColorPicker";
export type { ColorPickerProps } from "./components/ColorPicker";

export { FileUpload } from "./components/FileUpload";
export type { FileUploadProps } from "./components/FileUpload";

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./components/Dialog";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./components/Card";

export { Badge, badgeVariants } from "./components/Badge";
export type { BadgeProps } from "./components/Badge";

export { SimplePagination } from "./components/SimplePagination";
export type { SimplePaginationProps } from "./components/SimplePagination";

export { Skeleton, type SkeletonProps } from "./components/Skeleton";

export { ErrorBoundary } from "./components/ErrorBoundary";

// Toast System
export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  type ToastProps,
} from "./components/toast/Toaster";

export { useToast } from "./components/toast/ToastProvider";
export type { ToastAPI, ToastOptions, ToastVariant } from "./components/toast/types";

// Dialog System
export { DialogProvider, useDialog } from "./components/dialog/DialogProvider";
export { AlertDialog } from "./components/dialog/AlertDialog";
export { ConfirmDialog } from "./components/dialog/ConfirmDialog";
export { OptionsDialog } from "./components/dialog/OptionsDialog";
export type {
  DialogAPI,
  AlertOptions,
  ConfirmOptions,
  OptionsOptions,
  DialogVariant,
  DialogChoice,
} from "./components/dialog/types";

// Legacy Dialog Components (mantidos para compatibilidade)
export { FormDialog, type FormDialogProps } from "./components/FormDialog";

// Empty States
export { EmptyState, EmptyStateIcons } from "./components/EmptyState";

// Sections
export { Section, SectionGroup, useSection } from "./components/Section";

// Form Layout
export { FormLayout } from "./components/FormLayout";

// Sidebar Components
export {
  SidebarSection,
  StatusWidget,
  Timeline,
  CategoryList,
  AttachmentList,
  SidebarTabs,
  SidebarTab,
  MetadataPanel,
  QuickActions,
} from "./components/SidebarComponents";

// Tabs
export {
  Tabs,
  TabContent,
  TabList,
  TabTrigger,
  ScrollableTabs,
  tabsVariants,
  tabVariants,
} from "./components/Tabs";

// Form Tabs
export {
  FormTabs,
  WizardTabs,
  SettingsTabs,
  ProfileTabs,
  DataTabs,
  TabIcons,
  CommonTabConfigs,
} from "./components/FormTabs";

// Accordion
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Collapsible,
  accordionVariants,
  accordionItemVariants,
  accordionTriggerVariants,
  accordionContentVariants,
} from "./components/Accordion";

// Accordion Components
export {
  FAQAccordion,
  SettingsAccordion,
  ProfileAccordion,
  DataAccordion,
  TimelineAccordion,
  FormAccordion,
  NavigationAccordion,
  AccordionIcons,
  CommonAccordionConfigs,
} from "./components/AccordionComponents";

// Grid
export {
  Grid,
  GridItem,
  GridContainer,
  ResponsiveGrid,
  MasonryGrid,
  gridVariants,
  gridItemVariants,
  GridBreakpoints,
  GridPresets,
} from "./components/Grid";

// Grid Components
export {
  CardGrid,
  StatsGrid,
  FeatureGrid,
  ProductGrid,
  TeamGrid,
  DashboardGrid,
  GridIcons,
} from "./components/GridComponents";

// Breadcrumbs
export {
  Breadcrumbs,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  breadcrumbsVariants,
} from "./components/Breadcrumbs";

// Pagination
export {
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationInfo,
  paginationVariants,
  paginationItemVariants,
} from "./components/Pagination";

// ARIA Components
export {
  ARIALiveRegion,
  ARIASkipLink,
  ARIAFocusTrap,
  ARIAScreenReaderOnly,
  ARIAHidden,
  ARIADescribedBy,
  ARIAErrorMessage,
  ARIALoading,
  ARIAStatus,
  ARIAAssertionsProvider,
  ARIAContextProvider,
  useARIAAnnouncements,
  useARIAContext,
  ARIAUtils,
} from "./components/ARIA";

// Theme Components
export { ThemeToggle } from "./components/ThemeToggle";

// Global Providers (SSR Safe)
export { GlobalProviders } from "./components/GlobalProviders";

