<template>
  <section v-if="title && description" class="gap-8">
    <SharedHeading :title="title" class="mb-4" size="lg" />
    <SharedDescription :description="description" size="md" />
    <slot />
  </section>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
});
</script>
