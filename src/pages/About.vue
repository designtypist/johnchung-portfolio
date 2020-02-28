<template>
  <Layout>
      
    <div class="container mx-auto flex">
      <div class="w-1/2 px-2">
        <g-image src="../images/avatar.jpg" alt="avatar" class="rounded-full"/>
      </div>
      <div class="w-1/2 px-2">
          <div class="">
            <h2 class="text-xl font-bold uppercase">Summary</h2>
            <p>Hi, my name is John Chung. I'am an animator based in Toronto, Ontario. I love bringing things to life through animation and I can't imagine myself not 
              doing anything else. Feel free to contact me at <a href="mailto:johnchungart@gmail.com">johnchungart@gmail.com</a></p>
          </div>
          <div class="">
            <button class="block bg-green-700 hover:bg-green-800 text-white text-sm font-semibold tracking-wide uppercase shadow rounded cursor-pointer px-6 py-3">Resume</button>
          </div>
          <div class="">
            <h2 class="text-xl font-bold uppercase">Software Proficiency</h2>
            <software-proficency />
          </div>
      </div>
      <!--
      <div class="get-to-know-me container-inner mx-auto text-xl pb-16 relative">
        <h2 class="font-bold mb-6" id="about">Get to know me:</h2>

        <div class="absolute left-0" style="top: 50px; transform: translateX(-100%)">
          <svg width="170px" height="170px"><use xlink:href="#dots-triangle" /></svg>
        </div>

        <div class="flex flex-col sm:flex-row justify-between items-center mb-16">
          <div><g-image src="../../static/avatar.jpg" alt="avatar" class="w-32 h-32 rounded-full mb-8 lg:mb-0" /></div>
          <div class="flex-1 text-lg sm:text-xl ml-6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum quae architecto minus molestias iusto ducimus fuga quo quia libero dignissimos, fugiat modi assumenda debitis laboriosam.</div>
        </div>

        <div class="responsive-container">
          <iframe class="responsive-iframe w-full h-full top-0 left-0 border-0" src="https://www.youtube.com/embed/uHo6o1TNQeE" style="border:0;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>-->
    </div>

  </Layout>
</template>

<script>
import SoftwareProficency from '../components/SoftwareProficency'

export default {
  metaInfo: {
    title: 'About'
  },
  components: {
    SoftwareProficency
  }
}
</script>