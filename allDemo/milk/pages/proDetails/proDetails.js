const app = getApp();
const selectAttr = []
Page({
  data: {
    goodsId: 0,
    current: 0,
    disCount: [1, 2, 3],
    discountList: [],
    //切换商品介绍，评论标志
    proIntIndex: 1,
    //收藏(0:未收藏 1：已收藏)
    collect: 0,
    sizeList: [],
    //黑色遮罩
    layerType: false,
    //普通产品弹窗
    showLayer: false,
    //套餐产品弹窗
    comboLayer: false,
    //是否可以滚动页面标志
    touchmove: false,
    //套餐选购按钮（0.立即选购1.完成选购）
    comboType: 0,
    /*点击类型(cart:购物车，buy购买)*/
    clickType: 'cart',
    //购买数量
    butTotal: 1,
    //切换底部按钮，1：正常商品，2.套餐商品
    proType: 1,
    comboList: [],
    goods: {},
    imgUrls: [],
    selectAttr: '请选择口味',
    userid: 0,
    login: false,
    userInfo: {},
    title: '',
    comment_list: [],
    attr: [],
    tc_googds_num: [],
    selectNum: 0,
    isIphoneX: getApp().globalData.isIphoneX,
  },
  bannerChange: function (event) {

    this.setData({
      current: event.detail.current,
    });
  },
  proIntChange: function (event) {
    this.setData({
      proIntIndex: event.currentTarget.dataset.index
    });
  },
  collectChange: function () {
    app.api.collect(this.data.userid, this.data.goodsId)
      .then(res => {
        var collect = this.data.collect;
        var collectNum = 1;
        var title = "收藏成功";
        if (collect == 1) {
          collectNum = 0;
          title = "取消收藏"
        }


        this.setData({
          collect: collectNum
        });
        wx.showToast({
          title: title,
          icon: 'success',
          duration: 1000
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
  clickLayer: function () {
    var layerType = false;
    var showLayer = false;
    var comboLayer = false;
    var touchmove = false;
    var comboType = 0;
    this.setData({
      layerType: layerType,
      showLayer: showLayer,
      comboType: comboType,
      comboLayer: comboLayer,
      touchmove: touchmove
    });
  },
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: this.data.goods_name,
      path: 'pages/proDetails/proDetails' + this.data.url,
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

  },
  urlEncode: function (param, key, encode, label = '&') {
    if (param == null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
      paramStr += label + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
    } else {
      var keyArr = Object.keys(param);
      for (var i in param) {
        var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
        if (keyArr[0] == i) {
          paramStr += this.urlEncode(param[i], k, encode, '?');
        } else {
          paramStr += this.urlEncode(param[i], k, encode);
        }
      }
    }
    return paramStr;
  },
  onLoad: function (options) {
    console.log(options)
    console.log(this.urlEncode(options))
    this.setData({
      url: this.urlEncode(options)
    })
    try {
      var userInfo = wx.getStorageSync('userInfo')
      if (userInfo.userid) {
        this.setData({
          login: true,
          userInfo: userInfo,
          userid: userInfo.userid
        })
      } else {
        this.setData({
          login: false,
        })
      }
    } catch (e) {

    }
    if (!options.goodsId) {
      wx.navigateBack({})
    }
    app.api.getALLBonus()
      .then(res => {
        // console.log(res)
        for (var i in res.data) {
          res.data[i].type_money = parseInt(res.data[i].type_money)
        }
        let arr = []
        for (var a in res.data) {
          if (parseInt(res.data[a].send_end_date) * 1000 > Date.parse(new Date())) {
            res.data[a].bonus_code = app.api.getUrl() + 'data/bonusimg/' + res.data[a].bonus_code
            arr.push(res.data[a])
          }
        }
        this.setData({
          discountList: arr
        })
      })
    var proType = "1";
    if (options.proType == '2') {
      proType = 2;
      this.setData({
        proType: proType,
        goodsId: options.goodsId
      })
      app.api.getPackageDetail(this.data.goodsId)
        .then(res => {
          console.log(res)
          var imgUrls = [app.api.getUrl() + 'data/afficheimg/' + res.data.logo]
          var goods = {}
          goods.goods_name = res.data.act_name
          goods.market_price = res.data.yuan_price ? res.data.yuan_price : res.data.package_price
          goods.shop_price = res.data.package_price
          goods.comment_count = 0
          goods.select_num = res.data.select_num
          goods.can_select_num = res.data.select_num
          goods.diy = res.data.diy
          goods.act_id = res.data.act_id
          goods.goods_desc = res.data.goods_desc.replace(/\<img/gi, '<img class="rich_img"');


          if (res.data.diy == 0) {
            var num = 0
            for (var i in res.data.goods) {
              num += parseInt(res.data.goods[i].g3)
            }
            goods.select_num = num
          }
          for (var i in res.data.goods) {
            res.data.goods[i].c_num = 0
          }
          this.setData({
            imgUrls: imgUrls,
            goods: goods,
            disCount: [],
            selectgoods: res.data.goods,
          })
        })
    } else {
      this.setData({
        proType: proType,
        goodsId: options.goodsId
      })
      this.goodsinfo(this.data.goodsId, this.data.userid)
    }

  },
  clickType: function (e) {

    if (e.currentTarget.dataset.type == 'pack') {
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
      if (e.currentTarget.dataset.diy == 1) {
        if (this.data.selectNum < this.data.goods.select_num) {
          wx.showToast({
            title: '还要选' + (parseInt(this.data.goods.select_num) - parseInt(this.data.selectNum)) + '瓶才可以下单哟',
            icon: 'none'
          })
          return
        }
        var goods = []
        for (var i in this.data.selectgoods) {
          goods[i] = {}
          goods[i].goods_id = this.data.selectgoods[i].goods_id
          goods[i].product_id = this.data.selectgoods[i].product_id
          goods[i].goods_number = this.data.selectgoods[i].c_num
        }
        app.api.addDiyPackage(userInfo.userid, JSON.stringify(goods), this.data.goods.act_id)
          .then(res => {
            console.log(res)
            if (res.code == 200) {
              wx.showToast({
                title: '成功选购',
                complete: function () {
                  setTimeout(function () {
                    wx.navigateTo({
                      url: '/pages/payment/payment?id=' + res.data.rec_id,
                    })
                  }, 1500)
                }
              })
            }
          })
      } else {
        app.api.add_package_to_cart(userInfo.userid, this.data.goods.act_id)
          .then(res => {
            console.log(res)
            if (res.code == 200) {
              wx.showToast({
                title: '成功选购',
                complete: function () {
                  setTimeout(function () {
                    wx.navigateTo({
                      url: '/pages/payment/payment?id=' + res.data.rec_id,
                    })
                  }, 1500)
                }
              })
            }
          })
      }

      return
    }

    var layerType = true;
    var showLayer = true;
    var touchmove = true;
    var clickType = e.currentTarget.dataset.type;

    this.setData({
      layerType: layerType,
      showLayer: showLayer,
      clickType: clickType,
      touchmove: touchmove
    });
  },
  /*确定按钮*/
  sizeBtn: function () {
    var layerType = false;
    var showLayer = false;
    var touchmove = false;
    var clickType = this.data.clickType
    this.setData({
      layerType: layerType,
      showLayer: showLayer,
      touchmove: touchmove
    });
    var t = 0
    if (clickType == 'buy') {
      t = 1
    }
    this.addToCart(t)
  },
  /*选择类型*/
  selSize: function (e) {
    var sizeIndex = e.currentTarget.dataset.sizeIndex;
    var sizeListIndex = e.currentTarget.dataset.sizeListIndex;
    var sizeList = this.data.sizeList;
    for (var x in sizeList) {
      if (sizeList[x].attr_id == sizeListIndex) {
        for (var y in sizeList[x].values) {
          if (sizeList[x].values[y].id == sizeIndex) {
            sizeList[x].values[y].sel = 1;
            selectAttr[sizeListIndex] = {
              label: sizeList[x].values[y].label,
              id: sizeIndex
            }
          } else {
            sizeList[x].values[y].sel = 0;
          }
        }
      }
    }

    console.log(selectAttr)

    var selectAttrName = '已选口味：'
    var attr = []
    for (var i in selectAttr) {
      selectAttrName = selectAttrName + selectAttr[i].label + ' '
      attr.push(selectAttr[i].id);
    }
    this.setData({
      sizeList: sizeList,
      selectAttr: selectAttrName,
      attr: attr
    });
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
  //套餐改变数量
  comboChange: function (e) {
    console.log(e)
    var selectgoods = this.data.selectgoods
    for (var i in selectgoods) {
      if (selectgoods.indexOf(selectgoods[i]) == e.currentTarget.dataset.id) {
        if (e.currentTarget.dataset.type == 'add') {
          if (this.data.selectNum >= this.data.goods.select_num) {
            wx.showToast({
              title: '超出选择数量限制',
              icon: 'none'
            })
            return
          }
          selectgoods[i].c_num = parseInt(selectgoods[i].c_num) + 1
          this.setData({
            selectNum: parseInt(this.data.selectNum) + 1
          })
        } else {
          if (selectgoods[i].c_num != 0) {
            selectgoods[i].c_num = parseInt(selectgoods[i].c_num) - 1
            this.setData({
              selectNum: parseInt(this.data.selectNum) - 1
            })
          }
        }
      }
    }
    var goods = this.data.goods
    goods.can_select_num = parseInt(goods.select_num) - parseInt(this.data.selectNum)
    this.setData({
      selectgoods: selectgoods,
      goods: goods
    })
    return
    var comboOne = e.currentTarget.dataset.comboOne;
    var comboTwo = e.currentTarget.dataset.comboTwo;
    var changeType = e.currentTarget.dataset.type;
    //选择总数
    var allNum = 0;

    var comboList = this.data.comboList;

    if (changeType == "cut" && comboList[comboOne].list[comboTwo].num != '0') {
      comboList[comboOne].list[comboTwo].num = parseInt(comboList[comboOne].list[comboTwo].num) - 1;
    } else if (changeType == "add" && comboList[comboOne].residue != "0") {
      comboList[comboOne].list[comboTwo].num = parseInt(comboList[comboOne].list[comboTwo].num) + 1;
    }

    for (var x in comboList) {
      if (x == comboOne) {
        for (var y in comboList[x].list) {
          allNum += parseInt(comboList[x].list[y].num);
        }
      }
    }

    comboList[comboOne].residue = parseInt(comboList[comboOne].count) - allNum;

    this.setData({
      comboList: comboList
    });
  },
  //立即选购
  clickCombo: function (e) {
    var layerType = true;
    var comboLayer = true;
    var touchmove = true;
    var comboType = 1;

    this.setData({
      comboLayer: comboLayer,
      comboType: comboType,
      layerType: layerType,
      touchmove: touchmove
    })
  },
  //完成选购
  finishCombo: function (e) {
    var layerType = false;
    var comboLayer = false;
    var touchmove = false;
    var comboType = 0;

    this.setData({
      comboLayer: comboLayer,
      comboType: comboType,
      layerType: layerType,
      touchmove: touchmove
    })
  },
  //分享
  shareFun: function (e) {
    this.onShareAppMessage(e)
  },
  onShareAppMessage: function (res) {
    return {
      title: this.data.title,
      path: '/pages/proDetails/proDetails?goodsId=' + this.data.goodsId
    }
  },
  goodsinfo: function (id, userid) {
    app.api.getGoodsInfo(id, userid)
      .then(res => {
        console.log(res)
        if (res.code == 500) {
          wx.showToast({
            title: res.message,
            icon: 'none',
            complete: function () {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
        //getGoodsComment
        app.api.getGoodsComment(id)
          .then(result => {
            console.log(result)
            for (var x in result.data.comment_list) {
              for (var y in result.data.comment_list[x].shaidan_imgs) {
                result.data.comment_list[x].shaidan_imgs[y].image = app.api.getUrl() + result.data.comment_list[x].shaidan_imgs[y].image
              }
            }
            this.setData({
              comment_list: result.data.comment_list
            })
          })
        res.data.goods_img = app.api.getUrl() + res.data.goods_img
        // res.data.goods_desc = res.data.goods_desc.replace(/\<img/gi, '<img style="max-width:454px;height:auto;display;block;" mode="aspectFill"');
        res.data.goods_desc = res.data.goods_desc.replace(/\<img/gi, '<img class="rich_img"');

        res.data.imgUrls = []
        for (var i in res.data.goods_gallery) {
          res.data.imgUrls[i] = res.data.goods_gallery[i].img_original = app.api.getUrl() + res.data.goods_gallery[i].img_original
        }

        this.setData({
          goods: res.data,
          imgUrls: res.data.imgUrls,
          disCount: res.data.promotion,
          sizeList: res.data.properties,
          collect: res.data.is_collected,
          title: res.data.goods_name
        })

        //bonus_type_id
        var bonusArr = this.data.discountList
        app.api.getBonusType(res.data.bonus_type_id)
          .then(res => {
            for (var i in res.data) {
              res.data[i].type_money = parseInt(res.data[i].type_money)
            }
            let arr = []
            for (var a in res.data) {
              if (parseInt(res.data[a].send_end_date) * 1000 > Date.parse(new Date())) {
                res.data[a].bonus_code = app.api.getUrl() + 'data/bonusimg/' + res.data[a].bonus_code
                arr.push(res.data[a])
              }
            }
            bonusArr = bonusArr.concat(arr);
            this.setData({
              discountList: bonusArr
            })
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
  addToCart: function (buy = 0) {
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
    var os = {
      goods_id: this.data.goodsId,
      parent: 0,
      spec: this.data.attr,
      number: this.data.butTotal,
    }
    if (buy != 0) {
      os.quick = 1
    }
    app.api.addToCart(userInfo.userid, os)
      .then(res => {
        console.log(res)
        if (res.code == 200) {
          wx.showToast({
            title: res.message,
            icon: 'success',
            complete: function () {
              if (os.quick == 1) {
                wx.navigateTo({
                  url: '/pages/payment/payment?id=' + res.data.supplier_list[0].goods_list[0].rec_id
                })
              }
            }
          })

        } else {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
        }
      })
  },
  toIndex: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  toCart: function () {
    wx.switchTab({
      url: '/pages/shopCart/shopCart',
    })
  },
  preview: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.src] // 需要预览的图片http链接列表
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
})