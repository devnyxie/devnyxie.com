<template>
  <div
    class="card bg-background-secondary p-6 rounded-sm transition-shadow duration-200 col-span-1 h-full"
  >
    <img
      :src="image"
      :alt="title"
      class="object-cover rounded-sm mb-4 w-full h-[125px]"
      loading="lazy"
    />
    <div class="gap-2 flex flex-col h-full">
      <p
        class="text-sm text-zinc-500 dark:text-zinc-400 flex gap-1 items-center"
      >
        <!-- <LucideCalendar :size="16" /> -->
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
      <p class="text-zinc-600 dark:text-zinc-400 break-words hyphens-auto">
        {{ description }}
      </p>
      <div class="tags flex flex-wrap gap-2">
        <NuxtLink
          v-for="(tag, idx) in tags"
          :key="idx"
          :to="`/tags/${tag}`"
          class="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 px-2 py-1 rounded-sm text-xs"
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
