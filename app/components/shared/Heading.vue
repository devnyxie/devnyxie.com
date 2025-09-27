<template>
  <div
    v-if="title"
    :class="`text-pretty tracking-tight text-highlighted ${uiSize}`"
  >
    {{ title }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
  size?: "md" | "lg";
}>();

const sizeClasses = {
  md: "text-xl sm:text-xl lg:text-2xl font-medium",
  lg: "font-bold text-2xl sm:text-3xl lg:text-4xl",
};

const uiSize = sizeClasses[props.size || "md"];

if (!props.title) {
  console.warn("[Heading] component requires `title` prop to render.");
}
</script>
