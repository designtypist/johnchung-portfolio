<template>
  <Layout>

    <div>
      <h1 class="text-4xl font-bold text-center">Infinite Gallery Demo</h1>
      <div class="gallery">
        <transition-group name="fade">
          <div class="gallery-panel" v-for="{ node } of loadedImages" :key="node.id">
            <g-image :src="node.avatar" :alt="node.title" />
          </div>
        </transition-group>
        <ClientOnly>
          <infinite-loading @infinite="infiniteHandler" spinner="spiral">
            <div slot="no-more" class="mt-2">
              You've scrolled through all the images ;)
            </div>
            <div slot="no-results" class="mt-2">
              Sorry, no images yet :(
            </div>
          </infinite-loading>
        </ClientOnly>
      </div>
    </div>

  </Layout>
</template>

<page-query>
query ($page: Int) {
	fakeData: allFaker (perPage: 3, page: $page) @paginate {
    pageInfo {
			totalPages
			currentPage
		}
    edges {
      node {
        id,
        email,
        author,
        avatar,
        title
      }
    }
  }
}
</page-query>

<script>
import InfiniteLoading from 'vue-infinite-loading'

export default {
  metaInfo: {
    title: 'Portfolio'
  },
  components: {
    InfiniteLoading
  },
  data() {
    return {
      loadedImages: [],
      currentPage: 1,
      
      /*
      imgs: '',
      image_gallery: [],
      index: 0,
      visible: false,
      */
    }
  },
  created() {
		this.loadedImages.push(...this.$page.fakeData.edges)
	},
  methods: {
    async infiniteHandler($state) {
			if (this.currentPage + 1 > this.$page.fakeData.pageInfo.totalPages) {
				$state.complete()
			} else {
				const { data } = await this.$fetch(
					`/gallery/${this.currentPage + 1}`
				)
				if (data.fakeData.edges.length) {
					this.currentPage = data.fakeData.pageInfo.currentPage
					this.loadedImages.push(...data.fakeData.edges)
					$state.loaded()
				} else {
					$state.complete()
				}
			}
		},
    /*showMultiple(index) {
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
    }*/
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: ease opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>