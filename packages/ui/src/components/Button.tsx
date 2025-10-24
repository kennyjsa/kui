import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { getElevationTailwindClasses, type ElevationLevel } from "../lib/elevation";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm hover:shadow-md",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary/80 border border-primary/20 hover:border-primary/30 shadow-primary/20",
        destructive:
          "bg-gradient-to-b from-destructive to-destructive/90 text-destructive-foreground hover:from-destructive/90 hover:to-destructive/80 border border-destructive/20 hover:border-destructive/30 shadow-destructive/20",
        outline:
          "border border-input/50 bg-gradient-to-b from-background to-muted/20 hover:from-accent/10 hover:to-accent/20 hover:text-accent-foreground hover:border-accent/30 shadow-sm hover:shadow-md",
        secondary:
          "bg-gradient-to-b from-secondary to-secondary/90 text-secondary-foreground hover:from-secondary/90 hover:to-secondary/80 border border-secondary/20 hover:border-secondary/30 shadow-secondary/10",
        ghost:
          "hover:bg-gradient-to-b hover:from-accent/10 hover:to-accent/20 hover:text-accent-foreground hover:shadow-sm",
        link: "text-primary underline-offset-4 hover:underline hover:shadow-none",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3",
        lg: "h-10 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  elevation?: ElevationLevel;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, elevation, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    // Aplicar elevation apenas para variantes que se beneficiam dela
    const shouldApplyElevation =
      elevation !== undefined &&
      (variant === "default" || variant === "destructive" || variant === "secondary");

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          shouldApplyElevation && getElevationTailwindClasses(elevation),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

