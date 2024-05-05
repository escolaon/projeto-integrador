// https://nuxt.com/docs/api/configuration/nuxt-config
const description = "Escola ON - Sistema de Gestão Escolar";
const lang = "pt";
const title = "Escola ON";
const themeColor = "#111827";
const url = process.env.PUBLIC_URL;

export default defineNuxtConfig({
  devtools: { enabled: false },
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
  modules: [
    "@sidebase/nuxt-auth",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "nuxt-icon",
    "@samk-dev/nuxt-vcalendar",
    "@morev/vue-transitions/nuxt",
    "@sidebase/nuxt-auth",
    "radix-vue/nuxt",
    "@vee-validate/nuxt",
    "@nuxt/content",
    "@kevinmarrec/nuxt-pwa",
    "@nuxtjs/seo",
    "@nuxt/eslint",
    "nuxt-swiper",
  ],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  auth: {
    globalAppMiddleware: true,
    provider: {
      type: "authjs",
    },
  },
  colorMode: {
    classSuffix: "",
  },

  typescript: {
    shim: false,
    tsConfig: {
      compilerOptions: {
        allowSyntheticDefaultImports: true,
      },
    },
  },
  vcalendar: {
    calendarOptions: {
      masks: {
        weekdays: "WW",
      },
    },
  },

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

  app: {
    pageTransition: { name: "fade", mode: "out-in" },
    layoutTransition: { name: "fade", mode: "out-in" },
    head: {
      title,
      titleTemplate: "EscolaON",
      script: [
        // Add pdfmake scripts for DataTables.net export buttons
        { src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/pdfmake.min.js", defer: true },
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/vfs_fonts.min.js",
          defer: true,
        },
      ],
    },
  },

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
      title
    },
  },
  site: {
    url,
    name: title,
    description,
    defaultLocale: lang,
    identity: { type: "Person" },
    indexable: true,
    ogImage: "/icon.png",
  },
  sitemap: { autoLastmod: true },
  ogImage: {
    defaults: {
      alt: title,
    },
  },

  build: {
    transpile: ["vue-sonner"],
  },


  future: {
    typescriptBundlerResolution: true,
  },
  experimental: {
    payloadExtraction: true,
    watcher: 'parcel'
  },
});
