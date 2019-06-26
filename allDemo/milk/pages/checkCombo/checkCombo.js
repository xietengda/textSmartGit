const app = getApp();
Page({

  data: {
    comboList: [],
    isIphoneX: getApp().globalData.isIphoneX,
    class1: 'comList_head_sel',
    class2: ''
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
    //package_buy
    this.getList(0)
  },
  seeorder: function (e) {
    console.log(e)
    if (e.currentTarget.dataset.status != 3) {
      wx.navigateTo({
        url: '/pages/orderDetail/orderDetail?id=' + e.currentTarget.dataset.orderid,
      })
    } else {
      wx.navigateTo({
        url: '../takeMilk/takeMilk?order_id=' + e.currentTarget.dataset.orderid,
      })
    }
  },
  switch: function (e) {
    if (e.currentTarget.dataset.id == 1) {
      this.setData({
        class1: 'comList_head_sel',
        class2: ''
      })
      this.getList(0)
    } else {
      this.setData({
        class2: 'comList_head_sel',
        class1: ''
      })
      this.getList(1)
    }
  },
  getList: function (type) {
    app.api.getOrderList(this.data.userid, 0, 'package_buy', 1, type)
      .then(res => {
        console.log(res)
        for (var i in res.data.order_list) {
          if (res.data.order_list[i].ext_info.logo) {
            res.data.order_list[i].ext_info.logo = app.api.getUrl() + '/data/afficheimg/' + res.data.order_list[i].ext_info.logo
          }
          let get_num = 0
          if (res.data.order_list[i].goods_list) {
            for (var x in res.data.order_list[i].goods_list[0].package_goods_list) {
              get_num += parseInt(res.data.order_list[i].goods_list[0].package_goods_list[x].get_number)
            }
          }
          res.data.order_list[i].get_num = get_num
        }
        this.setData({
          comboList: res.data.order_list
        })
      })
  }
})