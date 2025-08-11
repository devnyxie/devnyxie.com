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
      <div
        class="grid grid-cols-1 gap-4 mb-16"
        v-if="projects && projects.length > 0"
      >
        <div
          class="p-4 rounded-lg col-span-1 flex gap-4"
          v-for="project in projects"
        >
          <div class="">
            <p class="text-sm text-muted mb-1">
              {{ new Date(project.date).getFullYear() }}
            </p>
            <h3 class="text-lg font-semibold mb-2">
              {{ project.title }}
            </h3>
            <p class="text-sm text-muted-foreground mb-4">
              {{ project.description }}
            </p>
          </div>
          <div class="shrink-0 h-[200px] aspect-video">
            <img
              v-if="project.image"
              :src="project.image"
              alt=""
              class="object-contain rounded-lg h-full w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <!-- test -->
      <!-- <BlogRowPost
        v-for="(project, index) in projects"
        :key="project.title"
        :title="project.title"
        :description="project.description"
        :date="project.date"
        :path="`/portfolio/${project.source}`"
        :image="project.image"
        :readingTime="0"
      /> -->
    </Section>
    <Section
      title="Design"
      description="A showcase of my design-as-a-hobby projects."
    >
    </Section>
  </PageSection>
</template>

<script setup lang="ts">
const { data: page } = await useAsyncData("portfolio-page", () => {
  return queryCollection("pages").path("/portfolio").first();
});

const { data: projects } = await useAsyncData("portfolio-projects", () =>
  queryCollection("portfolio").order("date", "DESC").all()
);

console.log(page);
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
