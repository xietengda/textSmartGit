import Vue from 'vue'
import App from './App'
//import mpvueToastRegistry from 'mptoast/registry'
//mpvueToastRegistry(Vue)

import api from './utils/api' // 引用接口处理文件，此处为api.js
Vue.prototype.$api = api 



Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
