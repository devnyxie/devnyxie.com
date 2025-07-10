<template>
  <div
    class="hover:bg-elevated border border-muted dark:border-muted/50 shadow-xs rounded-lg h-full"
  >
    <NuxtLink :to="path" class="flex gap-x-4 p-6">
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
        <div :to="path" class="text-lg font-medium hyphens-auto line-clamp-2">
          {{ title }}
        </div>
        <p class="text-muted text-sm break-words hyphens-auto line-clamp-2">
          {{ description }}
        </p>
        <div class="tags flex flex-wrap gap-2" v-if="tags && tags.length > 0">
          <div
            v-for="(tag, idx) in tags"
            :key="idx"
            :to="`/tags/${tag}`"
            class="dark:bg-zinc-900 dark:hover:bg-zinc-800 text-muted px-2 py-1 rounded-sm text-xs"
          >
            {{ tag }}
          </div>
        </div>
      </div>
      <img
        :src="
          image
            ? image
            : `https://picsum.photos/id/${Math.floor(Math.random() * (200 - 50) + 50)}/1200/600`
        "
        :alt="title"
        class="object-cover rounded-sm h-[125px] aspect-square"
        loading="lazy"
      />
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
// import { LucideCalendar } from "lucide-vue-next";
import { NuxtLink } from "#components";

interface Props {
  title: string;
  description: string;
  minRead: number;
  date: string;
  path: string;
  image: string;
  tags?: string[];
}
defineProps<Props>();
</script>

<style></style>
