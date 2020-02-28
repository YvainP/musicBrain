<template>
    <div v-if="errored">       
        Une erreur a été rencontrée
    </div>
    <div v-else-if="loading">       
        Loading the data
        <spinner></spinner>
    </div>
    <div v-else>
        {{ dataBrute }}
        Name: {{ dataBrute.name }}
        Musical genre: {{ dataBrute.disambiguation }}

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
            baseURL: "http://musicbrainz.org/ws/2",
            typeMediaEntitie:"/artist",
            options:"&fmt=json",
            mediaURL: null,
          //url exemple query http://musicbrainz.org/ws/2/recording/?query=annotation:Queen
        }

    },

    created(){
        //On construit l'url avec les différentes parties, cette factorisation 
        //de l'url permet de récupérer les informations voulue 
        this.mediaURL = this.baseURL + this.typeMediaEntitie + this.idMediaEntitie + this.options;

        //Envoie une requête axios
        //Params: mediaURL=url de l'api
        //Return: response, tous les médias de l'api
        axios
        .get(this.mediaURL)
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
    }
}

</script>

