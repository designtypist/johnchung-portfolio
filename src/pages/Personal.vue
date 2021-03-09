<template>
  <Layout>
    <div class="container-inner mx-auto">
      <h1 class="text-3xl font-bold text-center">Personal Art</h1>
      <ArtGallery :data="$page.personalImages.edges" :full_layout="false" />
      <div>
        <div class="mt-6 mb-2">
          <h2 class="text-xl text-center py-6 uppercase font-bold">Follow me</h2>
        </div>
        <hr />
        <SocialMedia :data="$page.socialMedia.edges" :centered="true" class="text-center my-4" />
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  personalImages: allPersonalGallery {
    edges {
      node {
        id
        name
        image_url
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
}
</page-query>

<script>
import ArtGallery from '../components/ArtGallery'
import SocialMedia from '../components/SocialMedia'

export default {
  metaInfo: {
    title: 'Personal'
  },
  components: {
    ArtGallery,
    SocialMedia
  }
}
</script>
