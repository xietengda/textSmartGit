
Page({

  data: {
    sco_list:[1,1,1]
  },

  onLoad: function (options) {
  
  },
  scanCode:function(){
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  }
})