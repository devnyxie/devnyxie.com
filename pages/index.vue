<template>
  <div v-if="page" class="flex flex-col gap-10">
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
      <div
        class="gap-8 sm:gap-16 !pt-0 lg:grid lg:grid-cols-2 lg:gap-8 section-padding"
      >
        <LandingAbout :page="page" />
        <LandingExperience :page="page" />
      </div>
    </Motion>
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
</script>

<style></style>
