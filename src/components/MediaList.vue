<!-- Liste des médias -->
<template>
  <div>
    <input v-model="keywordsEntered" placeholder="You can search anything here :)" 
      @keyup="searchTimeOut(keywordsEntered)" type="text" />
    <!-- S'il y a des erreurs, on envoie leurs valeurs au component -->
    <div v-if="error !== null">   
      <unwanted :typeUnwanted="error"></unwanted>
    </div>
    <!-- S'il les données sont longues à charger -->
    <div v-else-if="loading">       
      <unwanted :typeUnwanted="'loading'"></unwanted>
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
import Unwanted from './Unwanted.vue';
import axios from 'axios';
import styles from "../css/cssForList.css";

export default {
    name: 'app',
    components: {Media, Unwanted },
    props: ["firstSearch"],
    data() {
        return {
          error: null,
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
          .then(response => {return response.data;})
          //catch des erreurs
          .catch(error => {this.error = error; })
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

      //Récupère les mot-clés tapés dans la barre de recherche
      //Params: keywords = mot-clés à rechercher 
      //Return: none, il y a un affichage dynamique
      getTypedWords(keywords){
        //Les espaces sont remplacés par %20 pour la requête
        //ceux avant et après la chaîne sont supprimés
        let toSearch = (keywords.trim()).replace(" ", "%20");
          if(keywords){
            //On vide la liste au préalable
            let root = document.getElementById("listOfMedias");
            while(root.firstChild ){root.removeChild(root.firstChild );}
            //On effectue les requêtes 
            this.getArtists(toSearch);
            this.getRecordings(toSearch);
          }
      },
      //Capte le moment ou l'utilisateur a probablement finis d'écrire
      //permet d'éviter trop de requêtes vers l'api
      //Params: typedWords = recherche que l'on transfert
      //Return: none
      searchTimeOut(typedWords) {  
          if (this.timer) {
              clearTimeout(this.timer);
              this.timer = null;
          }
          this.timer = setTimeout(() => {
            this.getTypedWords(typedWords);
          }, 800);
      }

    },
    //Si la premiere recherche est null ou undefined on assigne
    //Queen comme valeur par défaut puisque Queen c'est bien :)
    created(){
      if((this.firstSearch == undefined) || (this.firstSearch == null)){
        this.getArtists("Queen");
        this.getRecordings("Queen");
      //sinon on requête sur la première recherche
      } else {
        this.getArtists(this.firstSearch);
        this.getRecordings(this.firstSearch);
      }
    },
}

</script>