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

console.log("Post data:", post.value);

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

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
  <div class="container mx-auto px-4 py-8 max-w-screen-sm">
    <BlogBreadcrumb :items="breadcrumbs" class="mb-6" />

    <!-- if we got a single post… -->
    <div v-if="isValidPost">
      <h1 class="text-3xl font-bold mb-2">{{ post.title }}</h1>
      <p class="text-sm text-muted mb-4">
        {{ formatDate(post.date) }} · {{ post.minRead }} min read
      </p>
      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-4">
        <NuxtLink
          v-for="(tag, idx) in post.tags"
          :key="idx"
          :to="`/tags/${tag}`"
          class="px-2 py-1 rounded-sm text-xs bg-muted"
        >
          #{{ tag }}
        </NuxtLink>
      </div>
      <img
        v-if="post.image"
        :src="post.image"
        :alt="post.title"
        class="w-full h-64 object-cover rounded-lg mb-6"
        loading="lazy"
      />
      <!-- Content -->
      <ContentBody>
        <ContentRenderer :value="post" />
      </ContentBody>
    </div>

    <!-- otherwise render a directory listing -->
    <div v-else>
      <h2 class="text-2xl font-semibold mb-4">
        Posts in directory “{{ breadcrumbs[breadcrumbs.length - 1].label }}”
      </h2>
      <ul>
        <li
          v-for="p in posts"
          :key="p.id"
          class="mb-3 border-b border-muted pb-2 last:border-none"
        >
          <NuxtLink
            :to="`/blog/${p.path.replace('/blog/', '')}`"
            class="text-lg font-semibold hover:underline"
          >
            {{ p.title }}
          </NuxtLink>
          <div class="text-xs text-muted">
            {{ formatDate(p.date) }} · {{ p.minRead }} min read
          </div>
        </li>
      </ul>
      <div v-if="posts && posts.length === 0" class="text-muted">
        "> No posts found in this directory.
      </div>
    </div>
  </div>
</template>
