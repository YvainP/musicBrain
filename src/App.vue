<template>

  <div id="app">    
    <h2 class="title">MusicBrainZ</h2>
    <media></media>
  </div>
</template>

<script>

import Media from './components/Media.vue';


export default {
  name: 'app',
  components: { Media},
  data () {
    return {
    }
  }
}
</script>

<style scoped>

.title {
  font-size: 25;
  text-align: center;
  background-color: aliceblue
}
</style>