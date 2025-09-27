<script setup>
import { useRoute, useAsyncData, queryCollection } from "#imports";
import { BlogPostLayout } from "#components";

const route = useRoute();

const slug = route.params.slug;

const { data: post } = await useAsyncData(`deep-dive-${slug}`, () => {
  return queryCollection("deep-dives")
    .path(`/blog/deep-dives/${joinedSlug}`)
    .first();
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
  <NuxtLayout name="md">
    <BlogPostLayout :post="post" :toc="toc" />
  </NuxtLayout>
</template>
