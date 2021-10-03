import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import './scss/main.scss'
import store from './store'

Vue.config.productionTip = false

const req = require.context('@/components', true, /\.(js|vue)$/i)
req.keys().map(key => {
  if (!(req(key).default || {}).name) {
    return
  }
  Vue.component(req(key).default.name, req(key).default)
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
