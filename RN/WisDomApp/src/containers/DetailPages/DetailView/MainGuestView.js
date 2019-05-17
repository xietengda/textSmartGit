/*
* @Created by liqihui on 2019-04-16.
* @Desc MainGuestView
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native'
import Size from "../../../config/Size";
import Color from "../../../config/Color";

export default class MainGuestView extends Component {
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

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headTitle}>
                    <Text>主讲嘉宾</Text>
                </View>
                <View style={styles.row}>
                    <Image style={styles.avatar}></Image>
                    <View style={styles.rightView}>
                        <Text style={styles.title}>罗涛</Text>
                        <Text style={styles.desc} numberOfLines={2}>陶斯大林福建省了地方可加适量的房间爱上了的看看哪款手机第三轮的费</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <Image style={styles.avatar}></Image>
                    <View style={styles.rightView}>
                        <Text style={styles.title}>罗涛</Text>
                        <Text style={styles.desc} numberOfLines={2}>陶斯大林福建省了地方可加适量的房间爱上了的看看哪款手机第三轮的费</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <Image style={styles.avatar}></Image>
                    <View style={styles.rightView}>
                        <Text style={styles.title}>罗涛</Text>
                        <Text style={styles.desc} numberOfLines={2}>陶斯大林福建省了地方可加适量的房间爱上了的看看哪款手机第三轮的费</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:Size.space_20,
        backgroundColor:'#fff',
        paddingHorizontal:Size.space_20,

    },
    headTitle:{
        height:Size.scaleSize(88),
        justifyContent:'center',
        borderBottomColor:Color.font_b1,
        borderBottomWidth:0.5,
    },
    row:{
        flex:1,
        flexDirection:'row',
        paddingVertical:Size.space_20,
        borderBottomColor:Color.font_b1,
        borderBottomWidth:0.25,
    },
    avatar:{
        height:Size.scaleSize(112),
        width:Size.scaleSize(112),
        borderRadius:Size.scaleSize(112/2),
        backgroundColor: 'red',
    },
    rightView:{
        flex:1,
        marginLeft:Size.space_20,
        justifyContent: 'space-between'
    },
    title:{
        fontSize:Size.text_28,
    },
    desc:{
        fontSize:Size.text_24,
        color:Color.font_b1
    }
})
