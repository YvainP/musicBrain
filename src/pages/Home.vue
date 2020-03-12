<!-- Ceci est la page d'accueil -->
<template>
  <div id="app" class="text-center">    
    <h1 class="bigTitle">Shiku app</h1>
    <p class="subTitle">
      Welcome on my music application, 
      you can <br> search for a music/artist/album ...etc
    </p>
    <p class="subTitle">
      <br>Give it a try with the field below :)
    </p>
    <form class="group">
      <input ref="search" id="inputSearch" type="text" placeholder="Enter any keywords" 
        v-model="inputWords"/>
      <span class="bar"></span>
      <!-- On lie la page de recherche au "bouton" en lui passant 
      comme paramètres ce que l'user a tapé dans la barre -->
      <router-link :to="{ name: 'research', params: { firstSearch: inputWords } }">
        <button class="btn btn-dark mt-5 cssBtn">
          Let's search it!
        </button>
      </router-link>
    </form>
  </div>
</template>

<script>
import styles from "../css/accueil.css";

export default {
  name: 'home',
  data() {
    return {
      inputWords: null,
    }
  },
  created() {
    //this.$refs.search.$el.focus();
  }
}
</script>
