<script setup>
// add: .where('published', '=', true)
import { ref, computed } from "vue";
import { useRoute, useAsyncData, queryCollection } from "#imports";

const route = useRoute();
const slugArray = Array.isArray(route.params.slug)
  ? route.params.slug
  : [route.params.slug];
const joinedSlug = slugArray.join("/");

const { data: post } = await useAsyncData(`blog-${slugArray}`, () => {
  return queryCollection("blog").path(`/blog/${joinedSlug}`).first();
});

const posts = ref(null); // will hold directory list if no post

// TOC
const toc = computed(() => {
  const headers = [];

  for (const node of post.value?.body.value || []) {
    const [tag, props, content] = node;

    if (["h1", "h2", "h3"].includes(tag)) {
      headers.push({
        id: props?.id || content?.toLowerCase().replace(/\s+/g, "-"),
        text: content || "",
        depth: parseInt(tag.replace("h", "")),
      });
    }
  }

  return headers;
});

if (!post.value) {
  const { data: dirPosts } = await useAsyncData(
    `blog-partial-${joinedSlug}`,
    () =>
      queryCollection("blog")
        // SQL-like pattern matching: anything beginning with "/blog/foo/bar"
        .where("path", "LIKE", `/blog/${joinedSlug}%`)
        .order("date", "DESC")
        .all() // returns an array of matches
  );
  posts.value = dirPosts.value || [];
  console.log("Directory posts:", posts.value);
}

const breadcrumbs = slugArray.map((label, i) => {
  return {
    label: label.charAt(0).toUpperCase() + label.slice(1),
    to: `/blog/${slugArray.slice(0, i + 1).join("/")}`,
  };
});

// add a "Blog" breadcrumb at the start
breadcrumbs.unshift({
  label: "Blog",
  to: "/blog",
});

// if it's a single post, delete the last breadcrumb
// and replace it with the post title
if (post.value) {
  breadcrumbs.pop();
  breadcrumbs.push({
    label: post.value.title,
    to: `/blog/${joinedSlug}`,
  });
}

const isValidPost = computed(() => {
  return post.value && post.value?.title && post.value?.date;
});
</script>

<template>
  <div class="px-4 lg:px-0 py-18 max-w-screen-md">
    <!-- <BlogBreadcrumb :items="breadcrumbs" /> -->

    <!-- if we got a single post… -->
    <div v-if="isValidPost">
      <div class="flex flex-col items-center text-center mb-14">
        <p class="text-sm text-muted mb-4">
          {{ formatDate(post.date) }} · {{ post.minRead }} min read
        </p>

        <img
          v-if="post.image"
          :src="post.image"
          :alt="post.title"
          class="w-full h-64 object-cover rounded-lg mb-6"
          loading="lazy"
        />
        <h1 class="text-3xl font-bold mb-2">{{ post.title }}</h1>
        <p class="text-muted text-sm mb-4">{{ post.description }}</p>
        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <BlogTag v-for="(tag, idx) in post.tags" :key="idx" :tag="tag">
            {{ tag }}
          </BlogTag>
        </div>
      </div>

      <!-- Content -->
      <BlogContentBody>
        <ContentRenderer :value="post" />
      </BlogContentBody>
    </div>

    <!-- otherwise render a directory listing -->
    <div v-else>
      <h2 class="text-2xl font-semibold mb-4">
        Posts in directory “{{ breadcrumbs[breadcrumbs.length - 1].label }}”
      </h2>
      <ul>
        <BlogPostListItem
          v-for="post in posts"
          :key="post.id"
          :title="post.title"
          :path="post.path"
          :min-read="post.minRead"
          :date="post.date"
        />
      </ul>
      <div v-if="posts && posts.length === 0" class="text-muted">
        No posts found in this directory.
      </div>
    </div>
  </div>
</template>
