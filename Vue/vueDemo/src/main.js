// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false


//转换rem的js
import './util/flexible.js';

//导入公共css
import './common/css/public.css'

//更改微信标题
import VueWechatTitle from 'vue-wechat-title'; 
Vue.use(VueWechatTitle)



//导入vuex 
import store from './vuex/store.js'
Vue.prototype.$store = store;


//导入swiper css
import 'swiper/dist/css/swiper.css';

//导入api接口
import api from './util/api'
Vue.prototype.$api = api;

//导入js-sdk
import wx from 'weixin-js-sdk'
Vue.prototype.$wx = wx;

//导入util
import util from './util/util.js'
Vue.prototype.$util = util

//导入mini-ui
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

//导入滚动选择器
import AwesomePicker from 'vue-awesome-picker';
Vue.use(AwesomePicker);


//导入cookies
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

//导入手机控制台
//import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
//let vConsole = new VConsole() // 初始化

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
