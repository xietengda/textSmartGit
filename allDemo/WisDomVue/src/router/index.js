import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

//导入cookies
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import util from '../util/util'


var vueRouter =new Router({
  // mode: 'history',
  routes: [
    // 登录 
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../pages/login/login.vue'], resolve),
      meta: {
        title: ''
      },
    },
    // 登录失败 
    {
      path: '/banLogin',
      name: 'banLogin',
      component: resolve => require(['../pages/banLogin/banLogin.vue'], resolve),
      meta: {
        title: '禁止访问'
      },
    },
    // 店铺主页 √
    {
      path: '/',
      name: 'homePage',
      component: resolve => require(['../pages/homePage/homePage.vue'], resolve),
      meta: {
        title: ''
      },
    },
    // 课程列表页面（会员，专栏，线下活动，直播）√
    {
      path: '/courseList',
      name: 'courseList',
      component: resolve => require(['../pages/courseList/courseList.vue'], resolve),
      meta: {
        title: '课程名称'
      },
    },
    // 教师简介 √
    {
      path: '/teacher',
      name: 'teacher',
      component: resolve => require(['../pages/teacher/teacher.vue'], resolve),
      meta: {
        title: '教师简介'
      },
    },
    // 打赏榜 √
    {
      path: '/rewardList',
      name: 'rewardList',
      component: resolve => require(['../pages/rewardList/rewardList.vue'], resolve),
      meta: {
        title: '打赏榜'
      },
    },
    // 动态 √
    {
      path: '/dynamic',
      name: 'dynamic',
      component: resolve => require(['../pages/dynamic/dynamic.vue'], resolve),
      meta: {
        title: '动态'
      },
    },
    // 动态详情 √
    {
      path: '/dynamicDetail',
      name: 'dynamicDetail',
      component: resolve => require(['../pages/dynamicDetail/dynamicDetail.vue'], resolve),
      meta: {
        title: '动态详情'
      },
    },
    // 个人中心 √
    {
      path: '/person',
      name: 'person',
      component: resolve => require(['../pages/person/person.vue'], resolve),
      meta: {
        title: '个人中心'
      },
    },
    // 我的收益 √
    {
      path: '/myEarnings',
      name: 'myEarnings',
      component: resolve => require(['../pages/myEarnings/myEarnings.vue'], resolve),
      meta: {
        title: '个人收益'
      },
    },
    // 我的订阅 √
    {
      path: '/mySubscibe',
      name: 'mySubscibe',
      component: resolve => require(['../pages/mySubscibe/mySubscibe.vue'], resolve),
      meta: {
        title: '我的订阅'
      },
    },
    // 优惠码 √
    {
      path: '/promotionCode',
      name: 'promotionCode',
      component: resolve => require(['../pages/promotionCode/promotionCode.vue'], resolve),
      meta: {
        title: '优惠码'
      },
    },
    // 优惠课程 √
    {
      path: '/discountsCourse',
      name: 'discountsCourse',
      component: resolve => require(['../pages/discountsCourse/discountsCourse.vue'], resolve),
      meta: {
        title: '优惠课程'
      },
    }, 
    // 线下活动 √
    {
      path: '/offLineAtt',
      name: 'offLineAtt',
      component: resolve => require(['../pages/offLineAtt/offLineAtt.vue'], resolve),
      meta: {
        title: '线下活动'
      },
    },
    // 我的门票 √
    {
      path: '/myTickets',
      name: 'myTickets',
      component: resolve => require(['../pages/myTickets/myTickets.vue'], resolve),
      meta: {
        title: '我的门票'
      },
    },
    // 我的赠送 √
    {
      path: '/myGrant',
      name: 'myGrant',
      component: resolve => require(['../pages/myGrant/myGrant.vue'], resolve),
      meta: {
        title: '我的赠送'
      },
    },
    // 我的赠送详情  √
    {
      path: '/myGrantDetail',
      name: 'myGrantDetail',
      component: resolve => require(['../pages/myGrantDetail/myGrantDetail.vue'], resolve),
      meta: {
        title: '我的赠送'
      },
    },
    // 我的优惠券  √
    {
      path: '/myDiscount',
      name: 'myDiscount',
      component: resolve => require(['../pages/myDiscount/myDiscount.vue'], resolve),
      meta: {
        title: '我的优惠券'
      },
    },
    // 公告  √
    {
      path: '/notice',
      name: 'notice',
      component: resolve => require(['../pages/notice/notice.vue'], resolve),
      meta: {
        title: '我的优惠券'
      },
    },
    // 推广中心  √
    { 
      path: '/popularize',
      name: 'popularize',
      component: resolve => require(['../pages/popularize/popularize.vue'], resolve),
      meta: {
        title: '推广中心'
      },
    },
    // 我的客户  √
    { 
      path: '/myClient',
      name: 'myClient',
      component: resolve => require(['../pages/myClient/myClient.vue'], resolve),
      meta: {
        title: '我的客户'
      },
    },
    // 我的下级  √
    {
      path: '/myStaff',
      name: 'myStaff',
      component: resolve => require(['../pages/myStaff/myStaff.vue'], resolve),
      meta: {
        title: '我的下级'
      },
    },
    // 个人问答区  √
    {
      path: '/persQuertion',
      name: 'persQuertion',
      component: resolve => require(['../pages/persQuertion/persQuertion.vue'], resolve),
      meta: {
        title: '付费问答'
      },
    },
    // 机构问答区  √
    {
      path: '/compQuertion',
      name: 'compQuertion',
      component: resolve => require(['../pages/compQuertion/compQuertion.vue'], resolve),
      meta: {
        title: '付费问答'
      },
    },
    // 问答详情  √
    {
      path: '/questionDetail',
      name: 'questionDetail',
      component: resolve => require(['../pages/questionDetail/questionDetail.vue'], resolve),
      meta: {
        title: '问答详情'
      },
    },
    // 店内搜索  √
    {
      path: '/storeSearch',
      name: 'storeSearch',
      component: resolve => require(['../pages/storeSearch/storeSearch.vue'], resolve),
      meta: {
        title: '店内搜索'
      },
    },
    // 店内搜索列表  √
    {
      path: '/storeSeaResult',
      name: 'storeSeaResult',
      component: resolve => require(['../pages/storeSeaResult/storeSeaResult.vue'], resolve),
      meta: {
        title: '店内搜索'
      },
    },
    // 主讲老师  √
    {
      path: '/lecturer',
      name: 'lecturer',
      component: resolve => require(['../pages/lecturer/lecturer.vue'], resolve),
      meta: {
        title: '主讲老师'
      },
    },
    // 领取优惠码
    {
      path: '/getDiscountCode',
      name: 'getDiscountCode',
      component: resolve => require(['../pages/getDiscountCode/getDiscountCode.vue'], resolve),
      meta: {
        title: '领取优惠码'
      },
    },
    // 投诉  √
    {
      path: '/complaint',
      name: 'complaint',
      component: resolve => require(['../pages/complaint/complaint.vue'],resolve),
      meta: {
        title: '投诉'
      },
    },
    // 我的投诉  √
    {
      path: '/myComplaint',
      name: 'myComplaint',
      component: resolve => require(['../pages/myComplaint/myComplaint.vue'],resolve),
      meta: {
        title: '我的投诉'
      },
    },
    // 个人主页  (他的)  √
    {
      path: '/persHome',
      name: 'persHome',
      component: resolve => require(['../pages/persHome/persHome.vue'],resolve),
      meta: {
        title: '个人主页'
      },
    },
    // TA的关注  √
    {
      path: '/hisAtten',
      name: 'hisAtten',
      component: resolve => require(['../pages/hisAtten/hisAtten.vue'],resolve),
      meta: {
        title: 'TA的关注'
      },
    },
    // 邀请好友
    {
      path: '/inviteHeeler',
      name: 'inviteHeeler',
      component: resolve => require(['../pages/inviteHeeler/inviteHeeler.vue'],resolve),
      meta: {
        title: '邀请成为下级推广员'
      },
    },
    // 邀请讲师
    {
      path: '/inviteLecturer',
      name: 'inviteLecturer',
      component: resolve => require(['../pages/inviteLecturer/inviteLecturer.vue'],resolve),
      meta: {
        title: '邀请答主'
      },
    },
    // 直播邀请
    {
      path: '/inviteLive',
      name: 'inviteLive',
      component: resolve => require(['../pages/inviteLive/inviteLive.vue'],resolve),
      meta: {
        title: '直播邀请函'
      },
    },
    // 领取课程
    {
      path: '/getCourse',
      name: 'getCourse',
      component: resolve => require(['../pages/getCourse/getCourse.vue'],resolve),
      meta: {
        title: '领取课程'
      },
    },
    // 领取优惠券
    {
      path: '/getDiscount',
      name: 'getDiscount',
      component: resolve => require(['../pages/getDiscount/getDiscount.vue'],resolve),
      meta: {
        title: '领取优惠券'
      },
    },
    // 课程详情页   会员，专栏，视频，图文，音频  √
    {
      path: '/courseDetail',
      name: 'courseDetail',
      component: resolve => require(['../pages/courseDetail/courseDetail.vue'],resolve),
      meta: {
        title: '课程详情页'
      },
    },
    // 课程详情页   线下活动 直播  √
    {
      path: '/courseOther',
      name: 'courseOther',
      component: resolve => require(['../pages/courseOther/courseOther.vue'],resolve),
      meta: {
        title: '课程详情页'
      },
    },
    // 邀请卡  √
    {
      path: '/inviteCard',
      name: 'inviteCard',
      component: resolve => require(['../pages/inviteCard/inviteCard.vue'],resolve),
      meta: {
        title: '邀请卡'
      },
    },
    //邀请大人榜  √
    {
      path: '/inviteAdult',
      name: 'inviteAdult',
      component: resolve => require(['../pages/inviteAdult/inviteAdult.vue'],resolve),
      meta: {
        title: '邀请达人榜'
      },
    },
    //用户直播间  √
    {
      path: '/liveUserRoom',
      name: 'liveUserRoom',
      component: resolve => require(['../pages/liveUserRoom/liveUserRoom.vue'],resolve),
      meta: {
        title: '直播间'
      },
    },
    //老师直播间
    {
      path: '/liveTeacherRoom',
      name: 'liveTeacherRoom',
      component: resolve => require(['../pages/liveTeacherRoom/liveTeacherRoom.vue'],resolve),
      meta: {
        title: '直播间'
      },
    },
    //拼团中心  √
    {
      path: '/groupList',
      name: 'groupList',
      component: resolve => require(['../pages/groupList/groupList.vue'],resolve),
      meta: {
        title: '拼团中心'
      },
    },
    //拼团详情  √
    {
      path: '/groupDetail',
      name: 'groupDetail',
      component: resolve => require(['../pages/groupDetail/groupDetail.vue'],resolve),
      meta: {
        title: '拼团详情'
      },
    },
    //自己开团  √
    {
      path: '/groupOpen',
      name: 'groupOpen',
      component: resolve => require(['../pages/groupOpen/groupOpen.vue'],resolve),
      meta: {
        title: '拼团详情'
      },
    },
    //好友助力  √
    {
      path: '/friendsHelp',
      name: 'friendsHelp',
      component: resolve => require(['../pages/friendsHelp/friendsHelp.vue'],resolve),
      meta: {
        title: '好友助力'
      },
    },
    //砍价中心  √
    {
      path: '/bargainList',
      name: 'bargainList',
      component: resolve => require(['../pages/bargainList/bargainList.vue'],resolve),
      meta: {
        title: '砍价中心'
      },
    },
    //砍价详情  √
    {
      path: '/bargainDetail',
      name: 'bargainDetail',
      component: resolve => require(['../pages/bargainDetail/bargainDetail.vue'],resolve),
      meta: {
        title: '砍价详情'
      },
    },
    //账户充值  √
    {
      path: '/recharge',
      name: 'recharge',
      component: resolve => require(['../pages/recharge/recharge.vue'],resolve),
      meta: {
        title: '账户充值'
      },
    },
    //选择优惠券  √
    {
      path: '/selDiscount',
      name: 'selDiscount',
      component: resolve => require(['../pages/selDiscount/selDiscount.vue'],resolve),
      meta: {
        title: '选择优惠券'
      },
    },
    //签到
    {
      path: '/signIn',
      name: 'signIn',
      component: resolve => require(['../pages/signIn/signIn.vue'],resolve),
      meta: {
        title: '签到'
      },
    },
  ]
});


