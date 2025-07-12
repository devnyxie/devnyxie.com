<template>
  <NuxtLink
    :to="`/blog/tags/${tag}`"
    class="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors"
  >
    <!-- <UBadge
      color="secondary"
      variant="soft"
      class="hover:bg-secondary/20"
      size="md"
      :avatar="{
        src: avatar,
      }"
      v-if="avatar"
    >
      {{ tag }}
    </UBadge>
    <UBadge color="secondary" variant="soft" size="md" :icon="icon" v-else>
      {{ tag }}
    </UBadge> -->
    <UButton
      color="info"
      variant="ghost"
      size="sm"
      v-if="avatar"
      class="flex items-center gap-2"
    >
      <!-- <img
        v-if="avatar"
        :src="avatar"
        :alt="tag"
        class="h-4 rounded-full"
        loading="lazy"
      /> -->
      #{{ tag }}
    </UButton>
    <UButton color="info" variant="ghost" size="sm" :icon="icon" v-else>
      #{{ tag }}
    </UButton>
  </NuxtLink>
</template>

<script lang="ts" setup>
interface Props {
  tag: string;
}
const props = defineProps<Props>();

const { data: iconData } = await useAsyncData(`icon-${props.tag}`, () => {
  return queryCollection("tagIcons")
    .where("stem", "=", `tag-icons/${props.tag.toLowerCase()}`)
    .first();
});

// Pick public_icon if present, fallback to nuxt_icon, else undefined
const icon = computed(() => iconData.value?.nuxt_icon || undefined);
const avatar = computed(() => iconData.value?.public_icon || undefined);
</script>

<style></style>
