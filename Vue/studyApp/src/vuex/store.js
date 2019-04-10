import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)//如果使用全局的 script 标签，则无须如此（手动安装）。

const state = {
  bgm:null,//音乐对象
  bgPlay:true,//音乐是否播放
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

export default store
