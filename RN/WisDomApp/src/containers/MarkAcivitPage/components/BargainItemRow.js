/*
* @Created by liqihui on 2019-05-13.
* @Desc BargainItemRow
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
import Size from "../../../config/Size";
import TimeTextComp from "../../../components/TimeTextComp";
export default class BargainItemRow extends Component {
    // 默认属性
    static defaultProps = {
        price:'',
        isBargain:false, //判断是否为砍价（砍价和拼团）
    };

    // 属性类型
    static propTypes = {
        price:PropTypes.string,
        isBargain:PropTypes.bool
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        const {item} = this.props || {};
        return (
            this.props.isBargain ? <View style={styles.container}>
                <View style={styles.leftView}>
                    <Image style={styles.avatar} />
                    <View style={{justifyContent:'space-between',marginLeft:Size.space_20}}>
                        <Text style={{fontSize:Size.text_28}}>{item.text}</Text>
                        <Text style={styles.text}>{item.time}</Text>
                    </View>
                </View>
                <Text style={styles.text}>已砍￥ <Text style={{color:globalStyles.COLOR.font_ff7e00}}>{item.price}</Text></Text>
            </View> : <View style={styles.container}>
                <View style={styles.leftView}>
                    <Image style={styles.avatar} />
                    <View style={{justifyContent:'space-between',marginLeft:Size.space_20}}>
                        <Text style={{fontSize:Size.text_28}}>还差<Text style={{color:globalStyles.COLOR.font_ff7e00}}>{item.text}人</Text>成团</Text>
                        <TimeTextComp endTime={item.time}/>
                    </View>
                </View>
                <TouchableOpacity style={styles.goPTbtn}>
                    <Text style={styles.text28}>去拼团</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        height:Size.scaleSize(140),
        flexDirection:'row',
        paddingHorizontal:Size.space_20,
        paddingVertical:Size.space_30,
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth: Size.line_height,
        borderBottomColor:globalStyles.COLOR.bg_color,
    },
    avatar: {
        width: Size.space_80,
        height: Size.space_80,
        borderRadius: Size.space_40,
        backgroundColor: '#000'

    },
    leftView: {
        flexDirection: 'row',
    },
    goPTbtn:{
        paddingHorizontal:Size.scaleSize(24),
        paddingVertical:Size.scaleSize(12),
        borderRadius:Size.radius_12,
        backgroundColor: globalStyles.COLOR.primary
    },
    text28: {
        fontSize: Size.text_28,
        color:'#fff'
    },
    text: {
        fontSize:Size.text_24,
        color:globalStyles.COLOR.font_b1,
    },
})
