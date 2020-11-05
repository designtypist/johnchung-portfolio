<template>
  <div class="flex flex-wrap">
    <div class="md:w-1/4 w-1/3" v-for="software in data" :key="software.node.id">
      <div class="p-2">
        <g-image class="w-12" :src="software.node.icon" :alt="software.node.name" />
        <div class="mt-2">{{ software.node.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [ 'data' ]
}
</script>
