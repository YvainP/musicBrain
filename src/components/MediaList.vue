<template>
    <div v-if="errored">       
        An error has been encountered
    </div>
    <div v-else-if="loading">       
        Loading the data
        <spinner></spinner>
    </div>
    <div v-else>
        {{ selectedData }}
    </div>
</template>

<script>

import Spinner from './Spinner.vue';
import axios from "axios";

export default {
    name: 'app',
    components: {Spinner},
    data() {
        return {
          errored: false,
          loading: true,
          dataBrute: null,
          selectedData: null,
          baseURL: "http://musicbrainz.org/ws/2",
          options:"&fmt=json",
          mediaURL: null,
          //url exemple query http://musicbrainz.org/ws/2/recording/?query=annotation:Queen
        }

    },

    created(){
      this.makingArtistURL("Queen")

    },
    methods: {
      //Envoie une requête axios get
      //Params: mediaURL = url de la requête 
      //Return: none si il n'y a pas de données, sinonrenvoie un tableau json 
      makeAxiosRequest(mediaURL){
        axios
        .get(mediaURL)
        .then(response => {
          this.dataBrute = response.data;
        })
        //catch des erreurs
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        //Affichage du spinner si le temps de chargement est long 
        .finally( () => this.loading = false);
      },

      //Construit l'url pour une requete sur les artistes
      //Params: keywords = mot-clés sur lesquels 
      //Return: Un tableau de données json
      makingArtistURL(keywords){
        let artistURL = this.baseURL + "/artist/?query=" + keywords + this.options;
        this.makeAxiosRequest(artistURL);
        this.selectedData = this.dataBrute.artists;
      }

    }
}

</script>

