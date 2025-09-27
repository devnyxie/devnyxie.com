<script setup>
const route = useRoute();

console.log("route params:", route.params);

let slug = route.params.slug;

console.log("slug:", slug);

const { data: post } = await useAsyncData(`article-${slug}`, () => {
  return queryCollection("articles").path(`/blog/articles/${slug}`).first();
});

if (!post) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}
</script>

<template>
  <BlogPostLayout :post="post" />
</template>
