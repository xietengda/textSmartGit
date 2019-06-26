const app = getApp();
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    photo_data: [],
    starList: [true, true, true, true, false],
    evalText: '很好',
    isIphoneX: getApp().globalData.isIphoneX,
    rank: 3
  },
  onLoad: function (options) {
    if (!options.recid || !options.goodsid || !options.orderid) {
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
      app.api.getGoodsInfo(options.goodsid, userInfo.userid)
        .then(res => {
          res.data.goods_img = app.api.getUrl() + res.data.goods_img
          this.setData({
            goods: res.data,
            userInfo: userInfo,
            userid: userInfo.userid,
            order_id: options.orderid,
            goods_id: options.goodsid,
            rec_id: options.recid
          })
        })

    } catch (e) {

    }
  },
  star_click: function (event) {
    var index = event.currentTarget.dataset.index;
    var starList
    var evalText
    switch (index) {
      case 0:
        starList = [true, false, false, false, false];
        evalText = '差'
        break
      case 1:
        starList = [true, true, false, false, false];
        evalText = '一般'
        break
      case 2:
        starList = [true, true, true, false, false];
        evalText = '一般'
        break
      case 3:
        starList = [true, true, true, true, false];
        evalText = '很好'
        break
      case 4:
        starList = [true, true, true, true, true];
        evalText = '非常好'
        break
    }

    this.setData({
      starList: starList,
      evalText: evalText,
      rank: index
    });

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
  lookPhoto: function (event) {
    util.lookPhoto(e);
  },
  delPhoto: function (event) {
    var newData = util.delPhoto(event, this.data.photo_data);

    this.setData({
      photo_data: newData
    });
  },
  formSubmit: function (e) {
    if (this.data.photo_data[0]) {
      app.api.addUserComment(this.data.userid, this.data.rec_id, this.data.order_id, this.data.goods_id, this.data.rank, e.detail.value.content, this.data.photo_data[0], 'img_srcs')
        .then(res => {
          let icon = 'none'
          wx.showToast({
            title: res.message,
            icon: icon,
            complete: function () {
              setTimeout(function () {
                wx.navigateBack({
                })
              }, 1500)
            }
          })
        })
      return
    }
    app.api.addUserCommentNoPic(this.data.userid, this.data.rec_id, this.data.order_id, this.data.goods_id, this.data.rank, e.detail.value.content)
      .then(res => {
        let icon = 'none'
        wx.showToast({
          title: res.message,
          icon: icon,
          complete: function () {
            setTimeout(function () {
              wx.navigateBack({
              })
            }, 1500)
          }
        })
      })

  }
})