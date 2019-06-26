import React, {Component} from 'react'

import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    Image,
    findNodeHandle,
    UIManager,
    InteractionManager,
} from 'react-native'

import Size from '../../../config/Size'

import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

import QuestionsUserHeader from '../QuestionsConfigView/QuestionsUserHeader'
import QuestionsNumberView from '../QuestionsConfigView/QuestionsNumberView'

import QuestionsToMeView from '../QuestionsConfigView/QuestionsToMeView'
import QuestionsRegionalListView from '../QuestionsConfigView/QuestionsRegionalListView'
import QuestionsStatusHeaderView from '../QuestionsConfigView/QuestionsStatusHeaderView'

import UserCustomNavView from "../../UserPages/components/UserCustomNavView"

import PopupWindowOfAnswer from '../components/PopupWindowOfAnswer'
import QuestionsEditPriceView from '../QuestionsConfigView/QuestionsEditPriceView'

import PopShareView from "../../../components/PopShareView";
import PopPayView from '../../DetailPages/DetailView/PopPayView';

const bgImage = require('../../../assets/find/home/home-tapbar-background.png')

const share_image = require('../../../assets/user/question/questions-tabbar-share.png')
const create_image = require('../../../assets/user/question/questions-tabbar-edit.png')

export default class QuestionsScreen extends Component {

