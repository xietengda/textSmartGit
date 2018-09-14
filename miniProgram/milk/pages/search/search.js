
Page({

  data: {
    searchText:"",
    historyList:[],
    historyList2: [
      'abc', 'bcl', 'fdd', 'ddd'
    ],
  },

  onLoad: function (options) {
    var _this = this;
    wx.getStorage({
      key: 'historyList',
      success: function (res) {
        _this.setData({
          historyList : res.data
        })
      }
    })
  },
  searchBlur:function(e){
    this.setData({
      searchText: e.detail.value
    });
  },
  searchBtn:function(){
    var searchText = this.data.searchText;
    if (searchText != ""){
      this.saveHistory(searchText);
      wx.switchTab({
        url: '../allPro/allPro',
      })
    }else{
      wx.showToast({
        title: '请输入产品名称',
        icon: 'none',
        duration: 1000
      })
    }
  },
  //保存搜索历史、para:新搜索值
  saveHistory:function(para){
    var newText = para;
    var oldArr = this.data.historyList;
    var newArr = [];
    var sign = 0;
 
    for(var x in oldArr){
      if(oldArr[x] != newText){
        newArr.push(oldArr[x]);
        sign += 1;
      } else if (oldArr[x] == newText){
        newArr.unshift(oldArr[x]);
      }
    }
    
    if(sign == oldArr.length){
      newArr.push(newText); 
    } 
 
    wx.setStorage({
      key: "historyList",
      data: newArr
    })
 
  },
  delhistory:function(){
    var _this  = this;
    wx.removeStorage({
      key: 'historyList',
      success: function (res) {
        _this.setData({
          historyList: []
        })
      }
    }) 
  }
})  