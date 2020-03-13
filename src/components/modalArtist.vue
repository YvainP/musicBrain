<!-- Component propre à un artiste, traite ses données -->
<template>
  <div>
    <b>{{artistName}}</b>
    <p v-if="artistType">
      is a 
      <b :title="infoArtist" class="text-info">{{artistType}}</b>
    </p>
    <p v-if="Area">
      from {{Area.name}}.
    </p>
    <div v-if="beginArea && beginDate">
      <br>This artist started to produce music in 
      <b v-if="beginArea.name">{{beginArea.name}}</b>
      <b v-if="beginDate.begin">{{beginDate.begin}}</b>
    </div>

  </div>
</template>
<script>

export default {
  name: 'modalArtist',
  props: ['detailArtist'],
  data() {
    return{
      beginArea: this.detailArtist["begin-area"],
      beginDate: this.detailArtist["life-span"],
      Area: this.detailArtist.area,
      artistName: this.detailArtist.name,
      artistType: this.detailArtist.type,
    }
  },
  computed: {
    //Bulle d'infos selon le type d'artiste
    infoArtist: function(){
      if(this.artistType == 'Person')
        return "This can be a singer, DJ, composer, producer, ...etc"
      else if(this.artistType == 'Group')
        return "This is a group of musicians";
      else if(this.artistType == 'Character')
        return "It is fictionnal artist, created for a music performance, like Robin Sparkles"  
    }
  }
}
</script>
