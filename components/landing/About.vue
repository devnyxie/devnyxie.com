<template>
  <Section :title="page.about.title">
    <div class="text-sm sm:text-md lg:text-sm text-muted">
      {{ page.about.description }}
    </div>
  </Section>
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
