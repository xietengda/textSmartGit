const app = getApp();
Page({

  data: {
    addList: [],
    isIphoneX: getApp().globalData.isIphoneX
  },

  onShow: function (options) {
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
      console.log(e)
    }
    this.addressList()
  },
  addressList: function () {
    app.api.getUserAddress(this.data.userid)
      .then(res => {
        console.log(res)
        for (var i in res.data.list) {
          if (res.data.list[i].def_addr == 1) {
            app.addressId = res.data.list[i].address_id
          }
        }
        this.setData({
          addList: res.data.list
        })
      })
  },
  edit: function (e) {
    wx.navigateTo({
      url: '/pages/addAddress/addAddress?addressid=' + e.currentTarget.dataset.id,
    })
  },
  selectAdd: function (e) {
    app.api.setUserDefaultAddress(this.data.userid, e.currentTarget.dataset.id)
      .then(res => {
        this.addressList()
        app.addressId = e.currentTarget.dataset.id
        wx.navigateBack({})

      })
  },

})