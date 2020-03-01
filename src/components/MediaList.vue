<template>
    <div v-if="errored">       
        An error has been encountered
    </div>
    <div v-else-if="loading">       
        Loading the data
        <spinner></spinner>
    </div>
    <div v-else>
      <ul>
        <li v-for="item in dataBrute">
          <media :mediaData="item" ></media>
        </li>
      </ul>
    </div>
</template>

<script>

import Media from './Media.vue';
import Spinner from './Spinner.vue';
import axios from 'axios';

export default {
    name: 'app',
    components: { Spinner, Media },
    data() {
        return {
          errored: false,
          loading: true,
          dataBrute: null,
          baseURL: "http://musicbrainz.org/ws/2",
          options:"&fmt=json&limit=4",
        }

    },
    methods: {
      //Envoie une requête axios get
      //Params: mediaURL = url de la requête 
      //Return: Renvoie les résultats de la requête 
      makeAxiosRequest(mediaURL){
        return axios.get(mediaURL)
          .then(response => {
            return response.data;
          })
          //catch des erreurs
          .catch(error => {
            console.log(error);
            this.errored = true;
          })
          //Affichage du spinner si le temps de chargement est long 
          .finally( () => this.loading = false);
      },

      //Permet de rechercher dans l'api sur l'entité artiste 
      //Params: keywords = mot-clés sur lesquels rechercher 
      //Return: Un tableau de données json
      getArtists(keywords){
        let URL = this.baseURL + "/artist/?query=" + keywords + this.options;
        console.log(URL);
        //On récupère le vueComponent nous intéresse
        let vueComponent = this;
        //On récupère les données de la requête en deux temps
        this.makeAxiosRequest(URL).then(data => vueComponent.dataBrute = data.artists);
      },
      //Permet de rechercher dans l'api sur l'entité recording 
      //Params: keywords = mot-clés sur lesquels rechercher 
      //Return: Un tableau de données json
      getRecordings(keywords){
        let URL = this.baseURL + "/recording/?query=" + keywords + this.options;
        console.log(URL);
        //On récupère le vueComponent nous intéresse
        let vueComponent = this;
        //On récupère les données de la requête en deux temps
        this.makeAxiosRequest(URL).then(data => vueComponent.dataBrute = vueComponent.dataBrute + data.recordings);
      }

    },
    created(){
      this.getArtists("Queen"),
      this.getRecordings("Queen")
    },
}

</script>

