const app = getApp();
Page({
  data: {
    h_state: 0,
    orderList: [],
    searchText: '',
    login: false,
    isIphoneX: getApp().globalData.isIphoneX,
    QRCode: {
      hideCode: true,
      img: '',
      code: ''
    },
    page: 1,
    att: 1,
    scrollTop: 0,
  },
  onLoad: function (options) {
    console.log(options)
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
      this.setData({
        h_state: (options.id ? options.id : 0)
      })
    } catch (e) {

    }
    var att = 0
    switch (options.id) {
      case '1':
        att = 2
        break;
      case '2':
        att = 3
        break;
      case '3':
        att = 4
        break;
      case '4':
        att = 5
        break;
    }
    this.setData({
      att: att
    })
    this.getOrderList(userInfo.userid, att);
  },
  changeState: function (e) {
    var sIndex = e.currentTarget.dataset.sIndex;
    console.log(sIndex)
    var att = 0
    switch (sIndex) {
      case '1':
        att = 2
        break;
      case '2':
        att = 3
        break;
      case '3':
        att = 4
        break;
      case '4':
        att = 5
        break;
    }
    this.setData({
      h_state: sIndex,
      att: att,
      page: 1,
      scrollTop: 0,
    });
    //console.log(sIndex)
    this.getOrderList(this.data.userid, att);

  },
  searchBlur: function (e) {
    this.setData({
      searchText: e.detail.value
    })
  },
  searchBtn: function (e) {
    this.getOrderList(this.data.userid, this.data.att, this.data.searchText)
    //todo
  },
  bindscrolltolower: function () {
    if (this.data.page != 'end') {
      this.getOrderList(this.data.userid, this.data.att);
    } else {
      wx.showToast({
        title: '已经到底了',
        icon: 'none'
      })
    }
  },
  //获取订单
  getOrderList: function (userid, status = 0, search = '') {
    wx.showLoading({
      title: '加载中',
    })
    var page = this.data.page == 'end' ? 1 : this.data.page
    app.api.getOrderList(userid, status, '', page, '', search)
      .then(res => {

        for (var x in res.data.order_list) {
          for (var y in res.data.order_list[x].goods_list) {
            res.data.order_list[x].goods_list[y].goods_thumb = app.api.getUrl() + res.data.order_list[x].goods_list[y].goods_thumb
          }
        }

        var orderList = res.data.order_list

        if (this.data.page != 1 && this.data.page != 'end') {
          var orderList = this.data.orderList.concat(res.data.order_list)
        }

        console.log(res);
        if (res.data.pager.page < res.data.pager.page_count) {
          this.setData({
            page: parseInt(res.data.pager.page) + 1
          })
        } else {
          this.setData({
            page: 'end'
          })
        }
        this.setData({
          orderList: orderList
        })
        wx.hideLoading()
      })
      .catch({

      })
  },
  pay: function (e) {
    try {
      var openid = wx.getStorageSync('openid')
      if (openid) {
        var order_id = e.currentTarget.dataset.id
        app.api.repay(this.data.userid, order_id, openid)
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
                      url: '../paymentFin/paymentFin?id=' + order_id,
                    })
                  }
                })
              },
              'fail': function (res) {
                console.log(res)
                if (res.errMsg == 'requestPayment:fail cancel') {
                  wx.navigateTo({
                    url: '/pages/orderDetail/orderDetail?id=' + order_id,
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
      },
      page: 1
    })
    this.getOrderList(this.data.userid, this.data.att);
  },
  deleteOrder: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      success: function (res) {
        if (res.confirm) {
          app.api.delUserOrder(that.data.userid, e.currentTarget.dataset.id)
            .then(result => {
              if (result.code == 200) {
                var orderList = that.data.orderList
                for (var i in orderList) {
                  if (orderList[i].order_id == e.currentTarget.dataset.id) {
                    orderList.splice(i, 1)
                  }
                }
                that.setData({
                  orderList: orderList
                })
              } else {
                wx.showToast({
                  title: result.message,
                  icon: 'none'
                })
              }
            })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})