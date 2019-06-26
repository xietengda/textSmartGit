const app = getApp();
Page({

  data: {
    exList: [1, 2, 3, 4, 5, 6, 7, 8],
    select: 0,
    exListCont: [{
      a: [1, 1]
    },
    {
      a: [1, 1, 1]
    },
    {
      a: [1, 1]
    },
    {
      a: [1, 1, 1]
    },
    {
      a: [1, 1]
    },
    {
      a: [1, 1, 1]
    },
    {
      a: [1, 1]
    },
    {
      a: [1, 1, 1]
    },
    ],
    searchText: '',
    isIphoneX: getApp().globalData.isIphoneX
  },

  onLoad: function (options) {
    this.categorylist(0)
    this.list(0)
  },
  clickType: function (e) {
    this.categorylist(e.currentTarget.dataset.id)
    this.list(e.currentTarget.dataset.id)
    this.setData({
      select: e.currentTarget.dataset.id,
    })
  },
  searchBlur: function (e) {
    this.setData({
      searchText: e.detail.value
    })
  }, //获取顶部分类
  categorylist: function (cid) {
    app.api.getCategory(0, 1)
      .then(res => {
        res.data.category_list.unshift({
          id: 0,
          name: '全部'
        })
        for (var i in res.data.category_list) {
          if (cid == res.data.category_list[i]['id']) {
            res.data.category_list[i].class = 'exList_class_sel'
          } else {
            res.data.category_list[i].class = ''
          }
        }
        this.setData({
          exList: res.data.category_list
        })
        //console.log(res)
      })
      .catch(res => {
        console.log(res)
        wx.showToast({
          title: '网络出错了！',
          icon: 'none'
        })
      })
  },
  list: function (cid) {
    app.api.getExchange(cid)
      .then(res => {
        console.log(res)
        for (var i in res.data.goods_list) {
          res.data.goods_list[i].goods_thumb = app.api.getUrl() + res.data.goods_list[i].goods_thumb
        }
        //res.data.goods_list[1] = res.data.goods_list[0]
        this.setData({
          exListCont: res.data.goods_list
        })
      })
  },
  goPay: function (e) {
    console.log(e.currentTarget.dataset.goods_id)
    var userInfo = wx.getStorageSync('userInfo')
    if (e.currentTarget.dataset.goods_id) {
      app.api.exCheckout(userInfo.userid, e.currentTarget.dataset.goods_id)
        .then(res => {
          console.log(res)
          //shipping_fee:运费 
          if (res.code == 500) {
            wx.showToast({
              title: res.message,
              icon: 'none',
            })
            return
          }
          for (var i in res.data.supplier_list[0].goods_list) {
            res.data.supplier_list[0].goods_list[i].goods_thumb = app.api.getUrl() + res.data.supplier_list[0].goods_list[i].goods_thumb;
          }

          app.exinfo = {
            def_addr: res.data.def_addr,
            goods_list: res.data.supplier_list[0].goods_list,
            shipping_list: res.data.supplier_list[0].shipping_list,
            shipping_ziti: res.data.supplier_list[0].shipping_ziti,
            supplier_total: res.data.supplier_list[0].supplier_total,
            order_info: res.data.order_info
          }

          wx.navigateTo({
            url: '../exChangePay/exChangePay?goodsId=' + e.currentTarget.dataset.goods_id,
          })

        })
    }
  }
})