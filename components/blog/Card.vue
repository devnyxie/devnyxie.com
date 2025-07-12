<template>
  <div
    class="card bg-elevated border border-muted dark:border-muted/50 shadow-xs p-6 rounded-sm h-full col-span-2"
  >
    <img
      v-if="image"
      :src="image"
      :alt="title"
      class="object-cover rounded-sm mb-4 w-full h-[125px]"
      loading="lazy"
    />
    <div class="gap-2 flex flex-col h-full">
      <p class="text-sm text-muted flex gap-1 items-center">
        <Icon name="material-symbols:calendar-today-outline-rounded" />
        {{
          new Date(date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        }}
      </p>
      <NuxtLink
        :to="path"
        class="text-lg font-medium hyphens-auto line-clamp-1"
      >
        {{ title }}
      </NuxtLink>
      <p class="text-muted break-words hyphens-auto line-clamp-2">
        {{ description }}
      </p>
      <div class="tags flex flex-wrap gap-2" v-if="tags && tags.length > 0">
        <NuxtLink
          v-for="(tag, idx) in tags"
          :key="idx"
          :to="`/tags/${tag}`"
          class="dark:bg-zinc-900 dark:hover:bg-zinc-800 text-muted px-2 py-1 rounded-sm text-xs"
        >
          {{ tag }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { LucideCalendar } from "lucide-vue-next";
import { NuxtLink } from "#components";

interface Props {
  title: string;
  description: string;
  readingTime: number;
  date: string;
  path: string;
  image: string;
  tags?: string[];
}
defineProps<Props>();
</script>

<style></style>
