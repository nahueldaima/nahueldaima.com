// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width,initial-scale=1',
      title: 'Nahuel Daima',
      titleTemplate: '%s - Nahuel Daima',
      meta: [{ name: 'description', content: 'Nahuel Daima' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  sitemap: {
    strictNuxtContentPaths: true,
  },
  site: {
    url: 'https://nahueldaima.com',
    identity: {
      type: 'Person',
    },
    twitter: '@leodaima',
  },

  typescript: {
    strict: true,
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
      ],
    },
    output: {
      publicDir: 'dist',
    },
  },

  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'light',
  },

  modules: [
    'nuxt-icon',
    '@nuxt/image',
    '@vueuse/nuxt',
    'nuxt-og-image',
    '@nuxt/content',
    '@nuxtjs/robots',
    '@nuxtjs/fontaine',
    '@nuxtjs/color-mode',
    'nuxt-simple-sitemap',
    '@nuxtjs/tailwindcss',
    '@stefanobartoletti/nuxt-social-share',
    '@nuxtjs/i18n',
    'nuxt-gtag',
  ],

  // content: {
  //   highlight: {
  //     theme: 'dracula',
  //   }
  // },

  i18n: {
    baseUrl: 'https://nahueldaima.com',
    locales: [
      { code: 'en', iso: 'en-GB', dir: 'ltr', name: 'English' },
      { code: 'es', iso: 'es-ES', dir: 'ltr', name: 'Español' },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    vueI18n: './i18n.config.ts', // if you are using custom path, default
    customRoutes: 'config',
  },

  gtag: {
    id: process.env.GOOGLE_ANALYTICS_ID,
    initCommands: [
      // Setup up consent mode
      ['consent', 'default', {
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        ad_storage: 'denied',
        analytics_storage: 'denied',
        wait_for_update: 500,
      }],
    ],
  },
})
