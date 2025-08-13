<template>
  <NuxtLayout name="md">
    <PageSection
      v-if="page"
      :title="page?.title"
      :description="page?.description"
    ></PageSection>
  </NuxtLayout>
</template>

<script setup lang="ts">
const { data: page } = await useAsyncData("about-page", () => {
  return queryCollection("pages").path("/about").first();
});
if (!page.value) {
  console.error("Page not found: /about");
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description,
});
</script>

<style></style>
