<template>
  <div>
      <input v-model="keywordsEntered" placeholder="You can search anything here :)"
        v-on:keyup="getTypedWords(keywordsEntered)">
    <div v-if="errored">       
      An error has been encountered
    </div>
    <div v-else-if="loading">       
      Loading the data
      <spinner></spinner>
    </div>
    <div v-else>
      <!-- on vérifie que l'on a des données à traiter -->
      <div v-if="dataBrute !== null"> 
        <ul id="listOfMedias" class="list-group mine w-3 m-3">
          <!-- on parcoure le tableau 2D d'entités -->
          <div v-for="datas in dataBrute">
            <!-- Pour chaque tableau d'une entité, on appelle le component
              média qui les traitera -->
            <li v-for="artist in datas.artists">
              <media :mediaData="artist" typeMedia="artist" 
                class="list-group-item mb-3"></media>
            </li>
            <li v-for="record in datas.recordings">
              <media :mediaData="record" typeMedia="recording"
                class="list-group-item mb-3"></media>
            </li>
          </div>
        </ul>
      </div>
      <div v-else>
        Sorry but your research didn't return anything :(
      </div>
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
    props: ["firstSearch"],
    data() {
        return {
          errored: false,
          loading: true,
          dataBrute: [],
          keywordsEntered: null,
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
        //On envoie le tableau d'artistes dans un tableau
        this.makeAxiosRequest(URL).then(data => vueComponent.dataBrute.push(data));
      },
      //Permet de rechercher dans l'api sur l'entité recording 
      //Params: keywords = mot-clés sur lesquels rechercher 
      //Return: Un tableau de données json
      getRecordings(keywords){
        let URL = this.baseURL + "/recording/?query=" + keywords + this.options;
        let vueComponent = this;
        this.makeAxiosRequest(URL).then(data => vueComponent.dataBrute.push(data));
      },

      //Récupère les
      getTypedWords(keywords){
        let toSearch = keywords;
        if(toSearch.length > 1){
          let root = document.getElementById("listOfMedias");
          while(root.firstChild ){
            root.removeChild(root.firstChild );
          }
          this.getArtists(toSearch);
          this.getRecordings(toSearch);
        }
      },

    },
    created(){
      this.getArtists(this.firstSearch),
      this.getRecordings(this.firstSearch)
    },
}

</script>

<style scoped>
.mine {
  padding: 10px;
  background-color: white;
  border-radius: 8px;
  list-style-type: none;
}
</style>
