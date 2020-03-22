<!-- component média, utilisé pour afficher le minimum d'infos d'un média -->
<template>
  <div class="media">
    <modal v-if="showModal" v-on:close="closeModal" :detailMedia="mediaData" :typeMedia="typeMedia"></modal>
    <div @click="showModal=true">

      <!-- En fonction du média on récupère les champs intéressants
        On gère le cas des artistes -->
        <div v-if="typeMedia == 'artist'">
          <!-- on affiche le type d'artiste si on le connaît-->
          <p v-if="typeArtist" > 
            <img :src="dirImg + typeArtist + '.png'" width="32px">
          </p>
          <p v-else> 
            <img :src="dirImg + 'unknown.png'">
          </p>
          <strong>{{mediaData.name}}</strong>
          <i v-if="mediaData.area">from {{ mediaData.area.name }}</i>
          // <small>{{mediaData.disambiguation}}</small>
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
          <p v-if="mediaData.media[0].format">
            {{mediaData.media[0].format}}
          </p>
          <p v-else>Album</p>
          <b>{{mediaData.title}}</b>
          by <i>{{ mediaData["artist-credit"][0].name }}</i>
          <p v-if="mediaData.date">
            released in : <b>{{mediaData.date}}</b>
          </p>
        </div>
    </div>
  </div>
</template>
<script>

import Modal from './Modal.vue';
import styles from '../css/mediaCSS.css';

export default {
  name: 'media',
  props: ['mediaData', 'typeMedia'],
  components: {Modal},
  data() {
    return {
      showModal: false,
      typeArtist: this.mediaData.type,
      dirImg: "/src/css/img/",
    }
  },
  methods: {
    //Permet d'indiquer à la vue de cacher le modal
    closeModal(){
      this.showModal = false;
    },
  },
}
</script>

