<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();
const isActive = (path: string) => path === route.fullPath;

const items = ref<NavigationMenuItem[]>([
  {
    label: "Home",
    // icon: "i-lucide-book-open",
    to: "/",
  },
  {
    label: "Blog",
    // icon: "i-lucide-book-open",
    to: "/blog",
  },
  {
    label: "Portfolio",
    // icon: "i-lucide-briefcase",
    to: "/portfolio",
  },
  {
    label: "About",
    // icon: "i-lucide-user",
    to: "/about",
  },
  {
    label: "Guide",
    // icon: "i-lucide-book-open",
    to: "/getting-started",
    children: [
      {
        label: "Introduction",
        description: "Fully styled and customizable components for Nuxt.",
        icon: "i-lucide-house",
      },
      {
        label: "Installation",
        description:
          "Learn how to install and configure Nuxt UI in your application.",
        icon: "i-lucide-cloud-download",
      },
      {
        label: "Icons",
        icon: "i-lucide-smile",
        description:
          "You have nothing to do, @nuxt/icon will handle it automatically.",
      },
      {
        label: "Colors",
        icon: "i-lucide-swatch-book",
        description:
          "Choose a primary and a neutral color from your Tailwind CSS theme.",
      },
      {
        label: "Theme",
        icon: "i-lucide-cog",
        description:
          "You can customize components by using the `class` / `ui` props or in your app.config.ts.",
      },
    ],
  },
  {
    label: "GitHub",
    icon: "i-simple-icons-github",
    badge: "3.8k",
    to: "https://github.com/nuxt/ui",
    target: "_blank",
  },
]);
</script>

<template>
  <div class="w-full flex justify-center py-1">
    <UNavigationMenu variant="link" :items="items" class="w-min" />
  </div>
</template>
