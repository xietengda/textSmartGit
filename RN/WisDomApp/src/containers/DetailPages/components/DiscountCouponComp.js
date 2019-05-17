/*
* @Created by liqihui on 2019-04-26.
* @Desc DiscountCouponComp
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground
} from 'react-native'
import {coupon_orange} from "../../../components/ImgIcon";
import Size from "../../../config/Size";
import Color from "../../../config/Color";
import model from '../model';
import {observer} from "mobx-react";

@observer
export default class DiscountCouponComp extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
        };
    }

    render() {
        const {item,isDiscount} = this.props || {};
        return (
            <ImageBackground source={coupon_orange} style={styles.coupon}>
                <View style={styles.left}>
                    <Text style={styles.price}>￥{item.price}</Text>
                    <Text style={styles.desc}>{item.appointCourse}</Text>
                    <Text style={styles.desc}>{item.isUse}</Text>
                    <Text style={styles.desc}>{item.time}</Text>
                </View>
                <TouchableOpacity style={styles.right} onPress={()=>{
                    model.discount = item.price;
                    this.props.discount && this.props.discount(item.price)
                }}>
                    <Text style={{width:Size.space_30,color: '#fff'}}>立即领取</Text>
                </TouchableOpacity>
                {isDiscount && <View style={{flex:1,position:'absolute',top:0,right:0,left:0,bottom:0,backgroundColor: 'rgba(255,255,255,0.6)'}}/>}
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    coupon: {
        flexDirection:'row',
        marginTop:Size.scaleSize(24),
        height:Size.scaleSize(163),
        marginHorizontal:Size.space_30,
        backgroundColor:'rgba(255,255,255,0.4)'
    },
    left: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    right: {
        width:Size.scaleSize(108),
        height:Size.scaleSize(163),
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight:Size.space_20
    },

    //text
    price: {
        color: Color.font_ff7e00,
        fontSize: Size.scaleSize(44),
    },
    desc: {
        fontSize: Size.text_24,
        lineHeight:Size.space_30,
    },
})
