// 动态
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

// 回复
const commend_icon = require('../../../assets/classmate/home/comment.png')
// 点赞
const likes_icon = require('../../../assets/classmate/home/likes-press.png')
// 打赏
const largess_icon = require('../../../assets/classmate/home/largess-normal.png')

const answerBgImg = require('../../../assets/user/question/answer.png')

export default class MyDynamicItemView extends Component {
    render() {
        return(
            <View style={styles.constain}>
                <Image style={styles.image}/>

                    {/* 信息 */}
                <View style={styles.content}>

                    <View style={{height: Size.scaleSize(70),
                        justifyContent: 'space-between',
                        marginTop: Size.scaleSize(40)}}>
                        <View style={{flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',}}>

                            <Text numberOfLines={1} style={styles.name}>小旺仔小旺仔</Text>

                            <TouchableOpacity>
                                <Text style={{color: Color.font_b1, fontSize: Size.scaleSize(24)}}>删除</Text>
                            </TouchableOpacity>
                        </View>

                        <Text numberOfLines={1}
                            style={{color: Color.font_b1, fontSize: Size.scaleSize(24)}}>公司的名称公司的名称公司的名称·产品经理产品经理</Text>
                    </View>

                    <Text style={{color: Color.font_1a,
                        fontSize: Size.scaleSize(28),
                        marginTop: Size.scaleSize(30)}}>面试官问题还有没有投递过其他公司或还拿到了哪家公司的这是送分的还是会</Text>
                    {/* 语音 */}
                    <ImageBackground resizeMode='contain' source={answerBgImg} style={styles.voice_bg}>

                        <Text style={styles.voice_time}>1‘30’‘</Text>
                    </ImageBackground>

                    <View style={{flexDirection:'row',
                        justifyContent: 'space-between',
                        marginTop: Size.scaleSize(30),
                        alignItems: 'center'}}>

                        <Text style={styles.text_default}>1小时前</Text>

                        <View style={{flexDirection: 'row',
                            alignItems: 'center', }}>
                            {/* 回复 */}
                            <TouchableOpacity style={{flexDirection: 'row',
                                alignItems: 'center',
                                right: Size.scaleSize(100)}}>
                                <Image source={commend_icon}/>
                                <Text style={[styles.text_default, {left: 5}]}>626</Text>
                            </TouchableOpacity>
                            {/* 点赞 */}
                            <TouchableOpacity style={{flexDirection: 'row',
                                alignItems: 'center',
                                right: Size.scaleSize(50)}}>
                                <Image source={likes_icon}/>
                                <Text style={[styles.text_default, {color: Color.bg_1580e0, left: 5}]}>326</Text>
                            </TouchableOpacity>
                            {/* 打赏 */}
                            <TouchableOpacity style={{flexDirection: 'row',
                                alignItems: 'center',
                                right: Size.scaleSize(10)}}>
                                <Image source={largess_icon}/>
                                <Text style={[styles.text_default, {left: 5}]}>1.5万</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    constain: {
        flexDirection: 'row',
        paddingBottom: Size.scaleSize(30),
        borderBottomColor: 'rgba(177,177,177,0.3)',
        borderBottomWidth: 0.5,
    },
    image: {
        backgroundColor: 'black',
        width: Size.scaleSize(90),
        height: Size.scaleSize(90),
        borderRadius: Size.scaleSize(90)/2,
        left: Size.scaleSize(20),
        marginTop: Size.scaleSize(30),
    },
    content: {
        justifyContent: 'space-between',
        left: Size.scaleSize(40),
        // position:'absolute',
        // left: Size.scaleSize(42)+Size.scaleSize(225),
        width: Size.screenW-Size.scaleSize(90)-2*Size.scaleSize(24)-Size.space_20-Size.scaleSize(40),
    },
    name: {
        color: Color.font_1a,
        fontSize: Size.scaleSize(28),
        // left: Size.scaleSize(0),
    },
    // 语音背景图
    voice_bg: {
        flexDirection: 'row',
        width: Size.scaleSize(430),
        height: Size.scaleSize(101),
        alignItems: 'center',
        marginTop: Size.scaleSize(25),
    },
    // 语音时间
    voice_time: {
        fontSize: Size.scaleSize(32),
        color: 'white',
        position: 'absolute',
        right: Size.scaleSize(20),
        top: Size.scaleSize(18),
    },
    text_default: {
        color: Color.font_b1,
        fontSize: Size.scaleSize(24),
    },
    number_text: {
        left: Size.scaleSize(10),
    },
})
