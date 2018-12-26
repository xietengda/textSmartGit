import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false
App.mpType = 'app'

//导入公共css
import './common/css/public.css'

//接口
import api from './utils/api'
Vue.prototype.$api = api 

import util  from './utils/util'
Vue.prototype.$util = util

import md5 from 'md5'
Vue.prototype.$md5 = md5

import store from './vuex/store'
Vue.prototype.$store = store 

const app = new Vue(App)
app.$mount()
