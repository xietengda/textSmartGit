/*
* @Created by liqihui on 2019-04-02.
* @Desc UserScreen
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native'

import UserNavigation from '../UserPages/UserScreenView/UserCustomNavigation'
import UserInfoView from '../UserPages/UserScreenView/UserInfoHeaderView'
import LeftMenuView from '../UserPages/UserScreenView/UserLeftMenuView'
import EarningsView from '../UserPages/EarningsModuleView/EarningsConfigView'

import Size from '../../config/Size';
import Color from '../../config/Color';

import QRScreen from "./OfflineConfigView/QRScreen";

import SoundPlayerView from '../../components/SoundPlayerView'

export default class UserScreen extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            scrollY:0,
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.constain}>
                <ScrollView style={{backgroundColor: Color.bg_color, }}
                    scrollEventThrottle={0.01}
                    onScroll = {(event)=>{{
                        this.setState({
                            scrollY : event.nativeEvent.contentOffset.y/Size.kTopHeight*0.5
                        })
                        
                        console.log('scroll position:' + this.state.scrollY);
                    }}}
                >

                    <UserInfoView myStudyInfo={()=>{
                        // 签到学分
                        this.props.navigation.navigate('MyStudyInfoScreen')
                    }}
                    changeHeader={()=>{
                        this.props.navigation.navigate('VideoPlayerScreen')
                    }}/>

                    {/* <SoundPlayerView /> */}

                    <View style={{flexDirection:'row', marginTop: 10}}>

                        {/* 左侧菜单栏 */}
                        <LeftMenuView style={{}} navigation={this.props.navigation}/>

                        <EarningsView style={{ }}
                        selectDetail={(index)=>{
                            if (index == 0) {
                                // 收益
                                this.props.navigation.navigate('MyEarningsScreen')
                            } else if (index == 1) {
                                // 余额---账户充值
                                this.props.navigation.navigate('WalletBalance')
                            }
                        }}/>

                    </View>

                    <View style={{height: 20}}></View>

                </ScrollView>

                <UserNavigation alpha={this.state.scrollY}
                skipHome={()=>{
                    // 个人主页
                    this.props.navigation.navigate('UserHomePageScreen')
                }}
                skipMessage={()=>{
                    // 消息中心
                    this.props.navigation.navigate('MessageCentreScreen')
                }}
                scanQrcode={()=>{
                    // 二维码扫描
                    this.props.navigation.navigate('QRScreen')
                }}/>
            </View>
        )
    }
}

UserScreen.navigationOptions = ({ navigation }) => ({
    header:null
})

const styles = StyleSheet.create({
    constain: {
        height: Size.screenH-Size.kTabBarHeight-Size.kBottomAreaHeight, 
        width: Size.screenW, 
        backgroundColor: Color.bg_color,
    }
})
