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
    path: '/scene',
    name: 'Scene',
    component: () => import(/* webpackChunkName: "scene" */ '../views/Scene.vue')
  },
  {
    path: '/chapter2',
    name: 'Chapter2',
    component: () => import(/* webpackChunkName: "chapter2" */ '../views/Chapter2.vue')
  },
  {
    path: '/chapter3',
    name: 'Chapter3',
    component: () => import(/* webpackChunkName: "chapter3" */ '../views/Chapter3.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
