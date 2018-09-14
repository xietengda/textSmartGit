
Page({

  data: {
    commentList:[1,1,1],
    commentF:true,
  },

  onLoad: function (options) {
  
  },
  clickComment:function(){
    var check = true;

    if (this.data.commentF){
      check = false;
    }

    this.setData({
      commentF: check
    });
  },
  exitCom:function(){
    this.setData({
      commentF: true
    });
  }
})