const app = getApp();
Page({
  data: {
    disList: [],
    disList2: [],
    isIphoneX: getApp().globalData.isIphoneX
  },
  onLoad: function (options) {
    try {
      var bonus_list = wx.getStorageSync('bonus_list')
      var disList = []
      var disList2 = []
      if (bonus_list) {
        let bIndex = 0;
        let bIndex2 = 0;

        for (var i in bonus_list) {
          bonus_list[i].type_money = parseInt(bonus_list[i].type_money)
          if (bonus_list[i].can_use == 1) {
            disList.push(bonus_list[i])
            if (bIndex < 5) {
              bIndex += 1;
              bonus_list[i].bIndex = bIndex;
            } else {
              bIndex = 0;
              bIndex += 1;
              bonus_list[i].bIndex = bIndex;
            }
          } else {
            disList2.push(bonus_list[i])
            if (bIndex2 < 5) {
              bIndex2 += 1;
              bonus_list[i].bIndex = bIndex2;
            } else {
              bIndex2 = 0;
              bIndex2 += 1;
              bonus_list[i].bIndex = bIndex2;
            }
          }
        }
      }

    } catch (e) {

    }
    this.setData({
      disList: disList,
      disList2: disList2
    });

  },
  use: function (e) {
    app.bonus_id = e.currentTarget.dataset.bonus_id
    wx.navigateBack()

  }
})