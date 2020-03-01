<template>
  <div>
    {{ mediaData.type }} 
    {{ mediaData.name }} 
    {{ mediaData.area.name }}
    {{ mediaData.disambiguation }}
  </div>
</template>

<script>


export default {
    name: 'app',
    props: ['mediaData'],
    data() {
        return {
        }

    },
}

</script>

