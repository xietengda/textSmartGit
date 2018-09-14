
Page({

  data: {
    login:true,
  },
  onLoad: function (options) {
  
  },
  scannerCode:function(){
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  }
})