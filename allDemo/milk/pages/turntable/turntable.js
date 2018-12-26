var app = getApp();
var util = require('../../utils/util.js');

//电话验证
var Validate = {
  isTel: function (value) {
    var validateReg = /^(\d3,4|\d{3,4}-)?\d{7,8}$/
    return validateReg.test(value);
  },

  isMobile: function (value) {
    var validateReg = /^[1][0-9]{10}$/
    return validateReg.test(value);
  }
}
Page({
  data: {
    awardsList: {},
    animationData: {},
    btnDisabled: '',
    layerHide: true,
    aqrHide: true,
    isIphoneX: getApp().globalData.isIphoneX,
    jifen: 0,
    wzjHide:true,//未中奖提示框
    zjfHide:true,//中积分提示框
  },
  onLoad: function () {
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
      this.setData({
        h_state: (options.id ? options.id : 0)
      })
    } catch (e) {

    }

  },
  onReady: function (e) {
    var that = this;
    app.api.getLottery()
      .then(res => {
        this.setData({
          list: res.data.list1,
          jifen: res.data.jifen
        })
        app.awardsConfig = {
          chance: true,
          awards: res.data.list2
        }

        // 绘制转盘
        var awardsConfig = app.awardsConfig.awards,
          len = awardsConfig.length,
          rotateDeg = 360 / len / 2 + 90,
          html = [],
          turnNum = 1 / len  // 文字旋转 turn 值
        that.setData({
          btnDisabled: app.awardsConfig.chance ? '' : 'disabled'
        })
        for (var i = 0; i < len; i++) {

          // 奖项列表
          html.push({ turn: i * turnNum + 'turn', lineTurn: i * turnNum + turnNum / 2 + 'turn', award: awardsConfig[i].goods_name, img: awardsConfig[i].img });
        }

        that.setData({
          awardsList: html
        });
      })


  },
  //点击抽奖
  getLottery: function () {
    var that = this
    //固定中奖第几个
    var awardIndex = Math.random() * 9 >>> 0;
    // 获取奖品配置
    var awardsConfig = app.awardsConfig,
      runNum = 8
    app.api.lottery(this.data.userid)
      .then(res => {
        awardIndex = res.data.p
        if (res.code == 200) {
          // 旋转抽奖
          app.runDegs = app.runDegs || 0
          app.runDegs = app.runDegs + (360 - app.runDegs % 360) + (360 * runNum - awardIndex * (360 / 9))

          var animationRun = wx.createAnimation({
            duration: 4000,
            timingFunction: 'ease'
          })
          that.animationRun = animationRun
          animationRun.rotate(app.runDegs).step()
          that.setData({
            animationData: animationRun.export(),
            // btnDisabled: 'disabled'
          })


          // 中奖提示
          setTimeout(function () {
            that.setData({
              btnDisabled: '',
              aqrHide: false,
              prize: awardsConfig.awards[awardIndex].name
            })
          }, 4000);
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none',
            complete: function () {
              setTimeout(function () {
                wx.navigateBack()
              }, 1500)
            }
          })
        }
      })



  },
  showLayer: function () {
    var layerHide = this.data.layerHide;
    var iDen = true;
    if (layerHide) {
      iDen = false;
    }

    this.setData({
      layerHide: iDen
    });

  },
  closeAqr: function () {
    this.setData({
      aqrHide: true
    })
  },
  closeWZJ:function(){
  	this.setData({
      wzjHide:true
    })
  },
  closeZj:function(){
  	this.setData({
      zjfHide:true
    })
  },
  formSubmit: function (e) {

    if (e.detail.value.userName == '') {
      util.showToast('请填写姓名！');
      return;
    }

    if (e.detail.value.phone == '') {
      util.showToast('请填写联系电话！');
      return;
    } else {
      if (!Validate.isMobile(e.detail.value.phone) && !Validate.isTel(e.detail.value.phone)) {
        util.showToast('请填写正确的联系电话！');
        return
      }
    }

    if (e.detail.value.address == '') {
      util.showToast('请填写收货地址！');
      return
    }

    app.api.lottery_add(this.data.userid, e.detail.value.userName, e.detail.value.phone, e.detail.value.address, this.data.prize)
      .then(res => {
        if (res.code == 200) {
          wx.showToast({
            title: '提交成功',
            complete: function () {
              setTimeout(function () {
                wx.navigateBack()
              }, 1500)
            }
          })
        }
      })
  }

})