<script setup>
import { ref, computed } from "vue";
import { useRoute, useAsyncData, queryCollection } from "#imports";
import { BlogDirectoryLayout, BlogPostLayout } from "#components";

const route = useRoute();
const slugArray = Array.isArray(route.params.slug)
  ? route.params.slug
  : [route.params.slug];
const joinedSlug = slugArray.join("/");

const data = ref(null);

// try to fetch the post by the full slug
const { data: post } = await useAsyncData(`blog-${slugArray}`, () => {
  return queryCollection("blog").path(`/blog/${joinedSlug}`).first();
});

data.value = post.value || null;

// otherwise, try to fetch the directory posts
if (!data.value) {
  const { data: dirPosts } = await useAsyncData(
    `blog-partial-${joinedSlug}`,
    () =>
      queryCollection("blog")
        .where("path", "LIKE", `/blog/${joinedSlug}%`)
        .order("date", "DESC")
        .all() // returns an array of matches
  );
  data.value = dirPosts.value || null;
}

// if still no data, throw a 404 error
if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const breadcrumbs = slugArray.map((label, i) => {
  return {
    label: label.charAt(0).toUpperCase() + label.slice(1),
    to: `/blog/${slugArray.slice(0, i + 1).join("/")}`,
  };
});

breadcrumbs.unshift({
  label: "Blog",
  to: "/blog",
});

if (post.value) {
  breadcrumbs.pop();
  breadcrumbs.push({
    label: post.value.title,
    to: `/blog/${joinedSlug}`,
  });
}
</script>

<template>
  <NuxtLayout name="md">
    <BlogPostLayout :post="data" :toc="toc" />
  </NuxtLayout>
</template>
