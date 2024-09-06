const description = "Escola ON - Sistema de Gestão Escolar";
const lang = "pt";
const title = "Escola ON";
const themeColor = "#111827";
const url = process.env.PUBLIC_URL;

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
    "nuxt-icon",
    "@samk-dev/nuxt-vcalendar",
    "@morev/vue-transitions/nuxt",
    "radix-vue/nuxt",
    "@vee-validate/nuxt",
    "@nuxt/content",
    "@kevinmarrec/nuxt-pwa",
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
    provider: {
      type: "authjs",
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
      titleTemplate: "EscolaON",
      script: [
        { src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/pdfmake.min.js", defer: true },
        { src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/vfs_fonts.min.js", defer: true },
      ],
    },
  },

  // PWA configuration
  pwa: {
    meta: {
      description,
      lang,
      name: title,
      ogDescription: description,
      ogSiteName: title,
      ogTitle: title,
      ogType: "website",
      ogUrl: url,
      theme_color: themeColor,
      title,
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