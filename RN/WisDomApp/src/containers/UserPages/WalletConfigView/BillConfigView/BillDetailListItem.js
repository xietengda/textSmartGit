import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'

import Size from '../../../../config/Size';
import Color from '../../../../config/Color';

export default class BillDetailListItem extends Component {

    render() {

        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', left: Size.scaleSize(44)}}>
                    <Image resizeMode='contain' source={this.props.item.icon} style={styles.icon}/>

                    <View style={styles.type}>
                        <Text style={styles.title}>{this.props.item.title}</Text>
                        <Text style={styles.date}>{this.props.item.time}</Text>
                    </View>
                </View>

                <Text style={[styles.amount, {color: this.props.item.status==0?Color.font_b1:Color.font_ff7e00}]}>
                    {this.props.item.price}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        // 边框颜色
        borderBottomColor: 'rgb(240,240,240)',
        height: Size.scaleSize(120),
    },
    icon: {
        // left: Size.scaleSize(44),
        width: Size.scaleSize(58),
        height: Size.scaleSize(58),
    },
    type: {
        // 定位：绝对定位relative，相对定位absolute，固定定位pix
        // position: 'absolute',
        marginLeft: Size.scaleSize(21),
    },
    title: {
        fontSize: Size.scaleSize(32),
        color: 'rgb(26,26,26)',
    },
    date: {
        fontSize: Size.scaleSize(24),
        color: 'rgb(177,177,177)',
        marginTop: 1,
    },
    amount: {
        // 定位：绝对定位relative，相对定位absolute，固定定位pix
        position: 'absolute',
        fontSize: Size.scaleSize(24),
        color: 'rgb(255,126,0)',
        right: Size.scaleSize(43),
    },
})