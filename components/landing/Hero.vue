<script setup lang="ts">
import type { IndexCollectionItem } from "@nuxt/content";

const { footer, global } = useAppConfig();

defineProps<{
  page: IndexCollectionItem;
}>();
</script>

<template>
  <div class="flex flex-col items-center justify-center h-[400px] gap-4">
    <div class="flex items-center justify-center">
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
          duration: 0.6,
          delay: 0.1,
        }"
      >
        <img
          class="w-24 h-24 object-fill rounded-full border-2 border-muted"
          :src="global.picture.src"
        />
      </Motion>
    </div>

    <div class="max-w-lg mx-auto">
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
          duration: 0.6,
          delay: 0.1,
        }"
      >
        <p
          class="text-shadow-md text-4xl font-bold text-center tracking-tight text-pretty"
        >
          {{ page.title }}
        </p>
      </Motion>
    </div>

    <div class="text-muted text-center">
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
          duration: 0.6,
          delay: 0.3,
        }"
      >
        Passionate about crafting elegant solutions and building impactful
        software<br />
        Based in Warsaw, available for both Frontend and Backend projects
      </Motion>
    </div>

    <div clas="mt-4 flex-col justify-center items-center">
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
          duration: 0.6,
          delay: 0.5,
        }"
      >
        <!-- <div v-if="page.hero.links" class="flex items-center gap-2">
          <UButton v-bind="page.hero.links[0]" />
          <UButton
            :color="global.available ? 'success' : 'error'"
            variant="ghost"
            class="gap-2"
            :to="global.available ? global.meetingLink : ''"
            :label="
              global.available
                ? 'Available for new projects'
                : 'Not available at the moment'
            "
          >
            <div #leading>
              <span class="relative flex size-2">
                <span
                  class="absolute inline-flex size-full rounded-full opacity-75"
                  :class="
                    global.available ? 'bg-success animate-ping' : 'bg-error'
                  "
                />
                <span
                  class="relative inline-flex size-2 scale-90 rounded-full"
                  :class="global.available ? 'bg-success' : 'bg-error'"
                />
              </span>
            </div>
          </UButton>
        </div> -->
      </Motion>

      <!-- <div class="gap-x-4 inline-flex mt-4">
        <Motion
          v-for="(link, index) of links"
          :key="index"
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
            duration: 0.6,
            delay: 0.5 + index * 0.1,
          }"
        >
          <button>test</button>
        </Motion>
      </div> -->
    </div>
  </div>
</template>
