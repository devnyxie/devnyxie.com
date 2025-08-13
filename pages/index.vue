<template>
  <NuxtLayout name="md">
    <div
      v-if="page"
      class="flex flex-col gap-16 sm:gap-20 lg:gap-24 py-16 sm:py-20 lg:py-24"
    >
      <LandingHero :page />
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)',
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
        }"
        :transition="{
          duration: 0.6,
          delay: 0.5,
        }"
      >
        <div class="!pt-0 flex flex-col gap-8 md:grid md:grid-cols-2">
          <LandingAbout :page="page" />
          <LandingExperience :page="page" />
        </div>
      </Motion>
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)',
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
        }"
        :transition="{
          duration: 0.6,
          delay: 0.8,
        }"
      >
        <LandingRecentPosts :page="page"
      /></Motion>
    </div>
  </NuxtLayout>
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
</script>

<style></style>
