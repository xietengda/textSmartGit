import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color'

const coupon_blue = require('../../../assets/user/coupon/coupon-background-blue.png')
const coupon_orange = require('../../../assets/user/coupon/coupon-background-orange.png')

import CustomCouponOfCourseList from '../MyCouponConfigView/CustomCouponOfCourseList'

export default class MyCouponItemView extends Component {
    constructor (props) {
        super(props)
        // 初始状态
        this.state = {
            
        };
    }

    render() {
        return(
            // 空白间距
            <View style={{}} >
            
                <View style={{height: Size.space_20}}></View>

                <ImageBackground source={this.props.custom ? coupon_orange : coupon_blue} style={styles.coupon_image}>

                    <TouchableOpacity onPress={ ()=> {
                            { this.props.custom && 
                                this.props.selected && this.props.selected()}
                        }} >
                        <View style={{justifyContent: 'center',
                            alignItems: 'center',
                            width: Size.screenW-2*Size.scaleSize(18)-Size.scaleSize(140),
                            height: Size.scaleSize(190)}}>
                            <View style={{flexDirection: 'row', 
                                alignItems: 'center', 
                                height: Size.scaleSize(54),
                                justifyContent: 'center',
                                marginTop: Size.scaleSize(10)}}>

                                <Text style={{color: this.props.custom ? Color.font_ff7e00 : Color.bg_1580e0,
                                    fontSize: Size.scaleSize(36)}}>￥</Text>

                                <Text style={[styles.money, 
                                    {color: this.props.custom ? Color.font_ff7e00 : Color.bg_1580e0,}]}>100</Text>
                            </View>
                            <Text style={[styles.text_default, ]}>{this.props.custom ? '指定课程使用':'全店通用'}</Text>
                            <Text style={[styles.text_default, 
                                {marginTop: Size.scaleSize(10)}]}>无门槛使用</Text>
                            <Text style={[styles.text_default, 
                                {marginTop: Size.scaleSize(10)}]}>2018-08-08 23:23至2018-08-08 23:23</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{height: Size.scaleSize(190), 
                        width: Size.scaleSize(126),
                        alignItems: 'center',
                        justifyContent: 'center'}}>
                        <Text style={{color: '#f2f2f2', 
                            fontSize: Size.scaleSize(28)}}>{'立\n即\n使\n用'}</Text>
                    </TouchableOpacity>
                    
                </ImageBackground>

                {this.props.item.selected && <CustomCouponOfCourseList packUp={()=>{
                    // this.setState({ selected:true })
                    this.props.packUp && this.props.packUp()
                }}/>}
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    
    coupon_image: {
        height: Size.scaleSize(190),
        left: Size.scaleSize(24),
        width: Size.screenW-2*Size.scaleSize(20),
        flexDirection: 'row',
    },
    money: {
        color: Color.bg_1580e0, 
        fontSize: Size.scaleSize(72), 
        fontFamily: 'PingFang-SC-Medium', 
        top: -Size.scaleSize(72)/3, 
        height: Size.scaleSize(80),
        left: -Size.scaleSize(5),
    },
    text_default: {
        color: '#3a3a3a',
        fontSize: Size.scaleSize(24),
    },
})