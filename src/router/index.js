import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/chapter1',
    name: 'Chapter1',
    component: () => import(/* webpackChunkName: "chapter1" */ '../views/Chapter1.vue')
  },
  {
    path: '/chapter2',
    name: 'Chapter2',
    component: () => import(/* webpackChunkName: "chapter2" */ '../views/Chapter2.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
