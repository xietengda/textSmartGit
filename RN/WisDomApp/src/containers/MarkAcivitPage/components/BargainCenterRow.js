/*
* @Created by liqihui on 2019-05-14.
* @Desc BargainCenterRow
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
import PropTypes from 'prop-types'
import Size from "../../../config/Size";
import Color from "../../../config/Color";
import ImageBottomText from "../../../components/ImageBottomText";
import TimeTextComp from "../../../components/TimeTextComp";
export default class BargainCenterRow extends Component {
    // 默认属性
    static defaultProps = {
        price:0,
        isBargain:false,
    };

    // 属性类型
    static propTypes = {
        price:PropTypes.string,
        isBargain:PropTypes.bool,
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
            this.props.isBargain ? <View style={styles.headRow}>
                <ImageBottomText text={item.updateNum}/>
                <View style={styles.rightText}>
                    <Text numberOfLines={2} style={styles.title}>{'如何运用智学习提示升级阿里客服节发生了地方加快递费eefsdfe'}</Text>
                    <View>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.bottomPrice}>原价:<Text style={styles.oldPrice} numberOfLines={1}>￥{item.oldPrice}</Text></Text>
                            <Text style={styles.nowPrice}>￥{item.nowPrice}</Text>
                        </View>
                        <View style={styles.timeCountDown}>
                            <TimeTextComp  endTime={item.endTime}
                                           beforeText={'仅剩'}
                                           backText={'结束'}
                                           countDownEnd={()=>{

                                           }}/>
                            <Text style={styles.bottomPrice}>{item.bottomPrice}</Text>
                        </View>
                    </View>
                </View>
            </View> : <View style={styles.headRow}>
                <ImageBottomText text={item.updateNum}/>
                <View style={styles.rightText}>
                    <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
                    <View>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.bottomPrice}>{item.desc}</Text>
                            <Text style={styles.nowPrice}>￥{item.groupPrice}</Text>
                        </View>
                        <View style={styles.timeCountDown}>
                            <TimeTextComp  endTime={item.endTime}
                                           beforeText={'仅剩'}
                                           backText={'结束'}
                                           countDownEnd={()=>{

                                           }}/>
                            <Text style={styles.bottomPrice}>{'拼团价'}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headRow: {
        flexDirection: 'row',
        height:Size.scaleSize(228),
        paddingLeft:Size.space_20,
        paddingRight:Size.scaleSize(5),
        // paddingHorizontal:Size.space_20,
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
        fontSize:Size.text_28,
    },
    //
    oldPrice:{
        fontSize:Size.text_24,
        textDecorationLine:'line-through',
        color:Color.font_b1
    },
    nowPrice:{
        fontSize:Size.text_36,
        color:Color.font_ff7e00,
    },
    bottomPrice:{
        fontSize:Size.text_24,
        color:Color.font_b1
    },
    timeCountDown: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:5,
        alignItems:'center',
    },
})
