<template>
  <section class="gap-8 sm:gap-6 lg:gap-8">
    <SharedHeading :title="page.about.title" size="md" class="mb-4" />
    <div class="text-sm sm:text-md lg:text-sm text-muted">
      {{ page.about.description }}
    </div>
  </section>
</template>

<script lang="ts" setup>
defineProps<{
  page: {
    about: {
      title: string;
      description: string;
    };
  };
}>();
</script>

<style></style>
