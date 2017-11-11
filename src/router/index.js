import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Device from '@/components/Device'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/device',
      name: 'Device',
      component: Device
    }
  ]
})
