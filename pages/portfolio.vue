<template>
  <PageSection
    v-if="page"
    :title="page?.title"
    :description="page?.description"
  >
    <Section
      title="Software"
      description="A showcase of my programming projects."
    >
      <img
        src="/images/portfolio/solar_map.png"
        alt="Placeholder Image"
        class="w-full h-auto rounded-lg border border-muted"
      />
    </Section>
    <Section
      title="Design"
      description="A showcase of my design-as-a-hobby projects."
    >
      <img
        src="/images/portfolio/ethereal_preview.png"
        alt="Placeholder Image"
        class="w-full h-auto"
      />
    </Section>
  </PageSection>
</template>

<script setup lang="ts">
const { data: page } = await useAsyncData("portfolio-page", () => {
  return queryCollection("pages").path("/portfolio").first();
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
