const app = getApp();
var EARTH_RADIUS = 6378137.0;    //单位M
var PI = Math.PI;
Page({
  data: {
    array: [],
    index: 0,
    selShopList: [],
    isIphoneX: getApp().globalData.isIphoneX
  },
  onLoad: function (options) {
    try {
      var order = wx.getStorageSync('order')
      if (!order) {
        wx.navigateBack({
          delta: 2
        })
      }
    } catch (e) {
      wx.navigateBack({
        delta: 2
      })
    }
    this.getCityNameOFLocation()
    var that = this
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        try {
          for (var i in order.supplier_list[0].shipping_ziti) {

            var strs = new Array(); //定义一数组
            strs = order.def_addr.locationString.split(","); //字符分割

            order.supplier_list[0].shipping_ziti[i].juli = Math.ceil(that.juli(parseFloat(order.supplier_list[0].shipping_ziti[i].lat), parseFloat(order.supplier_list[0].shipping_ziti[i].lng), parseFloat(strs[0]), parseFloat(strs[1])))
            order.supplier_list[0].shipping_ziti[i].logo = app.api.getUrl() + '/data/afficheimg/' + order.supplier_list[0].shipping_ziti[i].logo


          }
        } catch (e) {
          wx.switchTab({
            url: '/pages/shopCart/shopCart',
          })
        }

        if (app.zitiId) {
          order.supplier_list[0].shipping_ziti.sort(that.sort('juli'))[app.zitiId].sel = 1;
        } else {
          order.supplier_list[0].shipping_ziti.sort(that.sort('juli'))[0].sel = 1;
        }

        for (var x in order.supplier_list[0].shipping_ziti) {
          if (order.supplier_list[0].shipping_ziti[x].juli.toString().length > 4) {
            order.supplier_list[0].shipping_ziti[x].juli = (order.supplier_list[0].shipping_ziti[x].juli / 10000).toFixed(1) + "K";
          }
        }
        app.api.getDistance()
          .then(res => {
            var d = parseInt(res.data.distance) * 1000
            var list = order.supplier_list[0].shipping_ziti.sort(that.sort('juli'))
            var lists = []
            for (var z in list) {
              if (list[z].juli < d) {
                lists.push(list[z])
              }
            }
            that.setData({
              selShopList: lists,
              selShopListOr: list
            })
          })

      }
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    });
  },
  clickAdr: function (e) {
    var index = e.currentTarget.dataset.index;
    var selShopList = this.data.selShopList
    console.log(selShopList)

    for (var i in selShopList) {
      selShopList[i].sel = ''
    }
    selShopList[index].sel = 1

    this.setData({
      selShopList: selShopList
    })

    app.zitiId = index
    wx.navigateBack({})


  },
  getCityNameOFLocation: function () {
    wx.showLoading({
      title: '正在获取定位',
      mask: true
    })

    var that = this;
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        console.log("定位成功");
        var locationString = res.latitude + "," + res.longitude;
        app.api.getAddress(locationString)
          .then(res => {
            // console.log( res);
            that.setData({
              position: res.result.address
            })
            wx.hideLoading()
          })
          .catch(res => {
            console.log("请求失败");
            wx.showToast({
              title: '定位失败,请稍候再试',
            })
          })
      },
      fail: function () {
        // fail
        console.log("定位失败");
      },
      complete: function () {
        // complete
        console.log("定位完成");
      }
    })
  },
  dingwei: function () {
    this.getCityNameOFLocation()
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
  searchSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var list = this.data.selShopListOr
    var lists = []
    for (var i in list) {
      if (list[i].shop_name.indexOf(e.detail.value) != -1 || list[i].address.indexOf(e.detail.value) != -1) {
        lists.push(list[i])
      }
    }
    this.setData({
      selShopList: lists,
    })
  }
})