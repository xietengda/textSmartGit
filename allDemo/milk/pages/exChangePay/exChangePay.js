const app = getApp();
var EARTH_RADIUS = 6378137.0; //单位M
var PI = Math.PI;

Page({

  data: {
    getType: 1,
    def_addr: {},
    bz: '如：配送时间等',
    shoppind_id: 3, //提取方式3：快递，28：自提
    freight: '¥0.00',
    isIphoneX: getApp().globalData.isIphoneX,
    ziti_shop: false
  },

  onLoad: function (options) {
    try {
      var userInfo = wx.getStorageSync('userInfo')
      if (userInfo.userid) {
        this.setData({
          login: true,
          userInfo: userInfo
        })
      } else {
        this.setData({
          login: false,
        })
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 1500,
          complete: function () {
            wx.navigateTo({
              url: '../login/login'
            })
          }
        })
      }
      this.setData({
        userInfo: userInfo,
        userid: userInfo.userid,
        options: options
      })
    } catch (e) {
      console.log(e)
    }
    this.exCheckout(options);
  },
  onShow: function () {

    var addressId = app.addressId
    if (addressId) {
      var address_list = app.exinfo.address_list
      for (var i in address_list) {
        if (address_list[i].address_id == addressId) {
          app.exinfo.def_addr = address_list[i]
        }
      }
    }
    this.exCheckout(this.data.options);

    var that = this;

    var bz = app.bz

    if (bz) {
      this.setData({
        bz: bz
      })
    }

    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标     
      success: function (res) {
        // console.log(res);
        try {
          for (var i in that.data.shipping_ziti) {
            that.data.shipping_ziti[i].juli = Math.ceil(that.juli(parseFloat(that.data.shipping_ziti[i].lat), parseFloat(that.data.shipping_ziti[i].lng), parseFloat(res.latitude), parseFloat(res.longitude)))
            that.data.shipping_ziti[i].logo = app.api.getUrl() + '/data/afficheimg/' + that.data.shipping_ziti[i].logo
          }
        } catch (e) {

        }
        // console.log(that.data.shipping_ziti.sort(that.sort('juli'))[0])

        var value = app.zitiId

        if (!value) {
          value = 0
        }

        var pickup_point = that.data.shipping_ziti.sort(that.sort('juli'))[value].id
        that.setData({
          selShop: that.data.shipping_ziti.sort(that.sort('juli'))[value],
          pickup_point: pickup_point,
          address_id: value
        })

        console.log(that.data.selShop);
      }
    })

  },
  exCheckout: function () {
    this.setData({
      def_addr: app.exinfo.def_addr,
      goods_list: app.exinfo.goods_list,
      shipping_list: app.exinfo.shipping_list,
      shipping_ziti: app.exinfo.shipping_ziti,
      supplier_total: app.exinfo.supplier_total,
      freight: app.exinfo.supplier_total.shipping_fee_formated,
      order_info: app.exinfo.order_info,
      address_list: app.exinfo.address_list,
    })
  },
  getTypeFun: function (e) {
    var getType = this.data.getType;
    var shipping_list = this.data.shipping_list;
    var that = this;
    var sIndex = e.currentTarget.dataset.index;
    for (var x in shipping_list) {
      if (shipping_list[x].shipping_id == e.currentTarget.dataset.id) {
        shipping_list[x].selected = 'checked';
        that.setData({
          shoppind_id: shipping_list[x].shipping_id
        })
      } else {
        shipping_list[x].selected = '';
      }
    }


    if (shipping_list[sIndex].shipping_id == '3') {
      that.setData({
        freight: that.data.supplier_total.shipping_fee_formated,
        ziti_shop: false
      })
    } else if (shipping_list[sIndex].shipping_id == '28') {
      that.setData({
        freight: '¥0.00',
        ziti_shop: true
      })
    }

    this.setData({
      shipping_list: shipping_list
    });

  },
  juli: function (lat1, lng1, lat2, lng2) {
    var radLat1 = this.getRad(lat1);
    var radLat2 = this.getRad(lat2);

    var a = radLat1 - radLat2;
    var b = this.getRad(lng1) - this.getRad(lng2);

    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000.0;

    return s;
  },
  sort: function (property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
    }
  },
  getRad: function (d) {
    return d * PI / 180.0;
  },
  payMent: function () {

    //判断选择门店自取，还是顺丰速运
    var getType = 'SF';
    var shipping_list = this.data.shipping_list;

    for (var x in shipping_list) {
      if (shipping_list[x].selected == "checked") {
        if (shipping_list[x].shipping_name == "顺丰速运") {
          getType = 'SF';
        } else {
          getType = 'ZT';
        }
      }
    }

    //如果是自提只扣取积分，如果是顺丰要付款
    if (getType == "SF") {
      this.submitOrder();
    } else if (getType == "ZT") {
      this.submitOrder();
    }
  },
  submitOrder: function () {
    var that = this;

    var supplier = {}
    supplier.supplier_id = '0'
    supplier.shipping_id = that.data.shoppind_id
    supplier.pickup_point = that.data.pickup_point
    // supplier.bonus_id = this.data.bonus_id
    supplier.message = that.data.bz
    var arr = []
    arr.push(supplier)
    var supplier = {}
    supplier.supplier = arr

    console.log(that.data.shipping_list)

    console.log(supplier)

    // return;

    var sel_goods = []
    for (var i in that.data.goods_list) {
      sel_goods.push(that.data.goods_list[i].rec_id)
    }
    var sel_goods = sel_goods.join(",");
    console.log(sel_goods);
    var address_id = that.data.def_addr.address_id;
    var integral = that.data.goods_list[0].exchange_integral;

    try {
      var openid = wx.getStorageSync('openid')
    } catch (e) {

    }

    var flow_type = 4

    app.api.addOrder(that.data.userInfo.userid, JSON.stringify(supplier), sel_goods, openid, address_id, integral, flow_type)
      .then(res => {
        console.log(res)
        if (that.data.shoppind_id == '3') {
          var prepay = JSON.parse(res.data.payment.prepay)
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
        } else {
          wx.showToast({
            title: '成功下单',
            complete: function () {
              setTimeout(function () {
                wx.navigateTo({
                  url: '/pages/scoreOrder/scoreOrder',
                })
              }, 1500)
            }
          })
        }
      })
      .catch(res => {
        console.log(res)
      })
  },
  selectAddr: function () {
    wx.navigateTo({
      url: '../addSelect/addSelect',
    })
  }
})