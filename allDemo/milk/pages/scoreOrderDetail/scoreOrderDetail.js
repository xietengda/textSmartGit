const app = getApp();

Page({
  data: {
    QRCode: {
      hideCode: true,
      img: '',
      code: ''
    },
    isIphoneX: getApp().globalData.isIphoneX
  },
  onLoad: function (options) {
    console.log(options.orderId)
    var userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo: userInfo,
      orderId: options.orderId
    })
    this.getUserOrderDetail();
  },
  getUserOrderDetail: function () {
    var that = this;
    app.api.getUserOrderDetail(that.data.userInfo.userid, that.data.orderId)
      .then(res => {
        console.log(res)
        res.data.goods_list[0].goods_thumb = app.api.getUrl() + res.data.goods_list[0].goods_thumb;
        that.setData({
          goods_list: res.data.goods_list,
          order_info: res.data.order_info,
          shipping_ziti: res.data.order_info.shipping_ziti
        })
      })
      .catch(res => {
        console.log('xxx' + res)
      })
  },
  checkCode: function () {
    var codeNum = this.data.shipping_ziti.pickup_cn;
    var QRCode = {
      hideCode: false,
      img: app.api.getQrcode(codeNum),
      code: codeNum
    }

    this.setData({
      QRCode: QRCode
    })
  },
  closeCode: function () {
    var QRCode = {
      hideCode: true,
      img: '',
      code: ''
    }
    this.setData({
      QRCode: QRCode
    })
  },
  repay: function () {
    try {
      var openid = wx.getStorageSync('openid')
      if (openid) {
        var order_id = e.currentTarget.dataset.id
        app.api.repay(that.data.userInfo.userid, this.data.orderId, openid)
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
                    url: '/pages/scoreOrderDetail/scoreOrderDetail?orderId=' + result.data.order_id,
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
  }
})