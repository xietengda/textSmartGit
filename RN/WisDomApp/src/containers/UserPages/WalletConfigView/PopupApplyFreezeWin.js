import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Modal,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native'

import Size from '../../../config/Size'

import Color from '../../../config/Color';

export default class PopupApplyFreezeWin extends Component {

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
                            left: Size.scaleSize(40), width: Size.screenW-2*Size.scaleSize(40),
                            height: Size.scaleSize(450), 
                            }]}>

                            <Text style={{color: Color.font_1a, fontSize: Size.scaleSize(32),
                                left: Size.scaleSize(50), marginTop: Size.scaleSize(30)}}>解冻理由</Text>
                            <View style={styles.input_view}> 
                                <TextInput 
                                multiline={true} 
                                underlineColorAndroid={'#ffffff'}
                                style={{height: Size.scaleSize(195), textAlignVertical:'top', }}/>
                            </View>

                            <View style={styles.bottom_view}>
                                <TouchableOpacity style={{width: (Size.screenW-2*Size.scaleSize(40))/2, 
                                    alignItems: 'center', justifyContent: 'center', 
                                    borderRightColor: 'rgba(177,177,177,0.4)', borderRightWidth: 0.5}}
                                onPress={()=>{
                                    this.props.cancel && this.props.cancel()
                                }}>
                                    <Text style={{color: Color.font_b1, fontSize: Size.scaleSize(32)}}>取消</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{width: (Size.screenW-2*Size.scaleSize(40))/2, 
                                    alignItems: 'center', justifyContent: 'center',}}
                                onPress={()=>{
                                    this.props.submit && this.props.submit()
                                }}>
                                    <Text style={{color: Color.bg_1580e0, fontSize: Size.scaleSize(32)}}>提交</Text>
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
        justifyContent: 'center',//
        marginTop: -100,
        height: Size.scaleSize(650),
        // marginVertical: 400,
        // height: Size.scaleSize(450),
        
        // paddingHorizontal: 20,
        // paddingTop: 20,
    },
    input_view: {
        marginHorizontal: Size.scaleSize(30), 
        borderColor: 'rgba(177,177,177,0.8)', borderWidth:0.5, 
        borderRadius: Size.radius_12, height: Size.scaleSize(230),
        marginTop: Size.scaleSize(30),
    },
    bottom_view: {
        flexDirection: 'row', 
        width: Size.screenW-2*Size.scaleSize(40), 
        // backgroundColor:'red', 
        height: Size.scaleSize(100), marginTop: Size.scaleSize(30),
        borderTopColor: 'rgba(177,177,177,0.4)', borderTopWidth:0.5,
    }
})


