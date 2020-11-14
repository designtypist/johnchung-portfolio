<template>
  <div class="gallery">
    <div v-if="full_layout">
      <div class="flex flex-wrap"  v-for="gallery in data" :key="gallery.node.id">
        <div class="flex-initial w-full my-6" v-for="(image, index) in gallery.node.images" :key="index">
          <g-image class="cursor-pointer mx-auto" :src="image.local_path" :alt="image.meta[0]"
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
    <div v-else>
      <div class="grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1" v-for="gallery in data" :key="gallery.node.id">
        <div class="" v-for="(image, index) in gallery.node.images" :key="index">
          <g-image class="cursor-pointer mx-auto " :src="image.local_path" :alt="image.meta[0]"
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
      gallery.node.images.map(image => {
        this.local_gallery.push(image.local_path)
      })
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