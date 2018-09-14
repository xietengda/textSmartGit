
Page({

  data: {
    getType: 1,
  },

  onLoad: function (options) {
  
  },
  getTypeFun: function () {
    var getType = this.data.getType;
    var typeNum = 1;

    if (getType == "1") {
      typeNum = 0;
    }

    getType = typeNum;

    this.setData({
      getType: getType
    });

  }

})