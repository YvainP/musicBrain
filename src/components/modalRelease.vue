<!-- Modal propre à un release, traite ses données -->
<template>
  <div>
    {{releaseTitle}}
    <p v-if="artist">
        from the artist {{artist}}
    </p>
    <p v-if="releaseFormat">
        is a {{releaseFormat}}, 
    </p>
    <p v-if="releaseEvents">
        released in {{releaseEvents.date}}
    </p>
    <p v-if="releaseEvents">
        and has been published for the first time in 
        {{releaseEvents.area.name}}.
    </p>
    <p v-if="labelInfos">
        <br>This release has been associated to the label 
        {{labelInfos.label.name}}
    </p>
  </div>
</template>
<script>

export default {
  name: 'modalRelease',
  props: ['detailRelease'],
  data() {
    return{
        releaseTitle: this.detailRelease.title,
        artist: this.detailRelease["artist-credit"][0].name,
        releaseEvents: this.detailRelease["release-events"][0],
        labelInfos: this.detailRelease["label-info"][0],
        releaseFormat: this.detailRelease.media[0].format,
    }
  },
}
</script>
