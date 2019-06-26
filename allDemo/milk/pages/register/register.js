const app = getApp();
const util = require('../../utils/util.js');

var interval = null //倒计时函数
var obj = {
  phone: '手机号',
  code: '验证码',
  password: '密码',
  cf_password: '确认密码'
}
var mobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
Page({
  data: {
    button: '注册',
    action: 'reg',
    check: 'checked',
    userInfo: {},
    phone: '',
    time: '获取验证码',
    currentTime: 61,
    isIphoneX: getApp().globalData.isIphoneX
  },

  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    } else {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: app.globalData.userInfo,
        })
      }
    }
    if (options.type == 'bind') {
      this.setData({
        button: '绑定',
        action: 'bind'
      })
    }
  },
  formSubmit: function (e) {
    if (this.data.check != 'checked') {
      wx.showToast({
        title: '请阅读并接受协议条款',
        icon: 'none'
      })
      return
    }
    for (let attr in e.detail.value) {
      if (e.detail.value[attr] == '') {
        wx.showToast({
          title: obj[attr] + '不能为空',
          icon: 'none'
        })
        return false
      }
    }
    if (!mobile.test(e.detail.value.phone)) {
      wx.showToast({
        title: '请输入正确电话号码',
        icon: 'none'
      })
      return false
    }
    if (e.detail.value.password != e.detail.value.cf_password) {
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none'
      })
      return false
    }
    try {
      var openid = wx.getStorageSync('openid')
      //sessionUserInfo
      var ssinfo = app.sessionUserInfo
      var userInfo = encodeURI(encodeURI(JSON.stringify(ssinfo)));
      console.log(userInfo);


      app.api.register(e.detail.value.phone, e.detail.value.code, e.detail.value.password, userInfo, openid)
        .then(res => {
          if (res.code == 500) {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          } else {
            app.api.getUserInfo(res.data.user_id)
              .then(result => {
                //写入缓存
                result.data.login = 2
                if (typeof (value) == "undefined") {
                  result.data.login = 1
                }
                wx.setStorage({
                  key: "userInfo",
                  data: result.data,
                  success: function () {
                    wx.showToast({
                      title: '绑定成功',
                      icon: 'success'
                    })
                    wx.switchTab({
                      url: '/pages/mySelf/mySelf'
                    })
                  },
                  fail: function () {
                    wx.showToast({
                      title: '绑定失败,请重新绑定！',
                      icon: 'error'
                    })
                  }
                })
              })
              .catch(res => {
                wx.showToast({
                  title: '网络出错了！',
                  icon: 'none'
                })
              })
          }
        })
    } catch (e) {

    }

    // if (e.detail.value.password != e.detail.value.cf_password) {
    //   wx.showToast({
    //     title: '密码格式不正确',
    //     icon: 'none'
    //   })
    //   return false
    // }
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  checkboxChange: function (e) {
    this.setData({
      check: e.detail.value
    })
  },
  getCode: function () {
    if (this.data.phone) {
      if (!mobile.test(this.data.phone)) {
        wx.showToast({
          title: '请输入正确电话号码',
          icon: 'none'
        })
        return false
      }
      app.api.sendMessage(this.data.phone)
        .then(res => {
          if (res.code == 200) {
            wx.showToast({
              title: res.message,
              icon: 'success'
            })
            var that = this;
            var currentTime = that.data.currentTime
            interval = setInterval(function () {
              currentTime--;
              that.setData({
                time: currentTime + '秒'
              })
              if (currentTime <= 0) {
                clearInterval(interval)
                that.setData({
                  time: '重新发送',
                  currentTime: 61,
                  disabled: false
                })
              }
            }, 1000)
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        })
      return
    }
    wx.showToast({
      title: '请输入电话号码',
      icon: 'none'
    })
    console.log(1)
  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  showArticle: function () {
    app.api.getXieyi()
      .then(res => {
        wx.showModal({
          showCancel: false,
          title: '香满楼服务条款',
          content: res.message,
          success: function (res) {
            if (res.confirm) {

            } else if (res.cancel) {

            }
          }
        })
      })
  }
})