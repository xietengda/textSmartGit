import React, {Component} from 'react'
import {
    StyleSheet,
    Image,
    Text,
    View,
} from 'react-native'

import Size from '../../../config/Size'

const iconImg = require('../../../assets/user/home/me-home-teacher-normal.png')
const arrowImg = require('../../../assets/base/next_arrows.png')

export default class IconAndTitleView extends Component {
    render() {
        return (
            <View style={this.props.style}>
                <Image resizeMode='contain' source={iconImg} style={styles.icon}/>
                <Text style={styles.title}>我是老师</Text>
                <Image resizeMode='contain' source={arrowImg} style={styles.arrow}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        width: Size.scaleSize(41),
        height: Size.scaleSize(41),
        left: Size.scaleSize(34),
    },
    title: {
        // 定位：绝对定位relative，相对定位absolute，固定定位pix
        // position: 'absolute',
        color: 'rgb(58,58,58)',
        fontSize: Size.scaleSize(28),
        left: Size.scaleSize(34)+Size.scaleSize(20),
    },
    arrow: {
        // 定位：绝对定位relative，相对定位absolute，固定定位pix
        position: 'absolute',
        width: 15,
        height: 15,
        right: Size.scaleSize(16),
    }
})