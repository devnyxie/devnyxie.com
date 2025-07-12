<template>
  <div class="flex justify-center section-padding" v-if="page">
    <div class="">
      <div class="hero-section mb-8">
        <div class="flex gap-2 items-center">
          <div
            class="tracking-tight font-bold text-highlighted text-pretty text-2xl sm:text-3xl lg:text-4xl"
          >
            {{ page.title }}
          </div>
        </div>
        <p class="text-muted mt-2">
          {{ page.description }}
        </p>
      </div>
      <div id="recent-posts" class="mb-8" v-if="posts">
        <div
          v-if="posts.length > 0"
          class="grid grid-cols-1 lg:grid-cols-4 gap-4"
        >
          <BlogRowPost
            v-for="(post, index) in posts"
            :key="post.title"
            v-bind="post"
          />
        </div>
        <div v-else class="text-muted mt-8">No posts available.</div>
      </div>
    </div>
  </div>
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
