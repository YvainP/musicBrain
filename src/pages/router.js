import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './Home.vue';
import Research from './Research.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/research',
    name: 'research',
    component: Research,
  },
];

const router = new VueRouter({
  routes,
});

export default router;