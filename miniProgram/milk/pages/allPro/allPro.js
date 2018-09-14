
Page({

  data: {
    reshList:[1,1,1,1],
    searchText:'',
  },
  onLoad: function (options) {
  
  },
  searchBlur: function (e) {
    this.setData({
      searchText : e.detail.value
    })
  }
})