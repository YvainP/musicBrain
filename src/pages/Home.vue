<template>

  <div id="app">    
    <router-view></router-view>
    <h2 class="title">M</h2>
    <router-link to="/">home</router-link>
    <router-link to="/research">recherche</router-link>
  </div>
  
</template>

<script>


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