import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    isIphonex: false,
    
  },
  mutations:{
  	changePhone(state,msg){
  		state.isIphonex = msg;
  	}
  }
})

export default {
	store:store
}
