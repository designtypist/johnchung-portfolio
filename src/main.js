// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  if (process.isClient) {
      const VueEasyLightbox = require('vue-easy-lightbox').default;
      Vue.use(VueEasyLightbox);
  }

  head.meta.push({
    name: 'keywords',
    content: 'Gridsome,Vue,Vue.js,Vuejs,Tailwind,Tailwind CSS,JohnCDraws,DesignTypist,Portfolio,Artist'
  })

  head.meta.push({
    name: 'description',
    content: 'John Chung\'s Portfolio'
  })

  head.meta.push({
    name: 'author',
    content: 'designtypist'
  })

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Nunito+Sans:400,700'
  })
}
