<template>
  <div
    class="rounded-lg col-span-1 flex gap-4 p-4 bg-elevated border border-muted"
  >
    <div class="">
      <p class="text-sm text-muted mb-1">
        {{
          new Date(date).toLocaleString("default", {
            month: "long",
          })
        }}
        {{ new Date(date).getFullYear() }}
      </p>
      <div class="flex items-center gap-2 mb-2">
        <h3 class="text-lg font-semibold">
          {{ title }}
        </h3>
        <PortfolioProjectState v-if="state" :state="state" class="ml-2" />
      </div>
      <p class="text-sm mb-4">
        {{ description }}
      </p>
      <div class="flex flex-wrap">
        <InlineTag
          v-for="tag in tags"
          :key="tag"
          :tag="tag"
          :path="`/portfolio/tags/${tag}`"
          variant="link"
        />
      </div>
    </div>

    <Image
      v-if="image"
      :src="image"
      alt=""
      class="shrink-0 h-32 w-max border border-muted rounded overflow-hidden"
      loading="lazy"
      preview
    />
  </div>
</template>

<script lang="ts" setup>
import Image from "primevue/image";

interface Props {
  title: string;
  description: string;
  state?: string;
  date: string;
  image?: string;
  tags?: string[];
}

const props = defineProps<Props>();
</script>

<style></style>
