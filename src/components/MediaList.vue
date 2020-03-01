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
          <media :mediaData=item ></media>
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
          options:"&fmt=json",
          //url exemple query http://musicbrainz.org/ws/2/recording/?query=annotation:Queen
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
        let artistURL = this.baseURL + "/artist/?query=" + keywords + this.options;
        console.log(artistURL);
        //On récupère le vueComponent nous intéresse
        let vueComponent = this;
        //On récupère les données de la requête en deux temps
        this.makeAxiosRequest(artistURL).then(data => vueComponent.dataBrute = data.artists);
      }
    },
    created(){
      this.getArtists("Queen")

    },
}

</script>

