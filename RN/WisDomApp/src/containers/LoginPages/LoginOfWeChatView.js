import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    Alert,
    Platform,
    TouchableOpacity,
} from 'react-native'

import Size from '../../config/Size';
import Color from '../../config/Color'
import *as wechat from 'react-native-wechat'
const wechat_big = require('../../assets/login/wechat-big.png')
const phone_icon = require('../../assets/login/phone.png')
const wechat_signin = require('../../assets/login/wechat-signin.png')

export default class LoginOfWeChatView extends Component {

    componentDidMount (){
        wechat.registerApp('wxb840713e8cbbf0e3')
    }

    //微信登录示例
    WXLogin = () => {
        let scope = 'snsapi_userinfo';
        let state = 'wechat_sdk_demo';
        //判断微信是否安装
        wechat.isWXAppInstalled()
            .then((isInstalled) => {
                console.log('isInstalled--x-x----', isInstalled);
                if (isInstalled) {
                    //发送授权请求
                    wechat.sendAuthRequest(scope, state)
                        .then(responseCode => {
                            //返回code码，通过code获取access_token
                            // this.getAccessToken(responseCode.code);
                        })
                        .catch(err => {
                            Alert.alert('登录授权发生错误：', err.message, [
                                {text: '确定'}
                            ]);
                        })
                } else {
                    Platform.OS == 'ios' ?
                        Alert.alert('没有安装微信', '是否安装微信？', [
                            {text: '取消'},
                            {text: '确定', onPress: () => this.installWechat()}
                        ]) :
                        Alert.alert('没有安装微信', '请先安装微信客户端在进行登录', [
                            {text: '确定'}
                        ])
                }
            })
    };

    render() {
        return(
            <View style={[styles.constain, this.props.style, {justifyContent: 'space-between'}]}>
                <View style={{height: (Size.screenH-2*Size.scaleSize(314-128)-2*Size.kTopHeight-Size.scaleSize(100))/2,
                    justifyContent: 'center'}}>
                    <Image resizeMode='contain' style={styles.logo_icon} source={wechat_big}/>
                </View>

                {/* 登录按钮 */}
                <TouchableOpacity onPress={()=>{
                    this.WXLogin();
                }}>
                    <Image source={wechat_signin}/>
                </TouchableOpacity>

                <View style={{height: (Size.screenH-2*Size.scaleSize(314-128)-2*Size.kTopHeight-Size.scaleSize(100))/2,
                    alignItems: 'center', justifyContent: 'flex-end'}}>
                    <View style={{marginBottom: Size.scaleSize(60),
                        flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{backgroundColor: '#e6e6e6', height: 1,
                            width: (Size.screenW-Size.scaleSize(142)-2*Size.scaleSize(75)-2*Size.scaleSize(58))/2,
                            right: Size.scaleSize(26)}}></View>

                        <Text style={{color: '#666666', fontSize: Size.scaleSize(24),}}>其他方式登录</Text>

                        <View style={{backgroundColor: '#e6e6e6', height: 1,
                            width: (Size.screenW-Size.scaleSize(142)-2*Size.scaleSize(75)-2*Size.scaleSize(58))/2,
                            left: Size.scaleSize(26)}}></View>
                    </View>

                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: Size.scaleSize(60), width: Size.scaleSize(200)}}
                    onPress={()=>{
                        this.props.loginWithPhone && this.props.loginWithPhone()
                    }}>
                        <Image source={phone_icon} style={{left: -5}}/>
                        <Text style={{left: Size.scaleSize(10), color: Color.font_b1,
                            fontSize: Size.scaleSize(24)}}>手机号</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    constain: {
        alignItems: 'center',
        borderColor: 'rgba(177,177,177,0.3)',
        borderWidth: 0.5,
        borderRadius: Size.radius_12,
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    logo_icon: {
        width: Size.screenW-Size.scaleSize(570),
        height: Size.screenW-Size.scaleSize(570),
    },
})
