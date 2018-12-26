//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    bannerList: [],
    current: 0,
    classArr: [],
    discountList: [],
    comboList: [],
    timeLimtList: [],
    milkList: [],
    //分类商品
    classProList: [],
    layerHide: false,
    sizePrt: [],
    selArr: [],//选择的规格size
    selArrText: "请选择口味",//size名称
    butTotal: 1,
    sizePrice: '¥0.00',//显示size层价格
    hideRush: false,
    hideBuy: false,
    isIphoneX: getApp().globalData.isIphoneX,
    ad1: [],
    ad2: [],
  },
  onLoad(options) {
    // options 中的 scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    const scene = decodeURIComponent(options.scene)
    console.log(scene)
    if (scene != 'undefined') {
      wx.setStorage({
        key: 'tuijian',
        data: scene,
      })
    }
  },
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '香满楼优鲜e点',
      path: 'pages/index/index',
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
  onShow: function () {
    wx.showShareMenu()
    this.banner()
    app.api.getPackageList(3)
      .then(res => {
        console.log(res)
        for (var i in res.data) {
          res.data[i].logo = app.api.getUrl() + 'data/afficheimg/' + res.data[i].logo
        }
        if (res.data.length == 0) {
          this.setData({
            hideBuy: true
          })
        }
        this.setData({
          combolist: res.data
        })
      })
    app.api.getSeckill()
      .then(res => {
        console.log(res)
        for (var x in res.data.list) {
          for (var y in res.data.list[x].goods_list) {
            res.data.list[x].goods_list[y].goods_thumb = app.api.getUrl() + res.data.list[x].goods_list[y].goods_thumb
          }
        }
        this.countdown(res)
      })
    app.api.getALLBonus()
      .then(res => {
        console.log(res)
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
        console.log(arr)
        this.setData({
          discountList: arr
        })
      })
  },
  banChange: function (event) {
    if (event.detail.source == "touch") {
      //防止swiper控件卡死
      if (this.data.current == 0 && this.data.preIndex > 1) {//卡死时，重置current为正确索引
        this.setData({ current: this.data.preIndex });
      }
      else {//正常轮转时，记录正确页码索引
        this.setData({ preIndex: this.data.current });
      }
    }
  },
  banPrev: function () {
    var bLen = this.data.bannerList.length - 1;
    if (this.data.current == bLen && this.data.current != 0) {
      this.setData({
        current: this.data.current - 1
      });
    }
  },
  banNext: function () {
    var bLen = this.data.bannerList.length - 1;
    if (this.data.current < bLen) {
      this.setData({
        current: this.data.current + 1
      });
    }
  },
  //点击商品立即购买
  navigatorDetail: function (e) {
    console.log(e)
    var hasPrt = e.currentTarget.dataset.hasprt;
    var oIndex = e.currentTarget.dataset.oIndex;
    var tIndex = e.currentTarget.dataset.tIndex;
    var classProList = this.data.classProList;
    var sizePrt = [];
    var goods_id = classProList[oIndex].list[tIndex].goods_id
    var _this = this;


    if (hasPrt) {
      classProList[oIndex].list[tIndex].cIndexOne = oIndex;
      classProList[oIndex].list[tIndex].cIndexTwo = tIndex;

      console.log(classProList[oIndex].list[tIndex])

      _this.setData({
        sizePrt: classProList[oIndex].list[tIndex],
        layerHide: true
      })
    } else {
      var e = { currentTarget: { dataset: { goods_id: 0 } } };
      e.currentTarget.dataset.goods_id = classProList[oIndex].list[tIndex].goods_id
      //直接加入购物车
      this.addToCart(e);
    }

  },
  /*选择类型*/
  selSize: function (e) {

    var cIndexOne = e.currentTarget.dataset.cOne;
    var cIndexTwo = e.currentTarget.dataset.cTwo;
    var oIndex = e.currentTarget.dataset.sizeIndex;
    var tIndex = e.currentTarget.dataset.sizeListIndex;
    var classProList = this.data.classProList;
    var forList = classProList[cIndexOne].list[cIndexTwo].properties[oIndex];
    var selArrText = [];
    var selArrId = [];

    for (var i in forList.values) {
      forList.values[i].sel = 0;
    }
    forList.values[tIndex].sel = 1;

    for (var j in classProList[cIndexOne].list[cIndexTwo].properties) {
      for (var k in classProList[cIndexOne].list[cIndexTwo].properties[j].values) {
        if (classProList[cIndexOne].list[cIndexTwo].properties[j].values[k].sel == 1) {
          selArrId.push(classProList[cIndexOne].list[cIndexTwo].properties[j].values[k].id)
          selArrText.push(classProList[cIndexOne].list[cIndexTwo].properties[j].values[k].label)
        }
      }
    }

    console.log(classProList[cIndexOne].list[cIndexTwo]);
    console.log(selArrId)

    this.setData({
      classProList: classProList,
      sizePrt: classProList[cIndexOne].list[cIndexTwo],
      selArrText: selArrText,
      selArrId: selArrId
    })

    this.changePrice(classProList[cIndexOne].list[cIndexTwo].goods_id);
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
    this.changePrice(e.currentTarget.dataset.goodsId);
  },
  //点击size弹层确定
  sizeBtn: function (e) {
    var cIndexOne = e.currentTarget.dataset.cOne;
    var cIndexTwo = e.currentTarget.dataset.cTwo;
    var classProList = this.data.classProList;
    var selArr = [];
    var forList = classProList[cIndexOne].list[cIndexTwo].properties;
    for (let i in forList) {
      for (let j in forList[i].values) {
        if (forList[i].values[j].sel == 1) {
          selArr.push(forList[i].values[j].id);
        }
      }
    }
    if (selArr.length < 2) {
      wx.showToast({
        title: '请选择规格口味!',
        icon: 'none',
        duration: 1000
      })
      return
    }


    var e = { currentTarget: { dataset: { goods_id: 0, attr_value: 1 } } };
    e.currentTarget.dataset.goods_id = classProList[cIndexOne].list[cIndexTwo].goods_id
    e.currentTarget.dataset.attr_value = selArr.toString();
    e.currentTarget.dataset.butTotal = this.data.butTotal;
    //加入购物车
    this.addToCart(e);

  },
  //关闭黑色遮罩
  clickLayer: function () {
    this.setData({
      layerHide: false,
      butTotal: 1,
      sizePrice: '¥0.00'
    })
  },
  navigatorCategory: function (e) {
    wx.navigateTo({
      url: '../rushBuy/rushBuy',
    })
  },
  //请求方法
  banner: function () {
    app.api.getIndex()
      .then(res => {
        let bannerList = []
        let iconList = res.data.head.icon;
        let classProList = res.data.product;
        var arr = res.data.head.banner;
        for (var i = 0; i < arr.length; i++) {
          bannerList[i] = arr[i]
          bannerList[i].ad_code = app.api.getUrl() + arr[i]['ad_code']
        }
        for (var i = 0; i < iconList.length; i++) {
          iconList[i]['menu_img'] = app.api.getUrl() + iconList[i]['menu_img']
        }

        for (var x in classProList) {
          classProList[x].ad.ad_code = app.api.getUrl() + classProList[x].ad.ad_code;
          for (var j in classProList[x].list) {
            classProList[x].list[j].goods_thumb = app.api.getUrl() + classProList[x].list[j].goods_thumb;
            if (classProList[x].list[j].properties.length != 0) {
              classProList[x].list[j].hasPrt = true;
            } else {
              classProList[x].list[j].hasPrt = false;
            }
            for (var k in classProList[x].list[j].properties) {
              for (var p in classProList[x].list[j].properties[k].values) {
                classProList[x].list[j].properties[k].values[p].sel = 0;
              }
            }
          }
        }

        let ad1 = []
        for (var i = 0; i < res.data.ad1.length; i++) {
          ad1[i] = res.data.ad1[i]
          ad1[i].ad_code = app.api.getUrl() + res.data.ad1[i].ad_code
        }

        let ad2 = []
        for (var i = 0; i < res.data.ad2.length; i++) {
          ad2[i] = res.data.ad2[i]
          ad2[i].ad_code = app.api.getUrl() + res.data.ad2[i].ad_code
        }

        console.log(classProList);

        this.setData({
          bannerList: bannerList,
          classArr: iconList,
          classProList: classProList,
          ad1: ad1,
          ad2: ad2
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
  navTap: function (e) {
    app.jumpTo(e.currentTarget.dataset.type, e.currentTarget.dataset.cat_id)
  },
  timediff: function (timestamp) {
    var d_minutes, d_hours, d_days, d_seconds, ret = "";
    var timeNow = parseInt(new Date().getTime() / 1000);
    d_seconds = timestamp / 1000 - timeNow;
    if (d_seconds < 0) {
      return -1;
    }
    d_days = parseInt(d_seconds / 86400);
    d_hours = parseInt(d_seconds / 3600) - d_days * 24;
    d_minutes = parseInt(d_seconds / 60) - d_days * 24 * 60 - d_hours * 60;
    if (d_days > 0)
      ret += d_days + "天";
    if (d_hours > 0)
      ret += d_hours + "时";
    if (d_minutes > 0)
      ret += d_minutes + "分";
    //return ret + (d_seconds - d_days * 24 * 60 * 60 - d_hours * 60 * 60 - d_minutes * 60) + "秒";
    return [d_days, d_hours, d_minutes, d_seconds - d_days * 24 * 60 * 60 - d_hours * 60 * 60 - d_minutes * 60]
  },
  countdown: function (res) {
    var mslist = []
    for (var x in res.data.list) {
      for (var y in res.data.list[x].goods_list) {
        var arr = res.data.list[x].goods_list[y]
        arr.format_end_time = res.data.list[x].format_end_time
        // arr.format_end_time = res.data.list[x].format_end_time
        arr.end_time = res.data.list[x].end_time
        arr.end_time_str = this.timediff(parseInt(arr.end_time) * 1000)
        //arr.goods_thumb = app.api.getUrl() + res.data.list[x].goods_list[y].goods_thumb
        if (res.data.list[x].start_time < (Date.parse(new Date()) / 1000)) {
          mslist.push(arr)
        }
      }
    }
    // console.log(mslist)
    this.setData({
      mslist: mslist
    })
    var that = this
    if (mslist.length != 0) {
      setTimeout(function () {
        that.countdown(res);
      }, 1000)
    } else {
      this.setData({
        hideRush: true
      })
    }
  },
  imageLoad: function (e) {
    var _this = this;
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;   //图片的真实宽高比例
    var viewWidth = 500,           //设置图片显示宽度，
      viewHeight = 500 / ratio;    //计算的高度值   
    this.setData({
      imgwidth: viewWidth,
      imgheight: viewHeight
    })
  },
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

    if (e.currentTarget.dataset.type && e.currentTarget.dataset.type == 'ms') {
      app.ms = 1
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
              if (os.quick == 1) {
                wx.navigateTo({
                  url: '/pages/payment/payment?id=' + res.data.supplier_list[0].goods_list[0].rec_id
                })
              }
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
  navigatorCategory2: function (e) {
    app.globalData.category = e.currentTarget.id
    wx.switchTab({
      url: '../allPro/allPro',
    })
  },
  tc_todetail: function (e) {
    wx.navigateTo({
      url: '../proDetails/proDetails?proType=2&goodsId=' + e.currentTarget.dataset.id,
    })
  },
  goProDetails: function (e) {
    wx.navigateTo({
      url: '../proDetails/proDetails?goodsId=' + e.currentTarget.dataset.goodsId,
    })
  },
  onPullDownRefresh: function () {
    this.onShow();
    wx.stopPullDownRefresh();
  },
  goToComList: function () {
    wx.navigateTo({
      url: '../comboList/comboList',
    })
  },
  toMs: function (e) {
    //console.log(e)
    wx.navigateTo({
      url: '/pages/proDetails/proDetails?goodsId=' + e.currentTarget.id,
    })
  }
})