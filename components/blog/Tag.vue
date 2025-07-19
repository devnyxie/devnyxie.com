<template>
  <NuxtLink
    :to="`/blog/tags/${tag}`"
    class="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors"
  >
    <UButton
      color="info"
      :variant="variant"
      size="sm"
      v-if="avatar"
      class="flex items-center gap-2"
    >
      #{{ tag }}
    </UButton>
    <UButton color="info" :variant="variant" size="sm" :icon="icon" v-else>
      #{{ tag }}
    </UButton>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { ButtonProps } from "@nuxt/ui";

interface Props {
  tag: string;
  variant: ButtonProps["variant"];
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
