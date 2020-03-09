<!-- Component propre à un artiste, traite ses données -->
<template>
  <div>
    {{artistName}} 
    <p v-if="artistType">
      is a {{artistType}}
    </p>
    <p v-if="Area">
      from {{Area.name}}.
    </p>
    <p v-if="beginArea && beginDate">
      <br>This artist started to produce music in 
      {{beginArea.name}}
      in {{beginDate.begin}}
    </p>
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
}
</script>
