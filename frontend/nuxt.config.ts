// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    }
  },
  css: ['@/app/assets/css/main.css'],
  modules: ['@nuxt/ui', '@pinia/nuxt'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});