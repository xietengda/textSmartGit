/*
* @Created by liqihui on 2019-04-19.
* @Desc ImgIcon
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

// 公共图标
const back = require('../assets/base/tabbar-back-white.png');//箭头向左,返回图标
const back_black = require('../assets/base/tabbar-back-black.png');//箭头向左,返回图标
const huiyuan = require('../assets/base/huiyuan.png');//会员💎图标
const arrows_right = require('../assets/base/spread-right.png');//箭头向右
const down = require('../assets/base/spread-down.png');//箭头向下
const navIcon = require('../assets/base/mycustomer-background.png');//navbar背景
const spread_right = require('../assets/base/spread-right.png');//右边→

//优惠券
const coupon = require('../assets/store/personal_center/coupon-background.png');//优惠券背景
const cancel_discount = require('../assets/store/cencel.png')//优惠券取消弹框
const coupon_orange = require('../assets/user/coupon/coupon-background-orange.png')//优惠券取消弹框

//邀请卡
const bg_invitation = require('../assets/coursedetails/Invitation-backgroundbig.png');//邀请卡背景
//详情页
const earn_yongjin = require('../assets/coursedetails/video/window/earn.png');//赚佣金icon
// 支付弹出框
const balance_icon = require('../assets/store/price.png');//余额
const WeChat_icon = require('../assets/user/wallet/WeChat.png');//微信
const Alipay_icon = require('../assets/user/wallet/Alipay.png');//支付宝
const price_add = require('../assets/base/pay/plus.png');//金额加➕
const price_reduce = require('../assets/base/pay/reduce.png');//金额减－
const next_arrows = require('../assets/base/pay/coupon-more.png');//跳转下一页

//投诉
const record = require('../assets/base/complain/record.png');//记录
const append = require('../assets/base/complain/append.png');//记录

//选择or未选择
const select_icon = require('../assets/user/notification_Center/selected.png');//选择🔘
const noselect_icon = require('../assets/user/notification_Center/normal.png');//未选择

const default_header_icon = require('../assets/base/defaulthead.png');//默认头像

//发现搜索框
const classify_black = require('../assets/find/home/home-searchbar-classify-black.png');//分类
const searchbar_History = require('../assets/find/home/home-searchbar-History-black.png');//分类
const searchbar_information = require('../assets/find/home/home-searchbar-information-balck.png');//分类
const search_gary = require('../assets/find/home/home-searchbar-search-gary.png');//搜索灰色
const searchImg = require('../assets/find/home/searchbar/searchbar-search.png');//搜索放大镜🔍白色

//首页搜索排序按钮
const black_down = require('../assets/find/secondlevel/fenlei/black_arrow_down.png');
const black_up = require('../assets/find/secondlevel/fenlei/black_arrow_up.png');
const blue_down = require('../assets/find/secondlevel/fenlei/blue_arrow_down.png');
const blue_up = require('../assets/find/secondlevel/fenlei/blue_arrow_up.png');

//免费学习录音
const learn_press = require('../assets/find/home/modular/freelearning-press.png');//录音选择状态
const learn_normal = require('../assets/find/home/modular/freelearning-normal.png');//录音没选择状态
const learn_play = require('../assets/base/learn_play.gif');

//学习
const delete_icon = require('../assets/study/secondlevel/delete.png');//长按删除按钮
const deleteImg = require('../assets/study/home/study-home-recovery.png');//进入回收站icon
const restore = require('../assets/study/secondlevel/restore.png');//还原

//营销活动
// const
const zhuli = require('../assets/coursedetails/activity/zhuli.png');//助力成功
const kanjia = require('../assets/coursedetails/activity/kanjia.png');//砍价成功
const bangkan = require('../assets/coursedetails/activity/bangkan.png');//帮砍成功
const pt_fail = require('../assets/coursedetails/activity/fail.png');//拼团失败
const pt_success = require('../assets/coursedetails/activity/correct.png');//拼团成功
const originator = require('../assets/coursedetails/activity/originator-label.png');//拼团团长
export {
    back,
    back_black,
    huiyuan,
    arrows_right,
    down,
    coupon,
    navIcon,
    cancel_discount,
    coupon_orange,
    earn_yongjin,
    bg_invitation,
    spread_right,

    //支付
    balance_icon,
    WeChat_icon,
    Alipay_icon,
    select_icon,
    noselect_icon,
    price_add,
    price_reduce,
    next_arrows,

    //投诉
    record,
    append,
    default_header_icon,

    //发现搜索框
    classify_black,
    searchbar_History,
    searchbar_information,
    search_gary,
    searchImg,
    black_down,
    black_up,
    blue_down,
    blue_up,

    learn_press,
    learn_normal,
    learn_play,

    //学习
    deleteImg,
    delete_icon,
    restore,

    //营销活动
    zhuli,
    kanjia,
    bangkan,
    pt_fail,
    pt_success,
    originator,
}
