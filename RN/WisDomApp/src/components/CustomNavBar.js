/*
* @Created by liqihui on 2019-04-09.
* @Desc CustomNavBar
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
import {back} from "./ImgIcon";
export default class CustomNavBar extends Component {
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
                <Image source={back} style={styles.back}></Image>
                <Text style={styles.navText}>本期推荐</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginTop:Size.kStatusBarHeight,
        height:Size.kTabBarHeight,
        alignItems:'center',
        paddingHorizontal:Size.space_30
    },
    back: {
        width:Size.scaleSize(20),
        height:Size.scaleSize(38)
    },
    navText: {
        color: globalStyles.COLOR.white,
        fontSize: globalStyles.SIZE.TITLE_NAV,
        fontFamily: 'PingFangSC-Medium',
        flex: 1,
        textAlign: 'center'
    }
})
