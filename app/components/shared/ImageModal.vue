<template>
  <Transition
    enter-active-class="transition-opacity duration-300 ease-out"
    leave-active-class="transition-opacity duration-300 ease-in"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-show="isOpen"
      class="fixed inset-0 backdrop-blur-2xl flex items-center justify-center z-50"
      @click="onClose"
    >
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-300 ease-in"
        enter-from-class="scale-75 opacity-0"
        enter-to-class="scale-100 opacity-100"
        leave-from-class="scale-100 opacity-100"
        leave-to-class="scale-75 opacity-0"
      >
        <div
          v-show="isOpen"
          class="relative flex items-center justify-center p-4"
          @click.stop
        >
          <img
            ref="imageRef"
            :src="src"
            :alt="alt"
            class="rounded-lg cursor-zoom-out"
            :style="imageStyles"
            @load="handleImageLoad"
            @click="onClose"
          />
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
export interface Props {
  src: string;
  alt: string;
  isOpen: boolean;
}

export interface Emits {
  close: [];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const imageRef = ref<HTMLImageElement>();

const imageDimensions = ref({
  width: 0,
  height: 0,
});

const onClose = () => {
  emit("close");
};

const handleImageLoad = (event: Event) => {
  const img = event.currentTarget as HTMLImageElement;
  imageDimensions.value = {
    width: img.naturalWidth,
    height: img.naturalHeight,
  };
};

const imageStyles = computed((): Record<string, string> => {
  if (!imageDimensions.value.width || !imageDimensions.value.height) {
    return { maxWidth: "75%", maxHeight: "75%" }; // Fallback
  }

  if (typeof window !== "undefined") {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const imageAspectRatio =
      imageDimensions.value.width / imageDimensions.value.height;
    const viewportAspectRatio = viewportWidth / viewportHeight;

    // Reserve some padding (10% on each side)
    const maxWidth = viewportWidth * 0.9;
    const maxHeight = viewportHeight * 0.9;

    let finalWidth: number, finalHeight: number;

    if (imageAspectRatio > viewportAspectRatio) {
      // Image is wider relative to viewport - constrain by width
      finalWidth = Math.min(maxWidth, imageDimensions.value.width);
      finalHeight = finalWidth / imageAspectRatio;

      // If height is still too tall, constrain by height instead
      if (finalHeight > maxHeight) {
        finalHeight = maxHeight;
        finalWidth = finalHeight * imageAspectRatio;
      }
    } else {
      // Image is taller relative to viewport - constrain by height
      finalHeight = Math.min(maxHeight, imageDimensions.value.height);
      finalWidth = finalHeight * imageAspectRatio;

      // If width is still too wide, constrain by width instead
      if (finalWidth > maxWidth) {
        finalWidth = maxWidth;
        finalHeight = finalWidth / imageAspectRatio;
      }
    }

    return {
      width: `${finalWidth}px`,
      height: `${finalHeight}px`,
    };
  }

  return { maxWidth: "75%", maxHeight: "75%" };
});

// Handle body overflow when modal is open
watch(
  () => props.isOpen,
  (newValue) => {
    if (typeof window !== "undefined") {
      if (newValue) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
  }
);

// Cleanup on unmount
onUnmounted(() => {
  if (typeof window !== "undefined") {
    document.body.style.overflow = "";
  }
});

// Handle escape key
onMounted(() => {
  if (typeof window !== "undefined") {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && props.isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    onUnmounted(() => {
      document.removeEventListener("keydown", handleEscape);
    });
  }
});
</script>
