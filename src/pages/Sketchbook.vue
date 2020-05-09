<template>
  <Layout>

      <div class="hero container mx-auto">
        <div class="text-4xl font-bold text-center">
          <div class="leading-tight">Sketchbook</div>
        </div>
        <div class="gallery">
          <div class="gallery-panel" v-for="(edge, index) in $page.sketchbookImages.edges" :key="edge.node.id">
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
        image (quality: 90)
      }
    }
  }
}
</page-query>

<script>

  export default {
    metaInfo: {
      title: 'Sketchbook'
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
        console.log(index)
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
        console.log(this.image_gallery)
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