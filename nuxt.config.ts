// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "path"

export default defineNuxtConfig({
  nitro: {
    node: true,
  },
  devtools: { enabled: true },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  runtimeConfig: {
    public: {
      scanApiUrl: process.env.SCAN_API_URL,
      graphApiUrl: process.env.GRAPH_API_URL,
    },
  },
  ssr: false,
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "nuxt-primevue",
    "@nuxt/image",
    "@vueuse/nuxt",
    "@nuxtjs/apollo",
    "nuxt3-leaflet",
    "@hypernym/nuxt-anime",
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
  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.GRAPH_API_URL as string,
      },
    },
  },
})
