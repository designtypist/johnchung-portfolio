<template>
  <div class="software-item">
    <g-image :src="this.src" :alt="this.name" :width="this.width" />
    <div class="my-2">{{ this.name }}</div>
  </div>
</template>

<script>
export default {
  props: [ 'name', 'src', 'width'],
  data() {
    return {
    }
  },
}
</script>

<style scoped>
  .software-item img {
    display: inline;
    width: 50px;
  }
</style>