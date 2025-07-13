<!-- PageSection is a wrapper component for any regular section of the page, e.g "landing/about", "landing/experience" etc. -->
<template>
  <section :class="ui?.container" v-if="title || description">
    <div class="mb-4">
      <div v-if="title" :class="ui?.title">{{ title }}</div>
      <div v-if="description" :class="ui?.description">{{ description }}</div>
    </div>
    <slot />
  </section>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  ui: {
    type: Object,
    default: () => ({
      container: "px-0 !pt-0 gap-8 sm:gap-6 lg:gap-8",
      title:
        "text-pretty tracking-tight text-highlighted text-xl sm:text-xl lg:text-2xl font-medium",
      description: "mt-2 text-sm sm:text-md lg:text-sm text-muted",
    }),
  },
});
</script>
