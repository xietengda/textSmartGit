import React, {Component} from 'react'

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View,
} from 'react-native'
import Color from '../../../config/Color';
import Size from '../../../config/Size';

const home_icon = require('../../../assets/user/notification_Center/home.png')

export default class StoreGroupBottomView extends Component {
    render(){
        return(
            <View style={styles.constain_bg}>
                <View style={styles.constain}>
                    <TouchableOpacity style={{alignItems: 'center', left: Size.scaleSize(16)}}>
                        <Image source={home_icon}/>
                        <Text style={{color: Color.bg_1580e0, 
                            fontSize: Size.scaleSize(20),
                            marginTop: 3}}>主页</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{backgroundColor: Color.bg_1580e0, 
                        alignItems: 'center', justifyContent: 'center', 
                        height: Size.scaleSize(78), borderRadius: Size.scaleSize(78)/2, 
                        width: Size.screenW-Size.scaleSize(148)-Size.scaleSize(34), }}>

                        <Text style={{color: 'white', fontSize: Size.scaleSize(32)}}>私聊</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    constain_bg: {
        backgroundColor: 'white',
        borderTopColor: 'rgba(177,177,177,0.3)',
        borderTopWidth: 0.5,
        height: Size.scaleSize(98),
    },
    constain: {
        height: Size.scaleSize(98),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: Size.scaleSize(34),
    }
})