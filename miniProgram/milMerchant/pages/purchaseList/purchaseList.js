
Page({

  data: {
    editSta:0,
    proList:[
      { til:"香满楼酸牛奶180克草莓味1箱",num:1},
      { til: "香满楼酸牛奶180克草莓味1箱", num: 1 },
      { til: "香满楼酸牛奶180克草莓味1箱", num: 1 },
      { til: "香满楼酸牛奶180克草莓味1箱", num: 1 },
      { til: "香满楼酸牛奶180克草莓味1箱", num: 1 },
    ],
    allSel:true,
    selArr:[]
  },
  onLoad: function (options) {
    var proList = this.data.proList;
    var selArr = [];

    for (var x in proList){
      selArr.push('true');
    }

    this.setData({
      selArr: selArr
    });

  },
  changeToatl: function (e) {
    var cType = e.currentTarget.dataset.cType;
    var cIndex = e.currentTarget.dataset.cIndex;
    var cartList = this.data.proList;

    if (cType == 'cut' && cartList[cIndex].num != 1) {
      cartList[cIndex].num = parseInt(cartList[cIndex].num) - 1;
    } else if (cType == 'add') {
      cartList[cIndex].num = parseInt(cartList[cIndex].num) + 1;
    }

    this.setData({
      proList: cartList
    });
  },
  editPro:function(){
    var editSta = this.data.editSta;
    var editNum = 1;

    if (editSta == 1){
      editNum = 0;
    }

    this.setData({
      editSta: editNum
    });
  },
  //单选
  clickPro:function(e){
    var cIndex = e.currentTarget.dataset.pIndex;
    var selArr = this.data.selArr;
    var sign = true;

    if (selArr[cIndex]){
      sign = false;
    }
    selArr[cIndex] = sign;
    
    this.checkAllSel(selArr);

    this.setData({
      selArr: selArr
    });
  },
  //全选
  allClickPro:function(){
    var allSel = this.data.allSel;
    var selArr = this.data.selArr;
    var sign = true;

    if (allSel){
      sign = false;
    }
    for (var x in selArr){
      selArr[x] = sign;
    }

    this.setData({
      selArr:selArr,
      allSel: sign
    });
  },
  //判断是否全选 para:新的选择数据
  checkAllSel:function(para){
      var sign = true;
      for(var x in para){
        if (para[x] == false){
          sign = false;
        }
      }
      this.setData({
        allSel: sign
      });
  }

})