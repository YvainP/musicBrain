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
            {{detailMedia.name}} is a {{detailMedia.type}}
            <p>from {{detailMedia.area.name}}.</p>
            <p>They started to produce music in 
            {{detailMedia["begin-area"].name}}
            in {{detailMedia["life-span"].begin}}</p>
          </i>
        </div>
        <!-- On gère le cas d'un record -->
        <div v-else-if="typeMedia == 'recording'">
          <img src="../css/img/music.png">
          <p>record name: {{detailMedia.title}}</p>
        </div>
        <!-- On gère le cas d'un release -->
        <div v-else-if="typeMedia == 'release'">
        </div>
        <!-- tags d'un artiste -->
        <div v-if="detailMedia.tags">
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
        console.log(urlMediaInfos);
      }
    }
  },
  created() {
   //this.getMediaImg(); 
  }
}
</script>
