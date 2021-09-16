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
    path: '/02.1_Camera',
    name: '02.1_Camera',
    component: () => import(/* webpackChunkName: "02.1_Camera" */ '../views/02.1_Camera.vue')
  },
  {
    path: '/03_Light',
    name: '03_Light',
    component: () => import(/* webpackChunkName: "03_Light" */ '../views/03_Light.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
