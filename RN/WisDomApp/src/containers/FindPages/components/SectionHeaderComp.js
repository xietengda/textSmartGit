/*
* @Created by liqihui on 2019-04-03.
* @Desc SectionHeaderComp
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import Color from "../../../config/Color";
import {spread_right} from "../../../components/ImgIcon";
import PropTypes from 'prop-types'
export default class SectionHeaderComp extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {
        title: PropTypes.string,
    };

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
                <Text style={styles.textfont}>{this.props.title || ''}</Text>
                <TouchableOpacity style={styles.right} onPress={()=>{
                    this.props.onClick && this.props.onClick()
                }}>
                    <Text style={styles.rightFont}>{'查看全部'}</Text>
                    <Image source={spread_right} style={styles.arrows}></Image>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height:globalStyles.SIZE.space_90,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    textfont: {
        fontSize:globalStyles.SIZE.text_32,
        color:Color.font_1a,
    },
    right: {
        flexDirection:'row',
        height:globalStyles.SIZE.space_90,
        alignItems:'center',
    },
    rightFont: {
        fontSize: globalStyles.SIZE.text_24,
        color:Color.font_b1,
        marginRight:globalStyles.SIZE.scaleSize(10),
    },
    arrows: {
        width:globalStyles.SIZE.scaleSize(12),
        height:globalStyles.SIZE.scaleSize(22),
        marginBottom:1,
        // backgroundColor:'red'
    }
})
