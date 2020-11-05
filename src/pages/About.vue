<template>
  <Layout>
    <div class="container-inner mx-auto">
      <div class="flex flex-wrap lg:mx-4 mx-2">
        <div class="lg:w-2/5 w-full lg:pr-6 px-0 lg:py-0 py-6">
          <g-image class="lg:float-right" src="~/images/avatar.jpg" alt="Avatar" />
          <SocialMedia :data="$page.socials.edges" :centered="false" class="inline-block lg:float-right my-4" />
        </div>
        <div class="lg:w-3/5 w-full">
          <div class="mb-6">
            <h2 class="text-xl font-bold uppercase mb-2">Summary</h2>
            <p>Hi, my name is John Chung. I'am an animator based in Toronto, Ontario. I love bringing things to life through animation and I can't imagine myself not 
              doing anything else. Feel free to contact me at 
              <a class="cryptedmail" href="#" target="_blank"
                data-name="art"
                data-domain="johncdraws"
                data-tld="com"
                onclick="window.location.href = 'mailto:' + this.dataset.name + '@' + this.dataset.domain + '.' + this.dataset.tld; return false;"></a>.
            </p>
            <div class="anchor-button my-6">
              <a class="bg-green-700 hover:bg-green-800 hover:text-white text-sm font-semibold tracking-wide uppercase shadow rounded cursor-pointer px-6 py-3 mr-2"
                href="https://drive.google.com/file/d/1tVNWQ77pkOiVmeVomFlNK5IPhiQQqo6n/view" target="_blank">Resume</a>
              <a class="bg-green-700 hover:bg-green-800 hover:text-white text-sm font-semibold tracking-wide uppercase shadow rounded cursor-pointer px-6 py-3 mr-2"
                href="https://player.vimeo.com/video/291040288?app_id=122963&amp;wmode=opaque" target="_blank">
                Demo Reel <font-awesome :icon="['fab', 'vimeo']" size="1x" />
              </a>
            </div>
          </div>
          <div class="my-8">
            <h2 class="text-xl font-bold uppercase my-2">Software Proficiency</h2>
            <SoftwareProficency :data="$page.softwareProficiencies.edges" />
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  softwareProficiencies : allSoftwareProficiencies {
     edges {
      node  {
        id
        name
        icon
      }
    }
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
</page-query>

<script>
import SoftwareProficency from '../components/SoftwareProficency'
import SocialMedia from '../components/SocialMedia'

export default {
  metaInfo: {
    title: 'About'
  },
  components: {
    SoftwareProficency,
    SocialMedia
  }
}
</script>
