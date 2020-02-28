<template>

  <div id="app">    
    <h2 class="title">Météo</h2>
    <meteo class="meteo" city="Nancy"></meteo>
    <meteo class="meteo" city="Lyon"></meteo>
  </div>
</template>

<script>

import Meteo from './components/Meteo.vue';


export default {
  name: 'app',
  components: { Meteo},
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.meteo {
  background-color: turquoise;
  border: solid 2px blue;
  margin : auto;
  margin-top: 20px;
  text-align: center;
  width: 50%;
  
}

.title {
  font-size: 25;
  text-align: center;
  background-color: aliceblue
}
</style>