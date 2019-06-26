const app = getApp();
Page({
  data: {
    hasProduct: true,
    editBtn: true,
    cartList: [],
    // selArr: [],
    allSel: false,
    countPrice: 0, //减去优惠的
    initcountPrice: 0,//原价，没减去优惠的
    countToatl: 0,
    discounts: 0,//优惠总额
    login: false,
    selectId: [],
    position: '正在定位...',
    layerHide: false,//控制隐藏显示size属性
    sizePrt: [],
    selArrId: [],//选中商品属性id
    selArr: [],//选择的规格size
    selArrText: "请选择口味",//size名称
    butTotal: 1,
    sizePrice: '¥0.00',//显示size层价格
    isIphoneX: getApp().globalData.isIphoneX,
  },
  // onShow: function () {
  //   this.setData({
  //     hasProduct: true,
  //     allSel: false,
  //     selectId: []
  //   })
  //   this.onLoad()
  // },
  onPullDownRefresh: function () {
    this.onShow()
    wx.stopPullDownRefresh()
  },
  onLoad: function () {
    var userInfo = wx.getStorageSync('userInfo')
    this.getShopCart(userInfo.userid);
  },
  onShow: function (options) {
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

    }

    this.tuijian()

    this.getShopCart(userInfo.userid);

    this.getCityNameOFLocation()

  },
  //获取购物车商品
  getShopCart: function (userid) {
    app.api.getShopCart(userid)
      .then(res => {

        var selectId = this.data.selectId;
        var allRecId = []
        for (var i in res.data.supplier_list[0].goods_list) {
          res.data.supplier_list[0].goods_list[i].goods_thumb = app.api.getUrl() + res.data.supplier_list[0].goods_list[i].goods_thumb
          allRecId.push(res.data.supplier_list[0].goods_list[i].rec_id);
        }

        //清掉套餐
        for (var b in res.data.supplier_list[0].goods_list) {
          if (res.data.supplier_list[0].goods_list[b].package_goods_list.length != 0) {
            app.api.dropCart(res.data.supplier_list[0].goods_list[b].user_id, res.data.supplier_list[0].goods_list[b].rec_id)
            res.data.supplier_list[0].goods_list.splice(b, 1);
          }
        }


        //循环获取的商品，然后加上是否选中标志
        for (let j in res.data.supplier_list[0].goods_list) {
          res.data.supplier_list[0].goods_list[j].select = false;
          if (selectId.length != 0) {
            for (let x in selectId) {
              if (selectId[x] == res.data.supplier_list[0].goods_list[j].rec_id) {
                res.data.supplier_list[0].goods_list[j].select = true;
              }
            }
          }
        }

        this.checkAll(res.data.supplier_list[0].goods_list);

        this.setData({
          cartList: res.data.supplier_list[0].goods_list,
          total: res.data.total,
          allRecId: allRecId,
          abc: res.data.supplier_list[0].goods_list.length,
          hasProduct: true
        })
      })
      .catch(res => {
        this.setData({
          hasProduct: false
        })
      })
  },
  //单选
  selChange: function (e) {
    var rec_id = e.currentTarget.dataset.rec_id;
    var cartList = this.data.cartList

    for (let i in cartList) {
      if (cartList[i].rec_id == rec_id && cartList[i].select == true) {
        cartList[i].select = false
      } else if (cartList[i].rec_id == rec_id) {
        cartList[i].select = true;
      }
    }

    this.checkAll(cartList);

    this.setData({
      cartList: cartList,
    });


  },
  //全选
  allSelFun: function () {
    let cartList = this.data.cartList;
    let selectId = [];

    var allSel = this.data.allSel;
    var sign = true;

    if (allSel) {
      sign = false;
    } else {
      for (let i in cartList) {
        selectId.push(cartList[i].rec_id)
      }
    }

    for (let i in cartList) {
      cartList[i].select = sign;
    }
    allSel = sign;
    this.checkAll(cartList);

    this.setData({
      cartList: cartList,
      allSel: allSel,
      selectId: selectId
    });
  },
  //判断是否全选 pOne:最新选择后的数据
  checkAll: function (pOne) {
    let allSel = true;
    let countPrice = 0;
    let initcountPrice = 0;
    let countToatl = 0;
    let discounts = 0;
    let selectId = [];

    for (let i in pOne) {
      if (pOne[i].select == false) {
        allSel = false;
      } else {
        countPrice += parseFloat(pOne[i].goods_price * pOne[i].goods_number);
        initcountPrice += parseFloat(pOne[i].market_price * pOne[i].goods_number);
        countToatl += parseFloat(pOne[i].goods_number);
        discounts += parseFloat(pOne[i].market_price * pOne[i].goods_number - pOne[i].goods_price * pOne[i].goods_number);
        selectId.push(pOne[i].rec_id);
      }
    }
    this.setData({
      allSel: allSel,
      countPrice: countPrice.toFixed(2),
      countToatl: countToatl,
      initcountPrice: initcountPrice.toFixed(2),
      discounts: discounts.toFixed(2),
      selectId: selectId
    });
  },

  changeToatl: function (e) {
    var cType = e.currentTarget.dataset.cType;
    var rec_id = e.currentTarget.dataset.rec_id;
    var goodsid = e.currentTarget.dataset.goodsid;
    var goods_number = e.currentTarget.dataset.goods_number;

    if (cType == 'cut' && goods_number != 1) {
      app.api.setCartNum(this.data.userInfo.userid, rec_id, parseInt(goods_number) - 1, goodsid)
        .then(res => {
          if (res.code == 200) {
            this.getShopCart(this.data.userInfo.userid);
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none',
            });
          }
        })
      return
    } else if (cType == 'add') {
      app.api.setCartNum(this.data.userInfo.userid, rec_id, parseInt(goods_number) + 1, goodsid)
        .then(res => {
          if (res.code == 200) {
            this.getShopCart(this.data.userInfo.userid);
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none',
            });
          }
        })
      return
    }
    wx.showToast({
      title: '修改数量不能为零',
      icon: 'error',
    });
  },
  editCart: function () {
    var editBtn = this.data.editBtn;
    var mark = true;

    if (editBtn) {
      mark = false;
    }

    this.setData({
      editBtn: mark
    })
  },
  delCart: function () {
    var selectId = this.data.selectId
    if (selectId === undefined || selectId.length == 0) {
      wx.showToast({
        title: '请选择要删除的商品',
        icon: 'none'
      })
      return
    }
    var rec_id = selectId.join(",");
    var that = this
    app.api.dropCart(this.data.userid, rec_id)
      .then(res => {
        if (res.code == 500) {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
          return
        }
        wx.showToast({
          title: '删除成功',
          complete: function () {
            that.getShopCart(that.data.userid)
            that.setData({
              selectId: [],
              cartList: []
            })
          }
        })
      })
  },
  clickTotal: function () {
    var selectId = this.data.selectId.join(',')
    if (selectId) {
      wx.redirectTo({
        url: '../payment/payment?id=' + selectId
      })
    } else {
      wx.showToast({
        title: '请选择要结算的商品',
        icon: 'none'
      })
    }

  },
  tuijian: function () {
    app.api.getGoods(0, 'is_best')
      .then(res => {
        for (var i in res.data.list) {
          res.data.list[i].goods_thumb = app.api.getUrl() + res.data.list[i].goods_thumb
        }
        this.setData({
          recomList: res.data.list
        })
      })
  },
  tapToDetail: function (e) {
    var goodsid = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '../proDetails/proDetails?goodsId=' + goodsid,
    })
  },
  getCityNameOFLocation: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        var locationString = res.latitude + "," + res.longitude;
        app.api.getAddress(locationString)
          .then(res => {
            that.setData({
              position: res.result.address
            })
          })
          .catch(res => {
            wx.showToast({
              title: '定位失败,请稍候再试',
            })
          })
      },
      fail: function () {
        // fail

      },
      complete: function () {
        // complete

      }
    })
  },
  addCart: function (e) {

    var that = this;
    var goodsId = e.currentTarget.dataset.goodsid;
    var recomList = this.data.recomList;
    var selGoods = [];

    for (var x in recomList) {
      if (goodsId == recomList[x].goods_id) {
        selGoods.push(recomList[x]);
      }
    }

    for (var x in selGoods[0].properties) {
      for (var y in selGoods[0].properties[x].values) {
        selGoods[0].properties[x].values[y].sel = 0;
      }
    }


    //判断这个商品是否有属性选择
    if (selGoods["0"].properties.length != 0) {
      that.setData({
        sizePrt: selGoods[0],
        layerHide: true,
      })
    } else {
      //直接加入购物车
      var e = { currentTarget: { dataset: { goods_id: 0, attr_value: 1 } } };
      e.currentTarget.dataset.goods_id = selGoods[0].goods_id;
      e.currentTarget.dataset.attr_value = undefined;
      e.currentTarget.dataset.butTotal = this.data.butTotal;

      this.addToCart(e);
    }
  },
  /*选择类型*/
  selSize: function (e) {
    var that = this;
    var indexOne = e.currentTarget.dataset.indexOne;
    var indexTwo = e.currentTarget.dataset.indexTwo;
    var sizePrt = this.data.sizePrt;
    var selArrId = [];
    var selArrText = [];

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
    // return;

    app.api.getGoodsPrice(userInfo.userid, pOne, this.data.butTotal, selArrId.toString())
      .then(res => {
        that.setData({
          sizePrice: res.data.result1
        })
      })
      .catch(re => {

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

    var e = { currentTarget: { dataset: { goods_id: 0, attr_value: 1 } } };
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
    // return

    app.api.addToCart(userInfo.userid, os)
      .then(res => {
        if (res.code == 200) {
          wx.showToast({
            title: res.message,
            icon: 'success',
            complete: function () {
              var userInfo = wx.getStorageSync('userInfo')
              _this.getShopCart(userInfo.userid);
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
  //手动更改购物车商品的数量
  manualChangeNum: function (e) {
    var rec_id = e.currentTarget.dataset.rec_id;
    var goodsid = e.currentTarget.dataset.goodsid;
    var goods_number = e.currentTarget.dataset.goods_number;

    if (e.detail.value != '') {
      app.api.setCartNum(this.data.userInfo.userid, rec_id, e.detail.value, goodsid)
        .then(res => {
          if (res.code == 200) {
            this.getShopCart(this.data.userInfo.userid);
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none',
            });
          }
        })
      return
    } else {
      app.api.setCartNum(this.data.userInfo.userid, rec_id, 1, goodsid)
        .then(res => {
          if (res.code == 200) {
            this.getShopCart(this.data.userInfo.userid);
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none',
            });
          }
        })
      return
    }
  }
})