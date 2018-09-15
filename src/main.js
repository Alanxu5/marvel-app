import Vue from 'vue'
import App from './App.vue'
import MarvelTable from './components/MarvelTable.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})

new Vue({
  el: '#marvel-table',
  render: h => h(MarvelTable)
})