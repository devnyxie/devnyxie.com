import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const headingVariants = cva("tracking-tight text-pretty text-highlighted", {
  variants: {
    size: {
      default: "text-xl sm:text-xl lg:text-2xl font-medium",
      big: "font-bold text-2xl sm:text-3xl lg:text-4xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

function Heading({
  className,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"p"> &
  VariantProps<typeof headingVariants> & {
    asChild?: boolean;
  }) {
  return <p className={cn(headingVariants({ size, className }))} {...props} />;
}

export default Heading;
