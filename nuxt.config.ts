// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css", "~/assets/css/content.css"],
  // vite: { plugins: [tailwindcss()] },
  modules: [
    "@nuxt/icon",
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "motion-v/nuxt",
    "@nuxt/ui",
  ],
  colorMode: {
    classSuffix: "",
    classPrefix: "", // so it uses `dark`, not `dark-mode`
  },
  content: {
    renderer: {
      anchorLinks: {
        h1: true,
        h2: true,
        h3: true,
        h4: true,
        h5: true,
        h6: true,
      },
    },
    watch: {
      enabled: true,
      port: 4000,
      showURL: false,
    },
    build: {
      transformers: ["~~/transformers/obsidian-links"],
      markdown: {
        highlight: {
          theme: {
            default: "light-plus",
            dark: "dark-plus",
            light: "light-plus",
          },
          langs: ["c", "cpp", "java", "go"],
        },
        contentHeading: false,
      },
    },
  },
  hooks: {
    "content:file:afterParse"(ctx) {
      const { file, content } = ctx;

      const wordsPerMinute = 180;
      const text = typeof file.body === "string" ? file.body : "";
      const wordCount = text.split(/\s+/).length;

      content.readingTime = Math.ceil(wordCount / wordsPerMinute);
    },
  },
});
