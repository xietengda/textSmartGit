const app = getApp();
const regeneratorRuntime = require('../../utils/runtime')
Page({
  data: {
    isIphoneX: getApp().globalData.isIphoneX,
    ngBack: true
  },
  ngBack: function () {
    wx.switchTab({
      url: '/pages/mySelf/mySelf',
    })
  },
  onLoad: function (options) {
    app.userInfoCallback = res => { }
    try {
      var userInfo = wx.getStorageSync('userInfo')
      if (userInfo.userid) {
        wx.switchTab({
          url: '/pages/mySelf/mySelf'
        })
      }
    } catch (e) {
      console.log(e)
    }
  },
  onGotUserInfo: async function (e) {
    wx.showLoading({
      title: '登录中',
    })

    console.log(e.detail.userInfo)
    app.sessionUserInfo = e.detail.userInfo
    try {
      var openid = wx.getStorageSync('openid')
      if (!openid) {
        await app.login().then(res => {
          wx.setStorageSync('openid', res.openid)
        })
        openid = wx.getStorageSync('openid')
      }
      app.api.login('', '', openid)
        .then(res => {
          if (res.code == 500) {
            wx.redirectTo({
              url: '../register/register?type=bind',
            })
          } else {
            app.api.getUserInfo(res.data.user_id)
              .then(result => {
                // console.log(result)
                result.data.login = 2
                //写入缓存
                wx.setStorage({
                  key: "userInfo",
                  data: result.data,
                  success: function () {
                    wx.showToast({
                      title: res.message,
                      icon: 'success'
                    })
                    wx.hideLoading()
                    wx.switchTab({
                      url: '/pages/mySelf/mySelf'
                    })
                  },
                  fail: function () {
                    wx.showToast({
                      title: '登录失败，请重新登录！',
                      icon: 'error'
                    })
                  }
                })
              })
          }

        }).catch(res => {
          wx.showToast({
            title: '网络出错了！',
            icon: 'none'
          })
        })
    } catch (e) {

    }
  },
  //登录提交
  formSubmit: function (e) {
    app.api.login(e.detail.value.username, e.detail.value.password)
      .then(res => {
        //console.log(res)
        if (res.code == 500) {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
          return
        }
        app.api.getUserInfo(res.data.user_id)
          .then(result => {
            //console.log(result)
            result.data.login = 1
            //写入缓存
            wx.setStorage({
              key: "userInfo",
              data: result.data,
              success: function () {
                wx.showToast({
                  title: res.message,
                  icon: 'success',
                  complete: function () {
                    setTimeout(function () {
                      wx.switchTab({
                        url: '/pages/mySelf/mySelf'
                      })
                    }, 1500)
                  }
                })

              },
              fail: function () {
                wx.showToast({
                  title: '登录失败，请重新登录！',
                  icon: 'error'
                })
              }
            })
          })
      }).catch(res => {
        wx.showToast({
          title: '网络出错了！',
          icon: 'none'
        })
      })
    console.log(e)
  },
  onHide: function (e) {
    console.log(e)
  }
})