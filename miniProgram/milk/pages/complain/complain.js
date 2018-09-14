var util = require('../../utils/util.js');
Page({

  data: {
    photo_data : [],
  },
  onLoad: function (options) {

  },
  uploadPhoto: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;

        var NewArr = _this.data.photo_data;
        NewArr.push(tempFilePaths[0]);


        _this.setData({
          photo_data: NewArr
        });
      }
    })
  },
  lookPhoto:function(e){
    util.lookPhoto(e);
  },
  delPhoto: function (event) {
    var newData = util.delPhoto(event, this.data.photo_data);

    this.setData({
      photo_data: newData
    });
  },
})