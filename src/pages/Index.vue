<template>
  <Layout>

    <div class="container-inner mx-auto">
      <h1 class="text-copy-secondary text-3xl font-bold text-center">Portfolio Art</h1>
      <ArtGallery :data="$page.portfolioImages.edges" :full_layout="true" />
    </div>

  </Layout>
</template>

<page-query>
query {
  portfolioImages: allArtGalleries (
    filter: { name: { eq: "Portfolio" } } 
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
    title: 'Portfolio'
  },
  components: {
    ArtGallery
  }
}
</script>
