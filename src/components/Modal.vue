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
        <p>{{detailMedia.type}}</p>
        {{detailMedia.name}}
        {{detailMedia}}
        <!-- En fonction du média on récupère les champs intéressants
        On gère le cas des artistes -->
        <div v-if="typeMedia == 'artist'">
          <!-- on affiche le type d'artiste si on le connaît-->
          <i v-if="detailMedia.type">
            <img v-if="detailMedia.type=='Group'" src="../css/img/band.png">
            <img v-if="detailMedia.type=='Person'" src="../css/img/musician.png">
            <img v-if="detailMedia.type=='Character'" src="../css/img/theater.svg" width="32px" height="32px">
            type media:{{ detailMedia.type }} 
          </i>
          {{ mediaData.name }} 
          Country: <!--{{ mediaData.area.name }}-->
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
