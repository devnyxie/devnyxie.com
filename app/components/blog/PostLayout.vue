<template>
  <div
    class="flex flex-col w-full md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,var(--breakpoint-md))_minmax(0,1fr)]"
  >
    <div v-if="post" class="prose col-start-2 gap-4">
      <div class="flex flex-col items-center text-center mb-14">
        <img
          v-if="post.icon"
          :src="post.icon"
          :alt="post.title"
          class="h-10 object-contain rounded mb-6"
          loading="lazy"
        />

        <img
          v-if="post.image"
          :src="post.image"
          :alt="post.title"
          class="w-full aspect-video object-contain rounded mb-6"
          loading="lazy"
        />

        <h1 class="text-3xl font-bold mb-2">{{ post.title }}</h1>
        <p class="text-muted text-sm mb-4">{{ post.description }}</p>
        <p class="text-sm text-muted mb-4">
          {{ formatDate(post.date) }} · {{ post.readingTime }} min read
        </p>
        <!-- Tags -->
        <div v-if="post.tags" class="flex flex-wrap gap-2 mb-4">
          <SharedTag
            v-for="(tag, idx) in post.tags"
            :key="idx"
            :path="`/blog/tags/${tag}`"
            :name="tag"
            variant="subtle"
          >
            {{ tag }}
          </SharedTag>
        </div>
      </div>
      <!-- <BlogSurround
        v-if="surroundData"
        :post="surroundData"
        :content-type="contentType"
      /> -->
      <UContentSurround :surround="surround" />
      <div class="content-body">
        <ContentRenderer :value="post" />
      </div>
      <!-- <BlogSurround
        v-if="surroundData"
        :post="surroundData"
        :content-type="contentType"
      /> -->
    </div>
  </div>
</template>
<script setup>
const route = useRoute();

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings("articles", route.path, {
    fields: ["title", "description", "date"],
    before: 1,
    after: 1,
  }).order("date", "DESC");
});

// Transform the surround data to match our component's expected format
// const surroundData = computed(() => {
//   if (!surround.value || !Array.isArray(surround.value)) return null;

//   return {
//     previous: surround.value[0] || null,
//     next: surround.value[1] || null,
//   };
// });

const props = defineProps({ post: Object });
</script>
