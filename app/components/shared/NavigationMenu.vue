<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const isActive = (to: string): boolean => {
  const isHome = to === "/";
  return isHome ? route.path === "/" : route.path.startsWith(to);
};

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Home",
    to: "/",
    active: isActive("/"),
  },
  {
    label: "Blog",
    to: "/blog",
    active: isActive("/blog"),
  },
  {
    label: "Portfolio",
    to: "/portfolio",
    active: isActive("/portfolio"),
  },
  {
    label: "Now",
    to: "/now",
    active: isActive("/now"),
  },
  {
    label: "About",
    to: "/about",
    active: isActive("/about"),
  },
  {
    label: "More",
    children: [
      {
        // todo: wire up this to the config
        label: "Selfhosting",
        description: "How I host all my services at home.",
        icon: "i-lucide-server",
        to: "/selfhosting",
        active: isActive("/selfhosting"),
      },
      {
        // todo: wire up this to the config
        label: "Status",
        description: "Check the status of my services",
        icon: "i-lucide-activity",
        to: "https://status.devnyxie.com/status/all",
        active: isActive("/status"),
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
      <UNavigationMenu variant="pill" :items="items" :unmount-on-hide="false" />
    </NuxtLayout>
  </div>
</template>
