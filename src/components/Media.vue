<template>
  <!-- En fonction du média on récupère les champs intéressants
  On gère le cas des artistes -->
  <div v-if="typeMedia == 'artist'">
    <!-- Affiche un icône cohérent au type de l'artiste -->
    <i v-if="mediaData.type == 'Group'" class="fas fa-users"></i>
    <i v-if="mediaData.type == 'Choir'" class="fas fa-music"></i>
    <i v-if="mediaData.type == 'Other'" class="fas fa-question"></i>
    <i v-if="mediaData.type == 'Person'" class="fas fa-user"></i>
    <i v-if="mediaData.type == 'Character'" class="fas fa-theater-masks"></i>
    <i v-if="mediaData.type == 'Orchestra'" class="fas fa-music"></i>
    Name: {{ mediaData.name }} 
    Country: {{ mediaData.area.name }}
    Musical genre: {{ mediaData.disambiguation }}
  </div>
  <!-- Gère le cas d'une musique -->
  <div v-else-if="typeMedia == 'recording'">
    <i class="fas fa-music"></i>
    Song name: {{ mediaData.title }}
    Name of the artist: {{ mediaData["artist-credit"][0].name }}
    Musical genre: 
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

