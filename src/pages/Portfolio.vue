<template>
  <Layout>

      <div class="hero container mx-auto">
        <div class="text-4xl font-bold text-center">
          <div class="leading-tight">Portfolio</div>
        </div>
        <div class="gallery">
          <div class="gallery-panel" v-for="(edge, index) in $page.portfolioImages.edges" :key="edge.node.id">
            <g-image :src="edge.node.image.src" :alt="edge.node.title"
             @click="showMultiple(index)"
             @load="onUpdateImgGallery(edge.node.image.src)" />
          </div>
          <vue-easy-lightbox
            moveDisabled
            :visible="visible"
            :imgs="imgs"
            :index="index"
            @hide="handleHide"
          ></vue-easy-lightbox>
        </div>
      </div>

  </Layout>
</template>

<page-query>
query PortfolioImages {
  portfolioImages: allGalleryImages (
    filter: { gallery_type: { eq: "portfolio" } } 
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
        image (quality: 90)
      }
    }
  }
}
</page-query>

<script>
import VueEasyLightbox from 'vue-easy-lightbox'

  export default {
    metaInfo: {
      title: 'Portfolio'
    },
    components: {
      VueEasyLightbox
    },
    data() {
      return {
        imgs: '',
        image_gallery: [],
        index: 0,
        visible: false,
      }
    },
    methods: {
      showMultiple(index) {
        this.imgs = this.image_gallery
        this.index = index 
        this.show()
      },
      show() {
        this.visible = true
      },
      handleHide() {
        this.visible = false
      },
      onUpdateImgGallery(src) {
        this.image_gallery.push(src)
      }
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
    cursor: pointer;
  }
</style>