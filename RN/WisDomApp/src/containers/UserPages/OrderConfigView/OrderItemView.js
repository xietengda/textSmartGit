import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'

import OrderStatusView from '../OrderConfigView/OrderStatusView'
import OrderMessageView from '../OrderConfigView/OrderMessageView'
import Size from '../../../config/Size'

export default class OrderItemView extends Component {
    render() {
        return (
            // 背景边框
            <View style={styles.border_bg}>
                {/* 订单时间和订单状态 */}
                <View style={{flexDirection: 'row', height: Size.scaleSize(70), alignItems: 'center'}}>
                    <Text style={styles.time}>{this.props.item.time}</Text>
                    <Text style={styles.status}>{this._renderStatus(this.props.item.status)}</Text>
                </View>

                {/* 订单信息 */}
                <OrderMessageView style={{borderTopColor: 'rgba(177,177,177,0.2)', borderTopWidth: 0.5}}/>

                { this.props.item.status != 5 && 
                <View style={{
                        borderTopWidth: 0.5,
                        borderTopColor: 'rgba(177,177,177,0.2)',}}>

                    <OrderStatusView style={{
                        marginHorizontal: Size.scaleSize(20),}} status={this.props.item.status}/>
                </View>}

            </View>
        )
    }
    _renderStatus(status){
        if (status == 1) {
            return '待付款';
        } else if (status == 2) {
            return '已完成';
        } else if (status == 3) {
            return '未完成';
        } else if (status == 4) {
            return '已取消';
        } else if (status == 5) {
            return '交易成功';
        } else if (status == 6) {
            return '已退款';
        }
    }
}

const styles = StyleSheet.create({
    // border
    border_bg: {
        flex:1,
        borderWidth: 0.5,
        borderColor: 'rgb(230,230,230)',
        borderRadius: Size.radius_12,
        left: Size.scaleSize(24),
        width: Size.screenW - 2*Size.scaleSize(24),
        marginTop: Size.scaleSize(20),
        backgroundColor: 'white',
    },
    // 订单信息
    order_msg: {
        flexDirection: 'row',
        alignItems: 'center',
        height: Size.scaleSize(228),
        borderTopWidth: 0.5,
        borderTopColor: 'rgba(177,177,177, 0.2)',
    },
    // 订单图片
    order_image: {
        width: Size.scaleSize(225),
        height: Size.scaleSize(168),
        backgroundColor: 'rgb(177,177,177)',
        borderRadius: 5,
        // 定位：绝对定位relative，相对定位absolute，固定定位pix
        position: 'absolute',
        left: Size.scaleSize(21),
    },
    // 统一使用
    text_view: {
        // 定位：绝对定位relative，相对定位absolute，固定定位pix
        position: 'absolute',
        //两端对齐，项目之间的间隔都相等。
        justifyContent: 'space-between',
        left: Size.scaleSize(266),
        right: Size.scaleSize(24),
        height: Size.scaleSize(168),
    },
    text_default: {
        color: 'rgb(177,177,177)',
        fontSize: Size.scaleSize(24),
    },
    // 订单状态
    status: {
        color: 'rgb(21,128,224)',
        fontSize: Size.scaleSize(24),
        // 定位：绝对定位relative，相对定位absolute，固定定位pix
        position: 'absolute',
        right: Size.scaleSize(23),
    },
    // 时间
    time: {
        color: 'rgb(177,177,177)',
        fontSize: Size.scaleSize(24),
        // 定位：绝对定位relative，相对定位absolute，固定定位pix
        position: 'absolute',
        left: Size.scaleSize(21),
    },
})