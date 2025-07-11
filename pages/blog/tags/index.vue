<template>
  <div v-if="page">
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
    <ul>
      <BlogTagListItem
        v-for="tag in tags"
        :key="tag"
        :title="tag"
        :path="`/blog/tags/${tag}`"
      />
    </ul>
  </div>
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
