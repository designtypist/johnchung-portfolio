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
          <li class="lg:mx-4 lg:my-0 mx-0 my-4">
            <g-link to="/">portfolio</g-link>
          </li>
          <li class="lg:mx-4 lg:my-0 mx-0 my-4">
            <g-link to="/personal">personal</g-link>
          </li>
          <li class="lg:mx-4 lg:my-0 mx-0 my-4">
            <g-link to="/about">about</g-link>
          </li>
          <!--<li class="lg:mx-4 lg:my-0 mx-0 my-4">
            <g-link to="/contact">contact</g-link>
          </li>-->

          <li class="lg:block hidden lg:mx-4 lg:my-0 mx-0 my-4">
            <theme-switcher :theme="theme" @themeChanged="updateTheme" />
          </li>
          <li class="block lg:hidden py-4">
            <ul>
              <li class="inline-block px-2">
                <a href="#" target="_blank"
                    data-name="johnchungart"
                    data-domain="gmail"
                    data-tld="com"
                    onclick="window.location.href = 'mailto:' + this.dataset.name + '@' + this.dataset.domain + '.' + this.dataset.tld; return false;">
                  <font-awesome :icon="['fas', 'envelope']" size="lg" />
                </a>
              </li>
              <li class="inline-block px-2">
                <a href="https://twitter.com/johncdraws" target="_blank">
                  <font-awesome :icon="['fab', 'twitter']" size="lg" />
                </a>
              </li>
              <li class="inline-block px-2">
                <a href="https://instagram.com/johncdraws" target="_blank">
                  <font-awesome :icon="['fab', 'instagram']" size="lg" />
                </a>
              </li>
            </ul>
          </li>
          <li class="block lg:hidden text-gray-400 text-xs">
            Copyright {{ new Date().getFullYear() }}. All rights reserved.
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

    <footer class="container mx-auto md:px-16 md:py-8 p-4">
      <div class="flex flex-wrap items-center my-2">
        <a class="cryptedmail flex-initial pr-4 text-xl" href="#" target="_blank"
            data-name="johnchungart"
            data-domain="gmail"
            data-tld="com"
            onclick="window.location.href = 'mailto:' + this.dataset.name + '@' + this.dataset.domain + '.' + this.dataset.tld; return false;"></a>
        <a class="flex-initial" href="#" target="_blank"
            data-name="johnchungart"
            data-domain="gmail"
            data-tld="com"
            onclick="window.location.href = 'mailto:' + this.dataset.name + '@' + this.dataset.domain + '.' + this.dataset.tld; return false;">
          <font-awesome :icon="['fas', 'envelope']" size="lg" />
        </a>
      </div>
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
}
</static-query>

<script>
import SearchInput from '../components/SearchInput'
import ThemeSwitcher from '../components/ThemeSwitcher'

export default {
  components: {
    SearchInput,
    ThemeSwitcher
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

<style src="../css/main.css" />
