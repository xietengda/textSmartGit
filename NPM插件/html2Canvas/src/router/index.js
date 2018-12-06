import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
     	path: '/',
			name: '',
			component: resolve => require(['../page/html2Canvas/html2Canvas.vue'], resolve),
			meta: {title: '生成图片'}
    },
    {
     	path: '/cropper',
			name: 'cropper',
			component: resolve => require(['../page/cropper/cropper.vue'], resolve),
			meta: {title: '裁剪图片'}
    }
  ]
})
