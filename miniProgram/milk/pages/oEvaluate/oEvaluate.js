var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo_data: [],
    starList:[true,true,true,true,false],
    evalText:'很好'
  },
  star_click:function(event){
    var index = event.currentTarget.dataset.index;
    var starList;
    var evalText;
    if (index == "0" || index == "1"){
      if (index == "0"){
        starList = [true, false, false, false, false];
      }else{
        starList = [true, true, false, false, false];
      }
      evalText = '一般';
    } else if (index == "2" || index == "3"){
      if (index == "2"){
        starList = [true, true, true, false, false];
      }else{
        starList = [true, true, true, true, false];
      }
      evalText = '很好';
    }else{
      starList = [true, true, true, true, true];
      evalText = '非常好';
    }

    this.setData({
      starList: starList,
      evalText: evalText
    });

  },
  uploadPhoto:function(){
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
  lookPhoto:function(event){
    util.lookPhoto(e);
  },
  delPhoto:function(event){
    var newData = util.delPhoto(event, this.data.photo_data);

    this.setData({
      photo_data: newData
    });
  },

})