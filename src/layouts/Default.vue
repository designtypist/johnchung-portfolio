<template>
<div class="content-wrapper bg-background-primary font-sans text-copy-primary leading-normal flex flex-col min-h-screen" :class="theme">
  <header class="container mx-auto px-16">
    <nav class="flex flex-wrap justify-between items-center py-8">
      <div class="uppercase">
        <g-link to="/" class="text-4xl text-green-700">John Chung</g-link>
        <p class="text-xs">animator • illustrator • character designer</p>
        <!--<g-link v-if="theme === 'theme-light'" to="/"><g-image src="../../static/logo.svg" class="w-40" alt="logo" /></g-link>
          <g-link v-else to="/"><g-image src="../../static/logo_dark_mode.svg" class="w-40" alt="logo" /></g-link>-->
      </div>
      <div class="block lg:hidden">
        <button @click="toggle" class="flex items-center px-3 py-2 border rounded border-gray-500 hover:text-gray-600 hover:border-gray-600">
          <svg class="current-color h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" fill="gray" /></svg>
        </button>
      </div>
      <ul class="tracking-wide font-bold w-full block flex-grow lg:flex lg:flex-initial lg:w-auto items-center mt-8 lg:mt-0" :class="isOpen ? 'block': 'hidden'">
        <!--<li class="mr-8 mb-6 lg:mb-0">
            <search-input />
          </li>-->
        <li class="mr-8 mb-6 lg:mb-0">
          <g-link to="/animation">animation</g-link>
        </li>
        <li class="mr-8 mb-6 lg:mb-0">
          <g-link to="/portfolio">portfolio</g-link>
        </li>
        <li class="mr-8 mb-6 lg:mb-0">
          <g-link to="/sketchbook">sketchbook</g-link>
        </li>
        <li class="mr-8 mb-6 lg:mb-0">
          <g-link to="/about">about</g-link>
        </li>
        <li class="mr-8 mb-6 lg:mb-0">
          <g-link to="/contact">contact</g-link>
        </li>
        <li class="mr-8 mb-6 lg:mb-0">
          <theme-switcher :theme="theme" @themeChanged="updateTheme" />
        </li>
        <!--
          <li class="mr-8 mb-6 lg:mb-0">
            <g-link to="/docs" class="text-copy-primary hover:text-gray-600">Docs</g-link>
          </li>
          <li>
            <g-link to="/blog" class="text-copy-primary hover:text-gray-600">Blog</g-link>
          </li>
        -->
      </ul>
    </nav>
  </header>

  <div class="flex-grow">
    <slot />
  </div>

  <footer class="container mx-auto md:px-16 md:py-8 p-4">
    <div class="flex flex-wrap">
      <div class="md:flex-initial flex-auto pr-4">
        <a href="mailto:johnchungart@gmail.com" class="text-xl">
          johnchungart@gmail.com
        </a>
      </div>
      <div class="md:flex-initial flex-none vertical-line mr-6 text-copy-primary"></div>
      <div class="md:flex-initial flex-auto">
        <ul class="flex items-center">
          <li class="px-2">
            <a href="mailto:me@example.com">
              <svg width="25" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 0h20A2.5 2.5 0 0 1 25 2.5v15a2.5 2.5 0 0 1-2.5 2.5h-20A2.5 2.5 0 0 1 0 17.5v-15C0 1.125 1.125 0 2.5 0zm20 4.225V2.5h-20v1.725l10 5 10-5zm0 2.8l-9.438 4.713a1.25 1.25 0 0 1-1.124 0L2.5 7.025V17.5h20V7.025z"
                  fill-rule="nonzero" /></svg>
            </a>
          </li>
          <li class="px-2">
            <a href="https://twitter.com/" target="_blank">
              <svg width="20" height="17" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19.807 1.943a8.588 8.588 0 0 1-2.036 2.135 11.918 11.918 0 0 1-.465 3.854 12.085 12.085 0 0 1-1.452 3.177 12.426 12.426 0 0 1-2.318 2.691c-.897.78-1.978 1.402-3.243 1.867-1.265.464-2.618.697-4.06.697-2.27 0-4.348-.618-6.233-1.854.293.034.62.051.98.051 1.885 0 3.565-.588 5.04-1.764a3.915 3.915 0 0 1-2.363-.825 4.038 4.038 0 0 1-1.432-2.039c.276.043.532.064.766.064.36 0 .717-.047 1.068-.14A3.982 3.982 0 0 1 1.73 8.43c-.617-.754-.925-1.63-.925-2.627v-.051c.57.324 1.182.498 1.835.524a4.1 4.1 0 0 1-1.32-1.47 4.078 4.078 0 0 1-.49-1.969c0-.75.185-1.445.553-2.084a11.548 11.548 0 0 0 3.702 3.05 11.163 11.163 0 0 0 4.669 1.271c-.067-.324-.1-.639-.1-.946 0-1.142.395-2.116 1.187-2.92C11.632.402 12.589 0 13.712 0c1.173 0 2.161.435 2.966 1.304a7.878 7.878 0 0 0 2.576-.997 3.997 3.997 0 0 1-1.785 2.275 7.98 7.98 0 0 0 2.338-.639z"
                  fill-rule="nonzero" /></svg>
            </a>
          </li>
          <li class="px-2">
            <a href="https://instagram.com" target="_blank">
              <svg width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.002 4.872A5.12 5.12 0 0 0 4.876 10a5.12 5.12 0 0 0 5.126 5.128A5.12 5.12 0 0 0 15.13 10a5.12 5.12 0 0 0-5.127-5.128zm0 8.462A3.34 3.34 0 0 1 6.67 10a3.337 3.337 0 0 1 3.333-3.334A3.337 3.337 0 0 1 13.335 10a3.34 3.34 0 0 1-3.333 3.334zm6.532-8.671c0 .664-.535 1.196-1.195 1.196a1.196 1.196 0 1 1 1.196-1.196zm3.396 1.213c-.076-1.602-.442-3.02-1.615-4.19C17.145.516 15.727.15 14.125.07c-1.65-.093-6.6-.093-8.25 0-1.597.076-3.016.442-4.19 1.611C.512 2.851.151 4.27.07 5.871c-.093 1.652-.093 6.601 0 8.253.076 1.602.442 3.02 1.615 4.19 1.174 1.17 2.588 1.535 4.19 1.616 1.65.093 6.6.093 8.25 0 1.602-.076 3.02-.442 4.19-1.616 1.169-1.17 1.534-2.588 1.615-4.19.093-1.652.093-6.596 0-8.248zm-2.133 10.02a3.375 3.375 0 0 1-1.9 1.9c-1.317.523-4.44.402-5.895.402-1.454 0-4.582.116-5.894-.402a3.375 3.375 0 0 1-1.9-1.9c-.523-1.317-.402-4.441-.402-5.896s-.116-4.583.401-5.895a3.375 3.375 0 0 1 1.901-1.901c1.316-.523 4.44-.402 5.894-.402 1.455 0 4.582-.116 5.894.402a3.375 3.375 0 0 1 1.901 1.9c.522 1.317.402 4.441.402 5.896s.12 4.583-.402 5.895z"
                  fill-rule="nonzero" /></svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex flex-wrap">
        <div class="flex-initial md:w-1/2 md:text-left w-full text-center">
          <p>Copyright {{ new Date().getFullYear() }}. All rights reserved.<p/>
        </div>
        <div class="flex-initial md:w-1/2 md:text-left w-full text-center">
          <p class="md:float-right none">Developed and designed by 
            <a href="http://designtypist.com/" target="_blank">James Chung</a>
          </p>
        </div>
    </div>
  </footer>

  <div class="hidden">
    <svg id="dots-triangle" width="170" height="170" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M168.152 170a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm-18.478-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0 18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm-18.478 0a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-18.479a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm-18.479 0a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0 18.479a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0 18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-55.435a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zM94.24 133.043a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0 18.479a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0 18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-55.435a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm-18.478 36.956a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0 18.479a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0 18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-55.435a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm-18.478 55.434a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0 18.479a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0 18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-55.435a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-18.479a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm-18.479 73.913a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0 18.479a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0 18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-55.435a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-18.479a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0-18.478a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm-18.478 92.391a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0 18.479a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0 18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-55.435a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-18.479a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0-18.478a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zM1.848 133.044a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.695zm0 18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0 18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-55.435a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-18.479a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0-18.478a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696z"
        fill="#2C8056" fill-rule="evenodd" opacity=".503" /></svg>
  </div>
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
      theme: '',
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
