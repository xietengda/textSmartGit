import React, {Component} from 'react'
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity,
    Modal,
    ImageBackground,
    Animated,
} from 'react-native'

import Size from '../../../config/Size'
import Color from '../../../config/Color'

const WeChat_icon = require('../../../assets/user/wallet/WeChat.png')
const Alipay_icon = require('../../../assets/user/wallet/Alipay.png')

export default class PayStatusPopupView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offsetY: new Animated.Value(Size.screenH),
        };
    }

    componentDidMount(){
        this.startAnimation();
    }

    startAnimation(){
        Animated.timing(
            this.state.offsetY,            // 动画中的变量值
            {
                toValue: 0,                   // 
                duration: 300,              // 让动画持续一段时间
            }
        ).start();
    }

    render() {
        return (
            <Modal animationType={'fade'}
                transparent = {true}>

                <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
                    
                    <Animated.View style={[{width: Size.screenW, height: Size.screenH, }, 
                        {transform: [{ translateY: this.state.offsetY }]}
                    ]}>
                        <View style={{backgroundColor: 'rgba(240, 240, 240, 1)', position: 'absolute',
                            paddingBottom: Size.kBottomAreaHeight, bottom: 0, }}>

                            <TouchableOpacity style={{width: Size.screenW, height: Size.scaleSize(100), backgroundColor: 'white',
                                alignItems: 'center', justifyContent: 'center',
                                borderBottomColor: 'rgba(177,177,177,0.4)', borderBottomWidth:0.5}}
                            onPress={()=>{
                                this.props.cancelPay && this.props.cancelPay()
                            }}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Image source={WeChat_icon}/>
                                    <Text style={{color: Color.font_1a, 
                                        fontSize: Size.scaleSize(32), left: 10}}>微信支付</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{width: Size.screenW, height: Size.scaleSize(100), backgroundColor: 'white',
                                alignItems: 'center', justifyContent: 'center', 
                                borderBottomColor: 'rgba(177,177,177,0.4)', borderBottomWidth:0.5,}}
                            onPress={()=>{
                                this.props.cancelPay && this.props.cancelPay()
                            }}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Image source={Alipay_icon}/>
                                    <Text style={{color: Color.font_1a, 
                                        fontSize: Size.scaleSize(32), left: 10}}>支付宝</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{width: Size.screenW, height: Size.scaleSize(90), backgroundColor: 'white',
                                alignItems: 'center', justifyContent: 'center', marginTop: Size.scaleSize(20)}}
                            onPress={()=>{
                                this.props.cancelPay && this.props.cancelPay()
                            }}>
                                <Text style={{color: Color.font_b1, fontSize: Size.scaleSize(36)}}>取消</Text>
                            </TouchableOpacity>
                        </View>

                    </Animated.View>

                </View>
                
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    
})
