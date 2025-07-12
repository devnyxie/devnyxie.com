<template>
  <div>
    <div
      class="text-pretty tracking-tight text-highlighted text-left text-xl sm:text-xl lg:text-2xl font-medium"
    >
      {{ page.about.title }}
    </div>
    <div>
      <p class="text-muted text-sm mt-2">
        {{ page.about.description }}
      </p>
    </div>
  </div>
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
