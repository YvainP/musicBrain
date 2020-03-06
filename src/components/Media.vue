omponent média, utilisé pour récupérer les infos d'un média -->
<template>
  <div>
    <modal v-if="showModal" v-on:close="closeModal" :detailMedia="mediaData"></modal>
      <div @click="showModal=true">
      <!-- En fonction du média on récupère les champs intéressants
      On gère le cas des artistes -->
      <div v-if="typeMedia == 'artist'">
        <!-- on affiche le type d'artiste si on le connaît-->
        <i v-if="mediaData.type">
          <img v-if="mediaData.type=='Group'" src="../css/img/band.png">
          <img v-if="mediaData.type=='Person'" src="../css/img/musician.png">
          <img v-if="mediaData.type=='Character'" src="../css/img/theater.svg" width="32px" height="32px">
          type media:{{ mediaData.type }} 
        </i>
        {{ mediaData.name }} 
        Country: <!--{{ mediaData.area.name }}-->
      </div>
      <!-- Gère le cas d'une musique -->
      <div v-else-if="typeMedia == 'recording'">
        <img src="../css/img/music.png">
        Song name: {{ mediaData.title }}
        by {{ mediaData["artist-credit"][0].name }}
      </div>
    </div>
  </div>
</template>
<script>

import Modal from './Modal.vue';


export default {
    name: 'media',
    props: ['mediaData', 'typeMedia'],
    components: {Modal},
    data() {
      return {
        showModal: false,
      }
    },
    methods: {
      //Permet d'indiquer à la vue de cacher le modal
      closeModal(){
        this.showModal = false;
      }
    }
}
</script>

