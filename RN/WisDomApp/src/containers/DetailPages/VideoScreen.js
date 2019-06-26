/*
* @Created by liqihui on 2019-04-12.
* @Desc VideoScreen
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {PureComponent} from 'react'
import {
    StyleSheet,
    View,
    FlatList, DeviceEventEmitter, ImageBackground, TouchableOpacity, Image, Text
} from 'react-native'
import model from "./model";
import BaseDetailScreen from "./BaseDetailScreen";
import DetailBottomView from "./DetailView/DetailBottomView";
import ContentHeadComp from "./components/ContentHeadComp";
import LearnNoteQuestComp from "./components/LearnNoteQuestComp";
import PopListView from "./DetailView/PopListView";
import PopInputView from "./DetailView/PopInputView";
import PopPayView from "./DetailView/PopPayView";
import PopShareView from "../../components/PopShareView";
import Toast from 'react-native-root-toast';
import Orientation from "react-native-orientation";
import VideoPlayerView from "../../components/VideoPlayerView";
import PopupWindowOfGift from "../UserPages/components/PopupWindowOfGift";
import RewardReminderPopup from "../UserPages/UserHomeConfigView/RewardReminderPopup";
import Size from "../../config/Size";
import ReminderWarnComp from "./components/ReminderWarnComp";
import CourseNameComp from "./components/CourseNameComp";
import HeadIntroComp from "./components/HeadIntroComp";
import BelongToColumnComp from "./components/BelongToColumnComp";
import RecomCourseView from "./DetailView/RecomCourseView";
import MainLecturerComp from "./components/MainLecturerComp";

export default class VideoScreen extends BaseDetailScreen {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            keyBoardHeight:0,
            showPay:false,
            showShare:false,
            listData:[{
                avatar:'',
                title:'小白',
                nick:'产品经理',
                desc:'面试官问题：还没有托管水电费老师的开发类似恶势力的积分；爱唯欧积分拉到看塑料袋解放路圣诞节费加适量的房间里时代峻峰IE熟练度附近',
                time:'2019-07-03 12:30',
                clickzan: 326,
            },{
                avatar:'',
                title:'小白',
                nick:'产品经理',
                desc:'面试官问题：还没有托管水电费老师的开发类似恶势力的积分；爱唯欧积分拉到看塑料袋解放路圣诞节费加适量的房间里时代峻峰IE熟练度附近',
                time:'2019-07-03 12:30',
                clickzan: 330,
            },{
                avatar:'',
                title:'小白',
                nick:'产品经理',
                desc:'面试官问题：还没有托管水电费老师的开发类似恶势力的积分；爱唯欧积分拉到看塑料袋解放路圣诞节费加适量的房间里时代峻峰IE熟练度附近',
                time:'2019-07-03 12:30',
                clickzan: 126,
            },{
                avatar:'',
                title:'小白',
                nick:'产品经理',
                desc:'面试官问题：还没有托管水电费老师的开发类似恶势力的积分；爱唯欧积分拉到看塑料袋解放路圣诞节费加适量的房间里时代峻峰IE熟练度附近',
                time:'2019-07-03 12:30',
                clickzan: 326,
            }],

        };
    }

    componentWillMount() {
        this.keyboard()
    }

    componentDidMount() {
        model.isSigleType = true;
        this.props.navigation.setParams({
            title:'视频课程',
            opacity:0,
            isShowAbs: false,
        });
        this.listener = DeviceEventEmitter.addListener('popPayWindow',(item,index)=>{
            switch (index) {
                case 0:
                    this.props.navigation.push('UserHomePageScreen');
                    break;
                case 1:
                    this.showGiftsView();
                    break;
                case 2:
                    Toast.show('转载成功！');
                    break;
            }
        })
    }
    componentWillUnmount(){
        //移除监听
        if (this.listener) {
            this.listener.remove();
        }
    }
    _renderItemLearnNote = ({item,index})=>{
        return(
            <View>
                {index == 0 && <ContentHeadComp title={'学习笔记'}/>}
                <LearnNoteQuestComp item={item}/>
            </View>
        )
    }
    renderPlay = () => {
        return(
            <VideoPlayerView changeView={(status)=>{
                if (status) {
                    // 横屏
                    // DeviceOrientationUtils.orientation('right');
                    Orientation.lockToLandscapeRight();
                } else {
                    // 竖屏
                    Orientation.lockToPortrait();
                }
            }}
                             attentionPop={()=>{

                             }}
                             courseListPop={()=>{
                                 this.popList.isShowModal && this.popList.isShowModal();
                             }}
                             sharePop={()=>{
                                 this.setState({showShare:true})
                             }}
                             backClick={()=>{
                                 this.props.navigation.goBack();
                             }}/>
        )
    }
    headerSingle = () => {
        return(
            <View style={{flex:1}} onLayout={(event)=>{
                const layout = event.nativeEvent.layout.height;
                model.scrollNoteH = layout+Size.kTopHeight;
            }}>
                {/*提示警告展示*/}
                <ReminderWarnComp isSigleType={true} content={'您有￥100优惠券待领取'} desc={'立即领取'}/>
                {/*头部课程名称展示*/}
                <CourseNameComp />
                {/*简介*/}
                <HeadIntroComp />
                {/*所属专栏*/}
                <BelongToColumnComp />
                {/*推荐课程*/}
                <RecomCourseView />
                {/*主讲老师*/}
                <MainLecturerComp />
                {/*笔记*/}
                <PopListView ref={(pop)=>this.pop = pop} />
            </View>
        )
    };
    renderFlatlist() {
        return(
            <FlatList
                style={styles.flastlist}
                ref={(flatList)=>this._flatList = flatList}
                renderItem={this._renderItemLearnNote}
                onRefresh={this.refreshing}
                refreshing={false}
                onEndReachedThreshold={0}
                getItemLayout={(data,index)=>(
                    {length: 100, offset: (100+2) * index, index}
                )}
                //添加头尾布局
                ListHeaderComponent={this.headerSingle}
                ListFooterComponent={()=> {return (<View style={styles.footer} />)}}
                keyExtractor={(item,index)=>{item+index}}
                // onScroll = {(event)=>this.onScrollH(event)}
                data={this.state.listData}>
            </FlatList>
        )
    }

    render() {
        const {isShowAbs} = this.props.navigation.state.params || false;
        const text = {
            single:{
                price:'199.92',
                text:'单买',
            }};
        return (
            <View style={styles.bgColor}>
                {this.renderPlay()}
                {/*{this.renderShowAbs(isShowAbs)}*/}
                {this.renderFlatlist()}
                {DetailBottomView.isPayView()}
                <PopListView ref={(ref) => { this.popList = ref; }}/>
                {this.state.keyBoardHeight > 0 && <PopInputView
                    keyBoardHeight={this.state.keyBoardHeight}
                    keyBoard={()=>{
                        this._keyboardDidHide();
                    }}
                />}
                {
                    this.state.showShare && <PopShareView
                        navigation={this.props.navigation}
                        cancelPay={()=>{this.setState({showShare:false})}}/>

                }
                {
                    this.state.showPay && <PopPayView
                        navigation={this.props.navigation}
                        cancelPay={()=>{this.setState({showPay:false})}}/>
                }
                {/* 礼物弹窗 */}
                <PopupWindowOfGift
                    ref={(ref= PopupWindowOfGift) => { //方法对引用PopupWindowOfGift元素的ref引用进行操作
                        this.giftView = ref
                    }}
                    closeCallback={(skipStatus)=>{
                        if (skipStatus) {
                            // 跳转我的余额
                            this.props.navigation.navigate('WalletBalance')
                        }
                    }}
                    showTip={(item)=>{
                        this.setState({
                            showReward: true,
                        })
                        this.giftItem=item;
                    }}
                />

                {/* // 余额不足  提示框 */}
                { this.state.showReward && <RewardReminderPopup item = {this.giftItem}
                                                                cancel={()=>{
                                                                    this.setState({
                                                                        showReward: false,
                                                                    })
                                                                }}
                                                                recharge={()=>{
                                                                    // 充值
                                                                    this.setState({
                                                                        showReward: false,
                                                                    })
                                                                    this.downAnimation();
                                                                    this.props.navigation.navigate('WalletBalance')
                                                                }}
                                                                reward={()=>{
                                                                    // 打赏
                                                                    this.setState({
                                                                        showReward: false,
                                                                    })
                                                                }}/>}
            </View>
        )
    }
    upAnimation(){
        this.giftView.upAnimation();
    }

    downAnimation(){
        this.giftView.downAnimation();
    }
    // 礼物弹窗
    showGiftsView=()=>{
        this.upAnimation();
    }
}

const styles = StyleSheet.create({
    bgColor:{flex:1,backgroundColor:globalStyles.COLOR.bg_color}
})
