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
    path: '/02.2_CameraCollisions',
    name: '02.2_CameraCollisions',
    component: () => import(/* webpackChunkName: "02.2_CameraCollisions" */ '../views/02.2_CameraCollisions.vue')
  },
  {
    path: '/02.3_MultiView',
    name: '02.3_MultiView',
    component: () => import(/* webpackChunkName: "02.3_MultiView" */ '../views/02.3_MultiView.vue')
  },
  {
    path: '/03.1_Light',
    name: '03.1_Light',
    component: () => import(/* webpackChunkName: "03.1_Light" */ '../views/03.1_Light.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
