<!-- Modal propre à un record, traite ses données -->
<template>
  <div>
    {{detailRecording}}
  </div>
</template>
<script>

export default {
  name: 'modalRecording',
  props: ['detailRecording'],
  data() {
    return{
    }
  },
}
</script>
