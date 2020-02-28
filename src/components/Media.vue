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
            mediaURL: "https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/",
        }

    },

    props: ['city'],

    created(){

        //Envoie une requête axios
        //Params: mediaURL=url de l'api
        //Return: response, tous les médias de l'api
        axios
        .get(this.mediaURL)
        .then(response => {
            this.dataBrute = response;
        })
        //catch des erreurs
        .catch(error => {
            console.log(error);
            this.errored = true;
        })
        //Affichage du spinner 
        .finally( () => this.loading = false);
    }
}

</script>

