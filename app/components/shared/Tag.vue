<template>
  <component
    :is="isClickable ? 'NuxtLink' : 'div'"
    :to="isClickable ? path : undefined"
    :class="tagClasses"
  >
    # {{ name }}
  </component>
</template>

<script lang="ts" setup>
import { cva } from "~/utils/cva";
import { cn } from "~/utils/cn";
import { getTagStyles, type TagVariant } from "~/utils/tagStyles";

export interface Props {
  name: string;
  path?: string;
  variant?: TagVariant;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
});

const isClickable = computed(() => Boolean(props.path));

// Tag style variants using cva
const tagVariants = cva(
  "rounded group transition duration-200 w-max text-sm font-medium px-1.5 py-0.5 text-xs",
  {
    variants: {
      variant: {
        default: "border",
        outline: "border-1 bg-transparent",
        subtle: "border-0",
      },
      clickable: {
        true: "cursor-pointer hover:opacity-80",
        false: "cursor-default",
      },
    },
    defaultVariants: {
      variant: "default",
      clickable: false,
    },
  }
);

const tagClasses = computed(() => {
  const baseClasses = tagVariants({
    variant: props.variant,
    clickable: isClickable.value,
  });
  const dynamicStyles = getTagStyles(
    props.name,
    props.variant,
    isClickable.value
  );
  return cn(baseClasses, dynamicStyles);
});
</script>
