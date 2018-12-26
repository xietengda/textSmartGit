import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

//导入cookies
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

//导入util
import util from '../util/util.js'


var vueRouter = new Router({
  routes: [
    //启动页
		{
			path: '/',
			name: 'index',
			component: resolve => require(['../page/index/index.vue'], resolve),
			meta: {title: ''}
		},
		//扭蛋
		{
			path: '/play',
			name: 'play',
			component: resolve => require(['../page/play/play.vue'], resolve),
			meta: {title: ''}
		},
		//授权
		{
			path: '/login',
			name: 'login',
			component: resolve => require(['../page/login/login.vue'], resolve),
			meta: {title: '授权'}
		},
  ]
})


vueRouter.beforeEach((to, from, next) => {
  
  //code  微信登陆回来后有的
  var code = util.util.prototype.getQueryString('code');
  
  //如果code不为空，就是已经登陆
  if(code != null){
  	//存储登录状态   （1小时过期）
   	VueCookies.set('isLogin',true,60*60*1);
  }
  
  //  第一次进入项目
  let isLogin = VueCookies.get('isLogin');
  
  //未登录，并且进入地址不是登录页
  if (!isLogin && to.path != "/login") {
  	console.log('首次进入')
	   VueCookies.set("beforeLoginUrl", to.fullPath,60*60*1); // 保存用户进入的url
	   next("/login");
	   return false;
	   
  } 
 	//已登录，并且有code返回 
  else if(isLogin && code != null && to.path == "/") {
  	console.log('已经登录')
  	next("/login");
	  return false;
  }
  next();
 });



export default vueRouter
