<template>
  <NuxtLayout name="md">
    <div v-if="page" class="flex flex-col gap-16 sm:gap-20 lg:gap-24">
      <LandingHero :page />
      <AnimationFadeIn :delay="0.4">
        <div class="!pt-0 flex flex-col gap-8 md:grid md:grid-cols-2">
          <LandingAbout :page="page" />
          <LandingExperience :page="page" />
        </div>
      </AnimationFadeIn>
      <AnimationFadeIn :delay="0.5">
        <LandingSkillsBento :skills="page.skills.items" />
      </AnimationFadeIn>
      <AnimationFadeIn :delay="0.6">
        <LandingRecentPosts :page="page" />
      </AnimationFadeIn>
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

console.log(page.value.skills);

useSeoMeta({
  title: page.value?.seo.title || page.value?.title,
  ogTitle: page.value?.seo.title || page.value?.title,
  description: page.value?.seo.description || page.value?.description,
  ogDescription: page.value?.seo.description || page.value?.description,
});
</script>

<style></style>
