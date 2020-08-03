
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store.js'
// Vue.prototype.$store = store;

Vue.config.productionTip = false;

// 导入公共css
import './common/css/public.css'

// 转换rem的js
import './util/flexiblePC.js';

// 更改标题
import VueWechatTitle from 'vue-wechat-title'; 
Vue.use(VueWechatTitle)

// 表单验证
const { Validator } = require('@/util/validator')
Vue.prototype.$Validator = Validator

// 导入api接口
import api from './api/index.js'
Vue.prototype.$api = api;

// 导入util
import util from './util/util.js'
Vue.prototype.$util = util

// ElementUI
import 'element-ui/lib/theme-chalk/index.css';
// 全部引入
import ElementUI from 'element-ui'
Vue.use(ElementUI)
// 按需加载(需要在util ==> element-ui.js加载需要使用的组件，组件名及其他配置参考官网https://element.eleme.io/#/zh-CN/component/quickstart)
// import element from './util/element-ui'
// Vue.use(element)

// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
