<template>
  <div class="gallery">
    <div v-if="full_layout">
      <div class="flex flex-wrap"  v-for="(gallery, index) in data" :key="gallery.node.id">
        <g-image class="portfolio-image cursor-pointer mx-auto" :src="gallery.node.image_url" :alt="gallery.node.name"
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
    <div v-else>
      <div class="grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        <div v-for="(gallery, index) in data" :key="gallery.node.id">
          <g-image class="personal-image cursor-pointer mx-auto" :src="gallery.node.image_url" :alt="gallery.node.name" 
            @click="showMultiple(index)" />
        </div>
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
</template>

<script>
export default {
  props: [ 'data', 'full_layout' ],
  data() {
    return {
      imgs: '',
      local_gallery: [],
      index: 0,
      visible: false,
    }
  },
  mounted() {
    this.data.forEach(gallery => {
      this.local_gallery.push(gallery.node.image_url)
    })
  },  
  methods: {
    showMultiple(index) {
      this.imgs = this.local_gallery
      this.index = index
      this.show()
    },
    show() {
      this.visible = true
    },
    handleHide() {
      this.visible = false
    },
  }
}
</script>