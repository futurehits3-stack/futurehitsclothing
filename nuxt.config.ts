// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
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
      apiKey: 'AIzaSyCZygWXapIjMTzpajcKy7W-L76zkR7TzrI',
      authDomain: 'futurehitsclothing.firebaseapp.com',
      projectId: 'futurehitsclothing',
      appId: '1:1087959510209:web:7e1c49a3fc00162b937840',
      // there could be other properties depending on the project
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
  auth: {
      enabled: true
    },
})
