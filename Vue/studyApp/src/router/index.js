import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: resolve => require(['../pages/homePage/homePage.vue'], resolve),
      meta: {
        title: ''
      },
    }
  ]
})
