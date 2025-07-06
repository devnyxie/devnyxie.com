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
    <div class="container-medium flex justify-start mx-2">
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
          <!-- <NuxtLink
            :to="be.path"
            target="_blank"
            rel="noopener noreferrer"
            v-else
            class="capitalize font-medium me-4 duration-100 flex items-center py-4 justify-center"
            :class="
              isActive(be.path)
                ? ''
                : 'text-muted hover:text-muted-hover'
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
          </NuxtLink> -->
        </div>
      </div>
      <ColorModeButton />
    </div>
  </div>
</template>
