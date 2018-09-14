
Page({

  data: {
    h_state:0,
    orderList:[
      { state: 1, staType: '待支付', proList: [1, 1] },
      { state: 2, staType: '待配送', proList: [1] },
      { state: 3, staType: '待取货', proList: [1, 1] },
      { state: 4, staType: '待评价', proList: [1] }
    ],
    searchText:''
  },
  onLoad: function (options) {

  },
  changeState:function(e){
    var sIndex = e.currentTarget.dataset.sIndex;
    this.setData({
      h_state: sIndex
    });
  },
  searchBlur: function (e) {
    this.setData({
      searchText: e.detail.value
    })
  }
})