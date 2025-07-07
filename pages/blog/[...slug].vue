<script setup>
const slug = useRoute().params.slug;
console.log("Slug:", slug);
const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection("blog")
    .path(`/blog/${slug.join("/")}`)
    .first();
});
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-4">{{ post.title }}</h1>
    <p class="text-muted mb-4">
      <span class="text-sm">{{ formatDate(post.date) }}</span>
      <span class="text-sm ml-4">{{ post.minRead }} min read</span>
    </p>
    <img
      v-if="post.image"
      :src="post.image"
      :alt="post.title"
      class="w-full h-64 object-cover rounded-lg mb-6"
      loading="lazy"
    />
    <ContentBody>
      <ContentRenderer :value="post" />
    </ContentBody>
  </div>
</template>
