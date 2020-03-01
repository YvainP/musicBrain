<template>
  <div v-if="typeMedia == 'artist'">
    {{ mediaData.type }} 
    {{ mediaData.name }} 
    {{ mediaData.area.name }}
    {{ mediaData.disambiguation }}
  </div>
  <div v-else-if="typeMedia == 'recording'">
    {{ mediaData.title }}
  </div>
  <div v-else>
    wtf?
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

