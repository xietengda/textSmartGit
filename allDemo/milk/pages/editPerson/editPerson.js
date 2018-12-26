var utils = require('../../utils/util.js');
const app = getApp();
Page({
  data: {
    headImg: '',
    phone:'',
    sex:0,
    birthDay: '2016-01-01',
    faNum:0,
    InType: '',//输入类型（电话等）
    phone_focus: false,//手机号码自动聚焦
    array: ['男', '女'],
    isIphoneX: getApp().globalData.isIphoneX
  },
  onLoad: function (options) {
    try {
      var userInfo = wx.getStorageSync('userInfo')
      if (userInfo.userid) {
        this.setData({
          login: true,
        })
      } else {
        wx.redirectTo({
          url: '../login/login',
        })
      }
    } catch (e) {

    }
    this.getUserInfo(userInfo.userid)
  },
  changeHeadImg: function () {
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
  bindDateChange: function (e) {
    this.setData({
      birthDay: e.detail.value 
    }) 
    this.updateUserInfo();
  },
  inputFocus: function (e) {
    var InType = e.currentTarget.dataset.type;
    this.setData({
      InType: InType
    });
  },
  inputBlur: function (e) {
    var InType = e.currentTarget.dataset.type;
    var newValue = e.detail.value;
    var _this = this;


    //手机号码判断
    if (InType == "phone") {
      if (utils.checkPhone(newValue)) {
        this.setData({
          phone: newValue,
          InType: '',
          phone_focus: false
        });
      } else {
        wx.showToast({
          title: '手机号码输入有误！',
          icon: 'none',
          duration: 1000
        });
        _this.setData({
          phone_focus: true
        });
      }
    } else {
      this.setData({
        InType: '',
        phone_focus: false
      });
    }
    

    //判断家庭成员
    if (InType == "faNum" && newValue.toString().length == 0){
      this.setData({
        faNum: '0'
      });
    }else{
      this.setData({
        faNum: newValue
      });
    }
    
    this.updateUserInfo()
  },
 
  //获取用户信息
  getUserInfo: function (userid) {
    var _this = this;
    app.api.getUserInfo(userid)
      .then(res => {
        console.log(res);
        _this.setData({
          address: res,
          phone: res.data.mobile_phone,
          sex: res.data.sex,
          birthDay: res.data.birthday,
          faNum: res.data.man_num
        })
      })
  },
  bindPickerChange:function(e){
    this.setData({
      sex: e.detail.value
    })
    this.updateUserInfo();
  },
  //提交修改 pOne:修改的个人信息
  updateUserInfo:function(){
    var userInfo = wx.getStorageSync('userInfo');

    var nickName = '';
    var avatarUrl = ''
    
    var sessUserInfo = app.sessionUserInfo
    if (sessUserInfo){
      var nickName = encodeURI(encodeURI(sessUserInfo.nickName));
      var avatarUrl = sessUserInfo.avatarUrl
    }


    app.api.updateUserInfo(userInfo.userid, nickName, this.data.sex, this.data.birthDay, "", avatarUrl , this.data.faNum)
      .then( res => {
        console.log(res);
        wx.showToast({
          title: '修改成功', 
          icon: 'none'
        })
      })
  }
})