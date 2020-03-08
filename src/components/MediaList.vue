<!-- Liste des médias -->
<template>
  <div class=""> 
    <!-- barre de recherche --> 
    <input class="mainInput" v-model="keywordsEntered" placeholder="You can search anything here :)" 
      @keyup="searchTimeOut(keywordsEntered)" type="text" />
    <span class="bar"></span>
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
        <ul id="listOfMedias" class="list-group mine w-3 m-3" >
          <!-- on parcoure le tableau 2D d'entités -->
          <div v-for="datas in dataBrute" >
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
             <li v-for="release in datas.releases">
              <media :mediaData="release" typeMedia="release"
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
import styles from "../css/cssResearch.css";

export default {
    name: 'mediaList',
    components: {Media, Unwanted  },
    props: ["firstSearch"],
    data() {
        return {
          error: null,
          loading: true,
          dataBrute: [],
          keywordsEntered: null,
          baseURL: "http://musicbrainz.org/ws/2",
          options:"&fmt=json&limit=5",
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

      //Permet de rechercher dans l'api sur l'entité  
      //Params: entity: type de média voulu, keywords = mot-clés à rechercher 
      //Return: Un tableau de données json
      getEntityData(entity, keywords){
        let URL = this.baseURL + "/" + entity + "/?query=" + keywords + this.options;
        //On récupère le vueComponent nous intéresse
        let vueComponent = this;
        //On envoie le tableau d'artistes dans le tableau dataBrute de cette vue
        this.makeAxiosRequest(URL).then(data => vueComponent.dataBrute.push(data));
      },

      //Récupère les mot-clés tapés dans la barre de recherche
      //Params: keywords = mot-clés à rechercher 
      //Return: none, il y a un affichage dynamique
      getTypedWords(keywords){
          //check s'il y a quelque chose à traiter
          if(keywords.length > 0){
            //Les espaces sont remplacés par %20 pour la requête
            //ceux avant et après la chaîne sont supprimés
            let toSearch = (keywords.trim()).replace(" ", "%20");
            //On vide la liste au préalable
            let root = document.getElementById("listOfMedias");
            while(root.firstChild ){root.removeChild(root.firstChild );}
            //On effectue les requêtes 
            this.launchRequests(toSearch);
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
      },

      //Appel des fonctions de requête sur les médias qui nous intéressent
      //Params toSearch: la recherche à passer à l'api musicbrain
      //return none
      launchRequests(toSearch){
        const entities = ['artist', 'release', 'recording'];
        for(let i = 0; i < entities.length; i++){
          this.getEntityData(entities[i], toSearch);
        }
      }
    },
    //Si la premiere recherche est null ou undefined on assigne
    //Queen comme valeur par défaut puisque Queen c'est bien :)
    created(){
      if((this.firstSearch == undefined) || (this.firstSearch == null)){
        this.launchRequests("Queen");
      //sinon on requête sur la première recherche
      } else {
        this.launchRequests(this.firstSearch);
      }
    },
}

</script>
