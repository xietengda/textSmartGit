const app = getApp();
Page({

  data: {
    scorePro: [],
    isIphoneX: getApp().globalData.isIphoneX,
    ad1: [],
    ad2: []
  },
  onLoad: function () {
    app.api.getAd(11)
      .then(res => {
        let ad1 = []
        for (var i = 0; i < res.data.length; i++) {
          ad1[i] = res.data[i]
          ad1[i].ad_code = app.api.getUrl() + res.data[i].ad_code
        }
        this.setData({
          ad1: ad1
        })
      })
    app.api.getAd(12)
      .then(res => {
        let ad2 = []
        for (var i = 0; i < res.data.length; i++) {
          ad2[i] = res.data[i]
          ad2[i].ad_code = app.api.getUrl() + res.data[i].ad_code
        }
        this.setData({
          ad2: ad2
        })
      })
  },
  onShow: function (options) {
    app.api.getExchange(0)
      .then(res => {
        for (var i in res.data.goods_list) {
          res.data.goods_list[i].goods_thumb = app.api.getUrl() + res.data.goods_list[i].goods_thumb
        }
        //res.data.goods_list[1] = res.data.goods_list[0]
        this.setData({
          scorePro: res.data.goods_list
        })
      })
  },
  navTap: function (e) {
    app.jumpTo(e.currentTarget.dataset.type, e.currentTarget.dataset.cat_id)
  },
  onPullDownRefresh: function () {
    this.onShow()
    wx.stopPullDownRefresh()
  },
})