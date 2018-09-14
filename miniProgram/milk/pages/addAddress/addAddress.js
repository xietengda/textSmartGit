Page({

  data: {
    selAddres:"请选择地址",
  },
  onLoad: function (options) {

  },
  selAddress:function(){
    var _this = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res.address);
        _this.setData({
          selAddres: res.address
        });
      }
    });
  }
})