import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    isIphonex: false,
    zanNum:0,
    showGoHome:true,
  },
  mutations:{
  	changePhone(state,msg){
  		state.isIphonex = msg;
  	},
  	changeZanNum(state,msg){
  		state.zanNum = msg
  	},
  	changeShowHome(state,msg){
  		state.showGoHome = msg
  	}
  }
})

export default {
	store:store
}
