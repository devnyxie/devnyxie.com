<template>
  <div class="flex justify-between">
    <SharedHeading title="Recent Posts" class="mb-2" />
    <UButton color="neutral" variant="subtle" class="h-max grow-0"
      >More</UButton
    >
  </div>

  <SharedDescription
    description="A selection of my latest blog posts."
    class="mb-6"
  />
  <div
    v-if="posts && posts.length > 0"
    class="grid grid-cols-1 lg:grid-cols-2 gap-4"
  >
    <BlogRowPost
      v-for="post in posts"
      :key="post.title"
      :title="post.title"
      :description="post.description"
      :date="post.date"
      :readingTime="post.readingTime"
      :path="post.path"
      :tags="post.tags"
    />
  </div>
  <div v-else class="text-sm text-muted">No recent posts available.</div>
</template>

<script lang="ts" setup>
const { data: posts } = await useAsyncData("recent-posts", () =>
  queryCollection("articles").order("date", "DESC").limit(4).all()
);

defineProps<{
  page: {
    blog: {
      title: string;
      description: string;
    };
  };
}>();
</script>

<style scoped></style>
