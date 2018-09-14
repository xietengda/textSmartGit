var app = getApp();
Page({
  data: {
    awardsList: {},
    animationData: {},
    btnDisabled: '',
    layerHide: true,
  },
  onLoad: function () {

  },
  onReady: function (e) {
    var that = this;

    app.awardsConfig = {
      chance: true,
      awards: [
        { 'index': 0, 'name': '1元红包', 'img': '' },
        { 'index': 1, 'name': '', 'img': '../../images/me_sel.png' },
        { 'index': 2, 'name': '6元红包', 'img': '' },
        { 'index': 3, 'name': '8元红包', 'img': '' },
        { 'index': 4, 'name': '', 'img': '../../images/me_sel.png' },
        { 'index': 5, 'name': '10元红包', 'img': '' },
        { 'index': 6, 'name': '11元红包', 'img': '' },
        { 'index': 7, 'name': '12元红包', 'img': '' },
        { 'index': 8, 'name': '', 'img': '../../images/me_sel.png' },
      ]
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
      html.push({ turn: i * turnNum + 'turn', lineTurn: i * turnNum + turnNum / 2 + 'turn', award: awardsConfig[i].name, img: awardsConfig[i].img });
    }

    that.setData({
      awardsList: html
    });

  },
  //点击抽奖
  getLottery: function () {
    var that = this
    //固定中奖第几个
    var awardIndex = Math.random() * 9 >>> 0;

    // 获取奖品配置
    var awardsConfig = app.awardsConfig,
      runNum = 8
    if (awardIndex < 2) awardsConfig.chance = false
    console.log(awardIndex)

    // 旋转抽奖
    app.runDegs = app.runDegs || 0
    console.log('deg', app.runDegs)
    app.runDegs = app.runDegs + (360 - app.runDegs % 360) + (360 * runNum - awardIndex * (360 / 9))
    console.log('deg', app.runDegs)

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
      wx.showModal({
        title: '恭喜',
        content: '获得' + (awardsConfig.awards[awardIndex].name),
        showCancel: false
      })
      if (awardsConfig.chance) {
        that.setData({
          btnDisabled: ''
        })
      }
    }, 4000);

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

  }

})