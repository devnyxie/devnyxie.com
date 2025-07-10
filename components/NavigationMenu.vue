<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();
const isActive = (path: string) => path === route.fullPath;

const items = ref<NavigationMenuItem[]>([
  // {
  //   label: "Home",
  //   to: "/",
  // },
  {
    label: "Blog",
    to: "/blog",
  },
  {
    label: "Portfolio",
    to: "/portfolio",
  },
  {
    label: "About",
    to: "/about",
  },
  {
    label: "More",
    // to: "/getting-started",
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
    label: "",
    icon: "material-symbols:search",
    class: "text-foreground",
  },
]);
</script>

<template>
  <div class="w-full">
    <div class="flex justify-between items-center px-4 lg:px-0">
      <NuxtLink to="/" class="flex items-center">Tim Afanasiev</NuxtLink>
      <UNavigationMenu
        variant="link"
        :items="items"
        class="flex justify-end max-w-[550px] flex-grow"
      />
      <!-- </div> -->
    </div>
  </div>
</template>
