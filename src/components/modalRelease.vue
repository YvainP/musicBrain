<!-- Component propre à un release, traite ses données -->
<template>
  <div>
    <img v-if="imgURL" :src="imgURL" class="img-thumbnail imgSize mt-3">
    <img v-else src="../css/img/noimage.png" class="img-thumbnail imgSize mt-3">
    <br><br><b>{{releaseTitle}}</b>
    <p v-if="artist">
        from the artist <i>{{artist}}</i>
    </p>
    <p v-if="releaseFormat">
        is a publication under the {{releaseFormat}} format. 
    </p>
    <p v-if="releaseEvents">
        <br>It has been released in {{releaseEvents.date}}
    </p>
    <p v-if="releaseEvents">
        and published for the first time in 
        {{releaseEvents.area.name}}.
    </p>
    <p v-if="labelInfos">
        <br>This release has been associated to the label 
        <b>{{labelInfos.label.name}}</b>.
    </p>
  </div>
</template>
<script>

import axios from 'axios';

export default {
  name: 'modalRelease',
  props: ['detailRelease'],
  data() {
    return{
        releaseTitle: this.detailRelease.title,
        artist: this.detailRelease["artist-credit"][0].name,
        releaseEvents: this.detailRelease["release-events"][0],
        labelInfos: this.detailRelease["label-info"][0],
        releaseFormat: this.detailRelease.media[0].format,
        releaseID: this.detailRelease.id,
        baseURL: "http://coverartarchive.org/release/",
        picturesList: [],
        imgURL: "",
    }
  },
  methods: {
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
    //Récupère le résulat d'une requete axios et tri
    //Params: requestURL = url de la requête 
    //Return: Renvoie l'url d'une image
    getReleaseImg(){
        let vueComponent = this;
        if(this.releaseID){
            let requestURL = this.baseURL + this.releaseID;
            this.makeAxiosRequest(requestURL).then(data => vueComponent.imgURL = (data.images[0].image));
        }
    },
  },
  created() {
      this.getReleaseImg();
  }
}
</script>
