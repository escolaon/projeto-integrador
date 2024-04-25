// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      title: 'Controle de Presença'
    }
  },
  devtools: { enabled: true },
  // experimental: {
  //   watcher: 'chokidar'
  // },
  alias: {
    '@': resolve(__dirname, '/'),
  },
  css: [
    '~/assets/main.scss'
  ],
})
