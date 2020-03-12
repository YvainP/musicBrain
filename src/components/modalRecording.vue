<!-- Modal propre à un record, traite ses données -->
<template>
  <div>
    <b>{{recordTitle}}</b> is a record
    <p v-if="artistCredit">
      by the artist <i>{{artistCredit[0].name}}</i>
    </p>
    <div v-if="releaseInfos">
      This track is included in the album
      <b>{{releaseInfos[0].title}}</b>
      <p v-if="releaseInfos[0].date">
        released in <b>{{releaseInfos[0].date}}</b>
      </p>
    </div>
  </div>
</template>
<script>

export default {
  name: 'modalRecording',
  props: ['detailRecording'],
  data() {
    return{
      recordTitle: this.detailRecording.title,
      artistCredit: this.detailRecording["artist-credit"],
      releaseInfos: this.detailRecording.releases,
    }
  },
}
</script>
