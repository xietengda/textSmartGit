const app = getApp();
Page({

  data: {
    cartList: [],
    isIphoneX: getApp().globalData.isIphoneX,
    ad: [],
    sizePrt: [],
    selArrId: [],//选中商品属性id
    selArr: [],//选择的规格size
    selArrText: "请选择口味",//size名称
    butTotal: 1,
    sizePrice: '¥0.00',//显示size层价格
    isIphoneX: getApp().globalData.isIphoneX
  },

  onLoad: function (options) {
    app.api.getAd(17)
      .then(res => {
        let ad = []
        for (var i = 0; i < res.data.length; i++) {
          ad[i] = res.data[i]
          ad[i].ad_code = app.api.getUrl() + res.data[i].ad_code
        }
        this.setData({
          ad: ad
        })
      })
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
    app.api.getUserOrderDetail(userInfo.userid, options.id)
      .then(res => {
        console.log(res)
        let url = '/pages/orderDetail/orderDetail?id=' + res.data.order_info.order_id
        if (res.data.order_info.extension_code == 'package_buy') {
          //url = 
        }
        this.setData({
          order: res.data.order_info,
          img: app.api.getQrcode(res.data.order_info.shipping_ziti.pickup_cn),
          url: url
        })
      })

    var _this = this;
    app.api.getGoods(0, 'is_best')
      .then(res => {
        console.log(res)
        for (var i in res.data.list) {
          res.data.list[i].goods_thumb = app.api.getUrl() + res.data.list[i].goods_thumb
        }
        this.setData({
          cartList: res.data.list
        })
      })
  },
  addCart: function (e) {
    console.log(e)
    var that = this;
    var goodsId = e.currentTarget.dataset.goodsid;
    var cartList = this.data.cartList;
    var selGoods = [];

    for (var x in cartList) {
      if (goodsId == cartList[x].goods_id) {
        selGoods.push(cartList[x]);
      }
    }

    for (var x in selGoods[0].properties) {
      for (var y in selGoods[0].properties[x].values) {
        selGoods[0].properties[x].values[y].sel = 0;
      }
    }
    console.log(selGoods[0])


    //判断这个商品是否有属性选择
    if (selGoods["0"].properties.length != 0) {
      that.setData({
        sizePrt: selGoods[0],
        layerHide: true,
      })
    } else {
      //直接加入购物车
      var e = {
        currentTarget: {
          dataset: {
            goods_id: 0,
            attr_value: 1
          }
        }
      };
      e.currentTarget.dataset.goods_id = selGoods[0].goods_id;
      e.currentTarget.dataset.attr_value = undefined;
      e.currentTarget.dataset.butTotal = this.data.butTotal;

      this.addToCart(e);
    }
  },
  /*选择类型*/
  selSize: function (e) {
    console.log(e);
    var that = this;
    var indexOne = e.currentTarget.dataset.indexOne;
    var indexTwo = e.currentTarget.dataset.indexTwo;
    var sizePrt = this.data.sizePrt;
    var selArrId = [];
    var selArrText = [];
    console.log(sizePrt)

    //清空所有选中属性
    for (var x in sizePrt.properties[indexOne].values) {
      sizePrt.properties[indexOne].values[x].sel = 0;
    }

    //设置选中
    sizePrt.properties[indexOne].values[indexTwo].sel = 1;

    //获取已选中的属性id
    for (var x in sizePrt.properties) {
      for (var y in sizePrt.properties[x].values) {
        if (sizePrt.properties[x].values[y].sel == 1) {
          selArrId.push(sizePrt.properties[x].values[y].id);
          selArrText.push(sizePrt.properties[x].values[y].label)
        }
      }
    }

    that.setData({
      sizePrt: sizePrt,
      selArrId: selArrId,
      selArrText: selArrText
    })

    this.changePrice(sizePrt.goods_id);
  },
  //改变选择规格后的价钱 pOne:goods_id
  changePrice: function (pOne) {
    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    var selArrId = this.data.selArrId;
    console.log(this.data.selArrId)
    // return;

    app.api.getGoodsPrice(userInfo.userid, pOne, this.data.butTotal, selArrId.toString())
      .then(res => {
        console.log(res)
        that.setData({
          sizePrice: res.data.result1
        })
      })
      .catch(re => {
        console.log('报错' + res);
      })
  },
  //改变数量
  changeNum: function (e) {
    var numType = e.currentTarget.dataset.numType;
    var butTotal = this.data.butTotal;

    if (numType == "cut" && butTotal > 1) {
      butTotal = parseInt(butTotal) - 1;
    } else if (numType == "add") {
      butTotal = parseInt(butTotal) + 1;
    }
    this.setData({
      butTotal: butTotal
    })
  },
  //手动输入数量
  manualChange: function (e) {
    if (e.detail.value != '') {
      this.setData({
        butTotal: e.detail.value
      })
    } else {
      this.setData({
        butTotal: 1
      })
    }
  },
  //点击size弹层确定
  sizeBtn: function (e) {
    var sizePrt = this.data.sizePrt;
    var selArrId = this.data.selArrId;
    if (selArrId.length < 2) {
      wx.showToast({
        title: '请选择规格口味!',
        icon: 'none',
        duration: 1000
      })
      return
    }
    console.log(sizePrt);


    var e = {
      currentTarget: {
        dataset: {
          goods_id: 0,
          attr_value: 1
        }
      }
    };
    e.currentTarget.dataset.goods_id = sizePrt.goods_id;
    e.currentTarget.dataset.attr_value = selArrId.toString();
    e.currentTarget.dataset.butTotal = this.data.butTotal;
    //加入购物车
    this.addToCart(e);

  },
  //加入购物车函数
  addToCart: function (e) {
    var _this = this;
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
        wx.navigateTo({
          url: '../login/login'
        })
      }
    } catch (e) {
      //程序出错
    }
    var os;
    console.log(e.currentTarget.dataset.attr_value);
    if (e.currentTarget.dataset.attr_value != undefined) {
      os = {
        goods_id: e.currentTarget.dataset.goods_id,
        parent: 0,
        spec: e.currentTarget.dataset.attr_value.split(','),
        number: e.currentTarget.dataset.butTotal || 1,
      }
    } else {
      os = {
        goods_id: e.currentTarget.dataset.goods_id,
        parent: 0,
        spec: '',
        number: 1,
      }
    }

    if (e.currentTarget.dataset.buy == 'yes') {
      os.quick = 1
    }


    console.log(os);
    // return

    app.api.addToCart(userInfo.userid, os)
      .then(res => {
        console.log(res)
        if (res.code == 200) {
          wx.showToast({
            title: res.message,
            icon: 'success',
            complete: function () {
              var userInfo = wx.getStorageSync('userInfo')
            }
          })
          _this.setData({
            layerHide: false,
            butTotal: 1
          })
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
        }
      })
  },
  //关闭黑色遮罩
  clickLayer: function () {
    this.setData({
      layerHide: false,
      butTotal: 1,
      sizePrice: '¥0.00'
    })
  },
  navTap: function (e) {
    app.jumpTo(e.currentTarget.dataset.type, e.currentTarget.dataset.cat_id)
  },
})