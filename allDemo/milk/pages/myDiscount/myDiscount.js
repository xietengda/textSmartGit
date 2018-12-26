var util = require('../../utils/util.js');
const app = getApp();
Page({
  data: {
    disList: [],
    disSta: 0,
    isIphoneX: getApp().globalData.isIphoneX
  },
  onShow: function () {
    try {
      var userInfo = wx.getStorageSync('userInfo')
      if (userInfo.userid) {
        this.setData({
          login: true,
          userInfo: userInfo,
          userid: userInfo.userid,
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

    }

    this.getUserBonus(userInfo.userid)

    var disList = util.changeDisBg(this.data.disList);

    this.setData({
      disList: disList
    });

  },
  changeState: function (e) {
    this.getUserBonus(this.data.userid, e.currentTarget.dataset.disSta)
    this.setData({
      disSta: e.currentTarget.dataset.disSta
    })
  },
  getUserBonus: function (userid, is_used = 0) {
    app.api.getUserBonus(userid, is_used)
      .then(res => {
        //背景颜色的下标
        let bIndex = 0;
        for (var i in res.data.list) {
          res.data.list[i].id = parseInt(i) + 1
          if (bIndex < 5) {
            bIndex += 1;
            res.data.list[i].bIndex = bIndex;
          } else {
            bIndex = 0;
            bIndex += 1;
            res.data.list[i].bIndex = bIndex;
          }
          res.data.list[i].type_money = parseInt(res.data.list[i].type_money);
        }
        this.setData({
          disList: res.data.list
        });
      })
  },
  //使用优惠券
  use: function () {
    wx.switchTab({
      url: '../allPro/allPro',
    })
  },
  getDiscount: function () {
    wx.navigateTo({
      url: '../getDiscount/getDiscount',
    })
  },
  exchangeDiscount: function () {
    wx.navigateTo({
      url: '../scorecard2/scorecard',
    })
  }
})