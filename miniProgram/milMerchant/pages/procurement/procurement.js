
Page({

  data: {
    proList:[
      { til:'香满楼酸牛奶180克草莓味1箱',num:'1'},
      { til: '香满楼酸牛奶180克草莓味1箱', num: '1' },
      { til: '香满楼酸牛奶180克草莓味1箱', num: '2' },
      { til: '香满楼酸牛奶180克草莓味1箱', num: '3' },
      { til: '香满楼酸牛奶180克草莓味1箱', num: '4' },
    ]
  },
  onLoad: function (options) {
  
  },
  changeToatl: function (e) {
    var cType = e.currentTarget.dataset.cType;
    var cIndex = e.currentTarget.dataset.cIndex;
    var cartList = this.data.proList;
    var selArr = this.data.selArr;

    if (cType == 'cut' && cartList[cIndex].num != 1) {
      cartList[cIndex].num = parseInt(cartList[cIndex].num) - 1;
    } else if (cType == 'add') {
      cartList[cIndex].num = parseInt(cartList[cIndex].num) + 1;
    }


    this.setData({
      proList: cartList
    });
  },
})