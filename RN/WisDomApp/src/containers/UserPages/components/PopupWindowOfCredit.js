import React, {Component} from 'react'
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity,
    Modal,
    ImageBackground,
} from 'react-native'

import Size from '../../../config/Size'
import Color from '../../../config/Color'

const bg_image = require('../../../assets/user/credit/receivesuccess-popup.png')

export default class PopupWindowOfCredit extends Component {
    constructor(props) {
        super(props);
        this.state = {modalVisible: false};
      }
    
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <Modal animationType={'fade'}
                transparent = {true}>

                <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                    
                </View>
                
                <View style={{width: Size.screenW, height: Size.screenH,
                        position: 'absolute', alignItems: 'center', justifyContent: 'center',
                        // backgroundColor: 'rgb(111,222,121)'
                }}>

                    <ImageBackground resizeMode='contain' source={bg_image} 
                        style={{width: Size.screenW-80, height: Size.screenW*1.1,
                        alignItems: 'center', left: Size.scaleSize(20), top: -Size.scaleSize(100)}}>

                        <View style={{alignItems: 'center', 
                            marginTop: Size.scaleSize(229), left: -Size.scaleSize(20)}}>
                            <Text style={{color: '#3b3b3b', 
                                fontSize: Size.scaleSize(32), }}>{this.props.item.title}</Text>

                            <Text style={{color: '#3b3b3b', 
                                fontSize: Size.scaleSize(32), 
                                marginTop: Size.scaleSize(10)}}>{this.props.item.detail}</Text>

                            <Text style={{color: Color.font_ff7e00, 
                                fontSize: Size.scaleSize(48), 
                                marginTop: Size.space_20}}>{this.props.item.number}</Text>
                        </View>

                        <TouchableOpacity style={{width: Size.scaleSize(100), 
                            height: Size.scaleSize(100), 
                            // backgroundColor:'rgba(0,0,0,0.5)',
                            left: (Size.screenW-Size.scaleSize(100)-80)/2-Size.scaleSize(18),
                            position: 'absolute', bottom: Size.scaleSize(25),}}
                        onPress={()=>{
                            this.props.closeThis && this.props.closeThis()
                        }}>

                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    
})
