<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";

const default_items = ref<BreadcrumbItem[]>([
  {
    label: "Home",
    icon: "i-lucide-house",
  },
  {
    label: "Components",
    icon: "i-lucide-box",
    to: "/components",
  },
  {
    label: "Breadcrumb",
    icon: "i-lucide-link",
    to: "/components/breadcrumb",
  },
]);

// props
defineProps<{
  items?: BreadcrumbItem[];
}>();
</script>

<template>
  <UBreadcrumb :items="items" />
</template>
