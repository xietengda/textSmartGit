const app = getApp();
Page({

  data: {
    helpList: [1, 1, 1],
    page:1,
    isIphoneX: getApp().globalData.isIphoneX
  },
  onShow: function (options) {
    var _this = this;
    app.api.getArticleList(10,_this.data.page)
      .then(res => {
        console.log(res)
        for(var x in res.data.list){
          res.data.list[x].hide = true
        }
         
        var helpList = [];
        if(_this.data.page != '1' && _this.data.page != 'end'){
          helpList = _this.data.helpList.concat(res.data.list);
        }else{
          helpList = res.data.list;
        }


        if (res.data.pager.page < res.data.pager.page_count){
          _this.setData({
            page:parseInt(_this.data.page)+1 
          })
        }else{
          _this.setData({
            page: 'end'
          }) 
        }

        this.setData({
          helpList: helpList
        })
      })
  },
  detail: function (e) {
    console.log(e.currentTarget.dataset.id)
  },
  openCont:function(e){
    var cId = e.currentTarget.dataset.cId;
    var helpList = this.data.helpList;

    for(var x in helpList){
      if (helpList[x].article_id == cId){
        if (helpList[x].hide == true){
          helpList[x].hide = false;
        }else{
          helpList[x].hide = true;
        }
      }else{
        helpList[x].hide = true;
      }
    }
    this.setData({
      helpList: helpList
    })
  },
  onReachBottom:function(){
    var _this = this;

    if(_this.data.page != 'end'){
      _this.onShow();
    }else{
      wx.showToast({
        title: '已经到底了',
        icon:'none'
      })
    }
  }
})