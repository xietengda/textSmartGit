const app = getApp();
Page({
  data: {
    selAddres: "请选择地址",
    street: '',
    items: [
      { name: 1, value: '先生', checked: 'checked' },
      { name: 2, value: '女士' },
    ],
    sex: 1,
    setdefault: 1,
    name: '',
    mobile: '',
    address: '',
    def_addr: '',
    switchT: 'true',
    addressid: '',
    selPCDA: {}
  },
  onLoad: function (options) {
    var _this = this;
    console.log(options);
    try {
      var userInfo = wx.getStorageSync('userInfo')
      if (userInfo.userid) {
        this.setData({
          login: true,
        })
      } else {
        this.setData({
          login: false,
        })
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 1500,
          complete: function () {
            wx.navigateTo({
              url: '../login/login'
            })
          }
        })
      }
      this.setData({
        userInfo: userInfo,
        userid: userInfo.userid
      })

    } catch (e) {
      console.log(e)
    }
    if (options.addressid) {
      app.api.getUserAddressInfo(userInfo.userid, options.addressid)
        .then(res => {
          for (var x in res.data.list) {
            console.log(res.data.list[x])
            if (res.data.list[x].def_addr == 1) {
              var switchT = 'true'
            } else {
              var switchT = ''
            }

            //将选择的省市区id存进数据
            var selPCDA = {};
            selPCDA.P = res.data.list[x].province;
            selPCDA.C = res.data.list[x].city;
            selPCDA.D = res.data.list[x].district;
            selPCDA.A = res.data.list[x].address;

            _this.setData({
              name: res.data.list[x].consignee,
              mobile: res.data.list[x].mobile,
              selAddres: res.data.list[x].address_short_name,
              address: res.data.list[x].address,
              switchT: switchT,
              addressid: res.data.list[x].address_id,
              selPCDA: selPCDA,
              setdefault: res.data.list[x].def_addr
            })
          }

        })
        .catch(res => {
          wx.navigateBack()
        })
    }
  },
  formSubmit: function (e) {
    console.log(e.detail.value.address);
    var selPCDA = this.data.selPCDA;
    console.log(selPCDA.A + e.detail.value.address)
    try {
      app.api.updateUserAddress(this.data.userid, this.data.addressid, 1, selPCDA.P, selPCDA.C, selPCDA.D, selPCDA.A + e.detail.value.address, e.detail.value.name, e.detail.value.tel, this.data.setdefault, this.data.locationString)
        .then(res => {
          console.log(res)
          if (res.code == 200) {
            wx.navigateBack()
          } else if (res.code == 500) {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        })
    } catch (e) {
      console.log(e)
      wx.showToast({
        title: '系统问题,稍后重试',
        icon: 'none',
        duration: 1500,
        complete: function () {
          wx.navigateBack()
        }
      })
    }
  },
  radioChange: function (e) {
    console.log(e)
    if (e.detail.value == '1') {
      var items = [
        { name: 1, value: '先生', checked: 'checked' },
        { name: 2, value: '女士' },
      ]
      var sex = 1
    } else {
      var items = [
        { name: 1, value: '先生' },
        { name: 2, value: '女士', checked: 'checked' },
      ]
      var sex = 2
    }
    this.setData({
      items: items,
      sex: sex
    })
  },
  switchChange: function (e) {
    console.log(e)
    if (e.detail.value) {
      this.setData({
        setdefault: 1,
      })
    } else {
      this.setData({
        setdefault: 0,
      })
    }
  },
  selAddress: function () {
    var that = this
    wx.showLoading({
      title: '请稍候',
    })
    wx.chooseLocation({
      success: function (res) {
        var locationString = res.latitude + "," + res.longitude;
        console.log(res)
        that.setData({
          selAddres: res.address,
          address: res.name,
          locationString: res.latitude + "," + res.longitude
        })
        app.api.getAddress(locationString)
          .then(res => {
            console.log(res);
            //将选择的省市区id存进数据
            var selPCDA = {};
            selPCDA.P = res.result.address_component.provinceId;
            selPCDA.C = res.result.address_component.cityId;
            selPCDA.D = res.result.address_component.districtId;
            selPCDA.A = res.result.address_component.street_number;

            that.setData({
              selPCDA: selPCDA
            });

          })
      },
      complete: function () {
        wx.hideLoading()
      }
    });
  }
})