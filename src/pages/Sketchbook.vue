<template>
  <Layout>

      <div class="hero container mx-auto">
        <div class="text-4xl font-bold text-center">
          <div class="leading-tight">Sketchbook</div>
        </div>
        <div class="gallery">
          <div class="gallery-panel" v-for="edge in $page.sketchbookImages.edges" :key="edge.node.id">
            <g-image :src="edge.node.image" :alt="edge.node.title" @click="show" />
            <vue-easy-lightbox
              moveDisabled
              :visible="visible"
              :imgs="edge.node.image.src"
              @hide="handleHide"
            ></vue-easy-lightbox>
          </div>
        </div>
      </div>

  </Layout>
</template>

<page-query>
query SketchbookImages {
  sketchbookImages: allGalleryImages (
    filter: { gallery_type: { eq: "sketchbook" } } 
    sortBy: "position", order: ASC
  ) {
    edges {
      node  {
        id
        title
        description
        tags
        position
        filename
        image
      }
    }
  }
}
</page-query>

<script>
import VueEasyLightbox from 'vue-easy-lightbox'

export default {
  metaInfo: {
    title: 'Sketchbook'
  },
  components: {
    VueEasyLightbox
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    handleHide() {
      this.visible = false
    }
  }
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
    cursor: pointer;
  }
</style>