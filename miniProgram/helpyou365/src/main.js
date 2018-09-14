import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

import Vuex from 'vuex'
Vue.use(Vuex)

import store from './vuex/store'
Vue.prototype.$store = store 

const app = new Vue(App)
app.$mount()
