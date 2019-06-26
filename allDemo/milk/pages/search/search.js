//获取应用实例
const app = getApp();

Page({

  data: {
    searchText: "",
    historyList: [],
    hotList: [],
  },

  onLoad: function (options) {
    var _this = this;
    wx.getStorage({
      key: 'historyList',
      success: function (res) {
        _this.setData({
          historyList: res.data
        })
      }
    });
    this.hostSearch();
  },
  searchBlur: function (e) {
    this.setData({
      searchText: e.detail.value
    });
  },
  searchBtn: function (e) {
    var searchText = this.data.searchText;
    if (searchText != "") {
      this.saveHistory(searchText);
      app.saveHistory = searchText
      wx.switchTab({
        url: '../allPro/allPro',
      })
    } else {
      if (e.detail.value.search) {
        searchText = e.detail.value.search
        this.saveHistory(searchText);
        app.saveHistory = searchText
        wx.switchTab({
          url: '../allPro/allPro',
        })
      } else {
        wx.showToast({
          title: '请输入产品名称',
          icon: 'none',
          duration: 1000
        })
      }

    }
  },
  //保存搜索历史、para:新搜索值
  saveHistory: function (para) {
    var newText = para;
    var oldArr = this.data.historyList;
    var newArr = [];
    var sign = 0;

    for (var x in oldArr) {
      if (oldArr[x] != newText) {
        newArr.push(oldArr[x]);
        sign += 1;
      } else if (oldArr[x] == newText) {
        newArr.unshift(oldArr[x]);
      }
    }

    if (sign == oldArr.length) {
      newArr.push(newText);
    }

    wx.setStorage({
      key: "historyList",
      data: newArr
    })

  },
  delhistory: function () {
    var _this = this;
    wx.removeStorage({
      key: 'historyList',
      success: function (res) {
        _this.setData({
          historyList: []
        })
      }
    })
  },
  //热门搜索
  hostSearch: function () {
    app.api.getSearch()
      .then(res => {
        let hotList = res.data;

        this.setData({
          hotList: res.data
        });
      })
      .catch(res => {
        wx.showToast({
          title: '网络出错了！',
          icon: 'none'
        })
      })
  },
  gjz: function (e) {
    app.saveHistory = e.currentTarget.dataset.value
    wx.switchTab({
      url: '../allPro/allPro',
    })
  }
})  