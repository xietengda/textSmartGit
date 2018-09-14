
Page({

  data: {
    proList:[
      { til:"香满楼酸牛奶180克草莓味3盒",num:'1'},
      { til: "香满楼酸牛奶180克草莓味3盒", num: '1' },
    ]
  },
  onLoad: function (options) {
  
  },
  scanerQR:function(){
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  }
})