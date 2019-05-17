import React, {Component} from 'react'

import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'

import Size from '../../../config/Size'

import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

import QuestionsUserTAHeader from '../QuestionsConfigView/QuestionsUserTAHeader'
import QuestionsNumberView from '../QuestionsConfigView/QuestionsNumberView'

import QuestionsToMeView from '../QuestionsConfigView/QuestionsToMeView'
import QuestionsStatusHeaderView from '../QuestionsConfigView/QuestionsStatusHeaderView'

import UserCustomNavView from "../../UserPages/components/UserCustomNavView"

const bgImage = require('../../../assets/find/home/home-tapbar-background.png')

const share_image = require('../../../assets/user/question/questions-tabbar-share.png')

export default class QuestionsTAScreen extends Component {

    constructor (props) {
        super(props)
        this.state = {
            statusArr:[
                '提问我的',
                '我提问的',
                '我偷听的'
            ],
            scrollY:0,
        }
    }
    componentDidMount() {
        this.props.navigation.setParams({
            title:'付费问答',
            opacity:0,
            showAbs: true,
        })
    }

    render (){
        const {showAbs} = this.props.navigation.state.params || {};
        return (

            <View style={styles.constain}>

                <ScrollView 
                    onScroll = {(event)=>{{
                        this.setState({
                            scrollY : event.nativeEvent.contentOffset.y/Size.kTopHeight
                        })
                        
                        console.log('scroll position:' + this.state.scrollY);
                    }}}
                >
                    
                    <View >
                        {/* 用户信息 */}
                        <QuestionsUserTAHeader />

                        {/* 提问内容 */}
                        <View style={styles.tableView_bg}>

                            <QuestionsStatusHeaderView keysArray={[{title:'全部问答'}, {title:'我提问的'}]}/>

                            <QuestionsToMeView navigation={this.props.navigation}
                                style={{height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight-Size.scaleSize(200)}}
                                selectedHeader={()=>{
                                    // 访问别人的主页
                                    this.props.navigation.navigate('UserTAHomePageScreen')
                                }}/>
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
                    rightButtons={[{icon: share_image}]}
                    selectRightIndex={(index)=>{this.skipRightsIndex(index)}}/>
            </View>
        )
    }
    skipRightsIndex=(index)=>{

    }
}

QuestionsTAScreen.navigationOptions = ({ navigation }) => ({
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