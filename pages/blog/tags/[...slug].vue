<script setup>
import { ref, computed } from "vue";
import { useRoute, useAsyncData, queryCollection } from "#imports";
import RowPost from "~/components/blog/RowPost.vue";

const route = useRoute();
const tag = route.params.slug[0] || route.params.slug;

const posts = ref(null);

const { data: dirPosts } = await useAsyncData(`posts-with-tag-${tag}`, () =>
  queryCollection("blog")
    .where("tags", "LIKE", `%${tag}%`) // SQL LIKE for array field
    .order("date", "DESC")
    .all()
    .then((posts) => posts.filter((post) => post.tags.includes(tag)))
);
posts.value = dirPosts.value || [];
console.log("Directory posts:", posts.value);
</script>

<template>
  <div class="hero-section mb-8 mt-18">
    <div class="flex gap-2 items-center">
      <div
        class="tracking-tight font-bold text-highlighted text-pretty text-2xl"
      >
        List of all posts tagged with "{{ tag }}":
      </div>
    </div>
    <p class="text-muted">
      {{ posts.length }} post{{ posts.length !== 1 ? "s" : "" }} found.
    </p>
    <div id="recent-posts" class="mb-8 mt-10" v-if="posts">
      <div class="grid grid-cols-1 gap-4" v-if="posts">
        <BlogRowPost
          v-for="(post, index) in posts"
          :key="post.title"
          v-bind="post"
          class="border-none col-span-4 list-inside"
        />
      </div>
      <div v-else class="text-muted mt-8">No posts available.</div>
    </div>
  </div>
</template>
