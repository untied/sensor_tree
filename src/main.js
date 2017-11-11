
import Vue from 'vue'
import App from '@/App'

import store from '@/store'
import router from '@/router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import 'webix/webix.css'
import 'webix/webix.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App />',
  components: { App }
})
