/*
* @Created by liqihui on 2019-04-24.
* @Desc ImageRightText
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, Image
} from 'react-native'
import Size from "../config/Size";
import PropTypes from 'prop-types';
import Color from "../config/Color";
const reviewIcon = require('../assets/find/home/modular/recommend-comment.png');
const learnIcon = require('../assets/find/home/modular/recommend-browse.png');

export default class ImageRightText extends Component {
    // 默认属性
    static defaultProps = {
        styles:{},
    };

    // 属性类型
    static propTypes = {
        styles:PropTypes.style,
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        const {img,text} = this.props || ''
        return (
            <View style={[styles.numView,this.props.styles]}>
                <Image style={styles.imgIcon}
                       resizeMode={'contain'}
                       source={img == 'reviewIcon' ? reviewIcon : learnIcon}></Image>
                <Text style={styles.numText}
                      numberOfLines={1}>{text || 0}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    numView: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    imgIcon:{
        width: Size.scaleSize(40),
        height: Size.scaleSize(29)
    },
    numText:{
        fontSize:Size.scaleSize(24),
        marginLeft:Size.space_10,
        color:Color.font_b1
    }
})
