<!-- Component unwanted, les non désirés c'est à dire les chargement long ou les erreurs-->
<template>
  <div>
    <!-- Cas chargement long -->
    <div v-if="typeUnwanted == 'loading'">
      <p class="text-center">Loading the data</p>
      <spinner></spinner>
    </div>
    <!-- Cas d'une erreur-->
    <div v-else-if="typeUnwanted !== null">
      <p class="text-center">An error has been encountered, please reload the page (press F5)</p>
      <!-- Moins d'erreurs est le meilleur -Canals 2020
	<br>If you're concerned about the error, here it is: {{ typeUnwanted }}
	-->
    </div>
  </div>
</template>
<script>

import Spinner from './Spinner.vue';

export default {
    name: 'unwanted',
    props: ['typeUnwanted'],
    components: {Spinner},
}
</script>

