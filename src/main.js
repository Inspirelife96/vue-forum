// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'


import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css' // 使用 carbon 主题

Vue.use(MuseUI)

import store from './store'
import router from './router'

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
