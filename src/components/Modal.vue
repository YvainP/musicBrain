<!-- Component modal, affiche les détails d'un média -->
<template>
  <div>
  <!-- Le modal -->
  <div id="detailModal" class="Modal">
    <!-- Modal content -->
    <div class="modal-content">
      <!-- utilisé pour fermer le modal -->
        <span class="close" @click="$emit('close')">&times;</span>
        <!-- traitement et affichage des données-->
        <p>{{detailMedia}}</p>
      </div>
    </div>
  </div>
</template>
<script>

import styles from '../css/modal.css';

export default {
  name: 'modal',
  props: ['detailMedia', 'typeMedia'],
  data() {
    return{
      status: true,
    }
  },
  methods: {

  },
}
</script>
