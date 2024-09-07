const description = process.env.DESCRIPTION;
const lang = process.env.LANGUAGE;
const title = process.env.APP_NAME;
const url = process.env.PUBLIC_URL;
const titleTemplate = process.env.DESCRIPTION;
export default defineNuxtConfig({
  // Devtools configuration
  devtools: { enabled: false },

  // Vite configuration for optimizing dependencies
  vite: {
    optimizeDeps: {
      include: [
        "vue-use-active-scroll",
        "date-fns",
        "@unovis/ts",
        "vee-validate",
        "@vee-validate/zod",
        "zod",
        "v-calendar",
      ],
    },
  },

  // Modules to be included in the project
  modules: [
    "@sidebase/nuxt-auth",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@nuxt/icon",
    "@samk-dev/nuxt-vcalendar",
    "@morev/vue-transitions/nuxt",
    "radix-vue/nuxt",
    "@vee-validate/nuxt",
    "@nuxt/content",
    "@nuxtjs/seo",
    "@nuxt/eslint",
    "nuxt-swiper",
  ],

  // TailwindCSS configuration
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },

  // Auth configuration
  auth: {
    globalAppMiddleware: true,
    originEnvKey: 'AUTH_ORIGIN',
    baseURL: 'http://localhost:3000/api/auth',
    provider: { type: "authjs", },
    sessionRefresh: {
      enablePeriodically: true,
    },
  },

  // Color mode configuration
  colorMode: {
    classSuffix: "",
  },

  // TypeScript configuration
  typescript: {
    shim: false,
    tsConfig: {
      compilerOptions: {
        allowSyntheticDefaultImports: true,
      },
    },
  },

  // v-calendar configuration
  vcalendar: {
    calendarOptions: {
      masks: {
        weekdays: "WW",
      },
    },
  },

  // Imports configuration
  imports: {
    imports: [
      {
        from: "tailwind-variants",
        name: "tv",
      },
      {
        from: "tailwind-variants",
        name: "VariantProps",
        type: true,
      },
      {
        from: "vue-sonner",
        name: "toast",
        as: "useSonner",
      },
    ],
  },

  // Application configuration
  app: {
    pageTransition: { name: "fade", mode: "out-in" },
    layoutTransition: { name: "fade", mode: "out-in" },
    head: {
      title,
      titleTemplate,
      script: [
        { src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/pdfmake.min.js", defer: true },
        { src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/vfs_fonts.min.js", defer: true },
      ],
    },
  },


  // Site configuration
  site: {
    url,
    name: title,
    description,
    defaultLocale: lang,
    identity: { type: "Person" },
    indexable: true,
    ogImage: "/icon.png",
  },

  // Sitemap configuration
  sitemap: { autoLastmod: true },

  // OG image configuration
  ogImage: {
    defaults: {
      alt: title,
    },
  },

  // Build configuration
  build: {
    transpile: ["vue-sonner"],
  },

  // Future and experimental configurations
  future: {
    typescriptBundlerResolution: true,
  },

  experimental: {
    payloadExtraction: true,
    watcher: "chokidar-granular",
  },

  compatibilityDate: "2024-08-19",
});