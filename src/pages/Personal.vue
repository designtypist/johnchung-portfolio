<template>
  <Layout>

    <div class="container-inner mx-auto">
      <h1 class="text-3xl font-bold text-center">Personal Art</h1>
      <ArtGallery :data="$page.personalImages.edges" :full_layout="false" />
    </div>

  </Layout>
</template>

<page-query>
query {
  personalImages: allArtGalleries (
    filter: { name: { eq: "Personal" } } 
  ) {
    edges {
      node  {
        id
        name
        description
        images {
          meta {
            title
          }
          path
        }
      }
    }
  }
}
</page-query>

<script>
import ArtGallery from '../components/ArtGallery'

export default {
  metaInfo: {
    title: 'Personal'
  },
  components: {
    ArtGallery
  }
}
</script>
