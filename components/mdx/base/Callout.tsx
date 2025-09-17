import React from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const calloutVariants = cva(
  "relative w-full rounded-lg border-l-4 p-4 bg-card/50",
  {
    variants: {
      variant: {
        default: "border-l-border bg-background/50",
        note: "border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20",
        tip: "border-l-green-500 bg-green-50/50 dark:bg-green-950/20",
        important: "border-l-purple-500 bg-purple-50/50 dark:bg-purple-950/20",
        warning: "border-l-orange-500 bg-orange-50/50 dark:bg-orange-950/20",
        caution: "border-l-red-500 bg-red-50/50 dark:bg-red-950/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface CalloutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calloutVariants> {
  title?: string;
  icon?: string;
}

const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  (
    { className, variant = "default", title, icon, children, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(calloutVariants({ variant }), className)}
        {...props}
      >
        <div className="flex items-start gap-3">
          {icon && (
            <span className="text-lg leading-none mt-0.5 shrink-0">{icon}</span>
          )}
          <div className="flex-1 min-w-0">
            {title && (
              <h5 className="mb-2 font-medium leading-none tracking-tight">
                {title}
              </h5>
            )}
            <div className="text-sm [&_p]:leading-relaxed [&_p:last-child]:mb-0">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Callout.displayName = "Callout";

export { Callout, calloutVariants };
