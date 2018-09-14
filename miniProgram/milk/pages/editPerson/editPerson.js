var utils = require('../../utils/util.js');

Page({

  data: {
    headImg:'../../images/timeLimt.png',
    birthDay:'2016-01-01',
    InType:'',//输入类型（电话等）
    phone_focus : false,//手机号码自动聚焦
  },
  onLoad: function (options) {
  
  },
  changeHeadImg:function(){
    var _this = this;
    wx.chooseImage({
      count: 1, 
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths

        _this.setData({
          headImg: tempFilePaths
        })
      }
    })
  },
  bindDateChange:function(e){

    this.setData({
      birthDay: e.detail.value
    })
  },
  inputFocus:function(e){
    var InType = e.currentTarget.dataset.type;
    this.setData({
      InType: InType
    });
  },
  inputBlur:function(e){
    var InType = e.currentTarget.dataset.type;
    var newValue = e.detail.value;
    var _this  = this;

    //手机号码判断
    if(InType == "phone"){
      if (utils.checkPhone(newValue)) {
        this.setData({
          InType: '',
          phone_focus: false
        });
      }else{
        wx.showToast({
          title: '手机号码输入有误！',
          icon: 'none',
          duration: 1000
        });
        _this.setData({
          phone_focus:true
        });
      }
    } else {
      this.setData({
        InType: '',
        phone_focus: false
      });
    }

  }
})