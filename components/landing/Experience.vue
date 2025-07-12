<template>
  <div>
    <div
      class="mb-2 grid-col-1 text-pretty tracking-tight text-highlighted text-left text-xl sm:text-xl lg:text-2xl font-medium"
    >
      {{ page.experience.title }}
    </div>
    <ul class="w-full">
      <li
        v-for="job in page.experience.items"
        :key="job.position"
        class="w-full flex items-center gap-1 mb-2"
      >
        <div class="text-sm text-muted">{{ job.date }}</div>
        <hr class="border-muted grow" />
        <div class="font-sm">{{ job.position }}</div>
        at
        <NuxtLink :to="job.company.url" class="text-sm underline">{{
          job.company.name
        }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
interface Job {
  position: string;
  date: string;
  company: {
    name: string;
    url: string;
  };
}
defineProps<{
  page: {
    experience: {
      title: string;
      items: Job[];
    };
  };
}>();
</script>

<style></style>
