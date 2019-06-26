import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color'

const answerBgImg = require('../../../assets/user/question/answer.png')

export default class QuestionsDetailBottomView extends Component {
    render() {
        return(
            <View style={[styles.constain, this.props.style]}>

                {/* 语音内容 */}
                <ImageBackground resizeMode='contain' source={answerBgImg} style={styles.voice_bg}>
                    <Text style={styles.voice_text}>￥99999.00偷听答案</Text>
                </ImageBackground>

                <View style={styles.number_text}>
                    <Text style={{color: Color.font_ff7e00}}>9999 </Text>
                    <Text style={styles.text_default}>人偷听</Text>

                    <Text style={styles.text_default}> · </Text>

                    <Text style={styles.text_default}>已回答</Text>
                    <Text style={{color: Color.font_ff7e00}}> 9999 </Text>
                    <Text style={styles.text_default}>个</Text>
                </View>

                {/* 回答他 */}
                <TouchableOpacity style={styles.button_answer}>
                    <Text style={{color: 'white', fontSize: Size.scaleSize(32)}}>回答TA</Text>
                </TouchableOpacity>

                <Text style={styles.status_desc}>过期未回答，已退款，但你可以无偿回答</Text>

                <Text style={styles.tip_desc}>稍安勿躁，答案还在路上 ~</Text>
                
                {/* 查看全部问答 */}
                <TouchableOpacity style={styles.look_all_button}>
                    <Text style={{color: Color.bg_1580e0, fontSize: Size.scaleSize(28)}}>查看全部问答>>></Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    // 语音背景图
    voice_bg: {
        flexDirection: 'row',
        width: Size.scaleSize(430), 
        height: Size.scaleSize(101),
        alignItems: 'center',
    },
    // 语音点击文字
    voice_text: {
        top: -Size.scaleSize(12),
        left: Size.scaleSize(80),
        fontSize: Size.scaleSize(24),
        color: 'white',
    },
    // 多少人偷听 回答多少个
    number_text: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Size.scaleSize(35),
    },
    // 问题内容
    text_default: {
        color: Color.font_b1,
        fontSize: Size.scaleSize(24),
    },
    // 文字状态描述
    status_desc: {
        marginTop: Size.space_30,
        color: Color.font_b1,
        fontSize: Size.scaleSize(24),
    },
    tip_desc: {
        marginTop: Size.scaleSize(45),
        color: Color.font_ff7e00,
        fontSize: Size.scaleSize(28),
    },
    button_answer: {
        backgroundColor: Color.bg_1580e0,
        height: Size.scaleSize(72),
        width: Size.scaleSize(300),
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Size.scaleSize(28),
    },
    look_all_button: {
        width: Size.screenW - 2*Size.scaleSize(65),
        height: Size.scaleSize(87),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Size.scaleSize(30),
        borderTopWidth: 0.5,
        borderTopColor: '#ebebeb',
    }
})