import Vue from 'vue'
import App from './App'

import api from './utils/api' // 引用接口处理文件，此处为api.js
Vue.prototype.$api = api 


import Vuex from 'vuex'
Vue.use(Vuex)

import store from './vuex/store'
Vue.prototype.$store = store 

import util from './utils/util'
Vue.prototype.$util = util 


Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
