<template>
  <div :class="cn('w-full')">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <LandingSkillCard
        v-for="skill in skills"
        :key="skill.title"
        :skill="skill"
        size="default"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { cn } from "~/utils/cn";

interface SkillItem {
  title: string;
  description?: string;
  icon?: string;
  color: "blue" | "green" | "purple" | "orange" | "pink" | "teal";
}

interface SkillsBentoProps {
  skills: SkillItem[];
}

defineProps<SkillsBentoProps>();
</script>
