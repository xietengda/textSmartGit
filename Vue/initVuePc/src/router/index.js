import Vue from 'vue';
import Router from 'vue-router';
import Cookies from 'js-cookie';
//页面进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import { homeChildRoutes } from './homePage'; // 首页
import { basicChildRoutes } from './basic'; // 基础管理

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['../pages/layout/index.vue'], resolve),
      meta: {
        title: '这里是标题'
      },
      children: [
        ...homeChildRoutes, // 首页
        ...basicChildRoutes, // 基础管理
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../pages/login/login.vue'], resolve),
      meta: {
        title: '登录'
      }
    }
  ]
});

// 配置页面跳转进度条
NProgress.configure({ easing: 'ease', showSpinner: false });

// 当路由开始跳转时
router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start();
  //判断如果不是去登录页面的，验证是否有token
  if (to.path != '/login') {
    //判断是否有token
    if (Cookies.get('token') == undefined) {
      next('/login');
    }
  }
  // 这个一定要加，没有next()页面不会跳转的。
  next();
});

// 当路由跳转结束后
router.afterEach(() => {
  // 关闭进度条
  NProgress.done();
});

// 路由异常错误处理，尝试解析一个异步组件时发生错误，重新渲染目标页面
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});

export default router;
