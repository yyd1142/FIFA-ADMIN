module.exports = {
  /*
  ** Headers of the page
  */
  router: {
    middleware: ['auth']
  },
  head: {
    title: 'FIFA后台管理系统',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
    ],
    // script: [
    //   {
    //     async: 'async',
    //     defer: 'defer',
    //     type: 'text/javascript',
    //     src: '/js/canvas.js'
    //   }
    // ],
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: [

    ]
  },
  dev: false,
  plugins: [
    '~/plugins/api',
    '~/plugins/element-ui',
    '~/utils/auth',
    '~/plugins/filters'
  ],
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/theme/index.css'
  ]
}
