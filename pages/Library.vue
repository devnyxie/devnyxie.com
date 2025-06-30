<template>
  <div class="w-full flex justify-center py-4 mt-16">
    <div class="container-medium mx-4">
      <div class="hero-section mb-8">
        <div class="flex gap-2 items-center">
          <div class="text-3xl font-bold">Sumi Library</div>
          <!-- <img
            src="/cherry-blossom-white.svg"
            class="w-12 h-12 mt-2 text-red-500"
            alt="Cherry Blossom"
          /> -->
        </div>
        <div class="text-xl font-light text-zinc-400">Tim's Digital Garden</div>
        <p class="text-zinc-500 dark:text-zinc-400 mt-2">
          Welcome. This is my little, minimalistic digital garden on the
          Internet.
        </p>
        <div class="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="What are you searching for?"
            class="w-full max-w-md px-3 py-2 border border-outline rounded"
            v-model="search"
          />
          <button
            class="flex items-center justify-center w-min px-3 py-2 border border-outline rounded"
          >
            <Icon name="material-symbols:filter-list-rounded" size="18px" />
          </button>
        </div>
      </div>
      <hr class="mt-8 mb-8 text-outline" />
      <div id="recent-posts" class="mb-8">
        <div class="text-2xl font-bold mb-4 text-foreground-secondary-hover">
          Recent Posts
        </div>
        <div
          v-if="posts.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <Card v-for="post in posts" :key="post.title" v-bind="post" />
        </div>
        <div v-else class="text-zinc-500 dark:text-zinc-400 mt-8">
          No posts available.
        </div>
      </div>
      <!-- <div id="deep-dives">
        <div class="text-2xl font-bold mb-2 text-foreground-secondary-hover">
          Deep Dives
        </div>
        <p class="text-zinc-500 dark:text-zinc-400 mb-4">
          Long-form tutorials and indexes on variety of development topics
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DeepDiveCard
            v-for="dive in deep_dives"
            :key="dive.title"
            :title="dive.title"
            :link="dive.link"
            :icon="dive.icon"
          />
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const search = ref("");

const posts = [
  {
    title: "push_swap: Bitwise Radix Sort",
    description:
      "Explanation and implementation of a bitwise radix sort algorithm for the push_swap project.",
    date: "2023-10-01",
    link: "/posts/internalizing-the-web",
    image:
      "https://i.pinimg.com/736x/a3/8d/7c/a38d7c78e53ad9a6aae7820726a7b0d0.jpg",
    tags: ["C", "algorithm"],
  },
  {
    title: "Go Types in Depth",
    description: "A comprehensive guide to understanding all Go types.",
    date: "2023-09-15",
    link: "/posts/the-art-of-note-taking",
    image:
      "https://i.pinimg.com/736x/47/07/7a/47077afadae63d23218df3b9920b639b.jpg",
    tags: ["Go", "Basics"],
  },
  {
    title: "so_long: 2D Game in C",
    description:
      "The so_long project is a simple game in C that uses the MinilibX library for graphics and user input.",
    date: "2023-08-20",
    link: "/posts/building-a-digital-garden",
    image:
      "https://i.pinimg.com/736x/3c/ab/89/3cab8929fcd398e17efeeb29435a6782.jpg",
    tags: ["C", "Game Development", "MinilibX"],
  },
  {
    title: "GNL: Efficient Buffer Management in C",
    description: "A guide to managing buffer for efficient data handling in C.",
    date: "2023-06-05",
    link: "/posts/the-power-of-linking-notes",
    image:
      "https://i.pinimg.com/736x/04/9c/6a/049c6ae1db6f8b571cefdb6e95735edd.jpg",
    tags: ["C", "Memory Management", "Low-Level Programming"],
  },
  {
    title: "Raspi Part 1: Setup & Cloudflare Tunnel",
    description: "A deep dive into the Zettelkasten method.",
    date: "2023-07-10",
    link: "/posts/understanding-zettelkasten",
    image:
      "https://i.pinimg.com/736x/49/3f/d6/493fd6b10b2fe259414f7d06e4625647.jpg",
    tags: ["knowledge", "zettelkasten"],
  },
  {
    title: "The Power of Linking Notes 3",
    description: "How to connect your ideas effectively.",
    date: "2023-06-05",
    link: "/posts/the-power-of-linking-notes",
    image:
      "https://i.pinimg.com/736x/50/dc/41/50dc41c3f1d6f199d09533c7faa867e2.jpg",
    tags: ["knowledge", "linking notes"],
  },
];

const deep_dives = [
  {
    title: "Deep Dive into C",
    link: "/deep-dives/js-event-loop",
    icon: h("img", {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/C_Programming_Language.svg/926px-C_Programming_Language.svg.png",
      alt: "C",
      class: "w-auto h-6",
      loading: "lazy",
    }),
  },
  {
    title: "Deep Dive into JavaScript",
    link: "/deep-dives/js-event-loop",
    icon: h("img", {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1024px-Unofficial_JavaScript_logo_2.svg.png",
      alt: "JS",
      class: "w-auto h-6",
      loading: "lazy",
    }),
  },
  {
    title: "How to Use Redux and React",
    link: "/deep-dives/redux-react",
    icon: h("img", {
      src: "https://cdn.worldvectorlogo.com/logos/redux.svg",
      alt: "Redux",
      class: "w-auto h-6",
      loading: "lazy",
    }),
  },
  {
    title: "How to Set up a Mac for Development",
    link: "/deep-dives/mac-dev-setup",
    icon: h("img", {
      src: "https://upload.wikimedia.org/wikipedia/commons/8/84/Apple_Computer_Logo_rainbow.svg",
      alt: "Apple",
      class: "w-auto h-6",
      loading: "lazy",
    }),
  },
];
</script>

<style scoped>
/* Add any custom styles here */
</style>
