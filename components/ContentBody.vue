<template>
  <section
    :class="[
      'content-body',
      variant === 'default' ? 'content-body-default' : 'content-body-accent',
      className,
    ]"
  >
    <slot />
  </section>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps({
  /** Background variant: default or accent */
  variant: {
    type: String as () => "default" | "accent",
    default: "default",
  },
  /** Additional classes */
  className: {
    type: String,
    default: "",
  },
});
</script>

<style></style>
