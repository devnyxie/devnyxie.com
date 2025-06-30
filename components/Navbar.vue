<script setup lang="ts">
const bere = [
  { name: "home", path: "/" },
  { name: "library", path: "/library" },
  { name: "portfolio", path: "/portfolio" },
  { name: "gallery", path: "/gallery" },
  { name: "about", path: "/about" },
  { name: "status", path: "/status" },
];

const route = useRoute();
const isActive = (path: string) => path === route.fullPath;
</script>

<template>
  <div class="border-b border-outline w-full flex justify-center">
    <div class="container-medium flex justify-start mx-2">
      <div
        v-for="be in bere"
        :key="`nav-link-${be.name}`"
        style="transition-property: color, border-color, opacity"
      >
        <NuxtLink
          :to="be.path"
          v-if="be.name !== 'status'"
          class="capitalize me-4 duration-100 transition-opacity flex items-center py-4"
          :class="
            isActive(be.path)
              ? 'border-b border-foreground'
              : 'text-foreground-secondary hover:text-foreground-secondary-hover'
          "
        >
          {{ be.name }}
        </NuxtLink>

        <NuxtLink
          :to="be.path"
          target="_blank"
          rel="noopener noreferrer"
          v-else
          class="capitalize me-4 duration-100 transition-opacity flex items-center py-4"
          :class="
            isActive(be.path)
              ? 'border-b border-foreground'
              : 'text-foreground-secondary hover:text-foreground-secondary-hover'
          "
        >
          {{ be.name }}
          <div
            id="status-indicator"
            class="h-full flex items-center ms-2 relative"
          >
            <span
              class="inline-block w-2 h-2 mt-0.5 bg-green-800 rounded-full animate-pulse absolute transform -translate-x-1/2"
            ></span>
            <span
              class="inline-block w-1 h-1 mt-0.5 bg-green-400 rounded-full absolute transform -translate-x-1/2"
            ></span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
