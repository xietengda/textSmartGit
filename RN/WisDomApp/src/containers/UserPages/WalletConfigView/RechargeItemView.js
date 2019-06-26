import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
} from 'react-native'

import Size from '../../../config/Size';

export default class RechargeItemView extends Component {

    render() {

        return (
            <View style={[styles.container, {backgroundColor: this.props.menuItem.selected?'rgb(255,126,0)':'white'}]}>

                <Text style={[styles.title, {color:this.props.menuItem.selected?'white':'rgb(26,26,26)'}]}> {this.props.menuItem.title} </Text>
                <Text style={[styles.money, {color:this.props.menuItem.selected?'white':'rgb(26,26,26)'}]}> {this.props.menuItem.money} </Text>

            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        // 全体边框宽度
        borderWidth: 0.5,
        // 全体边框颜色
        borderColor: 'rgb(255,126,0)',
        // 全体边框圆角
        borderRadius: 5,
        alignItems: 'center',
        height: Size.scaleSize(120),
        width: (Size.screenW-2*Size.scaleSize(44)-3*Size.scaleSize(20))/4,
        marginLeft: Size.scaleSize(20),
        marginTop: Size.scaleSize(30),
    },
    title: {
        fontSize: Size.scaleSize(28),
        marginTop: Size.scaleSize(28),
    },
    money: {
        fontSize: Size.scaleSize(24),
        marginBottom: Size.scaleSize(27),
    },
})