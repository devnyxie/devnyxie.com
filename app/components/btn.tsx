import * as React from "react";
import { cn } from "@/lib/utils";

export interface BtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, BtnProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <button
        type={type}
        className={cn(
          // Base styles
          "flex h-10 w-full rounded-md border border-outline hover:bg-background-secondary px-3 py-2 text-base",
          // Focus styles
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-transparent",
          // Disabled styles
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Mobile responsive text size
          "md:text-sm",
          // Cursor pointer
          "cursor-pointer",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
