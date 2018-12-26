const util = require('../../utils/util.js');
const app = getApp();
Page({

  data: {
    name: '',
    phone: '',
    leaveWord: '',
    phoneFoucs: false,
    userInfo: '',
    isIphoneX: getApp().globalData.isIphoneX
  },
  onShow: function (options) {


  },
  changeText2: function (e) {

  },
  changeText: function (e) {
    let sType = e.currentTarget.dataset.sType;
    let newText = e.detail.value;
    if (sType == "name") {
      this.setData({
        name: newText
      });
    }
    else if (sType == "phone") {
      if (util.checkPhone(newText)) {
        this.setData({
          phone: newText,
          phoneFoucs: false
        });
      } else {
        util.showToast('手机号码有误！');
        this.setData({
          phoneFoucs: true
        });
      }
    }
    else if (sType == "leaveWord") {
      this.setData({
        leaveWord: newText
      });
    }
  },
  submitBtn: function () {
    var name = this.data.name;
    var phone = this.data.phone;
    var leaveWord = this.data.leaveWord;
    if (name == "") {
      util.showToast('请输入联系人');
      return false;
    }
    else if (phone == "") {
      util.showToast('请输入手机号码！');
      return false;
    }
    else if (leaveWord == "") {
      util.showToast('请输入留言！');
      return false;
    }
    let namename = name + '-' + phone
    app.api.advise(0, namename, leaveWord)
      .then(res => {
        wx.showToast({
          title: '留言成功',
          icon: 'success',
          duration: 3000,
          complete: function () {
            wx.navigateBack()
          }
        })
      }).catch(res => {

      })

  }
})