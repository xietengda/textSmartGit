const app = getApp();
Page({

  data: {
    bannerList: [],
    essayList: [],
    page: 1,
    isIphoneX: getApp().globalData.isIphoneX,
    ad2: []
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      name: options.name
    })
    switch (options.cid){
      case '0':
        this.cid = 28
        break;
      case '1':
        this.cid = 29
        break;
    }
    app.api.getAd(15, 5)
      .then(res => {
        let ad = []
        for (var i = 0; i < res.data.length; i++) {
          ad[i] = res.data[i]
          ad[i].ad_code = app.api.getUrl() + res.data[i].ad_code
        }
        this.setData({
          bannerList: ad
        })
      })
    app.api.getAd(16, 2)
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
    this.getArticleList(this.cid, this.data.page);
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
  //获取文章列表 pOne:暂时未定   浏览和点赞值还没有接,page:页码
  getArticleList: function (pOne, page) {
    var _this = this;
    app.api.getArticleList(pOne, page)
      .then(res => {
        console.log(res);
        for (let x in res.data.list) {
          res.data.list[x].file_url = app.api.getUrl() + res.data.list[x].file_url;
        }
        var essayList = [];

        if (_this.data.page != '1' && _this.data.page != 'end') {
          essayList = _this.data.essayList.concat(res.data.list);
        } else {
          essayList = res.data.list;
        }

        if (res.data.pager.page < res.data.pager.page_count) {
          _this.setData({
            page: parseInt(this.data.page) + 1
          })
        } else {
          _this.setData({
            page: 'end'
          })
        }


        this.setData({
          essayList: essayList
        });
      })
  },
  //点击查看文章详情 
  checkDetail: function (e) {
    wx.navigateTo({
      url: '../communityThird/communityThird?aId=' + e.currentTarget.dataset.aId,
    });
  },
  onReachBottom: function () {

    var _this = this;
    if (_this.data.page != 'end') {
      _this.getArticleList(this.cid, _this.data.page);
    } else {
      wx.showToast({
        title: '已经到底了',
        icon: 'none'
      })
    }
  },
  onHide: function () {
    this.setData({
      page: 1
    })
  },
  navTap: function (e) {
    app.jumpTo(e.currentTarget.dataset.type, e.currentTarget.dataset.cat_id)
  },
}) 