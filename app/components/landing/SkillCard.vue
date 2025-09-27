<template>
  <div
    :class="
      cn(
        'group relative overflow-hidden rounded-lg border border-muted bg-elevated p-4 transition-all duration-300 hover:shadow-md hover:border-muted-foreground/20',
        color.bgColor,
        size === 'large' && 'p-6',
        size === 'small' && 'p-3'
      )
    "
  >
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-3">
        <div v-if="skill.icon" class="flex-shrink-0">
          <img
            :src="skill.icon"
            :alt="`${skill.title} icon`"
            :class="
              cn(
                'transition-all duration-300',
                size === 'large' ? 'w-8 h-8' : 'w-6 h-6'
              )
            "
          />
        </div>
        <h3
          :class="
            cn(
              'font-medium text-foreground-highlighted',
              size === 'large' ? 'text-lg' : 'text-base'
            )
          "
        >
          {{ skill.title }}
        </h3>
      </div>

      <p
        v-if="skill.description && size !== 'small'"
        class="text-sm text-muted-foreground leading-relaxed"
      >
        {{ skill.description }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { cn } from "~/utils/cn";
import { computed } from "vue";

interface SkillItem {
  title: string;
  description?: string;
  icon?: string;
  color: "blue" | "green" | "purple" | "orange" | "pink" | "teal";
}

interface SkillCardProps {
  skill: SkillItem;
  size?: "small" | "default" | "large";
}

const props = withDefaults(defineProps<SkillCardProps>(), {
  size: "default",
});

const skillColors = {
  blue: {
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  green: {
    bgColor: "bg-green-50 dark:bg-green-950/20",
    iconColor: "text-green-600 dark:text-green-400",
  },
  purple: {
    // bgColor: "bg-purple-50 dark:bg-purple-900/10",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",

    iconColor: "text-purple-600 dark:text-purple-400",
  },
  orange: {
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  pink: {
    bgColor: "bg-pink-50 dark:bg-pink-950/20",
    iconColor: "text-pink-600 dark:text-pink-400",
  },
  teal: {
    bgColor: "bg-teal-50 dark:bg-teal-950/20",
    iconColor: "text-teal-600 dark:text-teal-400",
  },
};

const color = computed(() => skillColors[props.skill.color]);
</script>
