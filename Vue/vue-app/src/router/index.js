import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    //启动页
		{
			path: '/',
			name: 'index',
			component: resolve => require(['../page/index/index.vue'], resolve),
			meta: {title: ''}
		},
  ]
})
