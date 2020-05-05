<template>
  <Layout>

      <div class="hero container mx-auto">
        <div class="text-4xl font-bold text-center">
          <div class="leading-tight">Portfolio</div>
        </div>
        <div class="gallery">
          <div class="gallery-panel" v-for="edge in $page.galleryImages.edges" :key="edge.node.id">
            <g-image :src="edge.node.image" :alt="edge.node.title" />
          </div>
        </div>
      </div>

  </Layout>
</template>

<page-query>
query GalleryImages {
  galleryImages: allGalleryImages{
    edges {
      node {
        id
        title
        description
        gallery_type
        image (fit: cover, quality: 90)
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Portfolio'
  },
}
</script>

<style scoped>
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-gap: 1rem;
    max-width: 80rem;
    margin: 2rem auto;
    padding: 0 5rem;
  }

  .gallery-panel img {
    width: 100%;
    object-fit: inside;
  }
</style>