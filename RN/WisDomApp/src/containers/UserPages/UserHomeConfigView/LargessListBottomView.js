import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color'

export default class LargessListBottomView extends Component {
    render() {
        return(
            <View style={[styles.constain, this.props.style]}>
            
                <Image style={styles.image}/>

                    {/* 信息 */}
                <View style={styles.content}>
                    <Text style={styles.name}>老师昵称老师昵称老师昵称</Text>
                    <Text style={styles.desc}>您还从未打赏过</Text>
                </View>

                <TouchableOpacity style={{left: Size.scaleSize(64),}} onPress={()=>{
                    this.props.reward && this.props.reward()
                }}>
                    <Text style={{color: Color.bg_1580e0, 
                        fontSize: Size.scaleSize(32)}}>去打赏</Text>
                </TouchableOpacity>
                    
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        flexDirection: 'row',
        alignItems: 'center',
        height: Size.scaleSize(150),
        width: Size.screenW,
        borderColor: 'rgba(177,177,177,0.4)',
        borderWidth: 0.5,
        backgroundColor: 'white',
    },
    image: {
        backgroundColor: Color.font_b1,
        width: Size.scaleSize(90),
        height: Size.scaleSize(90),
        borderRadius: Size.scaleSize(90)/2,
        left: Size.scaleSize(44),
    },
    content: {
        height: Size.scaleSize(70), 
        justifyContent: 'space-between', 
        left: Size.scaleSize(64),
        width: Size.screenW-Size.scaleSize(154)-Size.scaleSize(140),
    },
    name: {
        color: Color.font_1a,
        fontSize: Size.scaleSize(32),
    },
    desc: {
        color: '#b0b0b0',
        fontSize: Size.scaleSize(28),
    },
})