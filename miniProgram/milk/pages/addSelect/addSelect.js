
Page({

  data: {
    addList:[
      { def: 1 },
      { def: 0 },
       {def: 0 }
    ]
  },

  onLoad: function (options) {
  
  },
  selectAdd:function(e){
    var sIndex = e.currentTarget.dataset.sIndex;
    var addList = this.data.addList;
    var sign = 1;

    if (addList[sIndex].def == "1"){
      sign = "0";
    }

    for(var x in addList){
      if(x == sIndex){
        addList[x].def = sign;
      }else{
        addList[x].def = 0;
      }
    }

    this.setData({
      addList: addList
    });
  },

})