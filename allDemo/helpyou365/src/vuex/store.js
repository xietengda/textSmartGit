import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    isIphonex: false,
    language:'',
    showGoHome:true,
  },
  mutations:{
  	changePhone(state,msg){
  		state.isIphonex = msg;
  	},
  	changeLanguage(state,msg){
  		state.language = msg;
  		wx.setStorageSync('language',msg);
  	},
  	changeShowHome(state,msg){
  		state.showGoHome = msg;
  	}
  }
})

export default {
	store:store
}
