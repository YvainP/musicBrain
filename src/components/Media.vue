omponent média, utilisé pour récupérer les infos d'un média -->
<template>
  <div>
    <!-- En fonction du média on récupère les champs intéressants
    On gère le cas des artistes -->
    <div v-if="typeMedia == 'artist'">
      <!-- on affiche le type d'artiste si on le connaît-->
      <i v-if="mediaData.type">
        {{ mediaData.type }} 
      </i>
      <i v-else>
        Artist
      </i>
      Name: {{ mediaData.name }} 
      Country: <!--{{ mediaData.area.name }}-->
    </div>
    <!-- Gère le cas d'une musique -->
    <div v-else-if="typeMedia == 'recording'">
      Song name: {{ mediaData.title }}
      by {{ mediaData["artist-credit"][0].name }}
    </div>
  </div>
</template>
<script>
export default {
    name: 'app',
    props: ['mediaData', 'typeMedia'],
}
</script>

