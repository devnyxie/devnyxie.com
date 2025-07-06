// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
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
    watch: {
      enabled: true,
      port: 4000,
      showURL: false,
    },
  },
});
