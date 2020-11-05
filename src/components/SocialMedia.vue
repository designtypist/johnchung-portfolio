<template>
  <ul v-if="centered">
    <li class="inline-block">
      <a href="#" target="_blank" class="p-2"
          data-name="art"
          data-domain="johncdraws"
          data-tld="com"
          onclick="window.location.href = 'mailto:' + this.dataset.name + '@' + this.dataset.domain + '.' + this.dataset.tld; return false;">
        <font-awesome :icon="['fas', 'envelope']" size="2x" />
      </a>
    </li>
    <li v-for="social in data" :key="social.node.id" class="inline-block">
      <a :class="social.node.display" class="p-2" :href="social.node.link" target="_blank">
        <font-awesome :icon="['fab', social.node.brand]" size="2x" />
      </a>
    </li>
  </ul>
  <ul v-else>
    <li class="inline-block">
      <a href="#" target="_blank" class="xl:ml-2 mr-3"
          data-name="art"
          data-domain="johncdraws"
          data-tld="com"
          onclick="window.location.href = 'mailto:' + this.dataset.name + '@' + this.dataset.domain + '.' + this.dataset.tld; return false;">
        <font-awesome :icon="['fas', 'envelope']" size="2x" />
      </a>
    </li>
    <li v-for="social in data" :key="social.node.id" class="inline-block">
      <a :class="social.node.display" :href="social.node.link" target="_blank" class="xl:ml-2 mr-3">
        <font-awesome :icon="['fab', social.node.brand]" size="2x" />
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: [ 'data', 'centered' ]
}
</script>
