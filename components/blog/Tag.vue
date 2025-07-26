<template>
  <NuxtLink
    :to="`/blog/tags/${tag}`"
    class="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors"
  >
    <UButton
      color="info"
      :variant="variant"
      size="sm"
      class="flex items-center gap-2 cursor-pointer"
    >
      #{{ tag }}
    </UButton>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { ButtonProps } from "@nuxt/ui";

interface Props {
  tag: string;
  variant: ButtonProps["variant"];
}
const props = defineProps<Props>();
</script>

<style></style>
