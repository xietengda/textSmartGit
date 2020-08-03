export const homeChildRoutes = [
    {
        path: '/',
        name: 'homePage',
        component: resolve =>
          require(['@/pages/homePage/homePage.vue'], resolve),
        meta: {
          title: '首页'
        }
    }
]