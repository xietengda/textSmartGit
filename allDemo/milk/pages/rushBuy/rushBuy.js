const app = getApp();
Page({
  data: {
    reshList: [],
    timeType: 1,//0:即将开始，1：限时抢购
    isIphoneX: getApp().globalData.isIphoneX
  },
  onLoad: function (options) {
    this.getSeckill();
  },
  getSeckill: function () {
    var that = this;
    app.api.getSeckill()
      .then(res => {
        console.log(res)
        //判断是选择了限时抢购还是即将开始 （默认限时抢购）
        if (that.data.timeType == 1) {
          for (var x in res.data.list) {
            for (var y in res.data.list[x].goods_list) {
              res.data.list[x].goods_list[y].goods_thumb = app.api.getUrl() + res.data.list[x].goods_list[y].goods_thumb
            }
          }
          var tempList = [];
          for (var k in res.data.list) {
            if (res.data.list[k].start_time < (Date.parse(new Date()) / 1000)) {
              tempList.push(res.data.list[k]);
            }
          }


          this.countdown(tempList)
        } else {
          for (var x in res.data.list) {
            for (var y in res.data.list[x].goods_list) {
              res.data.list[x].goods_list[y].goods_thumb = app.api.getUrl() + res.data.list[x].goods_list[y].goods_thumb
            }
          }
          var tempList = [];
          for (var k in res.data.list) {
            if (res.data.list[k].start_time > (Date.parse(new Date()) / 1000)) {
              tempList.push(res.data.list[k]);
            }
          }

          console.log(tempList)

          this.countdown(tempList)
        }

      })
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
    var that = this;

    //如果是抢购中就是计算结束时间
    if (that.data.timeType == 1) {
      for (var x in res) {
        res[x].end_time_str = this.timediff(parseInt(res[x].end_time) * 1000)
      }
    }
    //如果是即将开始，计算距离开始时间
    else {
      for (var x in res) {
        res[x].end_time_str = this.timediff(parseInt(res[x].start_time) * 1000)
      }
    }

    this.setData({
      mslist: res
    })



    setTimeout(function () {
      that.countdown(that.data.mslist);
    }
      , 1000)
  },
  todetail: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../proDetails/proDetails?showType=1&goodsId=' + e.currentTarget.dataset.goodsid,
    })
  },
  addToCart: function (e) {
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
    var os = {
      goods_id: e.currentTarget.dataset.goodsid,
      parent: 0,
      spec: e.currentTarget.dataset.attr_value.split(','),
      number: 1,
      quick: 1
    }
    console.log(os)

    app.ms = 1

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
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
        }
      })
  },
  navigatorCategory: function () {
    wx.navigateTo({
      url: '../rushBuy/rushBuy',
    })
  },
  timeType: function (e) {
    console.log(e.currentTarget.dataset.type)
    this.setData({
      timeType: e.currentTarget.dataset.type
    });

    this.getSeckill();
  }
})