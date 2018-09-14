//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    bannerList:[
      '../../images/banner.jpg',
      '../../images/banner.jpg'
    ],
    current:0,
    classArr:[
      { icon: '../../images/class1.jpg', text:"超值团购"},
      { icon: '../../images/class1.jpg', text: "超厉害" },
      { icon: '../../images/class1.jpg', text: "超划算" },
      { icon: '../../images/class1.jpg', text: "超划算" },
      { icon: '../../images/class1.jpg', text: "超划算" },
      { icon: '../../images/class1.jpg', text: "超划算" },
      { icon: '../../images/class1.jpg', text: "超划算" }
    ],
    discountList:[
      { price: '99', text: '满100使用' },
      { price: '49', text: '满100使用' },
      { price: '79', text: '满100使用' },
      { price: '69', text: '满100使用' }
    ],
    comboList:[
      { price: '268', title: '各种口味酸奶', subtil: '6种口味自由搭配  更营养更放心', imgUrl:'../../images/buy_milk_pro.jpg'},
      { price: '123', title: '面包味的屎', subtil: '6种口味自由搭配  更营养更放心', imgUrl: '../../images/buy_milk_pro.jpg' }
    ],
    timeLimtList:[
      1,2,3
    ],
    milkList:[
      1, 2, 3,4
    ]
  },
  onLoad: function () {
    
  },
  banChange:function(e){
    console.log(e);
    this.setData({
      current: e.detail.current
    });
  },
  banPrev:function(){
    var bLen = this.data.bannerList.length -1;
    if (this.data.current == bLen && this.data.current != 0){
      this.setData({
        current: this.data.current -1 
      });
    }
  },
  banNext: function () {
    var bLen = this.data.bannerList.length - 1;
    if (this.data.current < bLen) {
      this.setData({
        current: this.data.current + 1
      });
    }
  }
})
