// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "path"
import t from "./android/app/src/main/assets/public/_nuxt/BJ4xbtYk"

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
    "@sidebase/nuxt-auth",
    "@nuxtjs/color-mode",
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
  auth: {
    globalAppMiddleware: false,
    baseURL: process.env.NUXT_PUBLIC_API_URL ?? "https://be.tegar.dev/",
    provider: {
      type: "local",
      endpoints: {
        signIn: { path: "login", method: "post" },
        signOut: { path: "logout", method: "post" },
        signUp: { path: "register", method: "post" },
        getSession: { path: "me", method: "post" },
      },
      pages: {
        login: "/auth/login",
      },
      token: {
        signInResponseTokenPointer: "/token",
      },
    },
    sessionRefresh: {
      enablePeriodically: true,
      enableOnWindowFocus: true,
    },
  },
})
