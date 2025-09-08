import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "shadow-xs",
        outline: "shadow-xs",
        ghost: "",
        link: "underline-offset-4 hover:underline",
      },
      color: {
        primary: "text-primary-foreground hover:bg-primary/90",
        destructive:
          "text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 ",
        success:
          "text-success-foreground hover:bg-success/90 focus-visible:ring-success/20 dark:focus-visible:ring-success/40",
        secondary: "text-secondary-foreground hover:bg-secondary/80",
      },
      size: {
        md: "px-2.5 py-1.5 has-[>svg]:px-3", // before: px-4 py-2
        sm: "rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    compoundVariants: [
      // Default variant styles
      {
        variant: "default",
        color: "primary",
        class: "bg-primary",
      },
      // {
      //   variant: "default",
      //   color: "destructive",
      //   class: "bg-destructive dark:bg-destructive/60",
      // },
      // {
      //   variant: "default",
      //   color: "success",
      //   class: "",
      // },
      // {
      //   variant: "default",
      //   color: "secondary",
      //   class: "bg-secondary",
      // },
      // Outline variant styles
      {
        variant: "outline",
        color: "primary",
        class:
          "hover:bg-accent text-accent-foreground hover:text-accent-foreground border dark:bg-input/25 dark:border-input dark:hover:bg-input/50 ",
      },
      // {
      //   variant: "outline",
      //   color: "destructive",
      //   class:
      //     "border-destructive dark:bg-destructive/10 hover:bg-destructive hover:text-white border dark:border-destructive/60 text-destructive dark:text-destructive/90 dark:hover:bg-destructive/20",
      // },
      // {
      //   variant: "outline",
      //   color: "success",
      //   class:
      //     "border-success text-success hover:bg-success hover:text-success-foreground dark:border-success/60 dark:text-success/90 dark:hover:bg-success/20",
      // },
      // {
      //   variant: "outline",
      //   color: "secondary",
      //   class:
      //     "border-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground border dark:bg-secondary/10 dark:border-secondary/60 dark:text-secondary/90 dark:hover:bg-secondary/20",
      // },
      // Ghost variant styles
      // {
      //   variant: "ghost",
      //   color: "primary",
      //   class:
      //     "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      // },
      // {
      //   variant: "ghost",
      //   color: "destructive",
      //   class:
      //     "text-destructive hover:bg-destructive/10 dark:text-destructive/90 dark:hover:bg-destructive/20",
      // },
      {
        variant: "ghost",
        color: "success",
        class: "text-success hover:bg-success/10 dark:hover:bg-success/10",
      },
      // {
      //   variant: "ghost",
      //   color: "secondary",
      //   class:
      //     "text-secondary hover:bg-secondary/10 dark:text-secondary/90 dark:hover:bg-secondary/20",
      // },
      // Link variant styles
      // {
      //   variant: "link",
      //   color: "primary",
      //   class: "text-primary",
      // },
      // {
      //   variant: "link",
      //   color: "destructive",
      //   class: "text-destructive dark:text-destructive/90",
      // },
      // {
      //   variant: "link",
      //   color: "success",
      //   class: "text-success dark:text-success/90",
      // },
      // {
      //   variant: "link",
      //   color: "secondary",
      //   class: "text-secondary dark:text-secondary/90",
      // },
    ],
    defaultVariants: {
      variant: "default",
      color: "primary",
      size: "md",
    },
  }
);

function Button({
  className,
  variant,
  color,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, color, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
