
Page({

  data: {
    array:[
      '广州','珠海','深证'
    ],
    index:0,
    selShopList:[
      { img: '../../images/timeLimt.png', til: '香满楼昌岗中路店', adr: '广东省广州市海珠区昌岗中路51号', time: '8:00-22:00', sel: 1, m: 300},
      { img: '../../images/timeLimt.png', til: '香满楼昌岗中路店', adr: '广东省广州市海珠区昌岗中路51号', time: '8:00-22:00', sel: 0 ,m:100},
      { img: '../../images/timeLimt.png', til: '香满楼昌岗中路店', adr: '广东省广州市海珠区昌岗中路51号', time: '8:00-22:00', sel: 0, m: 400},
      { img: '../../images/timeLimt.png', til: '香满楼昌岗中路店', adr: '广东省广州市海珠区昌岗中路51号', time: '8:00-22:00', sel: 0, m: 500 },
    ]
  },
  onLoad: function (options) {
  
  },
  bindPickerChange:function(e){
    this.setData({
      index: e.detail.value
    });
  },
  clickAdr:function(e){
    var SIndex = e.currentTarget.dataset.cIndex;
    var selShopList = this.data.selShopList;
    var _this = this;

    console.log(selShopList[SIndex].sel == 0);

    if (selShopList[SIndex].sel == 0){
      for (var x in selShopList){
        selShopList[x].sel = 0;
      }
      selShopList[SIndex].sel = 1;

      _this.setData({
        selShopList: selShopList
      });
    }
  }
  
})