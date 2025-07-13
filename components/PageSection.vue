<!-- PageSection is a wrapper component for the main section of the page, e.g "Articles", "Tags" etc. -->
<template>
  <section :class="ui?.container">
    <div class="mb-8" v-if="title || description">
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
      container: "px-0 gap-8 sm:gap-6 lg:gap-8 section-padding",
      title:
        "tracking-tight font-bold text-highlighted text-pretty text-2xl sm:text-3xl lg:text-4xl",
      description: "text-muted mt-2",
    }),
  },
});
</script>
