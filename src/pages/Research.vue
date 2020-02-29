<template>
  <div id="app">    
    <h2 class="title">Recherche</h2>
    <mediaList></mediaList>
  </div>
</template>

<script>
import mediaList from '../components/MediaList.vue';

export default {
  name: 'app',
  components: { mediaList },
  data () {
    return {
      keywords: null,
    }
  },
  methods : {
    //Récupère les mot-clés envoyé par l'utilisateur
    //params: none
    //return: 0 si il n'y a pas de données, sinon renvoie un tableaux de mots
    extractKeyWords() {
      let data = this.$route.params.keywords;
      if(data.length < 1)
        return 0;
      else
        this.keywords = data.split(",");  
    }
  },
  created() {
    // on récupère la chaîne de mot-clés à rechercher
    this.extractKeyWords();
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
