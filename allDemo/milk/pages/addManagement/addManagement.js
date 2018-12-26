const app = getApp();
Page({

  data: {
    addList: [],
    isIphoneX: getApp().globalData.isIphoneX,

  },
  onLoad: function (options) {
    console.log(options.url)
    if (options.url && options.id) {
      app.globalData.rurl = options.url
      app.globalData.rid = options.id
    }
  },
  ngBack: function () {
    let id = app.globalData.rid
    delete app.globalData.rurl
    delete app.globalData.rid
    delete app.globalData.return
    wx.switchTab({
      url: '/pages/shopCart/shopCart' ,
    })
  },
  onShow: function () {
    console.log(app)
    if (app.globalData.rurl == 'payment' || app.globalData.return) {
      console.log(99)
      if (!app.globalData.return) {
        app.globalData.return = {
          ngBack: true,
          back: ''
        }
      }
      console.log(app.globalData.return)
      this.setData(app.globalData.return)
    }
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
    this.getAddress(userInfo.userid);
  },
  getAddress: function (userid) {
    app.api.getUserAddress(userid)
      .then(res => {
        console.log(res)
        this.setData({
          addList: res.data.list
        })
      })
      .catch(res => {

      })
  },
  setDefault: function (e) {
    app.api.setUserDefaultAddress(this.data.userid, e.currentTarget.dataset.address_id)
      .then(res => {
        if (res.code == 500) {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
        } else {
          this.getAddress(this.data.userid)
          wx.showToast({
            title: res.message,
            icon: 'success'
          })
        }
      })
  },
  deleteAddress: function (e) {
    var _this = this;
    wx.showModal({
      title: '',
      content: '确定删除地址吗？',
      success: function (res) {
        if (res.confirm) {
          app.api.dropUserAddress(_this.data.userid, e.currentTarget.dataset.address_id)
            .then(res => {
              if (res.code == 500) {
                wx.showToast({
                  title: res.message,
                  icon: 'none'
                })
              } else {
                _this.getAddress(_this.data.userid)
                wx.showToast({
                  title: res.message,
                  icon: 'success'
                })
              }
            })
        }
      }
    })

  }

})