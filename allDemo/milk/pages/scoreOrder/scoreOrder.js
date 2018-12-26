const app = getApp();
Page({

  data: {
    orderList: [1, 1, 1],
    page:1,
    isIphoneX: getApp().globalData.isIphoneX
  },
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo');
    this.getOrderList(userInfo.userid)
  },
  getOrderList: function (userid, status = 0) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    app.api.getOrderList(userid, status, 'exchange_goods', that.data.page)
      .then(res => {   
        for (var x in res.data.order_list){
          res.data.order_list[x].goods_list["0"].goods_thumb = app.api.getUrl() + res.data.order_list[x].goods_list["0"].goods_thumb
        }
        
        var newOrderList = that.data.orderList;
        
        if(that.data.page != '1' && that.data.page != 'end'){
          newOrderList = newOrderList.concat(res.data.order_list)
        }else{
          newOrderList = res.data.order_list
        }

        if (res.data.pager.page < res.data.pager.page_count){
          that.setData({
            page:that.data.page + 1
          })
        }else{
          that.setData({
            page:'end'
          })
        }

        that.setData({
          orderList:res.data.order_list
        })

        wx.hideLoading()
      })
  },
  onReachBottom:function(){
    if(this.data.page != 'end'){
      this.getOrderList(5);
    }else{
      wx.showToast({
        title: '已经到底了',
        icon:'none'
      })
    }
  }
})