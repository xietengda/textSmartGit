const app = getApp();
Page({

  data: {
    commentList: [],
    title: '题目',
    author: '作者',
    addTime: '2010-12-06',
    content: '',
    clickNum: 0,
    praiseNum: 0,
    commentF: true,
    articleId: 0,
    comCont: '',
    touchMove: false,
    isIphoneX: getApp().globalData.isIphoneX
  },

  onLoad: function (options) {
    try {
      var userInfo = wx.getStorageSync('userInfo')
      if (!userInfo.userid) {
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
    } catch (e) {
      console.log(e)
    }

    this.getArticleDefault(options.aId);
    this.comment_list(options.aId);
    this.setData({
      articleId: options.aId
    });
  },
  clickComment: function () {
    var check = true;

    if (this.data.commentF) {
      check = false;
    }

    this.setData({
      commentF: check,
      touchMove: true
    });
  },
  exitCom: function () {
    this.setData({
      commentF: true,
      touchMove: false
    });
  },
  //获取文章详情
  getArticleDefault: function (pOne) {
    let _this = this;
    app.api.getArticleDefault(pOne)
      .then(res => {
        var content = res.data.content.replace(/\<img/gi, '<img class="rich_img"')
        console.log(content);
        _this.setData({
          title: res.data.title,
          author: res.data.author,
          addTime: res.data.add_time,
          content: content,
          clickNum: res.data.click,
          praiseNum: res.data.praise_num
        })
      })
  },
  //点赞
  likeFun: function () {
    var articleId = this.data.articleId;
    var userInfo = wx.getStorageSync('userInfo')
    app.api.doArticlePraise(userInfo.userid, articleId)
      .then(res => {
        console.log(res)
        var icon = 'success'
        if (res.code == 500) {
          icon = 'none'
        }
        wx.showToast({
          title: res.message,
          icon: icon,
          duration: 2000
        })
        this.setData({
          praiseNum: res.data.praise_num
        })
      })
  },
  //获取评论列表
  comment_list: function (article_id) {
    app.api.comment_list(article_id)
      .then(res => {
        console.log(res.data);
        this.setData({
          commentList: res.data
        })
      })
  },
  //提交评论
  comment: function () {
    var articleId = this.data.articleId;
    var openId = wx.getStorageSync("openid");
    var comCont = this.data.comCont;
    console.log(articleId + '-' + openId + '-' + comCont);

    app.api.comment(articleId, openId, comCont)
      .then(res => {
        console.log(res);
        wx.showToast({
          title: '评论成功!',
          icon: 'success',
          duration: 2000
        })

        this.comment_list(articleId);

        this.setData({
          commentF: true,
          comCont: '',
          touchMove: false
        });
      })
  },
  commentCont: function (e) {
    this.setData({
      comCont: e.detail.value
    });
  }
})