<!-- Component modal, affiche les détails d'un média -->
<template>
  <div>
    <!-- Le modal -->
    <div id="detailModal" class="Modal">
      <!-- Modal content -->
      <div class="modal-content">
        <!-- utilisé pour fermer le modal -->
        <span class="close" @click="$emit('close')">&times;</span>
        <!-- On appelle le component modal pour chaque média qui mettra en forme ses données -->
        <!-- Cas des artistes -->
        <div v-if="typeMedia == 'artist'">
          <modalArtist :detailArtist="detailMedia"></modalArtist>
        </div>
        <!-- Cas d'un record -->
        <div v-else-if="typeMedia == 'release'">
          <modalRelease :detailRelease="detailMedia"></modalRelease>
        </div>
        <!-- Cas d'un release -->
        <div v-else-if="typeMedia == 'recording'">
          <modalRecording :detailRecording="detailMedia"></modalRecording>
        </div>
        <!-- tags d'un média -->
        <div v-if="tags">
          Some tags about the artist: 
          <p v-for="tag in detailMedia.tags">
            {{tag.name}},
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import styles from '../css/modal.css';
import axios from 'axios';
import modalArtist from "./modalArtist.vue";
import modalRelease from "./modalRelease.vue";
import modalRecording from "./modalRecording.vue";

export default {
  name: 'modal',
  components: {modalArtist, modalRelease, modalRecording},
  props: ['detailMedia', 'typeMedia'],
  data() {
    return{
      baseURL: "http://musicbrainz.org/ws/2/release/",
      tags: this.detailMedia.tags,
    }
  },
  methods: {
    //Envoie une requête axios get 
    //Params: mediaURL = url de la requête 
    //Return: Renvoie les résultats de la requête 
    makeAxiosRequest(mediaURL){ 
      return axios.get(mediaURL) 
        .then(response => {return response.data;}) 
      //catch des erreurs 
        .catch(error => {this.error = error; }) 
      //Affichage du spinner si le temps de chargement est long 
        .finally( () => this.loading = false); 
    },
  },
}
</script>
