
Page({

  data: {
    takeList: [/*0:已取   1:可选  2:已选*/
      {all:false,subList:[
        { sta: 0 }, { sta: 1 }, { sta: 1 }, { sta: 1 }, { sta: 1 }, { sta: 1 }, { sta: 1 }, { sta: 1 }, { sta: 1 }, { sta: 1 }, { sta: 1 }, { sta: 1 }, { sta: 1 }, { sta: 1 }
      ]},
      {all: false,subList: [
          { sta: 0 }, { sta: 0 }, { sta: 0 }, { sta: 1 }, { sta: 1 }, { sta: 1 }, { sta: 1 }, { sta: 1 }, { sta: 1 }, { sta: 1 }, { sta: 1 }, { sta: 1 }, { sta: 1 }, { sta: 1 }
        ]
      },
      {all: false,subList: [
          { sta: 0 }, { sta: 1 }, { sta: 1 }, { sta: 1 }, { sta: 1 }, { sta: 1 }, { sta: 1 }
        ]
      }
    ],
    layerType:false,
  },

  onLoad: function (options) {
  
  },
  //单选
  clickPro:function(e){
    var typeIndex = e.currentTarget.dataset.typeIndex;
    var choIndex = e.currentTarget.dataset.choIndex;
    var takeList = this.data.takeList;
    var sign  = 1;

    if(takeList[typeIndex].subList[choIndex].sta == 1){
      sign = 2;
    }
    takeList[typeIndex].subList[choIndex].sta = sign;
    
    this.checkAllSel(takeList, typeIndex);

    this.setData({
      takeList: takeList
    });
  },
  //全选
  allSelect:function(e){
    var typeIndex = e.currentTarget.dataset.typeIndex;
    var takeList = this.data.takeList;
    var sign = true;
    var sign2 = 2;

    if (takeList[typeIndex].all){
      sign = false;
      sign2 = 1;
    }

    takeList[typeIndex].all = sign;
    for (var x in takeList[typeIndex].subList){
      if (takeList[typeIndex].subList[x].sta != 0){
        takeList[typeIndex].subList[x].sta = sign2;
      }
    }

    this.setData({
      takeList: takeList
    });

  },
  //判断是否全选 paraOne:选择后的列表,paraTwo:类型下标
  checkAllSel:function(paraOne,paraTwo){
    var takeList = paraOne;
    var sign = true;
    for (var x in takeList[paraTwo].subList){
      if (takeList[paraTwo].subList[x].sta == 1){
        sign = false;
      }
    }
    takeList[paraTwo].all = sign;

    this.setData({
      takeList: takeList
    });

  },
  takeMilk:function(){
    var layerType = this.data.layerType;
    var sign = true;

    if (layerType){
      sign = false;
    }
    this.setData({
      layerType:sign
    });
  }
   
})