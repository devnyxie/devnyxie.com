<template>
  <div
    class="bg-elevated border border-muted dark:border-muted shadow-xs rounded-lg h-full col-span-4"
  >
    <div class="flex justify-between gap-x-4 p-4">
      <div class="gap-2 flex flex-col h-full w-full">
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
          class="text-lg font-medium hyphens-auto line-clamp-1 group"
        >
          <!-- {{ title }} -->
          <UButton
            size="xl"
            variant="link"
            class="p-0 gap-0 group-hover:text-info hover:text-info cursor-pointer text-lg"
            :label="title"
          >
            <template #trailing>
              <UIcon
                name="line-md:chevron-small-right"
                class="size-6 text-primary transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
              />
            </template>
          </UButton>
        </NuxtLink>

        <p class="text-muted text-sm break-words hyphens-auto line-clamp-2">
          {{ description }}
        </p>
        <div class="tags flex flex-wrap gap-1" v-if="tags && tags.length > 0">
          <BlogTag
            v-for="(tag, idx) in tags"
            :key="`${tag}-${idx}`"
            :tag="tag"
          />
        </div>
      </div>
      <img
        v-if="image"
        :src="image"
        :alt="title"
        class="object-cover rounded-sm h-[125px] aspect-square"
        loading="lazy"
      />
      <img
        v-else-if="icon"
        :src="icon"
        alt=""
        class="object-cover rounded-sm h-[35px]"
        loading="lazy"
      />
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
