/*
* @Created by liqihui on 2019-04-19.
* @Desc ImageBottomText
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
import PropTypes from 'prop-types'
export default class ImageBottomText extends Component {
    // 默认属性
    static defaultProps = {
        image:defaultImg,
        text:'',
    };

    // 属性类型
    static propTypes = {
        image: PropTypes.string,
        text:PropTypes.string,
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        return (
            <View>
                <Image
                    source={{uri: this.props.image}}
                    style={styles.imageView}>
                </Image>
                <View style={styles.bottomText}>
                    <Text style={styles.bottomFont}>{this.props.text}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imageView: {
        flex:1,
        position:'relative',
        width:globalStyles.SIZE.scaleSize(225),
        height: globalStyles.SIZE.scaleSize(168),
        borderRadius:Size.radius_12,
    },
    bottomText: {
        position: 'absolute',
        backgroundColor:'rgba(0,0,0,0.4)',
        // backgroundColor:'red',
        left:0,
        bottom:0,
        right:0,
        borderBottomLeftRadius:Size.radius_12,
        borderBottomRightRadius:Size.radius_12,
        paddingHorizontal:5,
        paddingVertical:Size.scaleSize(5),
        // backgroundColor: 'red',
    },
    bottomFont: {
        fontSize: Size.text_24,
        color:'#fff',
        textAlign:'right',
        // backgroundColor: 'red'
    },
})
