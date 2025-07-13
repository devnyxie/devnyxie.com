<template>
  <Section
    :title="page.blog.title"
    :description="page.blog.description"
    v-if="posts"
  >
    <div v-if="posts.length > 0" class="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <BlogRowPost
        v-for="(post, index) in posts"
        :key="post.title"
        :title="post.title"
        :description="post.description"
        :date="post.date"
        :readingTime="post.readingTime"
        :path="post.path"
        :image="post.image"
        :icon="post.icon"
        :tags="post.tags"
      />
    </div>
  </Section>
</template>

<script lang="ts" setup>
import { BlogRowPost } from "#components";

const { data: posts } = await useAsyncData("recent-posts", () =>
  queryCollection("blog").order("date", "DESC").limit(3).all()
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
