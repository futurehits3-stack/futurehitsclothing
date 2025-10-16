// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import colors from 'vuetify/util/colors'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#213f27', // #E53935
            secondary: colors.blue.lighten4, // #FFCDD2,
            background: colors.grey.lighten5,
          },
        },
        dark: {
          colors: {
            primary: colors.blue.darken1, // #E53935
            secondary: colors.blue.lighten4, // #FFCDD2,
            background: colors.grey.darken1,
          },
        },
      },
    },
  })
  app.vueApp.use(vuetify)
})