<template>
  <Motion
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
      duration: 0.5,
      delay: delay,
    }"
  >
    <slot />
  </Motion>
</template>

<script lang="ts" setup>
defineProps({
  delay: Number,
});
</script>
