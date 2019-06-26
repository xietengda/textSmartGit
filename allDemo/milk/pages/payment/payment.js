const app = getApp();
var EARTH_RADIUS = 6378137.0; //单位M
var PI = Math.PI;
Page({
  data: {
    productList: [],
    getType: 1,
    isIphoneX: getApp().globalData.isIphoneX,
    bz: '如：配送时间等',
    bounes: false,
    pickup_point: 0,
    bonus_id: 0,
    shipping_id: 0,
    address_id: 0,
    freight: 0,
    offsetScore: '',//抵扣积分
    foucs: false,
    tips: '该商品附近门店无货'
  },
  onLoad: function (options) {
    var that = this;
    try {
      var userInfo = wx.getStorageSync('userInfo')
      if (userInfo.userid) {
        this.setData({
          login: true,
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
        userid: userInfo.userid
      })
    } catch (e) {
      console.log(e)
    }
    if (!options.id) {
      wx.navigateBack()
    }
    try {
      wx.removeStorageSync('order')
    } catch (e) {
      // Do something when catch error
    }
    app.api.checkout(userInfo.userid, options.id)
      .then(res => {
        if (res.code == 500 || res.code == 40001) {
          wx.showToast({
            title: res.message,
            icon: 'none',
            mask: true,
            success: function () {
              setTimeout(function () {
                if (res.code == 40001) {
                  wx.navigateTo({
                    url: '/pages/addManagement/addManagement?url=payment&id=' + options.id,
                  })
                } else {
                  wx.switchTab({
                    url: '/pages/shopCart/shopCart',
                  })
                }
              }, 2000)
            }
          })
          return
        }

        for (var i in res.data.supplier_list[0].goods_list) {
          res.data.supplier_list[0].goods_list[i].goods_thumb = app.api.getUrl() + res.data.supplier_list[0].goods_list[i].goods_thumb
        }
        try {
          wx.setStorageSync('order', res.data)
        } catch (e) {

        }
        var shipping_id;
        var freight = 0;
        for (var x in res.data.supplier_list[0].shipping_list) {
          if (res.data.supplier_list[0].shipping_list[x].selected == 'checked') {
            shipping_id = res.data.supplier_list[0].shipping_list[x].shipping_id
            if (shipping_id == '3') {
              freight = res.data.order_total.shipping_fee.toFixed(2)
            }
          }
          if (res.data.supplier_list[0].shipping_list[x].shipping_id != 28) {
            res.data.supplier_list[0].shipping_list[x].shipping_name = '门店配送'
          }
        }
        var use_b = 1
        if (res.data.supplier_list[0].goods_list[0].package_goods_list.length != 0) {
          use_b = 0
          var arra = []
          for (var a in res.data.supplier_list[0].shipping_list) {
            if (res.data.supplier_list[0].shipping_list[a].shipping_id == 28) {
              arra.push(res.data.supplier_list[0].shipping_list[a])
              freight = 0;
              shipping_id = 28;
            }
          }
          res.data.supplier_list[0].shipping_list = arra
          res.data.supplier_list[0].shipping_list[0].selected = 'checked'
          console.log(res.data.supplier_list[0].shipping_list);
        }
        if (res.data.supplier_list[0].goods_list[0].extension_code == 'skill_goods'){
          use_b = 0
        }
        this.setData({
          use_b: use_b,
          def_addr: res.data.def_addr,
          address_id: res.data.def_addr.address_id,
          address_list: res.data.address_list,
          goods_list: res.data.supplier_list[0].goods_list,
          order_total: res.data.order_total,
          shipping_list: res.data.supplier_list[0].shipping_list,
          shipping_ziti: res.data.supplier_list[0].shipping_ziti,
          bonus_list: res.data.supplier_list[0].bonus_list,
          bonus_num: res.data.supplier_list[0].bonus_num,
          shipping_id: shipping_id,
          freight: freight,
          order_info: res.data.order_info,
          ids: options.id,
          ngBack: true
        })
        this.setLocation(res.data.supplier_list[0].shipping_ziti, res.data.def_addr.locationString);
        try {
          wx.setStorageSync('bonus_list', this.data.bonus_list)
        } catch (e) {

        }
      })
      .catch(res => {
        wx.navigateBack()
      })

  },
  onShow: function () {
    if (this.data.ids) {
      app.api.checkout(this.data.userid, this.data.ids)
        .then(res => {
          this.setData({
            //shipping_list: res.data.supplier_list[0].shipping_list,
            def_addr: res.data.def_addr,
          })
          this.setLocation(this.data.shipping_ziti, res.data.def_addr.locationString);
        })
    }

    var addressId = app.addressId
    var bz = app.bz
    var bonus_id = app.bonus_id
    if (bonus_id) {
      var bonus_list = this.data.bonus_list
      for (var i in bonus_list) {
        if (bonus_list[i].bonus_id == bonus_id) {

          this.setData({
            bounes: true,
            bonus_id: bonus_id,
            bounesDetail: bonus_list[i],
            bounesMoney: parseFloat(bonus_list[i].type_money)
          })

        }
      }
    } else {
      this.setData({
        bounes: false,
        bonus_id: 0,
        bounesDetail: [],
        bounesMoney: 0
      })
    }

    if (bz) {
      this.setData({
        bz: bz
      })
    }
    if (addressId) {
      var address_list = this.data.address_list
      for (var i in address_list) {
        if (address_list[i].address_id == addressId) {
          this.setData({
            def_addr: address_list[i],
            address_id: addressId
          })
        }
      }
    }




    this.price();


  },
  setLocation: function (shipping_ziti, locationString) {
    var that = this
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {

        var strs = new Array(); //定义一数组
        strs = locationString.split(","); //字符分割
        console.log(strs)
        //parseFloat(res.latitude), parseFloat(res.longitude)

        try {
          for (var i in shipping_ziti) {
            shipping_ziti[i].juli = Math.ceil(that.juli(parseFloat(shipping_ziti[i].lat), parseFloat(shipping_ziti[i].lng), parseFloat(strs[0]), parseFloat(strs[1])))
            shipping_ziti[i].logo = app.api.getUrl() + '/data/afficheimg/' + shipping_ziti[i].logo
          }
        } catch (e) {
          wx.switchTab({
            url: '/pages/shopCart/shopCart',
          })
        }
        app.api.getDistance()
          .then(res => {
            var d = parseInt(res.data.distance) * 1000

            var value = app.zitiId
            if (!value) {
              value = 0
            }

            if (shipping_ziti) {
              var pickup_point = shipping_ziti.sort(that.sort('juli'))[value].id
              if (shipping_ziti.sort(that.sort('juli'))[value].juli < d) {
                that.setData({
                  selShop: shipping_ziti.sort(that.sort('juli'))[value],
                  pickup_point: pickup_point
                })
              } else {
                that.setData({
                  selShop: { shop_name: '无', juli: '∞' },
                  pickup_point: 0
                })
              }
            }
          })
      }
    })
  },
  getTypeFun: function (e) {
    var shipping_list = this.data.shipping_list
    for (var i in shipping_list) {
      shipping_list[i].selected = ''
    }

    if (shipping_list[e.currentTarget.dataset.index].shipping_id == '3') {
      this.setData({
        freight: parseInt(this.data.order_total.shipping_fee).toFixed(2)
      })
    } else {
      this.setData({
        freight: 0
      })
    }

    shipping_list[e.currentTarget.dataset.index].selected = 'checked'
    this.setData({
      shipping_list: shipping_list,
      shipping_id: e.currentTarget.dataset.shipping_id
    })

    this.price()

  },
  paymentFinish: function () {
    //return
    var sel_goods = []
    for (var i in this.data.goods_list) {
      sel_goods.push(this.data.goods_list[i].rec_id)
    }
    var sel_goods = sel_goods.join(",")
    var address_id = this.data.address_id
    var flow_type = this.data.flow_type
    try {
      var openid = wx.getStorageSync('openid')
    } catch (e) {

    }
    var supplier = {}
    supplier.supplier_id = '0'
    supplier.shipping_id = this.data.shipping_id
    supplier.pickup_point = this.data.pickup_point
    supplier.bonus_id = this.data.bonus_id
    supplier.message = this.data.bz
    var arr = []
    arr.push(supplier)
    var supplier = {}
    supplier.supplier = arr

    console.log(this.data.shipping_id);

    app.api.addOrder(this.data.userid, JSON.stringify(supplier), sel_goods, openid, address_id, this.data.offsetScore)
      .then(res => {

        if (res.code == 500) {

          if (res.data) {
            var goods_list = this.data.goods_list
            //console.log(res.data.split(","))
            //console.log(goods_list)
            for (var i in goods_list) {
              //console.log(res.data.split(",").indexOf(goods_list[i]['goods_id']))
              if (res.data.split(",").indexOf(goods_list[i]['goods_id']) == 0) {
                goods_list[i]['is_null'] = true;
              }
            }
            this.setData({
              goods_list: goods_list
            })
          }

          wx.showToast({
            title: res.message,
            icon: 'none'
          })
          return
        }

        if (typeof (res.data.payment) == "undefined") {
          wx.showToast({
            title: '下单成功',
            icon: 'success',
            complete: function () {
              setTimeout(function () {
                wx.redirectTo({
                  url: '../paymentFin/paymentFin?id=' + res.data.order_id,
                })
              }, 1500)
            }
          })
          return
        }


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
              var message = '成功下单'
            }
            wx.showToast({
              title: message,
              icon: 'none',
              complete: function () {
                setTimeout(function () {
                  wx.redirectTo({
                    url: '../paymentFin/paymentFin?id=' + result.data.order_id,
                  })
                }, 1500)
              }
            })
          },
          'fail': function (res) {
            console.log(res)
            if (res.errMsg == 'requestPayment:fail cancel') {
              wx.redirectTo({
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
  ngBack: function () {
    if (app.ms == 1) {
      app.ms = ''
      wx.redirectTo({
        url: '/pages/rushBuy/rushBuy',
      })
    } else {
      let sw = 1
      for (var i in this.data.goods_list) {
        if (this.data.goods_list[i].extension_code == 'package_buy') {
          sw = 2
          break;
        }
      }
      if (sw == 1) {
        wx.switchTab({
          url: '../allPro/allPro',
        })
      } else {

        wx.redirectTo({
          url: '/pages/comboList/comboList',
        })

      }

    }

  },
  selectAddr: function () {
    wx.navigateTo({
      url: '../addSelect/addSelect',
    })
  },
  price: function () {
    var that = this
    setTimeout(function () {
      //console.log(this.data.order_total.goods_price)
      //return

      let goods_price = that.data.order_total.goods_price

      let bounes_price = that.data.bounesMoney

      let shipping_price = that.data.freight

      //console.log(parseFloat(goods_price))
      //console.log(parseFloat(shipping_price))
      //console.log(parseFloat(bounes_price))
      console.log(that.data.order_total)
      let order_total = that.data.order_total
      order_total.amount_formated_a = (parseFloat(goods_price) + parseFloat(shipping_price) - parseFloat(bounes_price))
      order_total.amount_formated_a = '￥' + ((order_total.amount_formated_a < 0) ? 0 : order_total.amount_formated_a.toFixed(2))

      order_total.bonus_formated = bounes_price ? '￥' + parseFloat(bounes_price).toFixed(2) : order_total.bonus_formated;

      that.setData({
        order_total: order_total
      })
    }, 800)
  },
  //改变使用积分
  changeInt: function (e) {
    console.log(e.detail.value)

    this.setData({
      offsetScore: e.detail.value
    })
  },
  bindfocus: function () {
    this.setData({
      foucs: true
    })
  },
  bindblur: function () {
    var changeValue = this.data.offsetScore;
    console.log(this.data.order_info);
    var order_info = this.data.order_info;

    var maxValue = parseInt(order_info.max_use_integral);
    var meValue = parseInt(order_info.integral);

    console.log(changeValue + '------' + maxValue + "------" + meValue);

    console.log(changeValue < meValue);

    //先判断输入的积分是否大于自己的积分
    if (changeValue < meValue && changeValue != '') {
      //再判断输入积分是否大于可以最大兑换积分
      if (changeValue < maxValue) {
        console.log(1111)
        this.setData({
          offsetScore: changeValue
        })
      } else {
        console.log(2)
        wx.showToast({
          title: '最高可以使用' + maxValue + '积分',
          icon: "none"
        })
        this.setData({
          offsetScore: ''
        })
      }
    } else if (changeValue != '') {
      wx.showToast({
        title: '输入积分大于现有积分！',
        icon: "none"
      })
    }
    this.setData({
      foucs: false
    })
  }
})