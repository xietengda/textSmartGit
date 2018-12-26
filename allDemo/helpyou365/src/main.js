import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

import Vuex from 'vuex'
Vue.use(Vuex)

import store from './vuex/store'
Vue.prototype.$store = store 

import util  from './utils/util'
Vue.prototype.$util = util

import api from './utils/api'
Vue.prototype.$api = api

const app = new Vue(App)
app.$mount()