    constructor (props) {
        super(props)
        this.state = {
            statusArr:[
                '提问我的',
                '我提问的',
                '我偷听的'
            ],
            scrollY:0,
            // 是否展示回答弹窗
            showAnswerStatus:false,
            question: '我老婆是个花钱如流水的人，她是九型人格众的记号样与她沟通，让她懂得持家一点。。。我老婆是个花钱如流水的人，她是九型人格众的记号样与她沟通，让她懂得持家一点。。。我老婆是个花钱如流水的人，她是九型人格众的记号样与她沟通，让她懂得持家一点。。。我老婆是个花钱如流水的人，她是九型人格众的记号样与她沟通，让她懂得持家一点。。。我老婆是个花钱如流水的人，她是九型人格众的记号样与她沟通，让她懂得持家一点。。。我老婆是个花钱如流水的人，她是九型人格众的记号样与她沟通，让她懂得持家一点。。。我老婆是个花钱如流水的人，她是九型人格众的记号样与她沟通，让她懂得持家一点。。。我老婆是个花钱如流水的人，她是九型人格众的记号样与她沟通，让她懂得持家一点。。。我老婆是个花钱如流水的人，她是九型人格众的记号样与她沟通，让她懂得持家一点。。。我老婆是个花钱如流水的人，她是九型人格众的记号样与她沟通，让她懂得持家一点。。。我老婆是个花钱如流水的人，她是九型人格众的记号样与她沟通，让她懂得持家一点。。。',
            questionHeight:0,
            selectStatus:0,
            // 是否展示价格编辑弹窗
            showEditStatus: false,
            showShare: false,
            showPay: false,
        }
    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            // ...耗时较长的同步执行的任务...
            const handle = findNodeHandle(this.refs.contentNormal)
            UIManager.measure(handle,(x, y, width, height, pageX, pageY)=>{
                this.setState({
                    questionHeight: height,
                })
                console.log('相对父视图位置x:', x);
                console.log('相对父视图位置y:', y);
                console.log('组件宽度width:', width);
                console.log('组件高度height:', height);
                console.log('距离屏幕的绝对位置x:', pageX);
                console.log('距离屏幕的绝对位置y:', pageY);
            });
        });
    }

    _renderListView(selectStatus){
        if (selectStatus == 3) {
            return <QuestionsRegionalListView editPrice={(item, index)=>{
                this.setState({
                    showEditStatus: true,
                })
            }}/> 
        }
        return <QuestionsToMeView 
                    status={selectStatus}
                    navigation={this.props.navigation}
                    style={{height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight-Size.scaleSize(200)}}
                    selectedHeader={()=>{
                        // 访问别人的主页
                        this.props.navigation.navigate('UserTAHomePageScreen')
                    }}
                    answer={()=>{
                        // this.props.navigation.navigate('TestRecordAudio')
                        this.setState({
                            showAnswerStatus: true,
                        })
                    }}
                    pay={()=>{
                        this.setState({
                            showPay: true,
                        })
                    }}
                />
    }

    render (){
        
        return (

            <View style={styles.constain}>

                <ScrollView 
                    scrollEventThrottle={0.01}
                    onScroll = {(event)=>{{
                        this.setState({
                            scrollY : event.nativeEvent.contentOffset.y/Size.kTopHeight*0.5
                        })
                        
                        console.log('scroll position:' + this.state.scrollY);
                    }}}
                >
                    
                    <View >
                        {/* 用户信息 */}
                        <QuestionsUserHeader />

                        {/* 问答收益 */}
                        <View style={styles.earnings}>
                            <QuestionsNumberView number={'￥99.99'} desc={'问答收益'} 
                                style={{width: (Size.screenW-2*Size.space_30)/3, 
                                borderRightWidth: 0.5, 
                                borderRightColor: 'rgba(177,177,177,0.2)', 
                                height: Size.scaleSize(86)}}/>
                            <QuestionsNumberView number={'888'} desc={'待回答'} 
                                style={{width: (Size.screenW-2*Size.space_30)/3, 
                                borderRightWidth: 0.5, 
                                borderRightColor: 'rgba(177,177,177,0.2)', 
                                height: Size.scaleSize(86)}}/>
                            <QuestionsNumberView number={'9999'} desc={'已回答'} 
                                style={{width: (Size.screenW-2*Size.space_30)/3,}}/>
                        </View>

                        {/* 提问内容 */}
                        <View style={styles.tableView_bg}>

                            <QuestionsStatusHeaderView 
                                keysArray={[{title:'提问我'}, {title:'我提问'}, {title:'我偷听'}, {title:'问答区'}]}
                                selectIndex={(index)=>{this.selectIndex(index)}}
                            />

                            {this._renderListView(this.state.selectStatus)}

                            {/* <ScrollableTabView
                                style={styles.constain}
                                locked={false}
                                tabBarUnderlineStyle={{backgroundColor:globalStyles.COLOR.primary, height:2}}
                                tabBarActiveTextColor={globalStyles.COLOR.primary}
                                renderTabBar={() => <DefaultTabBar />}>
                                    <QuestionsToMeView tabLabel={'提问我的'}/>
                                    <QuestionsToMeView tabLabel={'我提问的'}/>
                                    <QuestionsToMeView tabLabel={'我偷听的'}/>
                            </ScrollableTabView> */}
                            
                        </View>
                    </View>
                </ScrollView>

                {/* // 导航栏 */}
                <UserCustomNavView alpha={this.state.scrollY} title='付费问答' 
                    navigation={this.props.navigation} 
                    rightButtons={[{icon: share_image}, {icon: create_image}]}
                    selectRightIndex={(index)=>{this.skipRightsIndex(index)}}/>

                {/* 回答弹窗 */}
                { 
                    this.state.showAnswerStatus && <PopupWindowOfAnswer 
                        contentHeight={this.state.questionHeight}
                        content={this.state.question}
                        cancel={()=>{
                            this.setState({
                                showAnswerStatus: false,
                            })
                        }}/>
                }

                {/* 价格编辑弹窗 */}
                { 
                    this.state.showEditStatus && <QuestionsEditPriceView 
                        confirm={()=>{
                            // 确定
                            this.setState({
                                showEditStatus: false,
                            })
                        }}
                        cancel={()=>{
                            // 取消
                            this.setState({
                                showEditStatus: false,
                            })
                        }}
                    /> 
                }

                {/* 为了计算文字高度  来写的不做显示的内容 */}
                <Text ref='contentNormal' 
                    style={{marginHorizontal: Size.scaleSize(44), 
                        backgroundColor: 'red', position: 'absolute',
                        color: '#3b3b3b', fontSize: Size.scaleSize(28), 
                        lineHeight: Size.scaleSize(40), top: Size.screenH}}>{this.state.question}
                </Text>

                {/* 分享弹窗 */}
                {
                    this.state.showShare && <PopShareView
                        navigation={this.props.navigation}
                        cancelPay={()=>{this.setState({showShare:false})}}/>
                }

                {/* 支付弹窗 */}
                {
                    this.state.showPay && <PopPayView
                        navigation={this.props.navigation}
                        cancelPay={()=>{this.setState({showPay:false})}}/>
                }
            </View>
        )
    }
    skipRightsIndex=(index)=>{
        if (index == 0) {
            // 分享
            this.setState({
                showShare: true,
            })
        } else if (index == 1) {
            // 编辑
            this.props.navigation.navigate('QuestionsEditScreen')
        }
    }
    selectIndex=(index)=>{
        this.setState({
            selectStatus: index,
        })
    }
}

QuestionsScreen.navigationOptions = ({ navigation }) => ({
    // headerTitle: '付费问答',
    header: null
})

const styles = StyleSheet.create ({
    constain: {
        position: 'absolute',
        height: Size.screenH-Size.kBottomAreaHeight,
        // paddingBottom: Size.scaleSize(130)+Size.kTopHeight,
    },
    // 收益
    earnings: {
        flexDirection: 'row',
        left: Size.space_30,
        // backgroundColor: 'red',
        height: Size.scaleSize(112),
        alignItems: 'center',
        width: Size.screenW-2*Size.space_30,
        borderRadius: Size.radius_12,
        marginTop: Size.scaleSize(20),
        borderColor: 'rgba(177,177,177,0.4)',
        borderWidth: 0.5,
    },
    tableView_bg: {
        marginHorizontal: Size.space_30,
        borderColor: 'rgba(177,177,177,0.4)',
        borderWidth: 0.5,
        borderRadius: Size.radius_12,
        marginTop: Size.space_20,
        // top: Size.scaleSize(130)+Size.kTopHeight,
        // height: Size.scaleSize(130)+Size.kTopHeight,
    },
    tableView: {

    },
})