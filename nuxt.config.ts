// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxtjs/sanity',
    '@pinia/nuxt',
    'nuxt-vuefire'
    //...
  ],
  
  sanity: {
    projectId: '129ldwfx'
  },
  vuefire: {
    config: {
      apiKey: "AIzaSyCZygWXapIjMTzpajcKy7W-L76zkR7TzrI",
      authDomain: "futurehitsclothing.firebaseapp.com",
      projectId: "futurehitsclothing",
      storageBucket: "futurehitsclothing.firebasestorage.app",
      messagingSenderId: "1087959510209",
      appId: "1:1087959510209:web:8619df43aeda682e937840",
      measurementId: "G-DT44LH9S68"
    },
    auth: {
      enabled: true,
      sessionCookie: true
    },
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    optimizeDeps: {
      include: ["@sanity/visual-editing"],
    },
  },
  
})
