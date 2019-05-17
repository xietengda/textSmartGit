import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color'

import {huiyuan} from "../../../components/ImgIcon";

export default class ActivityBargainView extends Component {
    render() {
        return(
            <View>
                { this.props.index <= 0 && <View style={{height: Size.space_30}}></View>}

                <TouchableOpacity style={styles.constain}
                onPress={()=>{
                    this.props.skipDetail && this.props.skipDetail()
                }}>
                    <Image style={styles.image}/>

                        {/* 信息 */}
                    <View style={styles.content}>

                        <View style={{flexDirection: 'row'}}>
                            <Text numberOfLines={2} style={{lineHeight: Size.scaleSize(40)}}>
                                <Text style={styles.name}>如何运用学习提升如何运用学习提升</Text>
                                <Image source={huiyuan} style={{width: Size.scaleSize(28), height: Size.scaleSize(28),}}/>
                            </Text>
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View >
                                <View style={styles.price_view}>
                                    <Text style={[styles.text_default]}>砍价后：</Text>
                                    <Text style={[styles.text_default, styles.price_text]}>￥68.88</Text>
                                    <Text style={[styles.text_default, styles.month_text]}>/6个月</Text>
                                </View>
                                <Text style={styles.text_default}>砍价结束</Text>
                            </View>

                            <TouchableOpacity style={styles.touch} onPress={()=>{
                                this.props.lookcourse && this.props.lookcourse()
                            }}>
                                <Text style={styles.look_text}>查看课程</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </TouchableOpacity>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        flexDirection: 'row',
        // alignItems: 'center',
        height: Size.scaleSize(198),
    },
    image: {
        backgroundColor: Color.font_b1,
        width: Size.scaleSize(225),
        height: Size.scaleSize(168),
        borderRadius: 5,
        left: Size.scaleSize(20),
    },
    content: {
        height: Size.scaleSize(168), 
        justifyContent: 'space-between', 
        position:'absolute', 
        left: Size.scaleSize(42)+Size.scaleSize(225), 
        width: Size.screenW-Size.scaleSize(225)-4*Size.scaleSize(20)-2*Size.space_30, 
        flex: 1,
    },
    name: {
        color: Color.font_1a,
        fontSize: Size.scaleSize(32),
    },
    text_default: {
        color: Color.font_b1,
        fontSize: Size.scaleSize(24),
    },
    touch: {
        backgroundColor: Color.bg_1580e0,
        width: Size.scaleSize(128),
        height: Size.space_50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2.5,
    },
    look_text: {
        color: Color.white,
        fontSize: Size.scaleSize(28),
    },
    price_view: {
        flexDirection: 'row',
        bottom: Size.space_10,
        alignItems: 'flex-end',
    },
    price_text: {
        color: Color.font_ff7e00, 
        fontSize: Size.scaleSize(32),
        top: Size.scaleSize(5),
        left: Size.scaleSize(-10),
    },
    month_text: {
        color: Color.font_ff7e00, 
        left: Size.scaleSize(-10),
    },
})