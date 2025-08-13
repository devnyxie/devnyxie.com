<template>
  <NuxtLayout name="md">
    <PageSection
      title="Deep Dives"
      description="Explore in-depth articles and insights"
      class="!pb-0"
    >
      <div
        v-if="deepDives && deepDives.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <BlogDeepDive
          v-for="(post, index) in deepDives"
          :key="post.title"
          v-bind="post"
        />
      </div>
      <div v-else class="text-muted mt-8">No posts available.</div>
    </PageSection>
    <PageSection :title="page?.title" :description="page?.description">
      <div v-if="posts && posts.length > 0" class="grid grid-cols-1 gap-4">
        <BlogRowPost
          v-for="(post, index) in posts"
          :key="post.title"
          v-bind="post"
          :icon="``"
        />
      </div>
      <div v-else class="text-muted mt-8">No posts available.</div>
    </PageSection>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const { data: page } = await useAsyncData("blog-page", () => {
  return queryCollection("pages").path("/blog").first();
});
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const { data: posts } = await useAsyncData("blog-posts", () =>
  queryCollection("blog")
    .order("date", "DESC")
    .where("type", "=", "article")
    .limit(6)
    .all()
);

const { data: deepDives } = await useAsyncData("blog-deep-dives", () =>
  queryCollection("blog")
    .order("date", "DESC")
    .where("type", "=", "deep-dive")
    .limit(6)
    .all()
);

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description,
});
</script>

<style scoped></style>
