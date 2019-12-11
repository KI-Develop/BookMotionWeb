export default {
  mode: 'spa',
  head: {
    title: 'BookMotion',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js TypeScript project'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#fff' },
  css: ['iview/dist/styles/iview.css', 'firebaseui/dist/firebaseui.css'],
  build: {},
  buildModules: ['@nuxt/typescript-build'],
  modules: [
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-154460877-1'
      }
    ]
  ],
  plugins: ['@/plugins/iview'],
  router: {
    middleware: ['authenticated']
  }
}
