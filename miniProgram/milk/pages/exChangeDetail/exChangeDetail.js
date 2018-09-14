
Page({

  data: {
    bannerList: [
      '../../images/banner.jpg',
      '../../images/banner.jpg'
    ],
    bannerIndex:'0'
  },
  onLoad: function (options) {
  
  },
  bannerChange:function(e){
    var newIndex = e.detail.current;

    this.setData({
      bannerIndex: newIndex
    });
  },
  exChangeBtn:function(){
    wx.navigateTo({
      url: '../exChangePay/exChangePay',
    })
  }
})