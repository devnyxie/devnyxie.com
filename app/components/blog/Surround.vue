<template>
  <div class="w-full gap-4 hidden md:flex">
    <!-- Previous Post Button -->
    <UButton
      variant="outline"
      color="neutral"
      :disabled="!post.previous"
      class="flex-1 justify-start h-auto rounded p-0 group"
      :to="post.previous ? getHref(post.previous.path) : undefined"
    >
      <div class="flex items-center gap-4 w-full px-4 py-2">
        <UIcon
          name="i-lucide-chevron-left"
          class="transition-transform duration-200 ease-in-out group-hover:-translate-x-1"
          :class="post.previous ? '' : 'text-muted'"
        />
        <div class="flex flex-col items-start">
          <div class="text-muted text-sm">Previous Post</div>
          <div v-if="post.previous" class="text-left font-medium">
            {{ post.previous.title }}
          </div>
          <div v-else class="text-muted text-sm">
            You're at the oldest post!
          </div>
        </div>
      </div>
    </UButton>

    <!-- Next Post Button -->
    <UButton
      variant="outline"
      :disabled="!post.next"
      class="flex-1 h-auto rounded p-0 group"
      :to="post.next ? getHref(post.next.path) : undefined"
    >
      <div class="flex items-center gap-4 w-full justify-end px-4 py-2">
        <div class="flex flex-col items-end">
          <div class="text-muted text-sm">Next Post</div>
          <div v-if="post.next" class="text-right font-medium">
            {{ post.next.title }}
          </div>
          <div v-else class="text-muted text-sm">
            You're at the newest post!
          </div>
        </div>
        <UIcon
          name="i-lucide-chevron-right"
          class="transition-transform duration-200 ease-in-out group-hover:translate-x-1"
          :class="post.next ? '' : 'text-muted'"
        />
      </div>
    </UButton>
  </div>
</template>

<script setup lang="ts">
interface SurroundPost {
  path: string;
  title: string;
}

interface PostData {
  previous?: SurroundPost;
  next?: SurroundPost;
}

interface Props {
  post: PostData;
  contentType?: "articles" | "deep-dives";
}

const props = withDefaults(defineProps<Props>(), {
  contentType: "articles",
});

const getHref = (path: string) => {
  return props.contentType === "deep-dives" ? `${path}` : `${path}`;
};

console.log("Surround props:", props.post);
</script>
