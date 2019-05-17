import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ImageBackground,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color';

export default class UserTAHomePageHeaderView extends Component {

    constructor(props) {
	    super(props);
	    this.state = {
            text:''
	    };
	}

    render() {

        return (
            <View style={styles.container}>
                <Image style={{width:Size.screenW, 
                    height: Size.scaleSize(524),}}
                    source={{uri: 'https://pics3.baidu.com/feed/377adab44aed2e739ec412a339733d8f86d6fa83.jpeg?token=666e9723dc9f03dc322003e7b2794f0b&s=76A308E60662875D14D0F9880300708C'}}/>

                <View style={{height: Size.scaleSize(62)}}></View>

                <View style={{backgroundColor: 'rgba(255,255,255,0.9)', 
                    borderRadius: Size.radius_12,
                    marginLeft: Size.scaleSize(24), 
                    paddingBottom: 10,
                    position:'absolute', 
                    bottom: 0,
                    borderColor: 'rgba(177,177,177,0.4)',
                    borderWidth: 0.5}}>
                    <View style={{flexDirection: 'row', 
                        left: Size.scaleSize(170), 
                        marginTop: Size.scaleSize(42)}}>
                        <TouchableOpacity style={{flexDirection: 'row', alignItems:'center',}}
                            onPress={()=>{
                                this.props.addressBook && this.props.addressBook()
                            }}>
                            <Text style={{color: Color.font_1a, 
                                fontSize: Size.scaleSize(24)}}>关注 </Text>
                            <Text style={{color: Color.font_ff7e00, 
                                fontSize: Size.scaleSize(24)}}>99.99万</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection: 'row', alignItems:'center', left: Size.scaleSize(63)}}
                            onPress={()=>{
                                this.props.addressBook && this.props.addressBook()
                            }}>
                            <Text style={{color: Color.font_1a, 
                                fontSize: Size.scaleSize(24)}}>粉丝 </Text>
                            <Text style={{color: Color.font_ff7e00, 
                                fontSize: Size.scaleSize(24)}}>99.99万</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{color: Color.font_1a, 
                        fontSize: Size.scaleSize(32), 
                        marginTop: Size.scaleSize(20), left: 10,}}>用户名称或微信名称</Text>
                    <Text style={{color: Color.font_1a, 
                        fontSize: Size.scaleSize(24), 
                        marginTop: Size.scaleSize(30), left: 10,}}>学号：22334455</Text>
                    <Text style={{color: Color.font_1a, 
                        fontSize: Size.scaleSize(24), 
                        marginTop: Size.scaleSize(30), marginHorizontal: 10,}}>做人要有信仰，做事要有信心。信仰是指路明灯，信息是前进动力。</Text>

                    <View style={{marginTop: Size.scaleSize(23), left: 10, flexDirection: 'row', }}>
                        <TouchableOpacity style={styles.attention_button}
                            onPress={()=>{
                                this.props.attention && this.props.attention()
                            }}>
                            <Text style={{color: 'white', 
                            fontSize: Size.scaleSize(28), }}>关注TA</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.quiz_button}
                            onPress={()=>{
                                this.props.quiz && this.props.quiz()
                            }}>
                            <Text style={{color: 'white', 
                            fontSize: Size.scaleSize(28), }}>提问TA</Text>
                        </TouchableOpacity>
                    </View>
                    

                    <Image style={{position: 'absolute', 
                        width: Size.scaleSize(128), 
                        height: Size.scaleSize(128),
                        backgroundColor: Color.font_b1,
                        borderRadius: Size.scaleSize(128)/2,
                        left: Size.scaleSize(23),
                        top: -Size.scaleSize(128)/2}}/>
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        
    },
    title: {
        color: 'black',
        fontSize: Size.scaleSize(28),
    },
    attention_button: {
        alignItems:'center', 
        justifyContent: 'center', 
        borderRadius: 5, 
        backgroundColor: Color.bg_1580e0,
        width: Size.scaleSize(128),
        height: Size.scaleSize(50), 
    },
    quiz_button: {
        alignItems:'center', 
        justifyContent: 'center', 
        borderRadius: 5, 
        backgroundColor: Color.bg_1580e0,
        width: Size.scaleSize(128),
        height: Size.scaleSize(50), 
        left: Size.scaleSize(60),
    }
})