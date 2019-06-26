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

export default class QuestionsEditPriceView extends Component {

    constructor (props) {
        super(props)
        this.state = {
            
        }
    }

    render (){
        return (
            <Modal animationType={'fade'} transparent = {true}>

                <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center'}}>

                    <KeyboardAvoidingView style={styles.keyBoard_view} 
                        behavior="padding">

                        {/* ... 在这里放置需要根据键盘调整位置的组件 ... */}
                        <View style={[{backgroundColor:'rgba(255,255,255,1)', 
                            left: 35, width: Size.screenW-2*35,
                            height: Size.scaleSize(380), alignItems: 'center',
                            borderRadius: 10,
                            }]}>

                            {/* 头像 */}
                            <Image style={{backgroundColor: 'black', borderRadius: 5, width: Size.scaleSize(128),
                                height: Size.scaleSize(128), position: 'absolute', top: -Size.scaleSize(128)/2}}/>

                            <Text style={{color: '#3a3a3a', fontSize: Size.scaleSize(28),
                                marginTop: Size.scaleSize(90)}}>亲子教育答疑解惑专区</Text>

                            <Text style={{color: Color.font_1a, fontSize: Size.scaleSize(28),
                                marginTop: Size.scaleSize(30)}}>您在该问答区的提问价格为：
                                <Text style={{color: Color.font_ff7e00, fontSize: Size.scaleSize(28),}}>
                                    ￥999.99/次
                                </Text>
                            </Text>

                            <View style={styles.input_view}> 
                                <Text style={{color: Color.font_1a, fontSize: Size.scaleSize(28),}}>单独设置成  </Text>

                                <TextInput 
                                    multiline={true} 
                                    // 光标颜色
                                    selectionColor={Color.font_ff7e00}
                                    underlineColorAndroid={'#ffffff'}
                                    style={{height: 20, textAlignVertical:'top', 
                                        color: Color.font_ff7e00, width: 90,
                                        borderBottomColor: Color.font_b1, borderBottomWidth: 1,
                                        textAlign: 'center', 
                                    }}
                                />

                                <Text style={{color: Color.font_1a, fontSize: Size.scaleSize(28),}}>  /次</Text>
                            </View>

                            <View style={styles.bottom_view}>
                                <TouchableOpacity style={{width: (Size.screenW-2*35)/2, 
                                    alignItems: 'center', justifyContent: 'center', 
                                    borderRightColor: 'rgba(177,177,177,0.4)', borderRightWidth: 0.5}}
                                onPress={()=>{
                                    this.props.cancel && this.props.cancel()
                                }}>
                                    <Text style={{color: Color.bg_1580e0, fontSize: Size.scaleSize(36)}}>取消</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{width: (Size.screenW-2*35)/2, 
                                    alignItems: 'center', justifyContent: 'center',}}
                                onPress={()=>{
                                    this.props.confirm && this.props.confirm()
                                }}>
                                    <Text style={{color: Color.bg_1580e0, fontSize: Size.scaleSize(36)}}>确定</Text>
                                </TouchableOpacity>
                            </View>
                        </View> 
                    </KeyboardAvoidingView>
                    
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create ({
    keyBoard_view: {
        // flex: 1,
        // backgroundColor:'red',
        justifyContent: 'center',
        // marginTop: -100,
        height: 400,
        // marginVertical: 400,
        // height: Size.scaleSize(450),
        
        // paddingHorizontal: 20,
        // paddingTop: 20,
    },
    input_view: {
        marginTop: Size.scaleSize(20),
        flexDirection: 'row', 
        alignItems: 'center',
    },
    bottom_view: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row', 
        // backgroundColor:'red', 
        height: Size.scaleSize(100), 
        marginTop: 15,
        borderTopColor: 'rgba(177,177,177,0.4)', 
        borderTopWidth: 0.5,
    }
})


