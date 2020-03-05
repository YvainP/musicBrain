import Vue from 'vue';
import router from './pages/router';
import App from './App.vue';

new Vue({
  router,
  render(h) { return h(App); },
}).$mount('#app');
