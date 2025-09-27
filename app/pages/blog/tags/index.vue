<template>
  <SharedPageSection
    :title="page.title"
    :description="page.description"
    :ui="{
      title:
        'tracking-tight font-bold text-highlighted text-pretty text-2xl sm:text-3xl lg:text-4xl',
      description: 'mt-2 text-sm sm:text-md lg:text-sm text-muted',
    }"
  >
    <ul>
      <BlogTagListItem
        v-for="tag in tags"
        :key="tag"
        :title="tag"
        :path="`/blog/tags/${tag}`"
      />
    </ul>
  </SharedPageSection>
</template>

<script setup>
const { data: page } = await useAsyncData("tag-page", () => {
  return queryCollection("pages").path("/tags").first();
});

const { data: allPosts } = await useAsyncData("blogs", () =>
  queryCollection("blog").order("date", "DESC").all()
);

const tags = computed(() => {
  if (!allPosts.value) return [];

  const allTags = [];
  for (const post of allPosts.value) {
    if (Array.isArray(post.tags)) {
      allTags.push(...post.tags);
    }
  }
  return [...new Set(allTags)].sort((a, b) => a.localeCompare(b));
});
</script>
