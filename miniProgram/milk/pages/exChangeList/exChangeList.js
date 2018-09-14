
Page({

  data: {
    exList:[1,2,3,4,5,6,7,8],
    select: 0,
    exListCont: [
      {a:[1,1]},
      { a: [1, 1,1] },
      { a: [1, 1] },
      { a: [1, 1, 1] },
      { a: [1, 1] },
      { a: [1, 1, 1] },
      { a: [1, 1] },
      { a: [1, 1, 1] },
    ],
    searchText: ''
  },

  onLoad: function (options) {
  
  },
  clickType:function(e){
    this.setData({
      select: e.currentTarget.dataset.id,
    })
  },
  searchBlur: function (e) {
    this.setData({
      searchText: e.detail.value
    })
  }
})