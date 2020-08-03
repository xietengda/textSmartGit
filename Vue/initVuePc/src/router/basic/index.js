export const basicChildRoutes = [
    {
      path: '/doctor-office',
      name: 'doctor-office',
      component: resolve =>
        require(['@/pages/basic/doctor-office.vue'], resolve),
      meta: {
        title: '医生诊室'
      }
    },
    {
      path: '/calling-charges',
      name: 'calling-charges',
      component: resolve =>
        require(['@/pages/basic/calling-charges.vue'], resolve),
      meta: {
        title: '挂号收费'
      }
    }
]