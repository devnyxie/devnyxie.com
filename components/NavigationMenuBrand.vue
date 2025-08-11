<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const getItemClass = (to?: string): string => {
  if (!to) return "";
  const isHome = to === "/";
  const isActive = isHome ? route.path === "/" : route.path.startsWith(to);
  return isActive
    ? "before:border before:border-muted before:rounded-sm text-highlighted"
    : "";
};

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Home",
    to: "/",
    class: getItemClass("/"),
  },
  {
    label: "Blog",
    to: "/blog",
    class: getItemClass("/blog"),
  },
  {
    label: "Portfolio",
    to: "/portfolio",
    class: getItemClass("/portfolio"),
  },
  {
    label: "Now",
    to: "/now",
    class: getItemClass("/now"),
  },
  {
    label: "About",
    to: "/about",
    class: getItemClass("/about"),
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
    class="w-full border-b border-muted dark:border-muted/50 flex justify-center"
  >
    <NuxtLayout name="md" class="flex justify-between items-center py-2">
      <div class="flex items-center gap-2">
        <NuxtLink to="/" class="font-semibold">timothee</NuxtLink>
      </div>
      <UNavigationMenu
        variant="pill"
        :items="items"
        class="flex justify-end max-w-[550px] flex-grow"
      />
    </NuxtLayout>
  </div>
</template>
