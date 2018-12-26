import api from './apis/api.js'
let loginapi = new api()
App({
  globalData: {
    category: null,
    userInfo: null,
    isIphoneX: null
  },
  onLaunch: function () {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            wx.clearStorage()
            updateManager.applyUpdate()
          }
        }
      })

    })
    try {
      var openid = wx.getStorageSync('openid')
    } catch (e) {
      var openid = '';
    }
    if (openid) {
      var that = this
      loginapi.checkUserExist(openid)
        .then(res => {
          if (res.code != 200) {
            wx.clearStorage()
            // 登录
            that.login().then(res => {
              wx.setStorageSync('openid', res.openid)
            })
          }
        })
      wx.checkSession({
        success: function () {
          //session_key 未过期，并且在本生命周期一直有效
          loginapi.checkSession(openid)
            .then(res => {
              if (res.code != 200) {
                wx.clearStorage()
                // 登录
                that.login().then(res => {
                  wx.setStorageSync('openid', res.openid)
                })
              }
            })
        },
        fail: function () {
          // session_key 已经失效，需要重新执行登录流程
          //清空所有凭证
          wx.clearStorage()
          // 登录
          this.login().then(res => {
            wx.setStorageSync('openid', res.openid)
          })
        }
      })
    } else {
      this.login().then(res => {
        wx.setStorageSync('openid', res.openid)
      })
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          return
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoCallback) {
                try {
                  var userInfo = wx.getStorageSync('userInfo')
                  if (userInfo.userid) {
                    res.userInfo.userid = userInfo.userid
                    wx.setStorageSync('userInfo', res.userInfo)
                  }
                } catch (e) {
                }
                //this.userInfoCallback(res)
              }
            }
          })
        }
      }
    })
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        if (res.model.toString().indexOf('iPhone X') != -1) {
          _this.globalData.isIphoneX = true;
        }
      }
    })

  },
  login: function () {
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res.code) {
            //发起网络请求     
            loginapi.thirdLogin(res.code)
              .then(res => {
                resolve(res.data)
              })
              .catch(res => {
                wx.showToast({
                  title: '网络出错了！',
                  icon: 'none'
                })
              })
          } else {
          }
        }
      })
    })
  },
  jumpTo: function (id, oid) {
    switch (id) {
      case "1":
        wx.switchTab({
          url: '../allPro/allPro'
        })
        break;
      case "2":
        wx.switchTab({
          url: '/pages/score/score'
        })
        break;
      case "3":
        wx.switchTab({
          url: '/pages/shopCart/shopCart'
        })
        break;
      case "4":
        wx.switchTab({
          url: '/pages/mySelf/mySelf'
        })
        break;
      case "5":
        wx.navigateTo({
          url: '/pages/myDiscount/myDiscount'
        })
        break;
      case "6":
        wx.navigateTo({
          url: '/pages/order/order'
        })
        break;
      case "7":
        wx.navigateTo({
          url: '/pages/collect/collect'
        })
        break;
      case "10":
        this.globalData.category = oid
        wx.switchTab({
          url: '../allPro/allPro',
        })
        break;
      case "11":
        wx.switchTab({
          url: '/pages/proDetails/proDetails?goodsId' + oid,
        })
        break;
      case "18":
        wx.navigateTo({
          url: '/pages/rushBuy/rushBuy'
        })
        break;
      case "19": //抽奖
        wx.navigateTo({
          url: '/pages/turntable/turntable'
        })
        break;
      case "20": //套餐
        wx.navigateTo({
          url: '/pages/comboList/comboList'
        })
        break;
    }
  },
  api: new api()
})