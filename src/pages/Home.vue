<!-- Ceci est la page d'accueil -->
<template>
  <div id="app" class="text-center">    
    <h1 class="bigTitle">MusicBrain app</h1>
    <p class="subTitle">
      Welcome on my music application, 
      you can <br> search for a music/artist/album ...etc
    </p>
    <p class="subTitle">Give it a try with the field below :)</p>

    <form class="group">
      <input type="text" placeholder="Enter any keywords" v-model="inputWords" required/>
      <span class="bar"></span>
      <!-- On lie la page de recherche au "bouton" en lui passant 
      comme paramètres ce que l'user a tapé dans la barre -->
      <router-link :to="{ name: 'research', params: { firstSearch: inputWords } }">
        <button class="btn btn-dark">
          Let's search it!
        </button>
      </router-link>
    </form>


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
