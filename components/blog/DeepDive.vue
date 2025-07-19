<template>
  <NuxtLink
    :to="path"
    class="group bg-elevated border border-muted shadow-xs rounded-lg h-full transition-colors"
  >
    <div class="flex justify-between items-center gap-x-4 p-4">
      <img
        v-if="icon"
        :src="icon"
        alt=""
        class="object-cover rounded-sm h-[35px]"
        loading="lazy"
      />
      <div class="gap-2 flex flex-col h-full grow">
        <span
          class="text font-medium hyphens-auto line-clamp-1 group group-hover:text-info transition-colors"
        >
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
  description: string;
  readingTime: number;
  date: string;
  path: string;
  image?: string;
  icon?: string;
  tags?: string[];
}
defineProps<Props>();
</script>

<style></style>
