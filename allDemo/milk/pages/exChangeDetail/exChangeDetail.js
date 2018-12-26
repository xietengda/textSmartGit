const app = getApp();
Page({
  data: {
    bannerList: [
      '../../images/banner.jpg',
      '../../images/banner.jpg'
    ],
    bannerIndex: '0',
    goodsId: 0,//商品id
    isIphoneX: getApp().globalData.isIphoneX
  },
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: this.data.data.goods_name,
      path: 'pages/proDetails/proDetails' + this.data.url,
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

  },
  urlEncode: function (param, key, encode, label = '&') {
    if (param == null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
      paramStr += label + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
    } else {
      var keyArr = Object.keys(param);
      for (var i in param) {
        var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
        if (keyArr[0] == i) {
          paramStr += this.urlEncode(param[i], k, encode, '?');
        } else {
          paramStr += this.urlEncode(param[i], k, encode);
        }
      }
    }
    return paramStr;
  },
  onLoad: function (options) {
    wx.showShareMenu()
    console.log(this.urlEncode(options))
    this.setData({
      url: this.urlEncode(options)
    })
    console.log(options);
    if (options.goodsId) {
      app.api.getExchangeInfo(options.goodsId)
        .then(res => {
          console.log(res)
          for (var i in res.data.img_list) {
            res.data.img_list[i].img_original = app.api.getUrl() + res.data.img_list[i].img_original
          }
          res.data.goods_desc = res.data.goods_desc.replace(/\<img/gi, '<img class="rich_img"');
          this.setData({
            data: res.data
          });
        })
    } else {

    }
  },
  bannerChange: function (e) {
    var newIndex = e.detail.current;

    this.setData({
      bannerIndex: newIndex
    });
  },
  exChangeBtn: function (e) {
    var userInfo = wx.getStorageSync('userInfo');

    
    if(userInfo == ''){
      wx.navigateTo({
        url: '../login/login',
      });
      return
    }
    
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

          for (var x in res.data.supplier_list[0].shipping_list){
            if (res.data.supplier_list[0].shipping_list[x].shipping_id != 28) {
              res.data.supplier_list[0].shipping_list[x].shipping_name = '快递'
            }
          }

          app.exinfo = {
            def_addr: res.data.def_addr,
            goods_list: res.data.supplier_list[0].goods_list,
            shipping_list: res.data.supplier_list[0].shipping_list,
            shipping_ziti: res.data.supplier_list[0].shipping_ziti,
            supplier_total: res.data.supplier_list[0].supplier_total,
            order_info: res.data.order_info,
            address_list: res.data.address_list
          }

          wx.navigateTo({
            url: '../exChangePay/exChangePay?goodsId=' + e.currentTarget.dataset.goods_id,
          })

        })
    }
  },
})