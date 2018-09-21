import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home'
import Character from '../components/Character'
import Comic from '../components/Comic'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/character', name: 'character', component: Character },
  { path: '/comic', name: 'comic', component: Comic },
]

export default new VueRouter({
  routes
})
