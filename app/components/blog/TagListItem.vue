<template>
  <li class="mb-3 border-b border-muted pb-2 last:border-none">
    <NuxtLink :to="path" class="text-lg font-semibold hover:underline">
      {{ title }}
    </NuxtLink>
  </li>
</template>

<script lang="ts" setup>
interface Props {
  title: string;
  path: string;
}
defineProps<Props>();
</script>

<style></style>
