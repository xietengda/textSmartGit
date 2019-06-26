/*
* @Created by liqihui on 2019-04-18.
* @Desc ContentHeadComp
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text
} from 'react-native'
import Size from "../../../config/Size";

export default class ContentHeadComp extends Component {
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

    render() {
        return (
            <View style={styles.headText}>
                <Text style={styles.text}>{this.props.title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headText:{
        marginTop:globalStyles.SIZE.space_20,
        height:globalStyles.SIZE.space_90,
        paddingLeft: Size.space_20,
        backgroundColor: '#fff'
    },
    text:{
        marginTop: Size.space_30,
        fontSize: Size.space_30,
    },
})
