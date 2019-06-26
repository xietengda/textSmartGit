const app = getApp();
Page({

  data: {
    scoDetaList: [],
    page:1,
    isIphoneX: getApp().globalData.isIphoneX
  },
  onShow: function (options) {
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

    this.getUserIntegral(userInfo.userid,this.data.page);
    
  },
  getUserIntegral:function(userid,page){
    var _this = this;
    app.api.getUserIntegral(userid,page)
      .then(res => {
        var scoDetaList = [];
        if (_this.data.page != '1' && _this.data.page != 'end'){
          scoDetaList = _this.data.scoDetaList.concat(res.data.list);
        }else{
          scoDetaList = res.data.list;
        }

        if(res.data.pager.page < res.data.pager.page_count){
          _this.setData({
            page:parseInt(_this.data.page) + 1
          })
        }else{
          _this.setData({
            page:'end'
          })
        }

        this.setData({
          scoDetaList: res.data.list,
          integral: res.data.integral,
        })
      })
  },
  onReachBottom:function(){
    var _this = this;

    if(_this.data.page !='end'){
      _this.onShow();
    }else{
      wx.showToast({
        title: '已经到底了',
        icon:'none'
      })
    }
  }
})