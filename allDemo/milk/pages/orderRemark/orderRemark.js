const app = getApp();
Page({

    data: {
        isIphoneX: getApp().globalData.isIphoneX
    },
    formSubmit: function (e) {
            app.bz=e.detail.value.bz
            wx.navigateBack({})

    }
})