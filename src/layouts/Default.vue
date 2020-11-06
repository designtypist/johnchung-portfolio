<template>

  <div class="content-wrapper bg-background-primary font-sans text-copy-primary leading-normal flex flex-col min-h-screen" :class="theme">
    <header class="container mx-auto lg:py-16 lg:px-8 p-6">
      <nav class="flex flex-wrap justify-between items-center">
        <div class="uppercase">
          <g-link to="/" class="lg:text-4xl text-3xl text-green-700">John Chung</g-link>
          <p class="text-xs">animator • illustrator • character designer</p>
        </div>
        <div class="flex items-center block lg:hidden">
          <div class="w-1/2 px-1">
            <theme-switcher class="" :theme="theme" @themeChanged="updateTheme" />
          </div>
          <div class="w-1/2 px-1">
          <button @click="toggle" class="flex items-center px-3 py-2 border rounded border-gray-500 hover:text-gray-600 hover:border-gray-600">
            <font-awesome :icon="['fas', 'bars']" />
          </button>
          </div>
        </div>
        <ul class="text-center tracking-wide font-bold w-full block flex-grow lg:flex lg:flex-initial lg:w-auto items-center mt-8 lg:mt-0" :class="isOpen ? 'block': 'hidden'">
          <!--<li class="lg:mx-4 lg:my-0 mx-0 my-4">
            <g-link to="/animation">animation</g-link>
          </li>-->
          <li class="lg:mx-4 lg:my-0 mx-0 my-4 lg:text-base text-lg">
            <g-link to="/">portfolio</g-link>
          </li>
          <li class="lg:mx-4 lg:my-0 mx-0 my-4 lg:text-base text-lg">
            <g-link to="/personal">personal</g-link>
          </li>
          <li class="lg:mx-4 lg:my-0 mx-0 my-4 lg:text-base text-lg">
            <g-link to="/about">about</g-link>
          </li>
          <!--<li class="lg:mx-4 lg:my-0 mx-0 my-4">
            <g-link to="/contact">contact</g-link>
          </li>-->

          <li class="lg:block hidden lg:mx-4 lg:my-0 mx-0 my-4">
            <theme-switcher :theme="theme" @themeChanged="updateTheme" />
          </li>
          <li class="block lg:hidden py-4">
            <SocialMedia :data="$static.socials.edges" :centered="true" class="text-center my-4" />
          </li>
          <li class="block lg:hidden text-gray-400 text-xs">
            &copy; {{ new Date().getFullYear() }}. All rights reserved.
          </li>
          <li class="block lg:hidden text-gray-400 text-xs">
            Developed and designed by 
            <a href="http://designtypist.com/" target="_blank">DesignTypist</a>
          </li>
        </ul>
      </nav>
    </header>

    <div class="flex-grow">
      <slot />
    </div>

    <footer class="container mx-auto md:px-16 md:pb-8 md:pt-16 pt-24 pb-12">
      <div class="flex flex-wrap">
        <div class="flex-initial lg:w-1/2 lg:text-left w-full text-center">
          <p>Copyright {{ new Date().getFullYear() }}. All rights reserved.<p/>
        </div>
        <div class="flex-initial lg:w-1/2 lg:text-left w-full text-center">
          <p class="lg:float-right none">Developed and designed by 
            <a href="http://designtypist.com/" target="_blank">DesignTypist</a>
          </p>
        </div>
      </div>
    </footer>
  </div>

</template>

<static-query>
query {
  metadata {
    siteName
  }
  socials: allSocial {
    edges {
      node  {
        id
        brand
        link
      }
    }
  }
}
</static-query>

<script>
import SearchInput from '../components/SearchInput'
import ThemeSwitcher from '../components/ThemeSwitcher'
import SocialMedia from '../components/SocialMedia'

export default {
  components: {
    SearchInput,
    ThemeSwitcher,
    SocialMedia
  },
  mounted() {
    this.theme = localStorage.getItem('theme') || 'theme-light'
  },
  data() {
    return {
      isOpen: false,
      theme: ''
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
    updateTheme(theme) {
      this.theme = theme
    }
  }
}
</script>
