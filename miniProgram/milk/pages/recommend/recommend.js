
Page({

  data: {
    imgSrc:'../../images/banner.jpg'
  },

  onLoad: function (options) {
  
  },
  checkCode:function(){
    var imgSrc = this.data.imgSrc;
    var newArr = [];
    newArr.push(imgSrc);
    wx.previewImage({
      current: imgSrc, 
      urls: newArr 
    });
  }
})