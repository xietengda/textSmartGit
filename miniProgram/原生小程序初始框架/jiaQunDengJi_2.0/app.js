
import api from './utils/api.js';

App({
  onLaunch: function () {
    
  },
  globalData: {
    userInfo: null
  },
  api: new api(),//暴露api接口 全局引用
})