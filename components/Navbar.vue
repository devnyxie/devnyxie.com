<script setup lang="ts">
const bere = [
  { name: "home", path: "/" },
  { name: "blog", path: "/blog" },
  { name: "portfolio", path: "/portfolio" },
  // { name: "gallery", path: "/gallery" },
  { name: "about", path: "/about" },
  // { name: "status", path: "/status" },
];

const route = useRoute();
const isActive = (path: string) => path === route.fullPath;
</script>

<template>
  <div
    class="border-b border-muted backdrop-blur-sm w-full flex justify-center"
  >
    <div class="container flex justify-center mx-2">
      <!-- <NuxtLink to="/" class="font-bold text-xl flex items-center"
        >Tim Afanasiev</NuxtLink
      > -->
      <div class="flex">
        <div
          v-for="be in bere"
          :key="`nav-link-${be.name}`"
          class="flex items-center"
        >
          <NuxtLink
            :to="be.path"
            v-if="be.name !== 'status'"
            class="capitalize font-medium me-4 flex items-center py-4 justify-center transition-colors duration-200"
            :class="isActive(be.path) ? '' : 'text-muted hover:text-foreground'"
            style="transition-property: color"
          >
            {{ be.name }}
          </NuxtLink>
        </div>
      </div>
      <ColorModeButton />
    </div>
  </div>
</template>
