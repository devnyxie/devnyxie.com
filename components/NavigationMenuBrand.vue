<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Blog",
    to: "/blog",
    // active: isActive("/blog"),
    active: route.path.startsWith("/blog"),
  },
  {
    label: "Portfolio",
    to: "/portfolio",
    active: route.path.startsWith("/portfolio"),
  },
  {
    label: "Now",
    to: "/now",
  },
  {
    label: "About",
    to: "/about",
  },
  {
    label: "More",
    children: [
      {
        label: "Selfhosting",
        description: "How I host all my services at home.",
        icon: "i-lucide-server",
      },
      {
        label: "Status",
        description:
          "Check the status of my services and see if they are online.",
        icon: "i-lucide-server",
      },
    ],
  },
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
        <NuxtLink to="/" class="font-semibold">timothee</NuxtLink>
      </div>
      <UNavigationMenu
        variant="link"
        :items="items"
        class="flex justify-end max-w-[550px] flex-grow"
      />
    </div>
  </div>
</template>
