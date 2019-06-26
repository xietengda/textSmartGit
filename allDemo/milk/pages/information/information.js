const app = getApp();
Page({

  data: {
    inforList: [],
    page:1,
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

      this.getMyNews(userInfo.userid, this.data.page)
      
    } catch (e) {
      console.log(e)
    }

  },
  getMyNews:function(userId,page){
    var _this = this;
    app.api.getMyNews(userId, page)
      .then(res => {
        console.log(res)

        var inforList = [];
        if (_this.data.page != '1' && _this.data.page != 'end'){
          inforList = _this.data.inforList.concat(res.data.list);
        }else{
          inforList = res.data.list;
        }

        if (res.data.pager.page < res.data.pager.page_count){
          _this.setData({
            page:parseInt(_this.data.page) + 1
          })
        }else{
          _this.setData({
            page: 'end'
          })
        }

        _this.setData({
          inforList: inforList
        })
      })
  },
  scrolltolower:function(){
    var _this = this;
    var userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo.userid);
    
    if(_this.data.page != 'end'){
      _this.getMyNews(userInfo.userid,this.data.page);
    } else{
      wx.showToast({
        title: '已经到底了',
        icon:'none'
      })
    }
  },
  onHide:function(){
    this.setData({
      page:1
    });
  }
})