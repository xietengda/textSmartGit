
Page({

  data: {
    signBtn:false,
    signList:[
      { status: '已签到', date: '4.18', intNum: '' },
      { status: '已签到', date: '4.19', intNum: '' },
      { status: '未签到', date: '4.20', intNum: '' },
      { status: '已签到', date: '4.21', intNum: '' },
      { status: '待签到', date: '4.22', intNum: '10' },
      { status: '待签到', date: '4.23', intNum: '' },
      { status: '待签到', date: '4.24', intNum: '' },
    ],
    sco_list: [1, 1, 1]
  },
  onLoad: function (options) {
  
  },
  signBtnFun:function(){
    var signSta = this.data.signBtn;
    var signList = this.data.signList;
    var _this = this;

    if(signSta != true){
      signSta = true;

      for (var x in signList) {
        if (signList[x].intNum != "") {
          signList[x].status = "已签到";
          signList[x].intNum = "";
        }
      }

      wx.showToast({
        title: '签到成功',
        icon: 'success',
        duration: 1000
      })

      _this.setData({
        signBtn: signSta,
        signList: signList
      });
    }

    

  }

})