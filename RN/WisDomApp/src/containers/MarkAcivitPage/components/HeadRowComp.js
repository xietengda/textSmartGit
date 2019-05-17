/*
* @Created by liqihui on 2019-05-15.
* @Desc HeadRowComp
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
import Color from "../../../config/Color";
import ImageBottomText from "../../../components/ImageBottomText";
import PropTypes from 'prop-types';
export default class HeadRowComp extends Component {
    // 默认属性
    static defaultProps = {
        item:{},
        isBargain:false,
    };

    // 属性类型
    static propTypes = {
        item:PropTypes.object,
        isBargain:PropTypes.boolean,
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
            <View style={[styles.headRow]}>
                <ImageBottomText text={item.updateNum}/>
                {
                    this.props.isBargain ? <View style={styles.rightText}>
                        <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
                        <View>
                            <Text style={styles.bottomPrice}>原价:<Text style={styles.oldPrice} numberOfLines={1}>￥{item.oldPrice}</Text></Text>
                            <View style={[styles.bottomView,{justifyContent:'space-between'}]}>
                                <Text style={styles.text}>底价: <Text style={{fontSize:Size.text_28,color:Color.font_ff7e00}}>￥{item.bottomPrice}</Text></Text>
                                <Text style={styles.text}>{item.partiMember}万人参与砍价</Text>
                            </View>
                        </View>
                    </View> : <View style={styles.rightText}>
                        <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
                        <View>
                            <Text style={styles.bottomPrice}>{item.desc}人成团</Text>
                            <View style={styles.bottomView}>
                                <Text style={styles.text}>拼团价: <Text style={{fontSize:Size.text_32,color:Color.font_ff7e00}}>￥{item.groupPrice}</Text></Text>
                                <Text style={styles.text}>  省￥{item.sparePrice}</Text>
                            </View>
                        </View>
                    </View>
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    headRow: {
        flexDirection: 'row',
        height:Size.scaleSize(228),
        paddingHorizontal:Size.space_20,
        paddingVertical:Size.space_30,
        backgroundColor: '#fff'
    },
    rightText: {
        flex:1,
        marginLeft:Size.space_20,
        justifyContent:'space-between'
    },
    title: {
        // height:Size.space_40,
        // lineHeight:Size.space_40,
        fontSize:Size.scaleSize(28),
    },
    bottomView: {
        flexDirection:'row',
        alignItems:'center',
        marginTop:5,
    },
    bottomPrice:{
        fontSize:Size.text_24,
        color:Color.font_b1
    },
    oldPrice:{
        fontSize:Size.text_24,
        textDecorationLine:'line-through',
        color:Color.font_b1
    },
    statusDesc:{
        fontSize:Size.scaleSize(24),
        color:Color.font_b1,
        // testD
    },
    text: {
        fontSize:Size.text_24,
        color:Color.font_b1,
    },
})
