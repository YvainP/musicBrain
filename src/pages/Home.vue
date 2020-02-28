<template>

  <div id="app" class="text-center">    
    <router-view></router-view>
    <h1 class="bigTitle">MusicBrain app</h1>
    <p class="subTitle">Welcome on my music application, 
    you can <br> search for a music/artist/album ...etc</p>
    <p class="subTitle">Give it a try with the field below :)
    </p>
    <div class="group">      
      <input type="text" required>
      <span class="bar"></span>
      <label>Any keywords in here</label>
    </div>
    <router-link to="/research" class="btn btn-dark">
      Let's search it!
    </router-link>
  </div>
  
</template>

<script>

import styles from "../css/accueil.css";

export default {
  
  name: 'app',
  data () {
    return {
    }
  },

  methods: {
  }
}
</script>
