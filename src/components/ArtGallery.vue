<template>
  <div class="gallery">
    <div v-if="full_layout">
      <div class="flex flex-wrap"  v-for="gallery in data" :key="gallery.node.id">
        <div class="flex-initial w-full my-6" v-for="(image, index) in gallery.node.images" :key="index">
          <g-image class="cursor-pointer mx-auto" :src="$url(image.local_path)" :alt="image.meta[0]" blur="40"
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
          <g-image class="cursor-pointer mx-auto " :src="$url(image.local_path)" :alt="image.meta[0]" width="500" fit="cover" blur="40"
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
    <div class="notice">
      <div class="mt-6 mb-2">
        <h2 class="text-xl text-center py-6 uppercase font-bold">Follow me</h2>
      </div>
      <hr />
      <ul class="mt-2 mb-12 text-center">
        <li class="inline-block p-2">
          <a href="https://twitter.com/johncdraws" target="_blank">
            <font-awesome :icon="['fab', 'twitter']" size="2x" />
          </a>
        </li>
        <li class="inline-block p-2">
          <a href="https://instagram.com/johncdraws" target="_blank">
            <font-awesome :icon="['fab', 'instagram']" size="2x" />
          </a>
        </li>
      </ul>
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