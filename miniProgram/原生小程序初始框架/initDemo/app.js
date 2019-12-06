
const api = require('./utils/api.js');
const utils = require('./utils/util.js');

App({

  onLaunch: function () {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        if (res.model.toString().indexOf('iPhone X') != -1) {
          _this.globalData.isIphoneX = true;
        }
      }
    });

    // wx.setStorageSync('accessToken',123456)
    // wx.setStorageSync('memberId',29);

    // 判断token是否过期
    if(wx.getStorageSync('memberId') != null && wx.getStorageSync('memberId') != undefined){
      //判断token是否失效
      // api.default.prototype.getBusinessTagList()
      // .then(res =>{
      //   if(res.code == 9000){
      //     //清除本地缓存信息
      //     wx.removeStorageSync('userInfo');
      //     wx.removeStorageSync('memberId');
      //     wx.removeStorageSync('accessToken');
      //   }
      // });
    }else{
       //清除本地缓存信息
       wx.removeStorageSync('userInfo');
       wx.removeStorageSync('memberId');
       wx.removeStorageSync('accessToken');
    }
    

  },
  globalData: {
    userInfo: null,
    isIphoneX:false,
  },
  api:api,//暴露api接口 全局引用
  utils,utils,//工具类
})