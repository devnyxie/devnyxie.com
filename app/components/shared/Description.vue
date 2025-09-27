<template>
  <div v-if="description" :class="`text-muted ${uiSize}`">
    {{ description }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  description?: string;
  size?: "sm" | "md";
}>();

const sizeClasses = {
  sm: "text-sm sm:text-md lg:text-sm",
  md: "",
};

const uiSize = sizeClasses[props.size || "sm"];

if (!props.description) {
  console.warn(
    "[Description] component requires `description` prop to render."
  );
}
</script>
