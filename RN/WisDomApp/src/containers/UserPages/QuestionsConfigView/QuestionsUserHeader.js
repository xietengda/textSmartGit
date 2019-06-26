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

import QuestionsNumberView from '../QuestionsConfigView/QuestionsNumberView'

const bgImage = require('../../../assets/find/home/home-tapbar-background.png')

export default class QuestionsUserHeader extends Component {

    constructor (props) {
        super(props)
        this.state = {
            message:'三人行，必有我师焉。如有不惑之处，请提问我吧~ 三人行，必有我师焉。如有不惑之处，请提问我吧~',
        }
    }

    render() {
        return(
            // 背景View
            <View style={[styles.header_bg, this.props.style]}>

                <Image source={bgImage} style={{height: Size.scaleSize(174)+Size.kTopHeight, width: Size.screenW}}/>

                <Text style={styles.text_block}>{this.state.message}</Text>

                {/* 边框View */}
                <View style={styles.border_bg}>
                    {/* 用户信息 */}
                    <View style={styles.user_msg}>
                        <Image style={styles.header_image}/>
                        <Text style={styles.name}>智学习</Text>
                    </View>

                    <Text style={styles.question}>{this.state.message}</Text>

                    {/* 提问我  偷听我 */}
                    <View style={styles.bottom_view}>
                        <QuestionsNumberView number={'￥99.99'} desc={'提问我'} 
                            style={{borderRightWidth: 0.5, 
                            borderRightColor: 'rgba(177,177,177,0.2)', 
                            height: Size.space_100, 
                            width: (Size.screenW-2*Size.space_30)/2, }}/>
                        <QuestionsNumberView number={'￥99.99'} desc={'偷听我'} style={{width: (Size.screenW-2*Size.space_30)/2,}}/>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    // 底部背景
    header_bg: {
        // height: Size.scaleSize(397)+Size.kTopHeight+Size.scaleSize(64)+Size.scaleSize(20)
    },
    // 边框
    border_bg: {
        position: 'absolute',
        // top:Size.kTopHeight,
        marginTop: Size.kTopHeight+Size.scaleSize(60),
        backgroundColor: Color.white,
        borderColor: 'rgba(177,177,177,0.4)',
        borderWidth: 0.5,
        borderRadius: Size.radius_12,
        marginHorizontal: Size.space_30,
        justifyContent: 'center',
        // alignItems: 'center',
        // top: Size.kTopHeight+Size.scaleSize(20),
        // height: Size.scaleSize(440),
    },
    // 用户信息
    user_msg: {
        top: -Size.scaleSize(128)/2+10,
        // backgroundColor: 'red',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    // 头像
    header_image: {
        backgroundColor: 'black',
        width: Size.scaleSize(128),
        height: Size.scaleSize(128),
        borderRadius: Size.scaleSize(128)/2,
    },
    //  名称
    name: {
        marginTop: Size.space_30,
        color: Color.font_1a,
        fontSize: Size.scaleSize(32),
    },
    //  问题
    question: {
        marginTop: -Size.space_20,
        marginHorizontal: Size.space_20,
        color: Color.font_b1,
        fontSize: Size.scaleSize(28),
    },
    text_block: {
        marginTop: Size.scaleSize(190),
        marginHorizontal: Size.space_50,
        color: 'transparent',
        fontSize: Size.scaleSize(28),
    },
    text_default: {
        color: Color.font_b1,
        fontSize: Size.scaleSize(28),
    },
    // 提问我  偷听我
    bottom_view: {
        borderTopWidth: 0.5,
        borderTopColor: 'rgba(177,177,177,0.2)',
        marginTop: Size.scaleSize(30),
        flexDirection: 'row',
        alignItems: 'center',
        height: Size.space_100,
    },
})