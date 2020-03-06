<!-- Component modal, affiche les détails d'un média -->
<template>
  <div>
    <!-- Le modal -->
    <div id="detailModal" class="Modal">
      <!-- Modal content -->
      <div class="modal-content">
        <!-- utilisé pour fermer le modal -->
        <span class="close" @click="$emit('close')">&times;</span>
        <!-- traitement et affichage des données-->
        <!-- On gère le cas des artistes -->
        <div v-if="typeMedia == 'artist'">
          <!-- on affiche le type d'artiste si on le connaît-->
          <i v-if="detailMedia.type">
            <img v-if="detailMedia.type=='Group'" src="../css/img/band.png">
            <img v-if="detailMedia.type=='Person'" src="../css/img/musician.png">
            <img v-if="detailMedia.type=='Character'" src="../css/img/theater.svg" width="32px" height="32px">
            <p>Artist type : {{detailMedia.type}}</p>
            <p>{{detailMedia.type}} name: {{detailMedia.name}}</p>
            <p>Location: {{detailMedia.area.name}}</p>
          </i>
        </div>
        <!-- On gère le cas d'un record -->
        <div v-else-if="typeMedia == 'recording'">
          <img src="../css/img/music.png">
          <p>song name: {{detailMedia.title}}</p>
          <p>by {{ detailMedia["artist-credit"][0].name}}</p>
          {{detailMedia}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import styles from '../css/modal.css';

export default {
  name: 'modal',
  props: ['detailMedia', 'typeMedia'],
  data() {
    return{
      status: true,
    }
  },
  methods: {

  },
}
</script>
