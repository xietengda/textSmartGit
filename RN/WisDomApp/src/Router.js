/*
* @Created by liqihui on 2019-05-09.
* @Desc Router
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/
import React from 'react';
import {
    createStackNavigator ,
    createSwitchNavigator,
    createAppContainer,
    createBottomTabNavigator
} from 'react-navigation';

// 发现
import FindScreen from "./containers/FindPages/FindScreen";
import ClassmateScreen from "./containers/ClassmatePages/ClassmateScreen"; //同学圈
import LearnScreen from "./containers/LearnPages/LearnScreen";
import UserScreen from "./containers/UserPages/UserScreen";
import TabBaritem from "./containers/MainController/TabBaritem";
import FastScreen from './containers/FastPlay/FastScreen'
import {CustomNavigationOptions} from "./containers/MainController/NavigationOptions";
import MoreClassifyScreen from "./containers/FindPages/MoreClassifyScreen";
import FreeLearnScreen from "./containers/FindPages/FreeLearnScreen";
import LiveStreamScreen from "./containers/FindPages/LiveStreamScreen";
import SpecialColumnScreen from "./containers/FindPages/SpecialColumnScreen";
import DakaColumnScreen from "./containers/FindPages/DakaColumnScreen";
import CurrentRecomScreen from "./containers/FindPages/CurrentRecomScreen";
import OfflineActiviScreen from "./containers/FindPages/OfflineActiviScreen";
import RecomGoodLesScreen from "./containers/FindPages/RecomGoodLesScreen";
// 详情页
import MemberDetailScreen from "./containers/DetailPages/MemberDetailScreen";
import SpecColuDetailScreen from "./containers/DetailPages/SpecColuDetailScreen";
import BigSpecColuDetailScreen from "./containers/DetailPages/BigSpecColuDetailScreen";
import VideoScreen from "./containers/DetailPages/VideoScreen";
import VoiceScreen from "./containers/DetailPages/VoiceScreen";
import ImageTextScreen from "./containers/DetailPages/ImageTextScreen";
import LiveStreDetailScreen from "./containers/DetailPages/LiveStreDetailScreen";
// 线下活动详情
import OfflineActivityScreen from "./containers/DetailPages/OfflineActivityScreen";

// 同学圈
import MsgDetailsScreen from './containers/ClassmatePages/MsgDetails';//动态详情
import IssueMsgScreen from './containers/ClassmatePages/Classmate/IssueMsg';//发表动态

// 学习
import TrashScreen from "./containers/LearnPages/TrashScreen";

// 我的
// 账户充值
import WalletBalanceScreen from './containers/UserPages/WalletConfigView/WalletBalanceScreen'
// 冻结金额
import FreezeAmountScreen from './containers/UserPages/WalletConfigView/FreezeAmountScreen'
// 我的订单
import MyOrderScreen from './containers/UserPages/OrderConfigView/MyOrderScreen'
// 订单详情
import OrderDetailScreen from './containers/UserPages/OrderConfigView/OrderDetailScreen'
// 推广中心
import PopularizeCenterScreen from './containers/UserPages/PopularizeManager/PopularizeCenterScreen'
// 活动
import ActivityListScreen from './containers/UserPages/ActivityConfigView/ActivityListScreen'
// 付费问答
import QuestionsScreen from './containers/UserPages/QuestionsConfigView/QuestionsScreen'
// 问答详情
import QuestionsDetailScreen from './containers/UserPages/QuestionsConfigView/QuestionsDetailScreen'
// 付费问答--资料
import QuestionsEditScreen from './containers/UserPages/QuestionsConfigView/QuestionsEditScreen'
// 我的客户
import PopularizeTotalClient from './containers/UserPages/PopularizeManager/PopularizeTotalClient'
// 我的下级
import PopularizeMyLower from './containers/UserPages/PopularizeManager/PopularizeMyLower'
// 我的门票
import MyTicketsScreen from './containers/UserPages/OfflineConfigView/MyTicketsScreen'
// 签到结果状态
import SigninResultScreen from './containers/UserPages/OfflineConfigView/SigninResultScreen'
// 通讯录
import AddressBookScreen from './containers/UserPages/AddressBookConfigView/AddressBookScreen'
// 通讯录---搜索
import AddressBookSearchScreen from './containers/UserPages/AddressBookConfigView/AddressBookSearchScreen'
// 优惠券
import MyCouponScreen from './containers/UserPages/MyCouponConfigView/MyCouponScreen'
// 设置
import SettingMessageScreen from './containers/UserPages/SettingConfigView/SettingMessageScreen'
// 赠送
import MyPresentScreen from './containers/UserPages/PresentConfigView/MyPresentScreen'
// 赠送--详情
import MyPresentDetailScreen from './containers/UserPages/PresentConfigView/MyPresentDetailScreen'
// 隐私设置
import SettingPrivacyScreen from './containers/UserPages/SettingConfigView/SettingPrivacyScreen'
// 账号绑定
import AccountBindingScreen from './containers/UserPages/SettingConfigView/AccountBindingScreen'
// 修改密码
import UpdatePasswordScreen from './containers/UserPages/SettingConfigView/UpdatePasswordScreen'
// 绑定手机号
import UpdateBindingPhoneScreen from './containers/UserPages/SettingConfigView/UpdateBindingPhoneScreen'
// 关于我们
import AboutUsScreen from './containers/UserPages/SettingConfigView/AboutUsScreen'
// 联系我们
import RelationUsScreen from './containers/UserPages/SettingConfigView/RelationUsScreen'
// 兴趣偏好
import MyInterestScreen from './containers/UserPages/MyInterestConfigView/MyInterestScreen'
// 帮助
import MyHelpScreen from './containers/UserPages/MyHelpConfigView/MyHelpScreen'
// 个人主页
import UserHomePageScreen from './containers/UserPages/UserHomeConfigView/UserHomePageScreen'
// 编辑资料
import EditMessageScreen from './containers/UserPages/UserHomeConfigView/EditMessageScreen'
// 编辑信息
import EditInputContentScreen from './containers/UserPages/UserHomeConfigView/EditInputContentScreen'
// 打赏榜
import LargessListScreen from './containers/UserPages/UserHomeConfigView/LargessListScreen'
// 我的收益
import MyEarningsScreen from './containers/UserPages/MyEarningsConfigView/MyEarningsScreen'
// 收益详情
import MyEarningsDetailScreen from './containers/UserPages/MyEarningsConfigView/MyEarningsDetailScreen'
// 提现明细
import WithdrawDetailScreen from './containers/UserPages/MyEarningsConfigView/WithdrawDetailScreen'
// 提现金额
import WithdrawAffirmScreen from './containers/UserPages/MyEarningsConfigView/WithdrawAffirmScreen'
// 他的主页
import UserTAHomePageScreen from './containers/UserPages/UserHomeConfigView/UserTAHomePageScreen'
// 别人的通讯录
import AddressTABookScreen from './containers/UserPages/AddressBookConfigView/AddressTABookScreen'
// 别人的问答中心
import QuestionsTAScreen from './containers/UserPages/QuestionsConfigView/QuestionsTAScreen'
// 我的学习数据
import MyStudyInfoScreen from './containers/UserPages/UserScreenView/MyStudyInfoScreen'
// 学分明细
import MyCreditDetailScreen from './containers/UserPages/UserScreenView/MyCreditDetailScreen'
// 学分兑余额
import CreditExchangeBalanceScreen from './containers/UserPages/UserScreenView/CreditExchangeBalanceScreen'
// 消息中心
import MessageCentreScreen from './containers/MessageCentre/MessageCentreScreen'
// 系统通知
import SystemNotificationScreen from './containers/MessageCentre/NotificationConfigView/SystemNotificationScreen'
// 订阅消息
import SubscribeMessageScreen from './containers/MessageCentre/NotificationConfigView/SubscribeMessageScreen'
// 评论消息
import MessageOfCommentScreen from './containers/MessageCentre/NotificationConfigView/MessageOfCommentScreen'
// 点赞消息
import MessageOfPraiseScreen from './containers/MessageCentre/NotificationConfigView/MessageOfPraiseScreen'
// 问答消息
import MessageOfQuestionsScreen from './containers/MessageCentre/NotificationConfigView/MessageOfQuestionsScreen'
// 打赏消息
import MessageOfLargessScreen from './containers/MessageCentre/NotificationConfigView/MessageOfLargessScreen'
// 平台群发
import MessageOfPlatformGroupScreen from './containers/MessageCentre/NotificationConfigView/MessageOfPlatformGroupScreen'
// 店铺群发
import MessageOfStoreGroupScreen from './containers/MessageCentre/NotificationConfigView/MessageOfStoreGroupScreen'
import SearchScreen from "./containers/FindPages/SearchScreen";
import QRScreen from "./containers/UserPages/OfflineConfigView/QRScreen";
// 登录
import LoginScreen from './containers/LoginPages/LoginScreen'
// 手机号登录
import LoginWithPhoneScreen from './containers/LoginPages/LoginWithPhoneScreen'
// 忘记密码
import ForgetPsdScreen from './containers/LoginPages/ForgetPsdScreen'
// 注册
import RegisterScreen from './containers/LoginPages/RegisterScreen'

import InviteCardScreen from "./containers/DetailPages/SubScreen/InviteCardScreen";
import SelDisCouponScreen from "./containers/DetailPages/SubScreen/SelDisCouponScreen";
import ComplaintScreen from "./containers/DetailPages/SubScreen/ComplaintScreen";
import MyComplaintsScreen from "./containers/DetailPages/SubScreen/MyComplaintsScreen";
import VideoPlayerScreen from './containers/UserPages/UserScreenView/VideoPlayerScreen'
import SameDateStudScreen from "./containers/DetailPages/SubScreen/SameDateStudScreen";

import GuideComponent from './containers/MainController/GuideComponent'
import InitStartScreen from "./InitStartScreen";
import BargainScreen from "./containers/MarkAcivitPage/BargainPage/BargainScreen";
import FriendHelpScreen from "./containers/MarkAcivitPage/FriendHelpConfig/FriendHelpScreen";
import BargainCenterScreen from "./containers/MarkAcivitPage/BargainPage/BargainCenterScreen";
import GroupScreen from "./containers/MarkAcivitPage/GroupPage/GroupScreen";
import GroupCenterScreen from "./containers/MarkAcivitPage/GroupPage/GroupCenterScreen";

const tabBarNoSelectIcon = {
    find:require('./assets/tabbar/bar-find-normal.png'),
    classmate:require('./assets/tabbar/bar-contacts-normal.png'),
    fastplay:require('./assets/tabbar/fast_play.png'),
    learn:require('./assets/tabbar/bar-stady-normal.png'),
    my:require('./assets/tabbar/bar-me-normal.png'),
}
const tabBarSelectIcon = {
    find:require('./assets/tabbar/bar-find-press.png'),
    classmate:require('./assets/tabbar/bar-contacts-press.png'),
    fastplay:require('./assets/tabbar/fast_selectplay.png'),
    learn:require('./assets/tabbar/bar-stady-press.png'),
    my:require('./assets/tabbar/bar-me-press.png'),
}


const WorkStack =  createStackNavigator({
    Find:FindScreen,
},{
    // navigationOptions: ({ navigation }) => (CustomNavigationOptions(navigation, 'Find'))
    defaultNavigationOptions: ({ navigation }) => (CustomNavigationOptions(navigation, 'Find'))
});
const MessageStack = createStackNavigator({
    Classmate:ClassmateScreen,
},{
    // navigationOptions: ({ navigation }) => (CustomNavigationOptions(navigation, 'Classmate'))
    defaultNavigationOptions: ({ navigation }) => (CustomNavigationOptions(navigation, 'Classmate'))
});
const ApplyStack =  createStackNavigator({
    Learn:LearnScreen,
},{
    // navigationOptions: ({ navigation }) => (CustomNavigationOptions(navigation, 'Learn'))
    defaultNavigationOptions: ({ navigation }) => (CustomNavigationOptions(navigation, 'Learn'))
});
// 个人中心的导航堆栈
const UserStack = createStackNavigator({
    User:UserScreen,
},{
    // navigationOptions: ({ navigation }) => (CustomNavigationOptions(navigation, 'User'))
    defaultNavigationOptions: ({ navigation }) => (CustomNavigationOptions(navigation, 'User'))
});

// 底部TabBar控制器
const MyTab = createBottomTabNavigator(
    {
        Find:{
            screen: WorkStack,
            navigationOptions:{
                tabBarLabel:'发现',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBaritem
                        normalImage={tabBarNoSelectIcon.find}
                        selectedImage={tabBarSelectIcon.find}
                        focused={focused}
                        isClassmate={false}
                        tintColor={tintColor}
                    />
                )
            },
        },
        MessageInfo:{
            screen: MessageStack,
            navigationOptions:{
                tabBarLabel:'同学圈',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBaritem
                        normalImage={tabBarNoSelectIcon.classmate}
                        selectedImage={tabBarSelectIcon.classmate}
                        focused={focused}
                        isClassmate={false}
                        tintColor={tintColor}
                    />
                )
            }},
        FastScreen:{
            screen: FastScreen,
            navigationOptions:{
                tabBarLabel:' ',
                // tabBarLabelStyle
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBaritem
                        normalImage={tabBarNoSelectIcon.fastplay}
                        selectedImage={tabBarSelectIcon.fastplay}
                        isClassmate={true}
                        focused={focused}
                        tintColor={tintColor}
                    />
                )
            }},
        Learn:{
            screen:ApplyStack,
            navigationOptions:{
                tabBarLabel:'学习',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBaritem
                        normalImage={tabBarNoSelectIcon.learn}
                        selectedImage={tabBarSelectIcon.learn}
                        isClassmate={false}
                        focused={focused}
                        tintColor={tintColor}
                    />
                )
            }},
        UserCenter:{
            screen:UserStack,
            navigationOptions:{
                tabBarLabel:'我的',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBaritem
                        normalImage={tabBarNoSelectIcon.my}
                        selectedImage={tabBarSelectIcon.my}
                        isClassmate={false}
                        focused={focused}
                        tintColor={tintColor}
                    />
                )
            }
        }
    },
    {
        initialRouteName:'Find', //默认打开 Find
        animationEnabled: false, // 切换页面时是否有动画效果
        tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
        swipeEnabled: false, // 是否可以左右滑动切换tab
        backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
        lazy:true,
        tabBarOptions: {
            activeTintColor:globalStyles.COLOR.primary , // 文字和图片选中颜色
            inactiveTintColor: '#999', // 文字和图片未选中颜色
            showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
            indicatorStyle: {
                height: 0,  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
            },
            style: {
                borderTopColor:'#ebebeb',
                backgroundColor: '#fff', // TabBar 背景色
                //height: 44
            },
            labelStyle: {
                fontSize: globalStyles.exchange(20), // 文字大小,
                marginBottom:globalStyles.exchange(7),
            },
        },
    }
);
const MainRouters = createStackNavigator({
    MyApp: {
        screen: MyTab,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    // 首页界面跳转
    More:MoreClassifyScreen,
    FreeLearnScreen,
    LearnScreen,
    LiveStreamScreen:LiveStreamScreen,
    SpecialColumnScreen:SpecialColumnScreen,
    DakaColumnScreen:DakaColumnScreen,
    CurrentRecomScreen:CurrentRecomScreen,
    OfflineActiviScreen:OfflineActiviScreen,
    RecomGoodLesScreen:RecomGoodLesScreen,
    TrashScreen:TrashScreen,
    MemberDetailScreen,
    SpecColuDetailScreen,
    BigSpecColuDetailScreen,
    VideoScreen,
    VoiceScreen,
    ImageTextScreen,
    LiveStreDetailScreen,
    SearchScreen, // 搜索
    OfflineActivityScreen,// 线下活动详情
    InviteCardScreen,//邀请卡
    SelDisCouponScreen,//详情优惠券
    ComplaintScreen,//分享投诉
    MyComplaintsScreen,//我的投诉
    SameDateStudScreen,//同期同学(线下活动报名进入)
    // 同学圈界面跳转
    MsgDetails:MsgDetailsScreen,
    IssueMsg:IssueMsgScreen,
    // 钱包---账户充值
    WalletBalance: WalletBalanceScreen,
    // 冻结金额
    FreezeAmountScreen: FreezeAmountScreen,
    // 我的订单
    MyOrderScreen: MyOrderScreen,
    // 订单详情
    OrderDetailScreen: OrderDetailScreen,
    // 推广中心
    PopularizeCenterScreen: PopularizeCenterScreen,
    // 活动
    ActivityListScreen: ActivityListScreen,
    // 付费问答
    QuestionsScreen: QuestionsScreen,
    // 问答详情
    QuestionsDetailScreen: QuestionsDetailScreen,
    // 付费问答-资料
    QuestionsEditScreen: QuestionsEditScreen,
    // 我的客户
    PopularizeTotalClient: PopularizeTotalClient,
    // 我的下级
    PopularizeMyLower: PopularizeMyLower,
    // 我的门票
    MyTicketsScreen: MyTicketsScreen,
    // 签到结果状态
    SigninResultScreen: SigninResultScreen,
    // 通讯录
    AddressBookScreen: AddressBookScreen,
    // 通讯录  搜索
    AddressBookSearchScreen: AddressBookSearchScreen,
    // 优惠券
    MyCouponScreen: MyCouponScreen,
    // 设置
    SettingMessageScreen: SettingMessageScreen,
    // 赠送
    MyPresentScreen: MyPresentScreen,
    // 赠送-详情
    MyPresentDetailScreen: MyPresentDetailScreen,
    // 隐私设置
    SettingPrivacyScreen: SettingPrivacyScreen,
    // 账号绑定
    AccountBindingScreen: AccountBindingScreen,
    // 修改密码
    UpdatePasswordScreen: UpdatePasswordScreen,
    // 绑定手机号
    UpdateBindingPhoneScreen: UpdateBindingPhoneScreen,
    // 关于我们
    AboutUsScreen: AboutUsScreen,
    // 联系我们
    RelationUsScreen: RelationUsScreen,
    // 兴趣偏好
    MyInterestScreen: MyInterestScreen,
    // 帮助
    MyHelpScreen: MyHelpScreen,
    // 个人主页
    UserHomePageScreen: UserHomePageScreen,
    // 编辑资料
    EditMessageScreen: EditMessageScreen,
    // 编辑信息
    EditInputContentScreen: EditInputContentScreen,
    // 打赏榜
    LargessListScreen : LargessListScreen,
    // 我的收益
    MyEarningsScreen: MyEarningsScreen,
    // 收益详情
    MyEarningsDetailScreen: MyEarningsDetailScreen,
    // 提现明细
    WithdrawDetailScreen: WithdrawDetailScreen,
    // 提现金额
    WithdrawAffirmScreen: WithdrawAffirmScreen,
    // 别人的主页
    UserTAHomePageScreen: UserTAHomePageScreen,
    // 别人的通讯录
    AddressTABookScreen: AddressTABookScreen,
    // 别人的问答中心
    QuestionsTAScreen: QuestionsTAScreen,
    // 我的学习数据
    MyStudyInfoScreen: MyStudyInfoScreen,
    // 学分明细
    MyCreditDetailScreen: MyCreditDetailScreen,
    // 学分兑换余额
    CreditExchangeBalanceScreen: CreditExchangeBalanceScreen,
    // 消息中心
    MessageCentreScreen: MessageCentreScreen,
    // 系统通知
    SystemNotificationScreen: SystemNotificationScreen,
    // 订阅消息
    SubscribeMessageScreen: SubscribeMessageScreen,
    // 评论消息
    MessageOfCommentScreen: MessageOfCommentScreen,
    // 点赞消息
    MessageOfPraiseScreen: MessageOfPraiseScreen,
    // 问答消息
    MessageOfQuestionsScreen: MessageOfQuestionsScreen,
    // 打赏消息
    MessageOfLargessScreen: MessageOfLargessScreen,
    // 平台群发
    MessageOfPlatformGroupScreen: MessageOfPlatformGroupScreen,
    // 店铺群发
    MessageOfStoreGroupScreen: MessageOfStoreGroupScreen,
    QRScreen,
    LoginScreen,
    // 手机号登录
    LoginWithPhoneScreen,
    // 忘记密码
    ForgetPsdScreen,
    // 注册
    RegisterScreen,
    VideoPlayerScreen,

    //营销活动
    BargainScreen,//砍价详情
    FriendHelpScreen,//好友助理
    BargainCenterScreen,//砍价中心
    GroupScreen,//拼团
    GroupCenterScreen,//拼团中心
},{
    defaultNavigationOptions: ({ navigation }) => (CustomNavigationOptions(navigation, 'MyApp')),
    initialRouteName: 'MyApp',
    // initialRouteName: 'LoginScreen',
});
const swichNav = createSwitchNavigator({
    InitStartScreen,
    GuideComponent,
    MyTab:MainRouters,
},{
    initialRouteName:'InitStartScreen',
})
export default createAppContainer(swichNav);
