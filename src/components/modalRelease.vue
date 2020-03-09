<!-- Modal propre à un release, traite ses données -->
<template>
  <div>
    <img v-if="imgURL" :src="imgURL" class="img-thumbnail imgSize">
    <img v-else src="../css/img/noimage.png" class="img-thumbnail imgSize">
    <br>{{releaseTitle}}
    <p v-if="artist">
        from the artist {{artist}}
    </p>
    <p v-if="releaseFormat">
        is a {{releaseFormat}}, 
    </p>
    <p v-if="releaseEvents">
        released in {{releaseEvents.date}}
    </p>
    <p v-if="releaseEvents">
        and has been published for the first time in 
        {{releaseEvents.area.name}}.
    </p>
    <p v-if="labelInfos">
        <br>This release has been associated to the label 
        {{labelInfos.label.name}}
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
