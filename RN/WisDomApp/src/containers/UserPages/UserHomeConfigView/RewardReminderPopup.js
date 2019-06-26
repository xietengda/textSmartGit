import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Modal,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native'

import Size from '../../../config/Size'
import Color from '../../../config/Color';

const tip_cancel = require('../../../assets/user/largess/tip_cancel.png')

export default class RewardReminderPopup extends Component {

    constructor (props) {
        super(props)
        this.state = {
            
        }
    }

    render (){
        return (
            <Modal animationType={'fade'} transparent = {true}>

                <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent: 'center'}}>

                    <View style={[{backgroundColor:'rgba(255,255,255,1)', 
                        left: Size.scaleSize(70), width: Size.screenW-2*Size.scaleSize(70),
                        height: Size.scaleSize(350), alignItems: 'center',
                        borderRadius: 10,}]}>

                        <Text style={{color: Color.font_1a, fontSize: Size.scaleSize(36),
                            marginTop: Size.scaleSize(50), fontWeight: 'bold'}}>提示</Text>

                        <Text style={{color: Color.font_1a, fontSize: Size.scaleSize(28),
                            marginTop: Size.scaleSize(30)}}>您当前余额最多能打赏</Text>

                        <Text style={{color: Color.font_ff7e00, fontSize: Size.scaleSize(32),
                            marginTop: Size.scaleSize(20)}}>{this.props.item.num+'个'+this.props.item.title}</Text>

                        <View style={styles.bottom_view}>
                            <TouchableOpacity style={{width: (Size.screenW-2*Size.scaleSize(70))/2, 
                                alignItems: 'center', justifyContent: 'center', 
                                borderRightColor: 'rgba(177,177,177,0.4)', borderRightWidth: 0.5}}
                            onPress={()=>{
                                this.props.recharge && this.props.recharge()
                            }}>
                                <Text style={{color: Color.font_b1, fontSize: Size.scaleSize(36)}}>我先充值</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{width: (Size.screenW-2*Size.scaleSize(70))/2, 
                                alignItems: 'center', justifyContent: 'center',}}
                            onPress={()=>{
                                this.props.reward && this.props.reward()
                            }}>
                                <Text style={{color: Color.bg_1580e0, fontSize: Size.scaleSize(36)}}>立即打赏</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={{width: Size.scaleSize(84), height: Size.scaleSize(84),
                            position: 'absolute', right: 0, top: 0, alignItems: 'center', justifyContent: 'center'}}
                        onPress={()=>{
                            this.props.cancel && this.props.cancel()
                        }}>
                            <Image source={tip_cancel}/>
                        </TouchableOpacity>
                    </View> 
                    
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create ({
    bottom_view: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row', 
        // backgroundColor:'red', 
        height: Size.scaleSize(100), 
        borderTopColor: 'rgba(177,177,177,0.4)', 
        borderTopWidth: 0.5,
    }
})


