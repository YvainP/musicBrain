<!-- Page de recherche de l'application -->
<template>
  <div id="app">    
    <h2 class="mainTitle">Research</h2>
    <mediaList :firstSearch="firstSearch"></mediaList>
  </div>
</template>

<script>
import mediaList from '../components/MediaList.vue';

export default {
  name: 'research',
  components: { mediaList },
  data () {
    return {
      firstSearch: this.$route.params.firstSearch,
    }
  },
}
</script>

<style scoped>

.title {
  margin-top: 10px;
  font-size: 25;
  text-align: center;
}
</style>
