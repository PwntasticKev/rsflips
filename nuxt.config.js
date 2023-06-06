import colors from 'vuetify/es5/util/colors';

const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
const authDomain = isDev ? 'localhost:3000' : 'rsflips-pwntastickev.vercel.app';

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Exchange',
    title: 'Exchange',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/geicon.png' }]
  },

  privateRuntimeConfig: {
    apiKey: process.env.WEB_API_KEY,
    authDomain,
    projectId: process.env.PROJECT_ID
  },

  version: 2,
  builds: [
    {
      src: 'nuxt.config.js',
      use: '@nuxtjs/vercel-builder'
    }
  ],

  routes: [
    {
      src: '/sw.js',
      continue: true,
      headers: {
        'Cache-Control': 'public, max-age=0, must-revalidate',
        'Service-Worker-Allowed': '/'
      }
    }
  ],

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: './store/index.js', ssr: false },
    { src: '~/plugins/firebase.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  eslint: {
    // ESLint options
    fix: true // Automatically fix ESLint errors on save
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/firebase'
  ],

  firebase: {
    config: {
      apiKey: '<%= options.privateRuntimeConfig.apiKey %>',
      authDomain: '<%= options.privateRuntimeConfig.authDomain %>',
      projectId: '<%= options.privateRuntimeConfig.projectId %>'
    },
    services: {
      auth: true // Enable the Firebase Auth service
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.amber.darken2,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.red.darken2,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [({ isLegacy }) => isLegacy && 'axios']
  },
  alias: {
    '@/components': path.resolve(__dirname, '../components')
  }
};
