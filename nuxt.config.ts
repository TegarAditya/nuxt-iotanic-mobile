// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "path"

export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  ssr: false,
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "nuxt-primevue",
    "@nuxt/image",
    "@vueuse/nuxt",
  ],
  tailwindcss: {
    configPath: "tailwind.config.js",
  },
  primevue: {
    options: {
      unstyled: true,
      ripple: true,
    },
    importPT: { from: path.resolve(__dirname, "./presets/aura/") }, //import and apply preset
  },
  googleFonts: {
    families: {
      "Plus Jakarta Sans": {
        wght: "200..800",
        ital: "200..800",
      },
    },
  },
})
