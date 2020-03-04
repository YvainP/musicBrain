<!-- Component unwanted, les non désirés c'est à dire les chargement long ou les erreurs-->
<template>
  <div>
    <!-- Cas chargement long -->
    <div v-if="typeUnwanted == 'loading'">
      Loading the data <spinner></spinner>
    </div>
    <!-- Cas d'une erreur-->
    <div v-else-if="typeUnwanted !== null">
      An error has been encountered, please reload the page (press F5)
      <br>If you're concerned about the error, here it is: {{ typeUnwanted }}
    </div>
  </div>
</template>
<script>

import Spinner from './Spinner.vue';

export default {
    name: 'app',
    props: ['typeUnwanted'],
    components: {Spinner},
}
</script>

