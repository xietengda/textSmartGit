const app = getApp();
Page({

  data: {
    takeList: [],
    takeList2: [],
    layerType: false,
    isIphoneX: getApp().globalData.isIphoneX,
    code: 0
  },

  onLoad: function (options) {
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
    if (!options.order_id) {
      wx.navigateBack()
    }
    app.api.getUserPackage(userInfo.userid, options.order_id)
      .then(res => {

        var list = []
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].goods_number != 0) {
            list.push(res.data[i])
          }
        }
        res.data = list

        var takeList = []
        for (var i = 0; i < res.data.length; i++) {
          takeList[i] = {}
          takeList[i].all = false
          takeList[i].order_id = res.data[i].order_id
          takeList[i].goods_id = res.data[i].goods_id
          takeList[i].product_id = res.data[i].product_id
          takeList[i].s = (parseInt(res.data[i].goods_number) - parseInt(res.data[i].get_number))
          takeList[i].name = res.data[i].goods_name
          takeList[i].subList = []
          for (var ii = 0; ii < parseInt(res.data[i].get_number); ii++) {
            takeList[i].subList[ii] = {}
            takeList[i].subList[ii].sta = 0
          }
          for (var iii = 0; iii < (parseInt(res.data[i].goods_number) - parseInt(res.data[i].get_number)); iii++) {
            takeList[i].subList[ii] = {}
            takeList[i].subList[ii].sta = 1
            ii++
          }
        }
        this.setData({
          takeList: takeList,
          takeList2: takeList
        })
      })
  },
  //单选
  clickPro: function (e) {
    var typeIndex = e.currentTarget.dataset.typeIndex;
    var choIndex = e.currentTarget.dataset.choIndex;
    var takeList = this.data.takeList;
    var sign = 1;

    if (takeList[typeIndex].subList[choIndex].sta == 1) {
      sign = 2;
    }
    takeList[typeIndex].subList[choIndex].sta = sign;

    this.checkAllSel(takeList, typeIndex);

    this.setData({
      takeList: takeList
    });
  },
  //全选
  allSelect: function (e) {
    var typeIndex = e.currentTarget.dataset.typeIndex;
    var takeList = this.data.takeList;
    var sign = true;
    var sign2 = 2;

    if (takeList[typeIndex].all) {
      sign = false;
      sign2 = 1;
    }

    takeList[typeIndex].all = sign;
    for (var x in takeList[typeIndex].subList) {
      if (takeList[typeIndex].subList[x].sta != 0) {
        takeList[typeIndex].subList[x].sta = sign2;
      }
    }

    this.setData({
      takeList: takeList
    });

  },
  //判断是否全选 paraOne:选择后的列表,paraTwo:类型下标
  checkAllSel: function (paraOne, paraTwo) {
    var takeList = paraOne;
    var sign = true;
    for (var x in takeList[paraTwo].subList) {
      if (takeList[paraTwo].subList[x].sta == 1) {
        sign = false;
      }
    }
    takeList[paraTwo].all = sign;

    this.setData({
      takeList: takeList
    });

  },
  takeMilk: function () {
    var layerType = this.data.layerType;
    var sign = true;

    if (JSON.stringify(this.data.takeList) == JSON.stringify(this.data.takeList2)) {
      wx.showToast({
        title: '请选择后再点击取奶',
        icon: 'none'
      })
      return;
    }

    app.api.postPickUpGoods(this.data.userid, JSON.stringify(this.data.takeList))
      .then(res => {
        this.setData({
          code: res.message,
          img: app.api.getQrcode(res.message)
        });
      })

    if (layerType) {
      sign = false;
    }
    this.setData({
      layerType: sign
    });
  },
  QR_close: function () {
    this.setData({
      layerType: false
    });
    wx.navigateBack({})
  }

})