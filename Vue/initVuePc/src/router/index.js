import Vue from 'vue';
import Router from 'vue-router';

//页面进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: resolve => require(['../pages/homePage/homePage.vue'], resolve),
      meta: {
        title: ''
      },
      children: [
        {
          path: '/',
          name: 'pageOne',
          component: resolve => require(['../pages/testPageOne/testPageOne.vue'], resolve),
          meta: {
            title: ''
          }
        },
        {
          path: '/pageTwo',
          name: 'pageTwo',
          component: resolve => require(['../pages/testPageTwo/testPageTwo.vue'], resolve),
          meta: {
            title: ''
          }
        }
      ]
    }
  ]
})


// 配置页面跳转进度条
NProgress.configure({ easing: 'ease', showSpinner: false })
// 当路由开始跳转时
router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start();
  // 这个一定要加，没有next()页面不会跳转的。
  next()
})

// 当路由跳转结束后
router.afterEach(() => {
  // 关闭进度条
  NProgress.done()
})


export default router;