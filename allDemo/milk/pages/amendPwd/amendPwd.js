const app = getApp();
Page({

  data: {
    isIphoneX: getApp().globalData.isIphoneX
  },
  onLoad: function () {
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
  },
  formSubmit: function (e) {
    if(e.detail.value.old_password.toString().length == 0){
      wx.showToast({
        title: '请输入原密码！',
        icon:'none'
      })
      return
    }

    if (e.detail.value.password1.toString().length == 0 || e.detail.value.password2.toString().length == 0) {
      wx.showToast({
        title: '请输入新密码！',
        icon: 'none'
      })
      return
    }
    
    if (e.detail.value.password1 != e.detail.value.password2) {
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none'
      })
      return
    }
    app.api.updateUserPWD(this.data.userid, e.detail.value.old_password, e.detail.value.password1)
      .then(res => {
        var icon = 'success'
        if (res.code != 200) {
          icon = 'none'
        }
        wx.showToast({
          title: res.message,
          icon: icon,
          complete: function () {
            wx.navigateBack()
          }
        })
      })
  },

})