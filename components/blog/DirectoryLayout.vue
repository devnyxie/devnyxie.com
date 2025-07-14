<!-- This component displays a list of blog posts under a specific directory -->
<template>
  <PageSection
    :title="`Posts in directory '${label}'`"
    :description="`${posts.length} post${posts.length !== 1 ? 's' : ''} found.`"
  >
    <div
      v-if="posts && posts.length > 0"
      class="grid grid-cols-1 lg:grid-cols-4 gap-4"
    >
      <BlogRowPost
        v-for="(post, index) in posts"
        :key="post.title"
        v-bind="post"
      />
    </div>
    <p v-if="!posts.length">No posts here.</p>
  </PageSection>
</template>

<script setup>
const props = defineProps({
  slugArray: {
    type: Array,
    required: true,
  },
  posts: {
    type: Array,
    required: true,
  },
});

const label = computed(
  () =>
    props.slugArray[props.slugArray.length - 1]?.charAt(0).toUpperCase() +
    props.slugArray[props.slugArray.length - 1]?.slice(1)
);
</script>
