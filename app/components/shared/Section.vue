<template>
  <section v-if="title && description" class="gap-8 sm:gap-6 lg:gap-8">
    <SharedHeading :title="title" class="mb-4" />
    <SharedDescription :description="description" />
    <slot />
  </section>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
});
</script>
