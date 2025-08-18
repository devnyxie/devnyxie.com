<template>
  <UBadge
    :icon="stateMap[lwstate].icon"
    :color="stateMap[lwstate].color"
    variant="outline"
    class="capitalize font-light"
  >
    {{ stateMap[lwstate].title }}
  </UBadge>
</template>

<script lang="ts" setup>
import type { BadgeProps } from "@nuxt/ui";

interface Props {
  state: string;
}
const props = defineProps<Props>();
const lwstate = props.state.toLowerCase();

const stateMap: Record<
  string,
  { icon: string; color: BadgeProps["color"]; title: string }
> = {
  published: {
    icon: "material-symbols:check-rounded",
    color: "success",
    title: "Published",
  },
  draft: {
    icon: "material-symbols:edit-outline-rounded",
    color: "neutral",
    title: "Draft",
  },
  archived: {
    icon: "material-symbols:archive-rounded",
    color: "warning",
    title: "Archived",
  },
  in_progress: {
    icon: "material-symbols:hourglass-bottom",
    color: "info",
    title: "In Progress",
  },
};
</script>
