<template>
  <NuxtLink
    :to="path"
    class="group bg-elevated border border-muted hover:border-info shadow-xs rounded-lg h-full transition-colors duration-300 flex flex-col justify-center"
  >
    <div class="flex justify-between items-center gap-x-4 p-4">
      <img
        v-if="icon"
        :src="icon"
        alt=""
        class="object-cover rounded-sm h-[35px]"
        loading="lazy"
      />
      <div class="gap-2 flex flex-col grow">
        <span class="font-medium group group-hover:text-info transition-colors">
          {{ title }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { NuxtLink } from "#components";

interface Props {
  title: string;
  readingTime: number;
  date: string;
  path: string;
  icon?: string;
}
defineProps<Props>();
</script>

<style></style>
