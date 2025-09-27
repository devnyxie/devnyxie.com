<template>
  <section class="gap-8 sm:gap-6 lg:gap-8">
    <SharedHeading :title="page.experience.title" size="md" class="mb-4" />
    <ul class="w-full">
      <li
        v-for="job in page.experience.items"
        :key="job.position"
        class="w-full flex items-center gap-1 mb-2 text-sm text-muted"
      >
        <div>{{ job.date }}</div>
        <hr class="grow border-muted w-man" />
        <NuxtLink
          :to="job.company.url"
          class="hover:text-default shrink-0 flex gap-1 transition-colors duration-150"
        >
          <div>{{ job.position }}</div>
          <div>at</div>
          <div class="font-medium">
            {{ job.company.name }}
          </div>
        </NuxtLink>
      </li>
    </ul>
  </section>
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
