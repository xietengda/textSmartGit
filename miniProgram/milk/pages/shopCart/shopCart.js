
Page({
  data: {
    hasProduct:true,
    editBtn:true,
    cartList:[
      {img: '../../images/timeLimt.png', til: '香满楼酸牛奶180克草莓味3盒', subTil: '采用巴氏杀菌，较大限度保留原奶的营养和鲜味', price:'6.9',num:1},
      { img: '../../images/timeLimt.png', til: '香满楼酸牛奶180克草莓味3盒', subTil: '采用巴氏杀菌，较大限度保留原奶的营养和鲜味', price: '6.9', num: 1 },
      { img: '../../images/timeLimt.png', til: '香满楼酸牛奶180克草莓味3盒', subTil: '采用巴氏杀菌，较大限度保留原奶的营养和鲜味', price: '6.9', num: 1 }
    ],
    selArr:[],
    allSel:true,
    countPrice:0,
    countToatl:0,
  },
  onLoad: function (options) {
    var cartList = this.data.cartList;
    var selArr = [];
    var countPrice = 0;
    var countToatl = 0;

    for(var x in cartList){
      selArr[x] = true;
      countToatl += 1;
      countPrice += cartList[x].price * cartList[x].num;
    }

    this.setData({
      cartList: cartList,
      selArr: selArr,
      countToatl: countToatl,
      countPrice: countPrice.toFixed(2)
    });

  },
  selChange:function(e){
    var selIndex = e.currentTarget.dataset.selIndex;
    var selArr = this.data.selArr;
    var check = true;

    if(selArr[selIndex]){
      check = false;
    }
    selArr[selIndex] = check;

    var allSel = this.checkAllSel(selArr);

    this.allCount(selArr);

    this.setData({
      selArr: selArr,
      allSel: allSel
    });
  },
  allSel:function(e){
    var allSel = this.data.allSel;
    var selArr = this.data.selArr;
    var check = true;

    if(allSel){
      check = false;
    }
    for(var x in selArr){
      selArr[x] = check;
    }

    this.allCount(selArr);

    this.setData({
      allSel: check,
      selArr: selArr
    });
  },
  /*是否全选 para:传入选择后的数组*/
  checkAllSel:function(para){
    var check = true;

    for (var x in para){
      if(para[x] == false){
        check = false;
      }
    }

    return check;
  },
  changeToatl:function(e){
    var cType = e.currentTarget.dataset.cType;
    var cIndex = e.currentTarget.dataset.cIndex;
    var cartList = this.data.cartList;
    var selArr = this.data.selArr;

    if (cType == 'cut' && cartList[cIndex].num != 1){
      cartList[cIndex].num = parseInt(cartList[cIndex].num) - 1;
    } else if (cType == 'add'){
      cartList[cIndex].num = parseInt(cartList[cIndex].num) + 1;
    }

    this.allCount(selArr);

    this.setData({
      cartList: cartList
    });
  },
  /*计算总价，总数*/
  allCount:function(para){
    var countPrice = 0;
    var countToatl = 0;
    var cartList = this.data.cartList;

    for (var x in para) {
      if(para[x]) {
        countToatl += 1;
        countPrice += cartList[x].price * cartList[x].num;
      }
    }
    
    this.setData({
      countToatl: countToatl,
      countPrice: countPrice.toFixed(2)
    })
  },
  editCart:function(){
    var editBtn = this.data.editBtn;
    var mark = true;

    if (editBtn){
      mark = false;
    }

    this.setData({
      editBtn: mark
    })
  },
  delCart:function(){
    var cartList = this.data.cartList;
    var selArr = this.data.selArr;
    var selMark  = 0;

    for (var x in selArr){
      if(selArr[x] == false){

      }else{
        selMark += 1;
      }
    }
    

    if(selMark == 0){
      wx.showToast({
        title: '请选择商品',
        icon: 'none',
        duration: 1000
      });
    }else{
      
    }
  },
  clickTotal:function(){
    wx.navigateTo({
      url: '../payment/payment'
    })
  }
})