<template>
    <div v-if="errored">       
        Une erreur a été rencontrée
    </div>
    <div v-else-if="loading">       
        Loading the data
        <spinner></spinner>
    </div>
    <div v-else>
        La météo à {{city}}<br>
        Tendance actuelle: {{ infoBrute.weather[0].main }}<br>
        Température: {{ infoBrute.main.temp }} C°<br>
        Pression: {{ infoBrute.main.pressure }} hPa<br>
        Humidité: {{ infoBrute.main.humidity }} %
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
            infoBrute: null,
            apiKey: "&APPID=b25d36bbc9bc234b8d539449447a8e0b",
            options: "&units=metric" + "&lang=fr",
            baseURL: `http://api.openweathermap.org/data/2.5/weather?q=`,
            weatherURL: null,
        }

    },

    props: ['city'],

    created(){

        // initialisation des variables
        this.weatherURL = this.baseURL + this.city + this.apiKey + this.options;

        //Requêtes des données météo
        axios
        .get(this.weatherURL)
        .then(response => {
            this.infoBrute = response.data;
        })
        //catch des erreurs
        .catch(error => {
            console.log(error);
            this.errored = true;
        })
        .finally( () => this.loading = false);
    }
}

</script>

