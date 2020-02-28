<!-- Ceci est la page d'accueil -->
<template>
  <div id="app" class="text-center">    
    <h1 class="bigTitle">MusicBrain app</h1>
    <p class="subTitle">
      Welcome on my music application, 
      you can <br> search for a music/artist/album ...etc
    </p>
    <p class="subTitle">Give it a try with the field below :)</p>

    <div class="group">      
      <input type="text" v-model="inputWords" required>
      <span class="bar"></span>
      <label >Any keywords in here</label>
    </div>

    <!-- On lie la page de recherche au "bouton" en lui passant 
      comme paramètres ce que l'user a tapé dans la barre -->
    <router-link :to="{ name: 'research', params: { keywords: inputWords } }" 
      class="btn btn-dark">
      Let's search it!
    </router-link>
  </div>
  
</template>

<script>
import styles from "../css/accueil.css";

export default {
  name: 'app',
  data() {
    return {
      inputWords: null,
    }
  },
}
</script>
