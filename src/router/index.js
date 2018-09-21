import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home'
import Info from '../components/Info'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/info', name: 'info', component: Info },
]

export default new VueRouter({
  routes
})
