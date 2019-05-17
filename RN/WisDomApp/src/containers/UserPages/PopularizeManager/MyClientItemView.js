import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color'

export default class MyClientItemView extends Component {
    render() {
        return(
            <View>

                <View style={[styles.constain, 
                    {borderTopLeftRadius: this.props.index==0 ? Size.radius_12:0, 
                    borderTopRightRadius: this.props.index==0 ? Size.radius_12:0, 
                    borderBottomLeftRadius: this.props.index==this.props.list.length-1 ? Size.radius_12:0, 
                    borderBottomRightRadius: this.props.index==this.props.list.length-1 ? Size.radius_12:0,}]}>
                    {/* 头像 */}
                    <Image style={styles.header_image}/>

                    {/* 信息 */}
                    <View style={styles.content}>
                        <Text style={styles.name}>爱学习的智学习</Text>
                            
                        <View style={{flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={styles.text_default}>推广订单</Text>
                            <Text style={{color: Color.font_ff7e00, fontSize: Size.scaleSize(28)}}>6</Text>
                            <Text style={styles.text_default}>单</Text>

                            <View style={{left: Size.scaleSize(40), flexDirection: 'row', alignItems: 'center', }}>
                                <Text style={styles.text_default}>推广佣金</Text>
                                <Text style={{color: Color.font_ff7e00, fontSize: Size.scaleSize(28)}}>+￥988.88</Text>
                            </View>
                        </View>
                    </View>
                    
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        backgroundColor:Color.white,
        flexDirection: 'row',
        alignItems: 'center',
        height: Size.scaleSize(150),
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(177,177,177,0.3)',
    },
    header_image: {
        backgroundColor: 'black',
        width: Size.scaleSize(90),
        height: Size.scaleSize(90),
        borderRadius: Size.scaleSize(90)/2,
        left: Size.scaleSize(22),
    },
    content: {
        height: Size.scaleSize(80), 
        justifyContent: 'space-between', 
        left: Size.scaleSize(40), 
        width: Size.screenW-Size.scaleSize(90)-2*Size.scaleSize(24)-2*Size.space_20,
    },
    name: {
        color: Color.font_1a,
        fontSize: Size.scaleSize(28),
    },
    text_default: {
        color: Color.font_b1,
        fontSize: Size.scaleSize(24),
    },
})