<template>
  <UBadge
    :icon="
      lwstate == 'published'
        ? 'material-symbols:check-rounded'
        : lwstate == 'draft'
          ? 'material-symbols:edit-outline-rounded'
          : 'material-symbols:archive-rounded'
    "
    :color="
      lwstate == 'published'
        ? 'success'
        : lwstate == 'draft'
          ? 'neutral'
          : 'warning'
    "
    variant="outline"
    class="capitalize font-light"
  >
    {{ state }}
  </UBadge>
</template>

<script lang="ts" setup>
console.log("PortfolioProjectState component loaded");
interface Props {
  state: string;
}
const props = defineProps<Props>();
const lwstate = props.state.toLowerCase();
</script>

<style></style>
