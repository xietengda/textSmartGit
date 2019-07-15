import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

//接口
import api from './utils/api'
Vue.prototype.$api = api 

import util  from './utils/util'
Vue.prototype.$util = util

const app = new Vue(App)
app.$mount()
