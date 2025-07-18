<template>
  <Section :title="page.experience.title">
    <ul class="w-full">
      <li
        v-for="job in page.experience.items"
        :key="job.position"
        class="w-full flex items-center gap-1 mb-2 text-sm"
      >
        <div class="">{{ job.date }}</div>
        <hr class="grow border-accented" />
        <div class="font-sm">{{ job.position }}</div>
        at
        <NuxtLink :to="job.company.url" class="underline">{{
          job.company.name
        }}</NuxtLink>
      </li>
    </ul>
  </Section>
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
