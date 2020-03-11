<!-- Modal propre à un record, traite ses données -->
<template>
  <div>
    <b>{{recordTitle}}</b>
    <p v-if="artistCredit">
      by the artist <i>{{artistCredit.name}}</i>
    </p>
    <div v-if="releaseInfo">
      <br>This track is included in the album
      <b>{{releaseInfo.title}}</b>
      <p v-if="releaseInfo.date">
        released in {{releaseInfo.date}}
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
      artistCredit: this.detailRecording["artist-credit"][0],
      releaseInfo: this.detailRecording["releases"][0],
    }
  },
}
</script>
