<template>
  <div class="py-18 lg:py-20" v-if="page">
    <LandingHero :page />

    <div class="grid grid-cols-2 gap-4">
      <div class="col-span-1">
        <div
          class="col-span-1 text-pretty tracking-tight text-highlighted text-left text-xl sm:text-xl lg:text-2xl font-medium"
        >
          About Me
        </div>
        <div>
          <p class="text-muted text-sm sm:text-base lg:text-lg mt-2">
            I am a software engineer with a passion for building web
            applications and exploring new technologies. I love to share my
            knowledge through writing and mentoring.
          </p>
        </div>
      </div>
      <div class="col-span-1">
        <div
          class="col-span-1 mb-2 grid-col-1 text-pretty tracking-tight text-highlighted text-left text-xl sm:text-xl lg:text-2xl font-medium"
        >
          Work Experience
        </div>
        <ul class="w-full">
          <li
            v-for="job in jobs"
            :key="job.id"
            class="w-full flex items-center gap-1 mb-2"
          >
            <div class="text-sm text-gray-400">{{ job.years }}</div>
            <hr class="border-muted grow" />
            <div class="font-sm">{{ job.title }}</div>
            at
            <div class="text-sm">{{ job.company }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: page } = await useAsyncData("index", () => {
  return queryCollection("index").first();
});
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

useSeoMeta({
  title: page.value?.seo.title || page.value?.title,
  ogTitle: page.value?.seo.title || page.value?.title,
  description: page.value?.seo.description || page.value?.description,
  ogDescription: page.value?.seo.description || page.value?.description,
});

const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Techy",
    years: "2020 - Present",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "WebSol",
    years: "2018 - 2020",
  },
  {
    id: 3,
    title: "Intern",
    company: "Startup",
    years: "2017 - 2018",
  },
];
</script>

<style></style>
