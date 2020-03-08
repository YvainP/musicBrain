<!-- component média, utilisé pour afficher les infos d'un média -->
<template>
  <div>
    <modal v-if="showModal" v-on:close="closeModal" :detailMedia="mediaData" :typeMedia="typeMedia"></modal>
      <div @click="showModal=true">
      <!-- En fonction du média on récupère les champs intéressants
      On gère le cas des artistes -->
      <div v-if="typeMedia == 'artist'">
        <!-- on affiche le type d'artiste si on le connaît-->
        <i v-for="artist in artists">
          <img v-if="mediaData.type==artist" :src="'../css/img/'+artist+'.png'">
          {{artist}}
        </i>
        <!-- <img v-if="mediaData.type=='Group'" src="../css/img/band.png">
        <img v-if="mediaData.type=='Person'" src="../css/img/musician.png">
        <img v-if="mediaData.type=='Character'" src="../css/img/theater.svg" width="32px" height="32px">
        <img v-if="mediaData.type=='Orchestra'" src="../css/img/orchestra.jpg" >
        <img v-if="mediaData.type=='Choir'" src="../css/img/choir.png"> 
        <img v-else src="../css/img/unknown.png"> -->
        artist type: {{ mediaData.type }} 
        {{ mediaData.name }} 
        <i v-if="mediaData.area">Country: {{ mediaData.area.name }}</i>
      </div>
      <!-- Gère le cas d'une musique -->
      <div v-else-if="typeMedia == 'recording'">
        <img src="../css/img/music.png">
        <b>{{ mediaData.title }}</b>
        by <i>{{ mediaData["artist-credit"][0].name }}</i>
      </div>
      <!-- Gère le cas d'une CD, album.. -->
      <div v-else-if="typeMedia == 'release'">
        <img src="../css/img/album.png">
        <a v-if="mediaData.media[0].format">{{mediaData.media[0].format}}</a>
        <a v-else>Album</a>
        <b>{{mediaData.title}}</b>
        by <i>{{ mediaData["artist-credit"][0].name }}</i>
        <a v-if="mediaData.date">/release date: <b>{{mediaData.date}}</b></a>
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
        artists: [ 'Group', 'Person', 'Character', 'Orchestra'],
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

