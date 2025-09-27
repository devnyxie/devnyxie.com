<template>
  <NuxtLayout name="md">
    <SharedPageSection
      title="Deep Dives"
      description="Explore in-depth articles and insights"
      class="!pb-0"
    >
      <div
        v-if="deepDives && deepDives.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <BlogDeepDiveCard
          v-for="(post, index) in deepDives"
          :key="post.title"
          v-bind="post"
        />
      </div>
      <div v-else class="text-muted mt-8">No posts available.</div>
    </SharedPageSection>
    <SharedPageSection :title="page?.title" :description="page?.description">
      <div v-if="posts && posts.length > 0" class="grid grid-cols-1 gap-4">
        <BlogRowPost
          v-for="(post, index) in posts"
          :key="post.title"
          v-bind="post"
          :icon="``"
        />
      </div>
      <div v-else class="text-muted mt-8">No posts available.</div>
    </SharedPageSection>
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

const { data: posts } = await useAsyncData("blog-articles", () =>
  queryCollection("articles").order("date", "DESC").limit(20).all()
);

const { data: deepDives } = await useAsyncData("blog-deep-dives", () =>
  queryCollection("deepDives").order("date", "DESC").limit(6).all()
);

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description,
});
</script>

<style scoped></style>
