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
    }
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
    'nuxt-site-config',
    'nuxt-og-image',
    '@nuxt/content',
    '@nuxtjs/robots',
    '@nuxtjs/fontaine',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@stefanobartoletti/nuxt-social-share',
    '@nuxtjs/i18n',
    'nuxt-gtag'
  ],
  ogImage: {
    // TEMPORARY: disabled because the satori renderer currently crashes on
    // this machine's toolchain (nitropack/unenv resolution bug — nitro fails
    // to load unenv/dist/runtime/runtime/mock/empty.mjs, a doubled path that
    // doesn't exist). Confirmed as a known upstream nitro/unenv issue, not
    // caused by any code in this repo. `enabled: false` keeps every
    // defineOgImageComponent() call a safe no-op instead of removing them.
    // Re-enable once nitropack/unenv/nuxt-og-image ship a compatible combo.
    enabled: false,
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
    strategy: 'prefix',
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
  routeRules: {
    "/tech/scaling-your-infrastructure-at-low-cost-with-aws-lambdas": {
      redirect: {
        to: "/en/tech/scaling-your-infrastructure-at-low-cost-with-aws-lambdas",
        statusCode: 301,
      },
    },
    // Travel section was folded into the About page — redirect every old
    // travel URL (legacy non-prefixed and both locales) there.
    "/travel/dont-travel-to-israel-on-a-friday": {
      redirect: { to: "/en/about", statusCode: 301 },
    },
    "/travel/lessons-from-a-digital-nomad": {
      redirect: { to: "/en/about", statusCode: 301 },
    },
    "/travel/proven-strategies-for-digitial-nomads": {
      redirect: { to: "/en/about", statusCode: 301 },
    },
    "/travel": {
      redirect: { to: "/en/about", statusCode: 301 },
    },
    "/en/travel": {
      redirect: { to: "/en/about", statusCode: 301 },
    },
    "/es/travel": {
      redirect: { to: "/es/about", statusCode: 301 },
    },
    "/en/travel/dont-travel-to-israel-on-a-friday": {
      redirect: { to: "/en/about", statusCode: 301 },
    },
    "/es/travel/dont-travel-to-israel-on-a-friday": {
      redirect: { to: "/es/about", statusCode: 301 },
    },
    "/en/travel/lessons-from-a-digital-nomad": {
      redirect: { to: "/en/about", statusCode: 301 },
    },
    "/es/travel/lessons-from-a-digital-nomad": {
      redirect: { to: "/es/about", statusCode: 301 },
    },
    "/en/travel/proven-strategies-for-digitial-nomads": {
      redirect: { to: "/en/about", statusCode: 301 },
    },
    "/es/travel/proven-strategies-for-digitial-nomads": {
      redirect: { to: "/es/about", statusCode: 301 },
    },
  },
})