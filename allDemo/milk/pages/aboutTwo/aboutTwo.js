const app = getApp();
Page({

  data: {
    isIphoneX: getApp().globalData.isIphoneX,
    ad: []
  },

  onLoad: function (options) {
    if (options.id) {
      app.api.getArticleDefault(options.id)
        .then(res => {
          this.setData({
            nodes: res.data.content.replace(/\<img/gi, '<img class="rich_img"'),
            title: res.data.title,
          })
        })
    } else {
      wx.showToast({
        title: '没找到此文章',
        complete: function () {
          wx.navigateBack({

          })
        }
      })
    }
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
  navTap: function (e) {
    app.jumpTo(e.currentTarget.dataset.type, e.currentTarget.dataset.cat_id)
  },
})