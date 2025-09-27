<template>
  <div
    class="rounded-lg col-span-1 flex gap-4 p-4 bg-elevated border border-muted"
  >
    <div class="">
      <p class="text-sm text-muted mb-1">
        {{
          new Date(date).toLocaleString("default", {
            month: "long",
          })
        }}
        {{ new Date(date).getFullYear() }}
      </p>
      <div class="flex items-center gap-2 mb-2">
        <h3 class="text-lg font-semibold">
          {{ title }}
        </h3>
        <PortfolioProjectState v-if="state" :state="state" class="ml-2" />
      </div>
      <p class="text-sm mb-4">
        {{ description }}
      </p>
      <div class="flex flex-wrap gap-1">
        <SharedTag
          v-for="tag in tags"
          :key="tag"
          :name="tag"
          variant="subtle"
          :path="`/portfolio/tags/${tag}`"
        />
      </div>
    </div>
    <img
      v-if="image"
      :src="image"
      :alt="title"
      class="shrink-0 h-32 w-max border border-muted rounded overflow-hidden cursor-pointer hover:opacity-90 transition-opacity duration-200"
      @click="openImageModal"
    />
    <SharedImageModal
      :src="modalImage.src"
      :alt="modalImage.alt"
      :is-open="isModalOpen"
      @close="closeModal"
    />
  </div>
</template>

<script lang="ts" setup>
import Tag from "../shared/Tag.vue";
import type { ProjectStateTypes } from "./ProjectState.vue";

interface Props {
  title: string;
  description: string;
  state?: ProjectStateTypes;
  date: string;
  image?: string;
  tags?: string[];
}

const props = defineProps<Props>();

// Modal state
const isModalOpen = ref(false);
const modalImage = ref({
  src: "",
  alt: "",
});

const openImageModal = () => {
  if (props.image) {
    modalImage.value = {
      src: props.image,
      alt: props.title,
    };
    isModalOpen.value = true;
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  // Clear the modal image after animation completes
  setTimeout(() => {
    if (!isModalOpen.value) {
      modalImage.value = { src: "", alt: "" };
    }
  }, 300);
};
</script>

<style></style>
