<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items = ref<NavigationMenuItem[]>([
  {
    label: "Home",
    to: "/",
  },
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
  // {
  //   label: "",
  //   icon: "material-symbols:search",
  //   class: "text-foreground",
  // },
]);
</script>

<template>
  <div
    class="w-full border-b border-muted dark:border-muted/30 flex justify-center"
  >
    <div
      class="container max-w-screen-md flex justify-between items-center py-2 px-4 lg:px-0"
    >
      <div class="flex items-center gap-2">
        <!-- <img
          src="/pfp.jpg"
          alt="Logo"
          class="h-8 w-8 object-cover rounded-full border border-muted"
        /> -->
        <NuxtLink to="/" class="text-lg font-bold">timothee</NuxtLink>
      </div>
      <UNavigationMenu
        variant="link"
        :items="items"
        class="flex justify-end max-w-[550px] flex-grow"
      />
    </div>
  </div>
</template>
