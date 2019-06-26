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

const bgImage = require('../../../assets/find/home/home-tapbar-background.png')

const ask_icon = require('../../../assets/store/personal_center/ask.png')

export default class QuestionsUserTAHeader extends Component {

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

                <Image source={bgImage} style={{height: Size.scaleSize(174)+Size.kTopHeight}}/>

                <Text style={styles.text_block}>{this.state.message}</Text>

                {/* 边框View */}
                <View style={styles.border_bg}>
                    {/* 用户信息 */}
                    <View style={styles.user_msg}>
                        <Image style={styles.header_image}/>
                        <Text style={styles.name}>智学习</Text>
                    </View>

                    <Text style={styles.question}>{this.state.message}</Text>

                    <View style={{flexDirection: 'row', 
                        alignItems: 'center', 
                        height: Size.scaleSize(110),}}>
                        {/* 向他提问 */}
                        <TouchableOpacity style={{backgroundColor: Color.bg_1580e0, 
                            borderRadius: 2.5, 
                            width: Size.scaleSize(154), 
                            height: Size.scaleSize(50),
                            alignItems: 'center', justifyContent: 'center',
                            left: (Size.screenW-Size.scaleSize(154)-2*Size.scaleSize(24))/2}}>
                            <Text style={{color: 'white', fontSize: Size.scaleSize(32)}}>向TA提问</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{flexDirection: 'row', 
                            alignItems: 'center', 
                            left: (Size.screenW-Size.scaleSize(154)-2*Size.scaleSize(24))/2+15}}>
                            <Image source={ask_icon}/>
                            <Text style={{color: Color.font_1a, 
                                fontSize: Size.scaleSize(24), left: 5}}>提问也赚钱</Text>
                        </TouchableOpacity>
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
})