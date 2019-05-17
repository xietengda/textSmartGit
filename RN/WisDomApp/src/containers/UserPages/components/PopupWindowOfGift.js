import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Modal,
    Animated,
    Keyboard,
    Alert,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color';

const down_icon = require('../../../assets/base/gift/gift-retract.png')
const remainder_big = require('../../../assets/base/gift/remainder-big.png')
const remainder_more = require('../../../assets/base/gift/remainder-more.png')

import GiftsBannerView from '../components/GiftsBannerView'

export default class PopupWindowOfGift extends Component {

    constructor(props) {
	    super(props);
	    this.state = {
            title:'',
            detail:'',
            numberText: 0,
            offsetY: new Animated.Value(Size.screenH),
            keyboardHeight : new Animated.Value(0),
            balance: 999,
            showGiftBanner: false,
        };
        this.typeAmount = 0;
        this.totalBalance = 999;
    }
    // 监听键盘弹出与收回
    componentDidMount() {
        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow',this.keyboardWillShow);
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide',this.keyboardWillHide);
    }

    //注销监听
    componentWillUnmount () {
        this.keyboardWillShowListener && this.keyboardWillShowListener.remove();
        this.keyboardWillHideListener && this.keyboardWillHideListener.remove();
    }

    //键盘弹起后执行
    keyboardWillShow = (event) => {
        Animated.timing(this.state.keyboardHeight, {
            duration: event.duration,
            toValue: event.endCoordinates.height-Size.kBottomAreaHeight,
        }).start();
    };
    //键盘收起后执行
    keyboardWillHide = (event) => {
        Animated.timing(this.state.keyboardHeight, {
            duration: event.duration,
            toValue: 0,
        }).start();
    };

    upAnimation(){
        Animated.timing(
            this.state.offsetY,            // 动画中的变量值
            {
                toValue: 0,                   // 
                duration: 300,              // 让动画持续一段时间
            }
        ).start(()=>{
            this.setState({
                showGiftBanner: true,
            })
        });
    }

    downAnimation(skipStatus){
        // skipStatus 关闭之后是否跳转
        Animated.timing(
            this.state.offsetY,            // 动画中的变量值
            {
                toValue: Size.screenH,                   // 
                duration: 300,              // 让动画持续一段时间
            }
        ).start();

        this.props.closeCallback && this.props.closeCallback(skipStatus)
    }

    _resetAmount(item){
        let num = this.state.numberText;
        let balance = this.state.balance;
        if (item.amount != this.typeAmount && this.typeAmount != 0) {
            num = 1;
            balance = this.totalBalance;
        } else {
            num = num + 1;
        }
        
        // 当前类型的金额  保存下来
        this.typeAmount = item.amount;
        
        if (item.amount > balance) {
            item.num = num-1;
            this.showTip(item)
        } else {
            this.setState({
                numberText: num,
                balance: this.totalBalance-num*item.amount,
            })
        }
    }
    
    render() {
        return (
            // <Modal animationType={'slide'} transparent = {true}>

                <Animated.View style={[{flex: 1, height: Size.screenH, width: Size.screenW, position: 'absolute',}, 
                    {transform: [{ translateY: this.state.offsetY }], bottom: this.state.keyboardHeight}]}>

                    <Animated.View style={[styles.container, {}]}>

                        <View style={{borderBottomColor: 'rgba(255,255,255,0.2)', borderBottomWidth: 1}}>
                            <View style= {{flexDirection: 'row', justifyContent: 'space-between', 
                                marginHorizontal: Size.scaleSize(24), alignItems: 'center',
                                height: Size.scaleSize(84), }}>
                                <Text style={{color: 'white', fontSize: Size.scaleSize(28)}}>礼物</Text>
                                <TouchableOpacity style={{height: Size.scaleSize(84), alignItems: 'flex-end', 
                                justifyContent: 'center', width: Size.scaleSize(150), right: -Size.scaleSize(24)}}
                                onPress={()=>{
                                    this.downAnimation(false)
                                }}>
                                    <Image resizeMode='contain' source={down_icon} 
                                    style={{width: Size.scaleSize(40), height: Size.scaleSize(40), right: Size.scaleSize(24)}}/>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* 礼物选择试图 */}
                        {this.state.showGiftBanner ? <GiftsBannerView addGifts={(item)=>{
                            this._resetAmount(item);
                        }}/> : <View style={{height: Size.scaleSize(481)}}></View>}

                        <View style={{height: Size.scaleSize(110), marginHorizontal: Size.scaleSize(44), 
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>

                            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}
                            onPress={()=>{
                                this.downAnimation(true)
                            }}>
                                <Image source={remainder_big}/>
                                <Text style={{color: 'white', fontSize: Size.scaleSize(28), 
                                left: Size.scaleSize(21)}}>{this.state.balance}</Text>
                                <Image source={remainder_more} style={{left: Size.scaleSize(41)}}/>
                            </TouchableOpacity>

                            <View style={{width: Size.scaleSize(256), height: Size.scaleSize(50), 
                                borderColor: Color.bg_1580e0, borderWidth: 1, borderRadius: Size.scaleSize(50)/2, 
                                flexDirection: 'row', }}>

                                <TextInput 
                                    placeholder={''}
                                    // 默认字体颜色
                                    placeholderTextColor = {Color.font_b1}
                                    // 光标颜色
                                    selectionColor={Color.bg_1580e0}
                                    editable={true}//是否可编辑
                                    maxLength={4}//能够输入的最长字符数
                                    onChangeText={(numberText) => this.setState({numberText})}
                                    style={{alignItems: 'center',
                                        justifyContent: 'center', width: Size.scaleSize(128),
                                        textAlign: 'center', color: 'white', 
                                        fontSize: Size.scaleSize(28)}}>{this.state.numberText}</TextInput>

                                <TouchableOpacity style={{backgroundColor: Color.bg_1580e0, alignItems: 'center', 
                                    justifyContent: 'center', width: Size.scaleSize(128), 
                                    borderTopRightRadius: Size.scaleSize(50)/2, borderBottomRightRadius: Size.scaleSize(50)/2}}>

                                    <Text style={{color: 'white', fontSize: Size.scaleSize(28), 
                                        }}>打赏</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Animated.View>
                </Animated.View>
            // </Modal>
            
        )
    }
    showTip(item){
        this.props.showTip && this.props.showTip(item)
    }
}

const styles = StyleSheet.create ({
    container: {
        position: 'absolute',
        bottom: 0,
        height: Size.scaleSize(673)+Size.kBottomAreaHeight,
        backgroundColor: 'rgba(0,0,0,0.8)',
        width: Size.screenW,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingBottom: Size.kBottomAreaHeight,
    },
    title: {
        // 定位：绝对定位relative，相对定位absolute，固定定位pix
        position: 'absolute',
        left: Size.scaleSize(20),
        color: 'rgb(26,26,26)',
        fontSize: Size.scaleSize(24),
    },
    detail: {
        // 定位：绝对定位relative，相对定位absolute，固定定位pix
        position: 'absolute',
        right: Size.scaleSize(20),
        color: 'rgb(26,26,26)',
        fontSize: Size.scaleSize(24),
    },
})