var util = require('../../utils/util.js');
const app = getApp();
Page({

  data: {
    disList: [],
    getDiscount: true,
    isIphoneX: getApp().globalData.isIphoneX
  },

  onLoad: function (options) {
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
    var disList = util.changeDisBg(this.data.disList);
    app.api.getALLBonus(userInfo.userid)
      .then(res => {
        console.log(res)
        //背景颜色的下标
        let bIndex = 0;

        for (var i in res.data) {
          res.data[i].type_money = parseInt(res.data[i].type_money)
          res.data[i].use_startdate = this.timestampToTime(res.data[i].use_start_date)
          res.data[i].use_enddate = this.timestampToTime(res.data[i].use_end_date)
          var timestamp = Date.parse(new Date()) / 1000;
          if (res.data[i].send_end_date < timestamp) {
            res.data[i].no_get = 1
          }

          if (bIndex < 5) {
            bIndex += 1;
            res.data[i].bIndex = bIndex;
          } else {
            bIndex = 0;
            bIndex += 1;
            res.data[i].bIndex = bIndex;
          }

        }

        let arr = []
        for (var a in res.data) {
          if (parseInt(res.data[a].send_end_date) * 1000 > Date.parse(new Date())) {
            arr.push(res.data[a])
          }
        }

        this.setData({
          disList: arr
        })
      })
  },
  getOne: function (e) {
    console.log(e)
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
    } catch (err) {

    }
    app.api.getBonus(userInfo.userid, e.currentTarget.dataset.id)
      .then(res => {
        console.log(res)
        var icon = 'success'
        if (res.code == 500) {
          icon = 'none'
        }
        wx.showToast({
          title: res.message,
          icon: icon
        })
      })
  },
  timestampToTime: function (timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D;
  }

})