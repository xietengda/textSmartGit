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

const normal_icon = require('../../assets/user/notification_Center/normal.png')
const selected_icon = require('../../assets/user/notification_Center/selected.png')

const eyes_close = require('../../assets/login/eyesclose.png')
const eyes_open = require('../../assets/login/eyesopen.png')

const button_background = require('../../assets/base/mycustomer-background.png')

export default class RegisterMsgView extends Component {
    constructor(props){
        super(props);
        this.state={
            phoneText:'',
            codeText:'',
            nameText:'',
            psdText: '',
            // 密码隐藏状态
            psdEntry: true,
            selectStatus:false,
        }
    }
    render() {
        return(
            <View style={[styles.constain, this.props.style,]}>
            
                {/* 手机号 */}
                <View style={{flexDirection: 'row', left: Size.scaleSize(0), 
                    height: Size.scaleSize(130), alignItems: 'center',
                    width: Size.screenW-2*Size.scaleSize(107), marginTop: Size.scaleSize(30),
                    borderBottomColor: '#cccccc', borderBottomWidth: 0.5, }}>

                    <View style={{width: Size.scaleSize(162),
                        height: Size.scaleSize(50), justifyContent: 'center',
                        borderRightColor: '#e0e0e0', borderRightWidth: 1,}}>
                        <Text style={{color: '#383838', fontSize: Size.scaleSize(32)}}>中国 +86</Text>
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
                        placeholder={''}
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

                {/* 昵称 */}
                <View style={{flexDirection: 'row', left: Size.scaleSize(0), 
                    height: Size.scaleSize(130), alignItems: 'center',
                    width: Size.screenW-2*Size.scaleSize(107), 
                    borderBottomColor: '#cccccc', borderBottomWidth: 0.5, }}>

                    <Text style={{color: '#383838', fontSize: Size.scaleSize(32)}}>昵称</Text>

                    <TextInput 
                        placeholder={'14个字以内'}
                        // 默认字体颜色
                        placeholderTextColor = {Color.font_b1}
                        // 光标颜色
                        selectionColor={Color.bg_1580e0}
                        editable={true}//是否可编辑
                        maxLength={14}//能够输入的最长字符数
                        style={styles.name_input}
                        onChangeText={(nameText) => this.setState({nameText})}
                    />
                </View>

                {/* 密码 */}
                <View style={{flexDirection: 'row', left: Size.scaleSize(0), 
                    height: Size.scaleSize(130), borderBottomColor: '#cccccc', borderBottomWidth: 0.5,
                    width: Size.screenW-2*Size.scaleSize(107), alignItems: 'center'}}>
                    <Text style={{color: '#383838', fontSize: Size.scaleSize(32)}}>密码</Text>
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

                <View style={{marginHorizontal: Size.scaleSize(0), 
                        position: 'absolute', bottom: Size.scaleSize(141), 
                        justifyContent: 'flex-end'}}>
                    <TouchableOpacity style={{flexDirection: 'row', marginBottom: Size.scaleSize(33), 
                        alignItems: 'center'}}
                    onPress={()=>{
                        let status = this.state.selectStatus;
                        this.setState({
                            selectStatus: !status,
                        })
                    }}>
                        <Image source={ this.state.selectStatus ? selected_icon : normal_icon}/>
                        <View style={{flexDirection: 'row', left: 5}}>
                            <Text style={{color: '#b0b0b0', fontSize: Size.scaleSize(20)}}>点击登录即同意</Text>
                            <TouchableOpacity>
                                <Text style={{color: Color.font_ff7e00, fontSize: Size.scaleSize(20)}}>{'《智学习用户注册协议》'}</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    {/* 确定按钮 */}
                    <TouchableOpacity style={{height: Size.scaleSize(88), borderRadius: 5,}}>
                        <ImageBackground resizeMode='stretch' source={button_background} style={styles.signin_image}>
                            <Text style={{color: 'white', fontSize: Size.scaleSize(40)}}>登录</Text>
                        </ImageBackground>
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
        left: Size.scaleSize(30),
        fontSize: Size.scaleSize(28),
        width: Size.screenW-2*Size.scaleSize(200),
        height: Size.scaleSize(80),
        // backgroundColor: 'red',
    },
    psd_input:{
        left: Size.scaleSize(42),
        fontSize: Size.scaleSize(28),
        width: Size.screenW-2*Size.scaleSize(200)+Size.scaleSize(10),
        height: Size.scaleSize(80),
        // backgroundColor: 'red',
    },
    code_input:{
        left: Size.scaleSize(20),
        fontSize: Size.scaleSize(28),
        width: Size.screenW-2*Size.scaleSize(200)-Size.scaleSize(160),
        height: Size.scaleSize(80),
        // backgroundColor: 'red',
    },
    name_input:{
        left: Size.scaleSize(40),
        fontSize: Size.scaleSize(28),
        width: Size.screenW-2*Size.scaleSize(200)-Size.scaleSize(160),
        height: Size.scaleSize(80),
        // backgroundColor: 'red',
    }
})