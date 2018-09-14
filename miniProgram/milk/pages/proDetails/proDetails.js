
Page({
  data: {
    imgUrls: [1, 2, 3],
    current: 0,
    disCount: [1, 2, 3],
    discountList: [
      { price: '99', text: '满100使用' },
      { price: '49', text: '满100使用' },
      { price: '79', text: '满100使用' },
      { price: '69', text: '满100使用' }
    ],
    introduceList: [1, 2],
    //切换商品介绍，评论标志
    proIntIndex: 1,
    //收藏(0:未收藏 1：已收藏)
    collect: 0,
    sizeList: [
      { title: '口味', list: [{ name: '原味', sel: 1 }, { name: '草莓味', sel: 0 }, { name: '草莓味', sel: 0 }] },
      { title: '规格', list: [{ name: '180g', sel: 1 }, { name: '265g', sel: 0 }] }
    ],
    //黑色遮罩
    layerType: false,
    //普通产品弹窗
    showLayer: false,
    //套餐产品弹窗
    comboLayer: false,
    //是否可以滚动页面标志
    touchmove: false,
    //套餐选购按钮（0.立即选购1.完成选购）
    comboType: 0,
    /*点击类型(cart:购物车，buy购买)*/
    clickType: 'cart',
    //购买数量
    butTotal: 1,
    //切换底部按钮，1：正常商品，2.套餐商品
    proType: 1,
    comboList: [
      { title: '酸奶', count: 10, residue: 10, list: [{ name: '红枣枸杞牛奶', ml: '235ml', num: '0' }, { name: '纯牛奶', ml: '235ml', num: '0' }, { name: '红枣枸杞牛奶', ml: '235ml', num: '0' }] },
      { title: '酸奶', count: 10, residue: 10, list: [{ name: '红枣枸杞牛奶', ml: '235ml', num: '0' }, { name: '纯牛奶', ml: '235ml', num: '0' }, { name: '红枣枸杞牛奶', ml: '235ml', num: '0' }] }
    ],
    //评论数
    comList: [
      { score: 3, imgList: [1, 1, 1, 1] },
      { score: 2, imgList: [1, 1] },
      { score: 4, imgList: [1, 1, 1] },
    ]
  },
  bannerChange: function (event) {
    this.setData({
      current: event.detail.current,
    });
  },
  proIntChange: function (event) {
    this.setData({
      proIntIndex: event.currentTarget.dataset.index
    });
  },
  collectChange: function () {
    var collect = this.data.collect;
    var collectNum = 1;
    var title = "收藏成功";
    if (collect == 1) {
      collectNum = 0;
      title = "取消收藏"
    }
    this.setData({
      collect: collectNum
    });
    wx.showToast({
      title: title,
      icon: 'success',
      duration: 1000
    })
  },
  clickLayer: function () {
    var layerType = false;
    var showLayer = false;
    var comboLayer = false;
    var touchmove = false;
    var comboType = 0;
    this.setData({
      layerType: layerType,
      showLayer: showLayer,
      comboType: comboType,
      comboLayer: comboLayer,
      touchmove: touchmove
    });
  },
  onLoad: function (options) {
    var proType = "1";
    if (options.proType == '2') {
      proType = 2;
    }
    this.setData({
      proType: proType
    })
  },
  clickType: function (e) {
    var layerType = true;
    var showLayer = true;
    var touchmove = true;
    var clickType = e.currentTarget.dataset.type;

    this.setData({
      layerType: layerType,
      showLayer: showLayer,
      clickType: clickType,
      touchmove: touchmove
    });
  },
  /*确定按钮*/
  sizeBtn: function () {
    var layerType = false;
    var showLayer = false;
    var touchmove = false;
    this.setData({
      layerType: layerType,
      showLayer: showLayer,
      touchmove: touchmove
    });
    wx.navigateTo({
      url: '../payment/payment'
    })
  },
  /*选择类型*/
  selSize: function (e) {
    var sizeIndex = e.currentTarget.dataset.sizeIndex;
    var sizeListIndex = e.currentTarget.dataset.sizeListIndex;
    var sizeList = this.data.sizeList;
    for (var x in sizeList) {
      if (x == sizeIndex) {
        for (var y in sizeList[x].list) {
          if (y == sizeListIndex) {
            sizeList[x].list[y].sel = 1;
          } else {
            sizeList[x].list[y].sel = 0;
          }
        }
      }
    }
    this.setData({
      sizeList: sizeList
    });
  },
  //改变数量
  changeNum: function (e) {
    var numType = e.currentTarget.dataset.numType;
    var butTotal = this.data.butTotal;

    if (numType == "cut" && butTotal > 1) {
      butTotal = parseInt(butTotal) - 1;
    } else if (numType == "add") {
      butTotal = parseInt(butTotal) + 1;
    }
    this.setData({
      butTotal: butTotal
    })
  },
  //套餐改变数量
  comboChange: function (e) {
    var comboOne = e.currentTarget.dataset.comboOne;
    var comboTwo = e.currentTarget.dataset.comboTwo;
    var changeType = e.currentTarget.dataset.type;
    //选择总数
    var allNum = 0;

    var comboList = this.data.comboList;

    if (changeType == "cut" && comboList[comboOne].list[comboTwo].num != '0') {
      comboList[comboOne].list[comboTwo].num = parseInt(comboList[comboOne].list[comboTwo].num) - 1;
    } else if (changeType == "add" && comboList[comboOne].residue != "0") {
      comboList[comboOne].list[comboTwo].num = parseInt(comboList[comboOne].list[comboTwo].num) + 1;
    }

    for (var x in comboList) {
      if (x == comboOne) {
        for (var y in comboList[x].list) {
          allNum += parseInt(comboList[x].list[y].num);
        }
      }
    }

    comboList[comboOne].residue = parseInt(comboList[comboOne].count) - allNum;

    this.setData({
      comboList: comboList
    });
  },
  //立即选购
  clickCombo: function (e) {
    var layerType = true;
    var comboLayer = true;
    var touchmove = true;
    var comboType = 1;

    this.setData({
      comboLayer: comboLayer,
      comboType: comboType,
      layerType: layerType,
      touchmove: touchmove
    })
  },
  //完成选购
  finishCombo: function (e) {
    var layerType = false;
    var comboLayer = false;
    var touchmove = false;
    var comboType = 0;

    this.setData({
      comboLayer: comboLayer,
      comboType: comboType,
      layerType: layerType,
      touchmove: touchmove
    })
  }

})