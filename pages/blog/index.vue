<!-- <template>
  <div class="flex justify-center" v-if="page">
    <div class="container max-w-screen-lg mx-4 pt-24">
      <div class="hero-section mb-8">
        <Motion
          class="h-full"
          :initial="{
            scale: 1.1,
            opacity: 0,
            filter: 'blur(20px)',
          }"
          :animate="{
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
          }"
          :transition="{
            duration: 0.3,
            delay: 0,
          }"
        >
          <div class="flex gap-2 items-center">
            <div
              class="tracking-tight font-bold text-highlighted text-pretty text-3xl sm:text-4xl lg:text-5xl"
            >
              {{ page.title }}
            </div>
          </div>
          <p class="text-muted mt-2">
            {{ page.description }}
          </p>
        </Motion>
      </div>
      <div id="recent-posts" class="mb-8" v-if="posts">
        <div
          v-if="posts.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <Motion
            v-for="(post, index) in posts"
            :key="post.title"
            class="h-full"
            :initial="{
              scale: 1.1,
              opacity: 0,
              filter: 'blur(20px)',
            }"
            :animate="{
              scale: 1,
              opacity: 1,
              filter: 'blur(0px)',
            }"
            :transition="{
              duration: 0.3,
              delay: index * 0.05,
            }"
          >
            <Card v-bind="post" />
          </Motion>
        </div>
        <div v-else class="text-muted mt-8">No posts available.</div>
      </div>
    </div>
  </div>
</template> -->

<template>
  <div class="py-18 flex justify-center" v-if="page">
    <div class="container max-w-screen-md">
      <div class="hero-section mb-8">
        <Motion
          class="h-full"
          :initial="{
            scale: 1.1,
            opacity: 0,
            filter: 'blur(20px)',
          }"
          :animate="{
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
          }"
          :transition="{
            duration: 0.3,
            delay: 0,
          }"
        >
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
        </Motion>
      </div>
      <div id="recent-posts" class="mb-8" v-if="posts">
        <div
          v-if="posts.length > 0"
          class="grid grid-cols-1 lg:grid-cols-1 gap-4"
        >
          <Motion
            v-for="(post, index) in posts"
            :key="post.title"
            class="h-full"
            :initial="{
              scale: 1.1,
              opacity: 0,
              filter: 'blur(20px)',
            }"
            :animate="{
              scale: 1,
              opacity: 1,
              filter: 'blur(0px)',
            }"
            :transition="{
              duration: 0.3,
              delay: index * 0.05,
            }"
          >
            <RowBlogPost v-bind="post" />
            <!-- <div
              class="flex justify-between gap-4 border border-muted dark:border-0 bg-elevated p-6 rounded-sm h-full"
            >
              <div class="gap-2 flex flex-col h-full">
                <p class="text-sm text-muted flex gap-1 items-center">
                  <Icon
                    name="material-symbols:calendar-today-outline-rounded"
                  />
                  {{
                    new Date(post.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  }}
                </p>
                <NuxtLink
                  :to="post.path"
                  class="text-lg font-medium hyphens-auto"
                >
                  {{ post.title }}
                </NuxtLink>
                <p class="text-muted break-words hyphens-auto line-clamp-2">
                  {{ post.description }}
                </p>
                <div
                  class="tags flex flex-wrap gap-2"
                  v-if="post.tags && post.tags.length > 0"
                >
                  <NuxtLink
                    v-for="(tag, idx) in post.tags"
                    :key="idx"
                    :to="`/tags/${tag}`"
                    class="dark:bg-zinc-900 dark:hover:bg-zinc-800 text-muted px-2 py-1 rounded-sm text-xs"
                  >
                    {{ tag }}
                  </NuxtLink>
                </div>
              </div>
              <img
                v-if="post.image"
                :src="post.image"
                :alt="post.title"
                class="object-cover rounded-sm h-[125px] aspect-square"
                loading="lazy"
              />
            </div> -->
          </Motion>
        </div>
        <div v-else class="text-muted mt-8">No posts available.</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: page } = await useAsyncData("blog-page", () => {
  return queryCollection("pages").path("/blog").first();
});
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const { data: posts } = await useAsyncData("blogs", () =>
  queryCollection("blog").order("date", "DESC").all()
);
if (!posts.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "blogs posts not found",
    fatal: true,
  });
}

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description,
});
</script>

<style scoped></style>
