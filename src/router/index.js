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
    path: '/01_Scene',
    name: '01_Scene',
    component: () => import(/* webpackChunkName: "01_Scene" */ '../views/01_Scene.vue')
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
