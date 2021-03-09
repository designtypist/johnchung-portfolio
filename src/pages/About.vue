<template>
  <Layout>
    <div class="container-inner mx-auto">
      <div class="flex flex-wrap lg:mx-4 mx-2">
        <div class="lg:w-2/5 w-full lg:pr-6 px-0 lg:py-0 py-6">
          <g-image class="lg:float-right clear-both" src="~/images/avatar.jpg" alt="Avatar" width="300" height="300" blur="25" quality="75" />
          <SocialMedia :data="$page.socialMedia.edges" :centered="false" class="inline-block lg:float-right clear-both my-4 " />
        </div>
        <div class="lg:w-3/5 w-full">
          <div class="mb-6" v-for="edge in $page.aboutMe.edges" :key="edge.node.id">
            <h2 class="text-xl font-bold uppercase mb-2">About Me</h2>
            <p>{{edge.node.description}}</p>
            <p class="my-2">Feel free to contact me at 
              <a class="cryptedmail" href="#" target="_blank"
                data-name="art"
                data-domain="johncdraws"
                data-tld="com"
                onclick="window.location.href = 'mailto:' + this.dataset.name + '@' + this.dataset.domain + '.' + this.dataset.tld; return false;"></a>.
            </p>
            <div class="anchor-button my-6">
              <a class="bg-green-700 hover:bg-green-800 hover:text-white text-sm font-semibold tracking-wide uppercase shadow rounded cursor-pointer px-6 py-3 mr-2"
                :href="edge.node.resume_link" target="_blank">Resume</a>
              <a class="bg-green-700 hover:bg-green-800 hover:text-white text-sm font-semibold tracking-wide uppercase shadow rounded cursor-pointer px-6 py-3 mr-2"
                :href="edge.node.demo_reel_link" target="_blank">
                Demo Reel <font-awesome :icon="['fab', 'vimeo']" size="1x" />
              </a>
            </div>
          </div>
          <div class="my-8">
            <h2 class="text-xl font-bold uppercase my-2">Software Proficiency</h2>
            <SoftwareProficency :data="$page.software.edges" />
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  software : allSoftware {
     edges {
      node  {
        id
        name
        icon_url
      }
    }
  }
  socialMedia: allSocialMedia {
    edges {
      node  {
        id
        brand
        link
      }
    }
  }
  aboutMe: allAboutMe {
    edges {
      node  {
        description
        resume_link
        demo_reel_link
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
