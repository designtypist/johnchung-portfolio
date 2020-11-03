<template>
  <Layout>
      
    <div class="container-inner mx-auto">
      <div class="flex flex-wrap md:mx-4 mx-2">
        <div class="md:w-1/3 w-full md:px-6 px-0 md:py-0 py-6">
          <g-image class="md:float-right" src="~/images/avatar.jpg" alt="Avatar" />
          <ul class="text-left">
            <li class="inline-block mt-3 mr-3">
              <a href="https://twitter.com/johncdraws" target="_blank">
                <font-awesome :icon="['fab', 'twitter']" size="2x" />
              </a>
            </li>
            <li class="inline-block mt-3 mr-3">
              <a href="https://instagram.com/johncdraws" target="_blank">
                <font-awesome :icon="['fab', 'instagram']" size="2x" />
              </a>
            </li>
          </ul>
        </div>
        <div class="md:w-2/3 w-full">
          <div class="mb-6">
            <h2 class="text-xl font-bold uppercase mb-2">Summary</h2>
            <p>Hi, my name is John Chung. I'am an animator based in Toronto, Ontario. I love bringing things to life through animation and I can't imagine myself not 
              doing anything else. Feel free to contact me at 
              <a class="cryptedmail" href="#" target="_blank"
                data-name="johnchungart"
                data-domain="gmail"
                data-tld="com"
                onclick="window.location.href = 'mailto:' + this.dataset.name + '@' + this.dataset.domain + '.' + this.dataset.tld; return false;"></a>.
            </p>
            <div class="anchor-button my-6">
              <a class="bg-green-700 hover:bg-green-800 hover:text-white text-sm font-semibold tracking-wide uppercase shadow rounded cursor-pointer px-6 py-3"
                href="https://drive.google.com/file/d/1tVNWQ77pkOiVmeVomFlNK5IPhiQQqo6n/view" target="_blank">Resume</a>
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
}
</page-query>

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
