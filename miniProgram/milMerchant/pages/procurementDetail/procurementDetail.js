
Page({

  data: {
    proDetail:[1,1,1,1,1,1,1],
    switchNum:0
  },

  onLoad: function (options) {
  
  },
  bindDateChange:function(){

  },
  switchList:function(e){
    var sIndex = e.currentTarget.dataset.sIndex;
    this.setData({
      switchNum: sIndex
    });
  }
})