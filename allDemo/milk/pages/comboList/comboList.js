const app = getApp();
Page({
  data: {
    reshList: [],
    class1: 'comList_head_sel',
    class2: '',
    isIphoneX: getApp().globalData.isIphoneX
  },
  onLoad: function (options) {
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
      console.log(e)
    }
    this.getGoods(1)
  },
  tap1: function () {
    this.setData({
      class1: 'comList_head_sel',
      class2: '',
    })
    this.getGoods(1)
  },
  tap2: function () {
    this.setData({
      class1: '',
      class2: 'comList_head_sel',
    })
    this.getGoods(2)
  },
  getGoods: function (typeid, search = '') {
    app.api.getPackageList(typeid, search)
      .then(res => {
        console.log(res)
        var reshList = []
        var ii = 0
        for (var i in res.data) {
          reshList[ii] = {}
          reshList[ii].goods_name = res.data[i].act_name
          reshList[ii].act_id = res.data[i].act_id
          reshList[ii].goods_brief = res.data[i].act_desc
          reshList[ii].market_price = res.data[i].yuan_price ? res.data[i].yuan_price : res.data[i].package_price
          reshList[ii].shop_price = res.data[i].package_price
          reshList[ii].image = app.api.getUrl() + 'data/afficheimg/' + res.data[i].logo
          ii++
        }

        this.setData({
          reshList: reshList
        })
      })
  },
  todetail: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/proDetails/proDetails?goodsId=' + e.currentTarget.dataset.goodsid + '&proType=2',
    })
  },
  searchBlur: function (e) {
    this.setData({
      searchText: e.detail.value
    })
  },
  searchBtn: function (e) {
    let status = 1
    if (this.data.class2) {
      status = 2
    }
    this.getGoods(status, this.data.searchText)
    //this.getOrderList(this.data.userid, this.data.att, this.data.searchText)
    //todo
  },
})