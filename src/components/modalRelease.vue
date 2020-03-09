<!-- Modal propre à un release, traite ses données -->
<template>
  <div>
    {{detailRelease}}
  </div>
</template>
<script>

export default {
  name: 'modalRelease',
  props: ['detailRelease'],
  data() {
    return{
    }
  },
}
</script>
