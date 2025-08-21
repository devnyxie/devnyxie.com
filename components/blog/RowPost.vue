<template>
  <div
    class="bg-elevated border border-muted dark:border-muted shadow-xs rounded-lg h-full col-span-1"
  >
    <div class="flex justify-between gap-x-4 p-4">
      <img
        v-if="image"
        :src="image"
        :alt="title"
        class="object-cover rounded-sm h-[125px] aspect-[16/9] hidden sm:block"
        loading="lazy"
      />
      <div class="gap-2 flex flex-col h-full grow">
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
          class="text-lg font-medium hyphens-auto line-clamp-1 group hover:text-info transition-colors"
        >
          {{ title }}
        </NuxtLink>

        <p class="text-muted text-sm break-words hyphens-auto">
          {{ description }}
        </p>
        <div class="tags flex flex-wrap gap-1" v-if="tags && tags.length > 0">
          <InlineTag
            v-for="(tag, idx) in tags"
            :key="`${tag}-${idx}`"
            :tag="tag"
            :path="`/blog/tags/${tag}`"
            variant="ghost"
          />
        </div>
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
  image?: string;
  icon?: string;
  tags?: string[];
}
defineProps<Props>();
</script>

<style></style>
