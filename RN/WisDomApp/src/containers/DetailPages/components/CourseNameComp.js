/*
* @Created by liqihui on 2019-04-16.
* @Desc CourseNameComp
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, TouchableOpacity, Image
} from 'react-native'
import PropTypes from 'prop-types';
import Size from "../../../config/Size";
import Color from "../../../config/Color";
const gift = require('../../../assets/coursedetails/gift.png')

export default class CourseNameComp extends Component {
    // 默认属性
    static defaultProps = {
        giveFriends:()=>{}
    };

    // 属性类型
    static propTypes = {
        giveFriends:PropTypes.func,
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        return (
            <View style={styles.bottomView}>
                <Text numberOfLines={2} style={styles.headerText}>领导拉到了发送到了房间数量的风景哦IE就塑料袋解放路时代峻峰数量的房间里附近</Text>
                <Text numberOfLines={1} style={styles.headerDes}>3.89万人订阅·已更新99期</Text>
                {/*当该课程参与售卖,才显示送好友*/}
                <TouchableOpacity style={styles.leftFloat} onPress={()=>{
                    this.props.giveFriends();
                }}>
                    <Image style={styles.gift} source={gift}></Image>
                    <Text style={styles.songhaoyou}>送好友</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bottomView:{
        paddingHorizontal: Size.space_30,
        paddingVertical: Size.space_30,
        backgroundColor:'#fff'
    },
    headerText:{
        fontSize: Size.scaleSize(32),
        lineHeight: Size.scaleSize(38),
    },
    headerDes:{
        marginTop: Size.space_30,
        fontSize: Size.scaleSize(24),
        color:Color.font_b1,
    },
    leftFloat: {
        position:'absolute',
        right:Size.space_20,
        bottom:Size.space_30,
        alignItems:'center'
    },
    gift:{
        width:Size.space_50,
        height:Size.scaleSize(44)
    },
    songhaoyou: {
        marginTop: Size.space_10,
        color: '#1580e0'
    },
})
