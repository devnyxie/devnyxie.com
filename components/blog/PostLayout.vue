<template>
  <PageSection>
    <div v-if="post?.title">
      <div class="flex flex-col items-center text-center mb-14">
        <img
          v-if="post.icon"
          :src="post.icon"
          :alt="post.title"
          class="h-10 object-contain rounded-lg mb-6"
          loading="lazy"
        />
        <p class="text-sm text-muted mb-4">
          {{ formatDate(post.date) }} · {{ post.readingTime }} min read
        </p>

        <img
          v-if="post.image"
          :src="post.image"
          :alt="post.title"
          class="h-64 object-contain rounded-lg mb-6"
          loading="lazy"
        />

        <h1 class="text-3xl font-bold mb-2">{{ post.title }}</h1>
        <p class="text-muted text-sm mb-4">{{ post.description }}</p>
        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <BlogTag
            v-for="(tag, idx) in post.tags"
            :key="idx"
            :tag="tag"
            variant="soft"
          >
            {{ tag }}
          </BlogTag>
        </div>
      </div>

      <!-- Content -->
      <div class="content-body">
        <ContentRenderer :value="post" />
      </div>
    </div>
  </PageSection>
</template>
<script setup>
// TOC
// const toc = computed(() => {
//   const headers = [];

//   for (const node of post.value?.body.value || []) {
//     const [tag, props, content] = node;

//     if (["h1", "h2", "h3"].includes(tag)) {
//       headers.push({
//         id: props?.id || content?.toLowerCase().replace(/\s+/g, "-"),
//         text: content || "",
//         depth: parseInt(tag.replace("h", "")),
//       });
//     }
//   }

//   return headers;
// });
defineProps({ post: Object });
</script>
