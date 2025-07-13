<template>
  <PageSection :title="page?.title" :description="page?.description">
    <div
      v-if="posts && posts.length > 0"
      class="grid grid-cols-1 lg:grid-cols-4 gap-4"
    >
      <BlogRowPost
        v-for="(post, index) in posts"
        :key="post.title"
        v-bind="post"
      />
    </div>
    <div v-else class="text-muted mt-8">No posts available.</div>
  </PageSection>
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

const { data: posts } = await useAsyncData("blogs", () =>
  queryCollection("blog").order("date", "DESC").all()
);
if (!posts.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "blogs posts not found",
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

<style scoped></style>
