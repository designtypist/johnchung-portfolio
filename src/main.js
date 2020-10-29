// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faTwitter, faTumblr } from '@fortawesome/free-brands-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'
import './css/main.css';

config.autoAddCss = false;
library.add(faBars, faEnvelope, 
              faInstagram, faTwitter, faTumblr)

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('font-awesome', FontAwesomeIcon)

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
