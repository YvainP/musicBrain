<!-- Component unwanted, les non désirés c'est à dire les chargement long ou les erreurs-->
<template>
  <div>
  <!-- The Modal -->
  <div id="myModal" class="Modal">
    <!-- Modal content -->
    <div class="modal-content">
        <span class="close" >&times;</span>
        <p>Some text in the Modal..</p>
      </div>
    </div>
  </div>
</template>
<script>

import styles from '../css/modal.css';

export default {
  name: 'app',
  props: ['mediaData', 'typeMedia'],
  methods: {
    closeModal(){
      document.getElementByID("Modal").display = "none";
    }
  },
}
</script>
