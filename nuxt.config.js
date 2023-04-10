const isDev = process.env.NODE_ENV !== 'production'

export default {
  head: {
    title: 'МедТакси',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1'
      },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  css: ['~assets/scss/main.scss'],

  plugins: [
    '~plugins/v-global-components',
    '~plugins/v-mask',
    '~plugins/v-click-outside',
    '~plugins/v-modal.js',
    '~plugins/v-axios',
    '~plugins/vuelidate.js',
    { src: '~/plugins/v-viewer.js', ssr: false },
    { src: '~/plugins/v-swiper.js', ssr: false },
    { src: '~/plugins/v-ymap.js', ssr: false }
  ],

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/style-resources'],

  styleResources: {
    scss: [
      '~assets/scss/_vars.scss',
      '~assets/scss/_mixins.scss',
      '~assets/scss/_functions.scss'
    ]
  },

  svgSprite: {
    input: '~/assets/svg/',
    output: '~/assets/svg/sprite'
  },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/svg-sprite',
    ['vue-scrollto/nuxt', { duration: 300 }]
  ]
}
