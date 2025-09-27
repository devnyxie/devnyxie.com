<template>
  <NuxtLayout name="md">
    <SharedPageSection
      v-if="page"
      :title="page?.title"
      :description="page?.description"
    >
      <Section
        title="Software"
        description="A showcase of my programming projects."
      >
        <div
          class="grid grid-cols-1 gap-4 mb-16"
          v-if="projects && projects.length > 0"
        >
          <PortfolioRowItem
            v-for="project in projects"
            :key="project.id"
            :title="project.title"
            :description="project.description"
            :date="project.date"
            :image="project.image"
            :tags="project.tags"
            :state="project.state"
          />
        </div>
      </Section>
    </SharedPageSection>
  </NuxtLayout>
</template>

<script setup lang="ts">
const { data: page } = await useAsyncData("portfolio-page", () => {
  return queryCollection("pages").path("/portfolio").first();
});

const { data: projects } = await useAsyncData("portfolio-projects", () =>
  queryCollection("portfolio")
    .order("date", "DESC")
    .where("id", "LIKE", `%software%`) // to catch portfolio/portfolio/software/devnyxie.com.yml
    .all()
);

console.error("Portfolio page data:", projects.value);

console.log(page);
if (!page.value || !projects.value) {
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
