import { type ClassValue } from "clsx";
import { cn } from "./cn";

type VariantConfig = Record<string, Record<string, ClassValue>>;
type DefaultVariants = Record<string, string | boolean>;

interface CVAConfig {
  variants?: VariantConfig;
  defaultVariants?: DefaultVariants;
}

export function cva(base: ClassValue, config?: CVAConfig) {
  return (props: Record<string, any> = {}) => {
    let classes = [base];

    if (config?.variants) {
      Object.entries(config.variants).forEach(([key, variants]) => {
        const value = props[key] ?? config.defaultVariants?.[key];
        if (value !== undefined && variants[value]) {
          classes.push(variants[value]);
        }
      });
    }

    return cn(...classes);
  };
}
