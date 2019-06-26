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

const largess_icon = require('../../../assets/user/Personal_homepage/largess.png')

export default class LargessListHeaderView extends Component {
    render() {
        return(
            <View style={styles.constain}>
            
                <Image style={styles.image}/>

                    {/* 信息 */}
                <View style={styles.content}>
                    <Text style={styles.name}>老师昵称老师昵称老师昵称</Text>
                    <Text style={styles.desc}>感谢你对我的支持</Text>
                </View>

                <TouchableOpacity style={{left: Size.scaleSize(168), }} 
                onPress={()=>{this.props.largess && this.props.largess()}}>
                    <Image source={largess_icon} />
                </TouchableOpacity>
                    
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        flexDirection: 'row',
        alignItems: 'center',
        height: Size.scaleSize(148),
        borderBottomColor: 'rgba(177,177,177,0.3)',
        borderBottomWidth: 0.5,
    },
    image: {
        backgroundColor: Color.font_b1,
        width: Size.scaleSize(90),
        height: Size.scaleSize(90),
        borderRadius: Size.scaleSize(90)/2,
        left: Size.scaleSize(44),
    },
    content: {
        height: Size.scaleSize(80), 
        justifyContent: 'space-between', 
        left: Size.scaleSize(64),
        width: Size.screenW-Size.scaleSize(154)-Size.scaleSize(200),
    },
    name: {
        color: Color.font_1a,
        fontSize: Size.scaleSize(32),
    },
    desc: {
        color: '#b0b0b0',
        fontSize: Size.scaleSize(24),
    },
})