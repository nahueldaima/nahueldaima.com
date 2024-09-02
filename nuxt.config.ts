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

  site: {
    url: 'https://nahueldaima.com',
    name: 'Nahuel Daima',
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

  image: {
    providers: {
      s3: {
        provider: '~/providers/s3-provider.ts',
        options: {
          baseURL: process.env.IMAGES_BASE_URL,
        },
      },
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
    '@nuxtjs/tailwindcss',
    '@stefanobartoletti/nuxt-social-share',
    '@nuxtjs/i18n',
    'nuxt-gtag',
    '@nuxtjs/sitemap',
  ],

  sitemap: {
    strictNuxtContentPaths: true
  },

  content: {
    markdown: {
      anchorLinks: false,
    },
  },

  i18n: {
    baseUrl: 'https://nahueldaima.com',
    locales: [
      { code: 'en', iso: 'en-GB', dir: 'ltr', name: 'English' },
      { code: 'es', iso: 'es-ES', dir: 'ltr', name: 'Español' },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
    },
    vueI18n: './i18n.config.ts', // if you are using custom path, default
    // customRoutes: 'config',
  },

  gtag: {
    id: process.env.GOOGLE_ANALYTICS_ID,
    initCommands: [
      ['consent', 'default', {
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        ad_storage: 'granted',
        analytics_storage: 'granted',
        wait_for_update: 500,
      }],
    ],
  },
  compatibilityDate: '2024-08-31',
})