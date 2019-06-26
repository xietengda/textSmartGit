const app = getApp();
Page({

  data: {
    sco_list: [1, 1, 1],
    isIphoneX: getApp().globalData.isIphoneX,
    code: ''
  },

  onLoad: function (options) {
    try {
      var userInfo = wx.getStorageSync('userInfo')
      if (userInfo.userid) {
        this.setData({
          login: true,
          userInfo: userInfo,
          userid: userInfo.userid,
          page: 1
        })
      } else {
        var userInfo = {}
        userInfo.userid = 0;
        this.setData({
          login: false,
          userInfo: userInfo
        })
      }
    } catch (e) {

    }
  },
  scanCode: function () {
    wx.scanCode({
      success: (res) => {
        if (res.errMsg == 'scanCode:ok') {
          //this.codeGoods(res.result)
          this.setData({
            code: res.result
          })
          return
          //下面是直接兑换
          app.api.exchange(this.data.userid, 1, res.result)
            .then(res => {
              if (res.code == 200) {
                wx.showToast({
                  title: '兑换成功',
                  icon: 'success'
                })
              } else {
                wx.showToast({
                  title: res.message,
                  icon: 'none'
                })
              }
            })
        } else {
          wx.showToast({
            title: '无法识别',
            icon: 'none'
          })
        }
      }
    })
  },
  formSubmit: function (e) {
    app.api.exchange(this.data.userid, 1, e.detail.value.card)
      .then(res => {
        if (res.code == 200) {
          wx.showToast({
            title: '兑换成功',
            icon: 'success'
          })
          setTimeout("wx.navigateBack({})",500)        
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
        }
      })
  }
})