const app = getApp();
Page({
  data: {
    reshList: [],
    searchText: '',
    conditionOne: "", //第一个条件
    conditionTwo: "", //第二个条件
    categoryid: 0,
    categorylist: [],
    page: 1,
    sizePrt: [],
    selArrId: [], //选中商品属性id
    selArr: [], //选择的规格size
    selArrText: "请选择口味", //size名称
    butTotal: 1,
    sizePrice: '¥0.00', //显示size层价格
    isIphoneX: getApp().globalData.isIphoneX,
    top: 0,
    height: 0,
    height2: 0
  },
  onPullDownRefresh: function () {
    this.onShow()
    wx.stopPullDownRefresh()
  },
  onShow: function (options) {
    if (this.data.isIphoneX) {
      this.setData({
        height2: 268 
      })
    } else {
      this.setData({
        height2: 268 + 125
      })
    }
    var res = wx.getSystemInfoSync()
    console.log(res.screenHeight)
    console.log(res.statusBarHeight)
    console.log(res.windowHeight - 200)
    this.setData({
      height: res.windowHeight - 220
    })
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

    if (app.globalData.category) {
      this.setData({
        categoryid: app.globalData.category
      })
    }
    this.categorylist(this.data.categoryid)

    if (app.saveHistory) {
      this.setData({
        searchText: app.saveHistory
      })
      this.goodslist(this.data.categoryid, '', app.saveHistory)
      app.saveHistory = ''

    } else {

      this.goodslist(this.data.categoryid)
      this.setData({
        searchText: ''
      })
    }

  },
  searchBtn: function (e) {
    this.setData({
      page: 1
    })

    var searchText = e.detail.value.search

    switch (this.data.conditionOne) {
      case '1':
        this.categorylist(this.data.categoryid)
        this.goodslist(this.data.categoryid, 'is_hot', searchText)
        break;
      case '2':
        this.categorylist(this.data.categoryid)
        this.goodslist(this.data.categoryid, 'is_new', searchText)
        break;
      default:
        this.categorylist(this.data.categoryid)
        this.goodslist(this.data.categoryid, '', searchText)
        break;
    }

  },
  searchBlur: function (e) {
    console.log(e)
    this.setData({
      searchText: e.detail.value
    })
  },
  conditionOneChange: function (e) {
    this.setData({
      page: 1,
      top: 0
    });
    var id = e.currentTarget.dataset.conNum
    switch (id) {
      case '1':
        this.goodslist(this.data.categoryid, 'is_hot')
        break;
      case '2':
        this.goodslist(this.data.categoryid, 'is_new')
        break;
      default:
        this.goodslist(this.data.categoryid)
        break;
    }
    this.setData({
      conditionOne: e.currentTarget.dataset.conNum,
      page: 1
    });
  },
  conditionTwoChange: function (e) {
    this.setData({
      page: 1,
      top: 0
    });
    switch (this.data.conditionOne) {
      case '1':
        this.categorylist(e.target.dataset.conNum)
        this.goodslist(e.target.dataset.conNum, 'is_hot')
        break;
      case '2':
        this.categorylist(e.target.dataset.conNum)
        this.goodslist(e.target.dataset.conNum, 'is_new')
        break;
      default:
        this.categorylist(e.target.dataset.conNum)
        this.goodslist(e.target.dataset.conNum)
        break;
    }
    this.setData({
      categoryid: e.target.dataset.conNum,
    });
  },
  //获取顶部分类
  categorylist: function (cid) {
    app.api.getCategory(0)
      .then(res => {
        res.data.category_list.unshift({
          id: 0,
          name: '全部'
        })
        for (var i in res.data.category_list) {
          if (cid == res.data.category_list[i]['id']) {
            res.data.category_list[i].class = 'all_P_head_two_sel'
          } else {
            res.data.category_list[i].class = ''
          }
        }
        this.setData({
          categoryList: res.data.category_list
        })
      })
      .catch(res => {
        console.log(res)
        wx.showToast({
          title: '网络出错了！',
          icon: 'none'
        })
      })
  },
  goodslist: function (cid, filter = '', keywords = '', page) {
    wx.showLoading({
      title: '加载中',
    })
    var _this = this;
    app.api.getGoods(cid, filter, keywords, this.data.userInfo.userid, this.data.page)
      .then(res => {
        console.log(res);
        for (var i in res.data.list) {
          res.data.list[i].goods_thumb = app.api.getUrl() + res.data.list[i].goods_thumb
          res.data.list[i].shop_price = parseFloat(res.data.list[i].shop_price).toFixed(2)
        }
        var reshList = [];
        if (res.data.list == false) {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
          this.setData({
            reshList: reshList
          });
        } else {


          if (_this.data.page != 1 && _this.data.pageend != 'end') {
            reshList = _this.data.reshList.concat(res.data.list)
          } else {
            reshList = res.data.list
          }

          if (_this.data.page < res.data.pager.page_count) {
            _this.setData({
              page: parseInt(_this.data.page) + 1,
              pageend: _this.data.page
            })
          } else {
            _this.setData({
              page: parseInt(_this.data.page),
              pageend: 'end'
            })
          }
        }

        _this.setData({
          reshList: reshList
        })

        wx.hideLoading()
      })
      .catch(res => {
        //console.log(res)
        wx.showToast({
          title: '网络出错了！',
          icon: 'none'
        })
      })
  },
  sc: function (e) {
    if (this.data.userid) {
      app.api.collect(this.data.userid, e.currentTarget.dataset.goodsid)
        .then(res => {
          var collect = this.data.collect;
          var collectNum = 1;
          var title = "收藏成功";
          var reshList = this.data.reshList;
          for (var x in reshList) {
            if (e.currentTarget.dataset.goodsid == reshList[x].goods_id) {
              if (reshList[x].is_collected == "1") {
                title = "取消收藏";
                reshList[x].is_collected = '0';
              } else {
                title = "收藏成功";
                reshList[x].is_collected = '1';
              }
            }
          }
          wx.showToast({
            title: title,
            icon: 'success',
            duration: 1000
          })

          this.setData({
            reshList: reshList
          });

        })
        .catch(res => {
          console.log(res)
          wx.showToast({
            title: '网络出错了！',
            icon: 'none'
          })
        })
    } else {
      wx.navigateTo({
        url: '../login/login'
      })
    }
  },
  //上拉加载
  onReachBottom: function () {

    if (this.data.page != 'end' && this.data.pageend != 'end') {
      //根据条件二判断条件一
      switch (this.data.conditionOne) {
        case '1':
          this.goodslist(this.data.categoryid, 'is_hot')
          break;
        case '2':
          this.goodslist(this.data.categoryid, 'is_new')
          break;
        default:
          this.goodslist(this.data.categoryid)
          break;
      }
    } else {
      wx.showToast({
        title: '已经到底了',
        icon: 'none'
      })
    }
  },
  addCart: function (e) {
    console.log(e)
    var that = this;
    var goodsId = e.currentTarget.dataset.goodsid;
    var reshList = this.data.reshList;
    var selGoods = [];

    for (var x in reshList) {
      if (goodsId == reshList[x].goods_id) {
        selGoods.push(reshList[x]);
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
  toDetail: function (e) {
    wx.navigateTo({
      url: '../proDetails/proDetails?goodsId=' + e.currentTarget.dataset.id,
    })
  }
})