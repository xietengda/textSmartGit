const app = getApp();
Page({
  data: {
    isIphoneX: getApp().globalData.isIphoneX,
    canCreate: false,
    canDown: false,
    name: '生成分享图片'
  },
  onLoad: function(options) {
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
    console.log(app.api.getReQrcode(this.data.userid))
    this.setData({
      imgSrc: app.api.getReQrcode(this.data.userid)
    })
    var that = this
    wx.getImageInfo({
      src: that.data.imgSrc,
      success(res) {

        var path = '/images/share.jpg'; //文章图
        var path2 = res.path; //头像

        var context = wx.createCanvasContext('mycanvas');
        context.setFillStyle("#FFFFFF")
        context.fillRect(0, 0, 375, 604)
        //配图
        context.drawImage(path, 0, 0, 375, 604);

        context.setFillStyle("#FFFFFF")
        context.fillRect(90, 109, 194, 194)
        //二维码
        context.drawImage(path2, 90, 109, 194, 194);


        context.draw();

        that.setData({
          canCreate: true,
          name: '生成分享图片'
        })
      }
    })
  },
  checkCode: function() {
    var imgSrc = this.data.imgSrc;
    var newArr = [];
    newArr.push(imgSrc);
    wx.previewImage({
      current: imgSrc,
      urls: newArr
    });
  },
  createNewImg: function() {
    var that = this


    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时

    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      width: 375,
      height: 604,
      success: function(res) {
        var tempFilePath = res.tempFilePath;
        console.log(tempFilePath)
        that.imagePath = tempFilePath;
        that.setData({
          canDown: true,
          name: '保存图片'
        })
        wx.hideLoading();
      },
      fail: function(res) {
        console.log(res);
      }
    });

  },
  savePic: function() {
    if (this.data.canDown == false) {
      wx.showLoading({
        title: '正在生成...',
      })
      this.createNewImg();
      return
    }
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.imagePath,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定');
              /* 该隐藏的隐藏 */
              that.maskHidden = false
            }
          },
          fail: function(res) {
            console.log(11111)
          }
        })
      }
    })
  }
})