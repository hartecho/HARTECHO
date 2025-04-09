// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  routeRules: {
    // Homepage pre-rendered at build time
    '/': { prerender: true },
    '/free': { prerender: true },
    '/terms': { prerender: true },
    '/privacy': { prerender: true },
    '/calc': { prerender: true },
    '/hw': { prerender: true },
    // Blog posts page generated on demand, revalidates in background, cached on CDN for 1 hour (3600 seconds)
    '/blog': { ssr: true },
    // Blog post page generated on demand once until next deployment, cached on CDN
    '/blog/**': { ssr: true },
    // Portfolio Item page generated on demand once until next deployment, cached on CDN
    '/portfolioItem/**': { ssr: true },
    '/forms': { ssr: true},
    '/forms/**': { ssr: true},
    '/formResponses/**': { ssr: true },
  },
  devtools: { enabled: true },
  app: {
    pageTransition: {
      name: 'fade', // Use 'fade' as the transition name or choose your own
      mode: 'out-in' // Ensure the new page fades in only after the old page fades out
    }
  },
  css: ['~/css/Transitions/Fade.css'],
  modules: ['@nuxtjs/google-fonts', "@nuxt/image"],
  googleFonts: {
    families: {
      'Source+Sans+Pro': [400, 600, 700], // Loads only the specified weights
      Roboto: [400, 700],
      Poppins: [400, 700], // Added Poppins with specific weights
    },
    download: true, // Optional: Downloads fonts to serve them locally
    display: 'swap'
  },
  nitro: {
    // prerender: {
    //   routes: ['/'],
    //   crawlLinks: false, // Automatically discover links to prerender
    // },
    compressPublicAssets: true, // This enables compression for public assets
  },
  ignore: process.env.NODE_ENV === 'production' 
  ? [
      'pages/blog/editBlogs.vue', 
      'pages/portfolioItem/editPortfolio.vue',
    ] 
  : [],
  runtimeConfig: {    
    DB_URI: process.env.DB_URI,
    TEST_KLAVIYO_PRIVATE_KEY: process.env.TEST_KLAVIYO_PRIVATE_KEY,
    KLAVIYO_PRIVATE_KEY: process.env.KLAVIYO_PRIVATE_KEY,

    public: {
      TEST_KLAVIYO_PUBLIC_KEY: process.env.TEST_KLAVIYO_PUBLIC_KEY,
      TEST_KLAVIYO_WAITLIST_ID: process.env.TEST_KLAVIYO_WAITLIST_ID,
      KLAVIYO_PUBLIC_KEY: process.env.KLAVIYO_PUBLIC_KEY,
      KLAVIYO_WAITLIST_ID: process.env.KLAVIYO_WAITLIST_ID,
      META_PIXEL_ID: process.env.META_PIXEL_ID
    }
  },
  compatibilityDate: '2024-07-10',
})
