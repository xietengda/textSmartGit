/*
* @Created by liqihui on 2019-04-16.
* @Desc BelongToShopComp
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, Image, TouchableOpacity
} from 'react-native'
import Size from "../../../config/Size";

export default class BelongToShopComp extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }
    render(){
        return(
            <View style={styles.stop}>
                <View style={styles.leftView}>
                    <Image style={styles.avatar}></Image>
                    <View style={styles.rightView}>
                        <Text>博大文化传播有限公司</Text>
                        <Text style={styles.fansText}>粉丝 9999    课程 132</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.attentionBtn}>
                    <Text style={styles.attentionText}>关注</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    stop:{
        marginTop: Size.space_20,
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingHorizontal: Size.space_20,
        paddingVertical: Size.space_30,
        backgroundColor:'#fff',
        alignItems:'center'
    },
    avatar:{
        width:Size.scaleSize(112),
        height:Size.scaleSize(112),
        backgroundColor:'red',
        borderRadius:Size.scaleSize(112/2),
    },
    leftView: {
        flex:1,
        flexDirection:'row',
    },
    rightView: {
        flex:1,
        marginLeft: Size.space_20,
        justifyContent: 'space-between'
    },
    fansText: {
        color:'#c1c1c1',
    },
    attentionBtn: {
        backgroundColor: '#1580e0',
        width: Size.scaleSize(128),
        height: Size.space_50,
        borderRadius: Size.radius_12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    attentionText: {
        color: '#fff',
    },
})
