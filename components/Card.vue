<template>
  <div class="card bg-background-secondary shadow-xs p-6 rounded-sm h-full">
    <img
      :src="image"
      :alt="title"
      class="object-cover rounded-sm mb-4 w-full h-[125px]"
      loading="lazy"
    />
    <div class="gap-2 flex flex-col h-full">
      <p class="text-sm text-foreground-secondary flex gap-1 items-center">
        <Icon name="material-symbols:calendar-today-outline-rounded" />
        {{
          new Date(date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        }}
      </p>
      <NuxtLink :to="link" class="text-lg font-medium hyphens-auto">
        {{ title }}
      </NuxtLink>
      <p class="text-foreground-secondary break-words hyphens-auto">
        {{ description }}
      </p>
      <div class="tags flex flex-wrap gap-2">
        <NuxtLink
          v-for="(tag, idx) in tags"
          :key="idx"
          :to="`/tags/${tag}`"
          class="dark:bg-zinc-900 dark:hover:bg-zinc-800 text-foreground-secondary px-2 py-1 rounded-sm text-xs"
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
  date: string;
  link: string;
  image: string;
  tags: string[];
}
defineProps<Props>();
</script>

<style></style>
