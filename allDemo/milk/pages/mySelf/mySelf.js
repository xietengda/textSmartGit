const app = getApp();
Page({
  onShow: function () {
    //this.onLoad()
    try {
      var userInfo = wx.getStorageSync('userInfo')
      if (userInfo.userid) {
        this.setData({
          login: true,
          //userInfo: userInfo,
        })
        if (!this.data.userInfo.user_name) {
          this.setData({
            userInfo: userInfo,
          })
        }
        wx.reportMonitor('0', 1)
        this.getUserInfo(userInfo.userid);
      } else {
        this.setData({
          login: false,
        })
      }
    } catch (e) {

    }
  },
  data: {
    login: false,
    userInfo: {
      integral: 0,
      bonus_count: 0,
      faNum: 0,
    },
    isIphoneX: getApp().globalData.isIphoneX,
    url: app.api.getUrl()
  },
  onLoad: function (options) {
    try {
      var userInfo = wx.getStorageSync('userInfo')
      if (userInfo.userid) {
        this.setData({
          login: true,
          userInfo: userInfo,
        })
        wx.reportMonitor('0', 1)
        this.getUserInfo(userInfo.userid);
      } else {
        this.setData({
          login: false,
        })
      }
    } catch (e) {

    }

  },
  scannerCode: function () {
    wx.scanCode({
      success: (res) => {
        wx.reportAnalytics('scanner', {
          scantype: res.scanType,
          result: res.result,
          errmsg: res.errMsg
        })
        if (res.result && res.errMsg == 'scanCode:ok' && res.scanType == 'EAN_13') {
          //寻找是否存在的商品
          app.api.getGoods(0, filter = '')
          wx.navigateTo({
            url: '/pages/proDetails/proDetails?goodsId=2',
          })
        }
      }
    })
  },
  login: function () {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  logout: function () {
    wx.clearStorage()
    app.login().then(res => {
      wx.setStorageSync('openid', res.openid)
    })
    wx.switchTab({
      url: '../index/index'
    })
    var userInfo = {
      integral: 0,
      bonus_count: 0,
      faNum: 0
    }

    this.setData({
      userInfo: userInfo
    })
  },
  checkLogin: function () {
    if (!this.data.login) {
      this.login()
    }
  },
  getUserInfo: function (userid) {
    var userInfo = this.data.userInfo;
    console.log(userInfo)
    var _this = this;
    try {
      var tuijian = wx.getStorageSync('tuijian')
    } catch (e) {
      var tuijian = 0
    }

    wx.getUserInfo({
      success: function (res) {
        var nickName = res.userInfo.nickName
        app.api.getUserInfo(userid, tuijian, nickName)
          .then(res => {
            userInfo.integral = res.data.integral;
            userInfo.bonus_count = res.data.bonus_count;
            userInfo.faNum = res.data.man_num;

            _this.setData({
              userInfo: userInfo
            })
          })
      }
    })


  },
  onPullDownRefresh: function () {
    this.onShow()
    wx.stopPullDownRefresh()
  },
})