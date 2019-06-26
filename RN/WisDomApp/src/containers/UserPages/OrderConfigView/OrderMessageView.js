import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'

import Size from '../../../config/Size'

export default class OrderMessageView extends Component {
    render() {
        return (
            // {/* 订单信息 */}
            <View style={[styles.order_msg, this.props.style]}>
                <Image style={styles.order_image}/>

                <View style={styles.text_view}>
                    <Text style={{color: 'rgb(26,26,26)', fontSize: Size.scaleSize(28)}}>领导力与九型人格管理之一号人格之罗涛的成功之路</Text>

                    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                        <View>
                            <Text style={[styles.text_default, {marginBottom: Size.scaleSize(10)}]}>单价：￥99.99</Text>
                            <Text style={styles.text_default}>数量：9999</Text>
                        </View>
                        
                        <Text style={[styles.text_default, {position: 'absolute', right: Size.scaleSize(0)}]}>￥999999.99</Text>

                    </View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    // 订单信息
    order_msg: {
        flexDirection: 'row',
        alignItems: 'center',
        height: Size.scaleSize(228),
    },
    // 订单图片
    order_image: {
        width: Size.scaleSize(225),
        height: Size.scaleSize(168),
        backgroundColor: 'rgb(177,177,177)',
        borderRadius: 5,
        // 定位：绝对定位relative，相对定位absolute，固定定位pix
        position: 'absolute',
        left: Size.scaleSize(21),
    },
    // 统一使用
    text_view: {
        // 定位：绝对定位relative，相对定位absolute，固定定位pix
        position: 'absolute',
        //两端对齐，项目之间的间隔都相等。
        justifyContent: 'space-between',
        left: Size.scaleSize(266),
        right: Size.scaleSize(24),
        height: Size.scaleSize(168),
    },
    text_default: {
        color: 'rgb(177,177,177)',
        fontSize: Size.scaleSize(24),
    },
})