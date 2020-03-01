<template>
    <div v-if="errored">       
        An error has been encountered
    </div>
    <div v-else-if="loading">       
        Loading the data
        <spinner></spinner>
    </div>
    <div v-else>
      <div v-if="dataBrute !== null"> 
        <ul>
          <li v-if="dataBrute[0] !== null" v-for="item in dataBrute[0].artists">
            <media :mediaData="item" typeMedia="artist"></media>
          </li>
          <li v-if="dataBrute[1] !== null" v-for="item in dataBrute[1].recordings">
            <media :mediaData="item" typeMedia="recording"></media>
          </li>
        </ul>
      </div>
      <div v-else>
        Sorry but your research didn't return anything :(
      </div>
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
          dataBrute: [],
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
        //On récupère le vueComponent nous intéresse
        let vueComponent = this;
        //On récupère les données de la requête en deux temps
        this.makeAxiosRequest(URL).then(data => vueComponent.dataBrute.push(data));
      },
      //Permet de rechercher dans l'api sur l'entité recording 
      //Params: keywords = mot-clés sur lesquels rechercher 
      //Return: Un tableau de données json
      getRecordings(keywords){
        let URL = this.baseURL + "/recording/?query=" + keywords + this.options;
        let vueComponent = this;
        this.makeAxiosRequest(URL).then(data => vueComponent.dataBrute.push(data));
      }

    },
    created(){
      this.getArtists("Queen"),
      this.getRecordings("Queen")
    },
}

</script>

