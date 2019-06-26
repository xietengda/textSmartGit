const app = getApp();
Page({

  data: {
    page: 1,
    isIphoneX: getApp().globalData.isIphoneX,
    ad: []
  },
  onLoad: function () {
    app.api.getAd(14)
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
  },
  onShow: function (options) {
    var _this = this;
    app.api.getArticleList(9, this.data.page)
      .then(res => {

        var helpList = [];
        if (_this.data.page != '1' && _this.data.page != 'end') {
          helpList = _this.data.helpList.concat(res.data.list);
        } else {
          helpList = res.data.list;
        }


        if (res.data.pager.page < res.data.pager.page_count) {
          _this.setData({
            page: parseInt(_this.data.page) + 1
          })
        } else {
          _this.setData({
            page: 'end'
          })
        }


        this.setData({
          helpList: helpList
        })
      })
  },
  detail: function (e) {
    wx.navigateTo({
      url: '../aboutTwo/aboutTwo?id=' + e.currentTarget.dataset.id,
    })
  },
  onReachBottom: function () {
    var _this = this;

    if (_this.data.page != 'end') {
      _this.onShow();
    } else {
      wx.showToast({
        title: '已经到底了',
        icon: 'none'
      })
    }
  },
  navTap: function (e) {
    app.jumpTo(e.currentTarget.dataset.type, e.currentTarget.dataset.cat_id)
  },
  onHide: function () {
    this.setData({
      page: 1
    })
  }
})