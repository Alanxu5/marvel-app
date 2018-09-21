import Vue from 'vue'

// has to be called router
import router from './router/index.js'
import App from './App'

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
