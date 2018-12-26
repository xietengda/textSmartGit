const app = getApp();
Page({

  data: {
    lId:0,
    isIphoneX: getApp().globalData.isIphoneX
  },
  onLoad: function (options) {
    try {
      var userInfo = wx.getStorageSync('userInfo');
      if (userInfo.userid) {
        this.setData({
          login: true, 
          lId: options.id
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
      if (options.id) {
        app.api.getMyNewsDetail(userInfo.userid, options.id)
          .then(res => {
            console.log(res)
            this.setData({
              data: res.data
            })
          })
      } else {
        wx.navigateBack({

        })
      }

    } catch (e) {
      console.log(e)
    }

  },
  //删除站内信
  delete:function(){
    app.api.delMyNews(this.data.userInfo.userid,this.data.lId)
      .then(res => {
        console.log(res)
        wx.showToast({
          title: '删除成功!',
          icon: 'success',
          duration: 2000,
          success:function(){
            wx.navigateBack()
          }
        })
      })
  }
})