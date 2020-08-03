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
      name: '/',
      component: resolve => require(['../pages/index/index.vue'], resolve),
      meta: {
        title: 'oppo总管理后台'
      },
      children: [
        {
          path: '/',
          name: 'homePage',
          component: resolve => require(['../pages/homePage/homePage.vue'], resolve),
          meta: {
            title: 'HOME'
          }
        },
        {
          path: '/agent',
          name: 'agent',
          component: resolve => require(['../pages/recordModule/agent/agent.vue'], resolve),
          meta: {
            title: '代理商档案'
          }
        },
        {
          path: '/store',
          name: 'store',
          component: resolve => require(['../pages/recordModule/store/store.vue'], resolve),
          meta: {
            title: '门店档案'
          }
        },
        {
          path: '/audit',
          name: 'audit',
          component: resolve => require(['../pages/activityModule/audit/audit.vue'], resolve),
          meta: {
            title: '活动审核管理'
          }
        },
        {
          path: '/activityDetail',
          name: 'activityDetail',
          component: resolve => require(['../pages/activityModule/activityDetail/activityDetail.vue'], resolve),
          meta: {
            title: '活动详情'
          }
        },
        {
          path: '/activitySource',
          name: 'activitySource',
          component: resolve => require(['../pages/reportModule/activitySource/activitySource.vue'], resolve),
          meta: {
            title: '活动数据'
          }
        },
        {
          path: '/actSrouceMsg',
          name: 'actSrouceMsg',
          component: resolve => require(['../pages/reportModule/actSrouceMsg/actSrouceMsg.vue'], resolve),
          meta: {
            title: '活动门店详情数据'
          }
        },
        {
          path: '/orderVerification',
          name: 'orderVerification',
          component: resolve => require(['../pages/reportModule/orderVerification/orderVerification.vue'], resolve),
          meta: {
            title: '订单&券核销数据'
          }
        },
        {
          path: '/awardData',
          name: 'awardData',
          component: resolve => require(['../pages/reportModule/awardData/awardData.vue'], resolve),
          meta: {
            title: '奖励数据'
          }
        },
        {
          path: '/userManagement',
          name: 'userManagement',
          component: resolve => require(['../pages/systemModule/userManagement/userManagement.vue'], resolve),
          meta: {
            title: '后台用户管理'
          }
        },
        {
          path: '/roleManagement',
          name: 'roleManagement',
          component: resolve => require(['../pages/systemModule/roleManagement/roleManagement.vue'], resolve),
          meta: {
            title: '后台角色管理'
          }
        },
        //代理商门店档案
        {
          path: '/AG-store',
          name: 'AG-store',
          component: resolve => require(['../pages/recordModule/AG-store/AG-store.vue'], resolve),
          meta: {
            title: '门店档案'
          }
        },
        //代理商活动详情
        {
          path: '/AG-activityDetail',
          name: 'AG-activityDetail',
          component: resolve => require(['../pages/activityModule/AG-activityDetail/AG-activityDetail.vue'], resolve),
          meta: {
            title: '活动详情'
          }
        },
        //代理商活动列表
        {
          path: '/AG-audit',
          name: 'AG-audit',
          component: resolve => require(['../pages/activityModule/AG-audit/AG-audit.vue'], resolve),
          meta: {
            title: '活动列表'
          }
        },
        //代理商订单&券核销
        {
          path: '/AG-orderVerification',
          name: 'AG-orderVerification',
          component: resolve => require(['../pages/reportModule/AG-orderVerification/AG-orderVerification.vue'], resolve),
          meta: {
            title: '活动详情'
          }
        },
        //代理商奖励数据
        {
          path: '/AG-awardData',
          name: 'AG-awardData',
          component: resolve => require(['../pages/reportModule/AG-awardData/AG-awardData.vue'], resolve),
          meta: {
            title: '活动详情'
          }
        },
        //代理商对账管理
        {
          path: '/AG-billModule',
          name: 'AG-billModule',
          component: resolve => require(['../pages/AG-billModule/AG-billModule.vue'], resolve),
          meta: {
            title: '活动详情'
          }
        }
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