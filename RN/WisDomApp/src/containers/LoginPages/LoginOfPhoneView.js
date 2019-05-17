import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    TextInput,
} from 'react-native'

import Size from '../../config/Size';
import Color from '../../config/Color'

const wechat_icon = require('../../assets/login/wechat.png')

const eyes_close = require('../../assets/login/eyesclose.png')
const eyes_open = require('../../assets/login/eyesopen.png')

const button_background = require('../../assets/base/mycustomer-background.png')

export default class LoginOfPhoneView extends Component {
    constructor(props){
        super(props);
        this.state={
            phoneText:'',
            psdText: '',
            // 密码隐藏状态
            psdEntry: true,
        }
    }
    render() {
        return(
            <View style={[styles.constain, this.props.style, {justifyContent: 'space-between'}]}>
                <View style={{height: (Size.screenH-2*Size.scaleSize(314-128)-2*Size.kTopHeight-Size.scaleSize(88))/2, }}>
                    
                    <View style={{flexDirection: 'row', left: Size.scaleSize(0), 
                        height: Size.scaleSize(130), alignItems: 'center',
                        width: Size.screenW-2*Size.scaleSize(107), marginTop: Size.scaleSize(30),
                        borderBottomColor: '#cccccc', borderBottomWidth: 0.5, }}>
                        <Text style={{color: '#383838', fontSize: Size.scaleSize(32)}}>账号</Text>

                        <TextInput 
                            placeholder={'手机号/学号'}
                            // 默认字体颜色
                            placeholderTextColor = {Color.font_b1}
                            // 光标颜色
                            selectionColor={Color.bg_1580e0}
                            editable={true}//是否可编辑
                            maxLength={30}//能够输入的最长字符数
                            style={styles.phone_input}
                            onChangeText={(phoneText) => this.setState({phoneText})}
                        />
                    </View>

                    <View style={{flexDirection: 'row', left: Size.scaleSize(0), 
                    height: Size.scaleSize(130), borderBottomColor: '#cccccc', borderBottomWidth: 0.5,
                    width: Size.screenW-2*Size.scaleSize(107), alignItems: 'center'}}>
                        <Text style={{color: '#383838', fontSize: Size.scaleSize(32)}}>密码</Text>
                        <TextInput 
                            placeholder={''}
                            // 默认字体颜色
                            placeholderTextColor = {Color.font_b1}
                            // 光标颜色
                            selectionColor={Color.bg_1580e0}
                            editable={true}//是否可编辑
                            maxLength={30}//能够输入的最长字符数
                            entry={this.state.psdEntry}
                            style={styles.psd_input}
                            onChangeText={(psdText) => this.setState({psdText})}
                        />
                        <TouchableOpacity onPress={()=>{
                            let status = this.state.psdEntry;
                            this.setState({
                                psdEntry: !status,
                            })
                        }}
                        style={{left: Size.scaleSize(55), width: Size.scaleSize(100), 
                            justifyContent: 'center', alignItems: 'center', 
                            height: Size.scaleSize(90)}}>
                            <Image source={this.state.psdEntry ? eyes_close : eyes_open}/>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={{marginTop: Size.scaleSize(50), position: 'absolute', 
                        right: 0, bottom: Size.scaleSize(30), }}
                    onPress={()=>{
                        this.props.forgetPsd && this.props.forgetPsd()
                    }}>
                        <Text style={{color: 'rgba(0, 0, 0, 0.6)', 
                            fontSize: Size.scaleSize(24)}}>忘记密码？</Text>
                    </TouchableOpacity>
                </View>

                {/* 登录按钮 */}
                <TouchableOpacity style={{marginHorizontal: Size.scaleSize(30), 
                    height: Size.scaleSize(88), borderRadius: 5,}}>
                    <ImageBackground resizeMode='stretch' source={button_background} style={styles.signin_image}>
                        <Text style={{color: 'white', fontSize: Size.scaleSize(40)}}>登录</Text>
                    </ImageBackground>
                </TouchableOpacity>

                <View style={{height: (Size.screenH-2*Size.scaleSize(314-128)-2*Size.kTopHeight-Size.scaleSize(88))/2, 
                    alignItems: 'center', justifyContent: 'flex-end'}}>

                    <View style={{top: Size.scaleSize(100),  position: 'absolute',
                        flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{backgroundColor: '#e6e6e6', height: 1, 
                            width: (Size.screenW-Size.scaleSize(142)-2*Size.scaleSize(75)-2*Size.scaleSize(58))/2, 
                            right: Size.scaleSize(26)}}></View>

                        <Text style={{color: '#666666', fontSize: Size.scaleSize(24),}}>其他方式登录</Text>

                        <View style={{backgroundColor: '#e6e6e6', height: 1, 
                            width: (Size.screenW-Size.scaleSize(142)-2*Size.scaleSize(75)-2*Size.scaleSize(58))/2, 
                            left: Size.scaleSize(26)}}></View>
                    </View>

                    <TouchableOpacity style={{top: Size.scaleSize(184),  position: 'absolute',}}
                    onPress={()=>{
                        this.props.loginWithWeChat && this.props.loginWithWeChat()
                    }}>
                        <Image source={wechat_icon}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection: 'row', marginBottom: Size.scaleSize(40)}}
                    onPress={()=>{
                        this.props.register && this.props.register()
                    }}>
                        <Text style={{color: Color.font_b1, fontSize: Size.scaleSize(24),}}>还没有账号，</Text>
                        <Text style={{color: Color.bg_1580e0, fontSize: Size.scaleSize(24),}}>去注册</Text>
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
    signin_image: {
        width: Size.screenW-2*Size.scaleSize(107),
        height: Size.scaleSize(88),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        // 设置图片尺寸超过容器可以设置显示或者隐藏('visible','hidden')
        overflow:'hidden',
    },
    phone_input: {
        left: Size.scaleSize(52),
        fontSize: Size.scaleSize(28),
        width: Size.screenW-2*Size.scaleSize(200),
        height: Size.scaleSize(80),
        // backgroundColor: 'red',
    },
    psd_input:{
        left: Size.scaleSize(52),
        fontSize: Size.scaleSize(28),
        width: Size.screenW-2*Size.scaleSize(200),
        height: Size.scaleSize(80),
        // backgroundColor: 'red',
    }
})