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
        {{detailMedia}}
        <div v-if="typeMedia == 'artist'">
          <!-- on affiche le type d'artiste si on le connaît
            <img v-if="detailMedia.type=='Group'" src="../css/img/band.png">
            <img v-if="detailMedia.type=='Person'" src="../css/img/musician.png">
            <img v-if="detailMedia.type=='Character'" src="../css/img/theater.svg" width="32px" height="32px">
            <img v-else src="../css/img/unknown.png">--> 
            <p>Artist type : <b>{{detailMedia.type}}</b></p>
            <!--<p>{{detailMedia.type}} name: {{detailMedia.name}}</b></p>
            <p>Location: {{detailMedia.area.name}}</p>-->
          </i>
        </div>
        <!-- On gère le cas d'un record -->
        <div v-else-if="typeMedia == 'recording'">
          <img src="../css/img/music.png">
          <p>record name: {{detailMedia.title}}</p>
          <p>by {{ detailMedia["artist-credit"][0].name}}</p>
        </div>
        <!-- On gère le cas d'un release -->
        <div v-else-if="typeMedia == 'release'">
          ee
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import styles from '../css/modal.css';
import axios from 'axios';

export default {
  name: 'modal',
  props: ['detailMedia', 'typeMedia'],
  data() {
    return{
      baseURL: "http://musicbrainz.org/ws/2/release/",
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

    getMediaImg(){
      let urlMediaInfos = this.baseURL + this.detailMedia.id + "?inc=url-rels";
      console.log(urlMediaInfos);
      if (this.makeAxiosRequest(urlMediaInfos).length > 0){
        //this.urlIMG = makeAxiosRequest(urlMEdiaInfos)
        console.log(urlMediaInfos);
      }
    }
  },
  created() {
   //this.getMediaImg(); 
  }
}
</script>
