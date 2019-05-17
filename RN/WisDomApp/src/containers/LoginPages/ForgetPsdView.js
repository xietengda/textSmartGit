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

export default class ForgetPsdView extends Component {
    constructor(props){
        super(props);
        this.state={
            phoneText:'',
            codeText:'',
            psdText: '',
            // 密码隐藏状态
            psdEntry: true,
        }
    }
    render() {
        return(
            <View style={[styles.constain, this.props.style,]}>
                {/* 手机号 */}
                <View style={{flexDirection: 'row', left: Size.scaleSize(0), 
                    height: Size.scaleSize(130), alignItems: 'center',
                    width: Size.screenW-2*Size.scaleSize(107), marginTop: Size.scaleSize(40),
                    borderBottomColor: '#cccccc', borderBottomWidth: 0.5, }}>

                    <View style={{width: Size.scaleSize(162),
                        height: Size.scaleSize(50), justifyContent: 'center',
                        borderRightColor: '#e0e0e0', borderRightWidth: 1,}}>
                        <Text style={{color: '#383838', fontSize: Size.scaleSize(32)}}>绑定手机</Text>
                    </View>

                    <TextInput 
                        placeholder={'手机号'}
                        // 默认字体颜色
                        placeholderTextColor = {Color.font_b1}
                        // 光标颜色
                        selectionColor={Color.bg_1580e0}
                        editable={true}//是否可编辑
                        maxLength={11}//能够输入的最长字符数
                        style={styles.phone_input}
                        onChangeText={(phoneText) => this.setState({phoneText})}
                    />
                </View>
                {/* 验证码 */}
                <View style={{flexDirection: 'row', left: Size.scaleSize(0), 
                    height: Size.scaleSize(130), borderBottomColor: '#cccccc', borderBottomWidth: 0.5,
                    width: Size.screenW-2*Size.scaleSize(107), alignItems: 'center'}}>
                    <Text style={{color: '#383838', fontSize: Size.scaleSize(32)}}>短信验证码</Text>
                    <TextInput 
                        placeholder={'6-20位数字或字母'}
                        // 默认字体颜色
                        placeholderTextColor = {Color.font_b1}
                        // 光标颜色
                        selectionColor={Color.bg_1580e0}
                        editable={true}//是否可编辑
                        maxLength={6}//能够输入的最长字符数
                        entry={this.state.psdEntry}
                        style={styles.code_input}
                        onChangeText={(codeText) => this.setState({codeText})}
                    />
                    <TouchableOpacity onPress={()=>{
                        
                    }}
                    style={{left: Size.scaleSize(30), width: Size.scaleSize(160), 
                        justifyContent: 'center', alignItems: 'center', 
                        height: Size.scaleSize(54), backgroundColor: Color.font_ff7e00,
                        borderRadius:5, }}>
                        <Text style={{color: 'white', 
                            fontSize: Size.scaleSize(24)}}>获取验证码</Text>
                    </TouchableOpacity>
                </View>
                {/* 新密码 */}
                <View style={{flexDirection: 'row', left: Size.scaleSize(0), 
                    height: Size.scaleSize(130), borderBottomColor: '#cccccc', borderBottomWidth: 0.5,
                    width: Size.screenW-2*Size.scaleSize(107), alignItems: 'center'}}>
                    <Text style={{color: '#383838', fontSize: Size.scaleSize(32)}}>输入新密码</Text>
                    <TextInput 
                        placeholder={'6-20位数字或字母'}
                        // 默认字体颜色
                        placeholderTextColor = {Color.font_b1}
                        // 光标颜色
                        selectionColor={Color.bg_1580e0}
                        editable={true}//是否可编辑
                        maxLength={20}//能够输入的最长字符数
                        secureTextEntry={this.state.psdEntry}
                        style={styles.psd_input}
                        onChangeText={(psdText) => this.setState({psdText})}
                    />
                    <TouchableOpacity onPress={()=>{
                        let status = this.state.psdEntry;
                        this.setState({
                            psdEntry: !status,
                        })
                    }}
                    style={{left: Size.scaleSize(35), width: Size.scaleSize(100), 
                        justifyContent: 'center', alignItems: 'center', 
                        height: Size.scaleSize(90),}}>
                        <Image source={this.state.psdEntry ? eyes_close : eyes_open}/>
                    </TouchableOpacity>
                </View>

                {/* 确定按钮 */}
                <TouchableOpacity style={{marginHorizontal: Size.scaleSize(30), 
                    height: Size.scaleSize(88), borderRadius: 5, 
                    position: 'absolute', bottom: Size.scaleSize(141)}}>
                    <ImageBackground resizeMode='stretch' source={button_background} style={styles.signin_image}>
                        <Text style={{color: 'white', fontSize: Size.scaleSize(40)}}>确定</Text>
                    </ImageBackground>
                </TouchableOpacity>

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
        left: Size.scaleSize(30),
        fontSize: Size.scaleSize(28),
        width: Size.screenW-2*Size.scaleSize(200),
        height: Size.scaleSize(80),
        // backgroundColor: 'red',
    },
    psd_input:{
        left: Size.scaleSize(32),
        fontSize: Size.scaleSize(28),
        width: Size.screenW-2*Size.scaleSize(200)-Size.scaleSize(80),
        height: Size.scaleSize(80),
        // backgroundColor: 'red',
    },
    code_input:{
        left: Size.scaleSize(20),
        fontSize: Size.scaleSize(28),
        width: Size.screenW-2*Size.scaleSize(200)-Size.scaleSize(160),
        height: Size.scaleSize(80),
        // backgroundColor: 'red',
    }
})