vueRouter.beforeEach((to, from, next) => {

  //微信登录code
  let code;

  //进入路由名称 
  let pageUrl;
  //参数携带数组
  let paraArr;

  // // 判断是否携带参数url
  // if(JSON.stringify(to.query) != "{}"){
  //   //进入路由名称
  //   pageUrl = to.fullPath.split('?')[0] || to.fullPath;
  //   //参数携带数组
  //   paraArr = to.query;

    
  //   for(let x in paraArr){
  //     //存入sessionStorage
  //     sessionStorage.setItem(x,paraArr[x]);
  //   }
  // }
  
  // code = util.util.prototype.getQueryString('code');

  
  // // 如果code不为空，就是已经登陆
  // if(code != null){
  // 	//存储登录状态   （1小时过期）
  //  	VueCookies.set('isLogin',true,60*60*1);
  // }
  
  // //  第一次进入项目
  // let isLogin = VueCookies.get('isLogin');
  
  // //未登录，并且进入地址不是登录页
  // if (!isLogin && to.path != "/login") {

  //   if(pageUrl != undefined){
  //     //这里存入的是已经去除了参数的地址，为了让微信环境配置签名可以通过
  //     VueCookies.set("beforeLoginUrl", pageUrl,60*60*1); // 保存用户进入的url
  //   }else{
  //     //这里存入的是已经去除了参数的地址，为了让微信环境配置签名可以通过
  //     VueCookies.set("beforeLoginUrl", to.path,60*60*1); // 保存用户进入的url
  //   }
  //   next("/login");
  //   return false;
	   
  // } 
 	// //已登录，并且有code返回 
  // else if(isLogin && code != null && to.path == "/") {
  // 	next("/login");
	 //  return false;
  // }
  // //已经登录
  // else{
  //   next(pageUrl);
	 //  return false;
  // }
  next();
 });



export default vueRouter