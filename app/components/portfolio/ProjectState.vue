<template>
  <UBadge
    v-if="stateMap[lowerCasedState]"
    :icon="stateMap[lowerCasedState].icon"
    :color="stateMap[lowerCasedState].color"
    variant="outline"
    class="capitalize font-light"
  >
    {{ stateMap[lowerCasedState].title }}
  </UBadge>
</template>

<script lang="ts" setup>
import type { BadgeProps } from "@nuxt/ui";

export type ProjectStateTypes =
  | "published"
  | "draft"
  | "archived"
  | "in_progress";

interface Props {
  state: ProjectStateTypes;
}
const props = defineProps<Props>();

const stateMap: Record<
  ProjectStateTypes,
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

const lowerCasedState = props.state.toLowerCase() as ProjectStateTypes;
</script>
