<template>
  <!-- En fonction du média on récupère les champs intéressants-->
  <div v-if="typeMedia == 'artist'">
    <div v-if="mediaData.name == 'Group'">
      <i class="fas fa-music"></i>
    </div>
    Name: {{ mediaData.name }} 
    Country: {{ mediaData.area.name }}
    Musical genre: {{ mediaData.disambiguation }}
  </div>
  <div v-else-if="typeMedia == 'recording'">
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

