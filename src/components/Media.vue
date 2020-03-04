<!-- Component média, utilisé pour récupérer les infos d'un média -->
<template>
  <div>
    <!-- En fonction du média on récupère les champs intéressants
    On gère le cas des artistes -->
    <div v-if="typeMedia == 'artist'">
      {{ mediaData.type }} 
      Name: {{ mediaData.name }} 
      Country: <!--{{ mediaData.area.name }}-->
      <div v-if="mediaData.disambiguation">
        Musical genre: {{ mediaData.disambiguation }}
      </div>
    </div>
    <!-- Gère le cas d'une musique -->
    <div v-else-if="typeMedia == 'recording'">
      Song name: {{ mediaData.title }}
      by {{ mediaData["artist-credit"][0].name }}
      Musical genre: 
    </div>
  </div>
</template>
<script>

export default {
    name: 'app',
    props: ['mediaData', 'typeMedia'],
    data() {
        return {
        }
    },
}
</script>

