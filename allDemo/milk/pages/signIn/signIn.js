const app = getApp();

Page({

  data: {
    signBtn: 0,//0未签到，大于1已签到
    signList: [],
    sco_list: [1, 1, 1],
    isIphoneX: getApp().globalData.isIphoneX,
    ad: []
  },
  onLoad: function () {
    app.api.getAd(13, 5)
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
  onShow: function () {
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

    this.qiandaoList();
  },
  qiandaoList: function () {
    var that = this;
    app.api.qiandaoList(that.data.userInfo.userid)
      .then(res => {
       
        var signList = [];
        for (var x in res.data) {
          signList.push(res.data[x])
        }
        var signBtnArr = signList[3];
        var signBtn = signBtnArr.points;

        that.setData({
          signList: signList,
          signBtn: signBtn
        })
      })
      .catch(res => {
        
      })
  },
  navTap: function (e) {
    app.jumpTo(e.currentTarget.dataset.type, e.currentTarget.dataset.cat_id)
  },
  signBtnFun: function () {
    var that = this;
    if (that.data.signBtn == 0) {
      app.api.qiandao(that.data.userInfo.userid)
        .then(res => {
          
          wx.showToast({
            title: res.message,
            icon: 'none',
            complete: function () {
              that.qiandaoList()
            }
          })
        })
        .catch(res => {

        })
    }
  },
  toFun: function () {
    wx.navigateTo({
      url: '../turntable/turntable',
    })
  }

})