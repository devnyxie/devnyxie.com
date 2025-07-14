<template>
  <PageSection
    v-if="page"
    :title="page?.title"
    :description="page?.description"
  ></PageSection>
</template>

<script setup lang="ts">
const { data: page } = await useAsyncData("now-page", () => {
  return queryCollection("pages").path("/now").first();
});
if (!page.value) {
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
