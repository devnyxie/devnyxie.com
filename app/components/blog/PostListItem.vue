<template>
  <li class="mb-3 border-b border-muted pb-2 last:border-none">
    <NuxtLink :to="path" class="text-lg font-semibold hover:underline">
      {{ title }}
    </NuxtLink>
    <div class="text-xs text-muted">
      {{ formatDate(date) }} · {{ readingTime }} min read
    </div>
  </li>
</template>

<script lang="ts" setup>
interface Props {
  title: string;
  path: string;
  readingTime: number;
  date: string;
}

defineProps<Props>();
</script>

<style></style>
