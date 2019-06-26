const app = getApp();
Page({
  data: {
    h_state: 4,
    orderId: 0,
    proList: [1, 1],
    isIphoneX: getApp().globalData.isIphoneX,
    QRCode: {
      hideCode: true,
      img: '',
      code: ''
    },
    back: ''
  },
  ngBack: function () {
    wx.switchTab({
      url: '/pages/mySelf/mySelf',
    })
  },
  onLoad: function (options) {
    if (options.url == 'payment') {
      this.setData({
        ngBack: true,
        back: ''
      })
    }
    try {
      var userInfo = wx.getStorageSync('userInfo')
      if (userInfo.userid) {
        this.setData({
          login: true,
          userInfo: userInfo,
          userid: userInfo.userid,
        })
      } else {
        this.setData({
          login: false,
        })
        wx.navigateTo({
          url: '../login/login'
        })
      }
    } catch (e) {

    }
    if (!options.id) {
      wx.showToast({
        title: '订单获取错误',
      })
      return
    }
    this.setData({
      order_id: options.id
    })
    app.api.getUserOrderDetail(userInfo.userid, options.id)
      .then(res => {
        console.log(res)

        for (var i in res.data.goods_list) {
          res.data.goods_list[i].goods_thumb = app.api.getUrl() + res.data.goods_list[i].goods_thumb
        }

        var att = 0
        switch (res.data.order_info.status.toString()) {
          case '2':
            att = 1
            break;
          case '3':
            att = 3
            break;
          case '4':
            att = 2
            break;
          case '5':
            att = 4
            break;
        }
        res.data.order_info.status = att
        console.log(att)
        this.setData({
          order: res.data.order_info,
          list: res.data.goods_list,
          h_state: att,
          order_id: options.id
        })
      })
  },
  pay: function (e) {
    try {
      var openid = wx.getStorageSync('openid')
      if (openid) {
        app.api.repay(this.data.userid, this.data.order_id, openid)
          .then(res => {
            console.log(res)
            var prepay = JSON.parse(res.data.payment.prepay)
            console.log(prepay)
            var result = res
            //调起支付
            wx.requestPayment({
              'timeStamp': prepay.timeStamp.toString(),
              'nonceStr': prepay.nonceStr,
              'package': prepay.package,
              'signType': 'MD5',
              'paySign': prepay.paySign,
              'success': function (res) {
                //console.log(res)
                var message = result.message
                if (result.code == 200) {
                  var message = '提交成功'
                }
                wx.showToast({
                  title: message,
                  icon: 'none',
                  complete: function () {
                    wx.navigateTo({
                      url: '../paymentFin/paymentFin?id=' + result.data.order_id,
                    })
                  }
                })
              },
              'fail': function (res) {
                console.log(res)
                if (res.errMsg == 'requestPayment:fail cancel') {
                  wx.navigateTo({
                    url: '/pages/orderDetail/orderDetail?url=payment&id=' + result.data.order_id,
                  })
                } else {
                  wx.showToast({
                    title: '网络错误,请稍候再试!',
                    icon: 'none',
                    complete: function () {
                      wx.navigateTo({
                        url: '/pages/index/index',
                      })
                    }
                  })
                }
              },
              'complete': function (res) {
                console.log(res)
              }
            })
          })
      }
    } catch (e) {
      // Do something when catch error
    }
  },
  code: function (e) {
    this.setData({
      QRCode: {
        hideCode: false,
        img: app.api.getQrcode(e.currentTarget.dataset.code),
        code: e.currentTarget.dataset.code
      }
    })
  },
  closeCode: function () {
    this.setData({
      QRCode: {
        hideCode: true,
        img: '',
        code: ''
      }
    })
  },
  pjsd: function (e) {
    wx.navigateTo({
      url: '../oEvaluate/oEvaluate?recid=' + e.currentTarget.dataset.rec_id + '&goodsid=' + e.currentTarget.dataset.goods_id + '&orderid=' + e.currentTarget.dataset.order_id,
    })
  },
  toDetail: function () {
    app.api.buyAgain(this.data.userInfo.userid, this.data.order_id)
      .then(res => {
        wx.navigateTo({
          url: '/pages/payment/payment?id=' + res.data.ids,
        })
      })
  },
  getPackage: function (e) {
    wx.navigateTo({
      url: '/pages/takeMilk/takeMilk?order_id=' + e.currentTarget.dataset.order_id,
    })
  }
})