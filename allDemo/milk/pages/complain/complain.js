var util = require('../../utils/util.js');
const app = getApp();
Page({

  data: {
    photo_data: [],
    appealType: 1,
    isIphoneX: getApp().globalData.isIphoneX
  },
  onLoad: function (options) {
    if (!options.id) {
      wx.navigateBack({})
    }
    try {
      var userInfo = wx.getStorageSync('userInfo')
      if (userInfo.userid) {
        this.setData({
          login: true,
        })
      } else {
        this.setData({
          login: false,
        })
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 1500,
          complete: function () {
            wx.navigateTo({
              url: '../login/login'
            })
          }
        })
      }
      this.setData({
        userInfo: userInfo,
        userid: userInfo.userid,
        order_id: options.id
      })
    } catch (e) {
      console.log(e)
    }
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
  lookPhoto: function (e) {
    util.lookPhoto(e);
  },
  delPhoto: function (event) {
    var newData = util.delPhoto(event, this.data.photo_data);

    this.setData({
      photo_data: newData
    });
  },
  changeType: function (e) {


    this.setData({
      appealType: e.currentTarget.dataset.appealType
    })
  },
  formSubmit: function (e) {
    var typeName = ['产品质量问题', '商家服务态度问题', '配送问题', '其他']
    app.api.tousu(this.data.userid, e.detail.value.content, typeName[this.data.appealType], this.data.order_id)
      .then(res => {
        wx.showToast({
          title: '提交成功',
          complete:function(){
            setTimeout(function(){
              wx.navigateBack({
                
              })
            },1500)
          }
        })
      })
  }
})