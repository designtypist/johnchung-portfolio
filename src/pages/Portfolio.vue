<template>
  <Layout>

    <div>
      <h1 class="text-4xl font-bold text-center">Portfolio</h1>
      <div class="gallery">
        <div class="gallery-panel" v-for="(edge, index) in $page.portfolioImages.edges" :key="edge.node.id">
          <img :src="edge.node.image.src" :alt="edge.node.title"
            @click="showMultiple(index)" />
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
query {
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
export default {
  metaInfo: {
    title: 'Portfolio'
  },
  data() {
    return {
      imgs: '',
      image_gallery: [],
      index: 0,
      visible: false,
    }
  },
  mounted() {
    this.$page.portfolioImages.edges.forEach((edge) => {
      this.image_gallery.push(edge.node.image.src)
    })
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
  },
}
</script>
