import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native'

import Size from '../../../../config/Size';

const updown_image = require('../../../../assets/user/credit/credit-details.png')

export default class BillHeaderView extends Component {

    render() {

        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', alignItems: 'center', left: Size.scaleSize(46), top: Size.scaleSize(32)}}>
                    <View style={{backgroundColor: 'rgb(21,128,224)', width: 2, height: Size.scaleSize(28)}}></View>
                    <Text style={{color: 'rgb(19,124,223)', fontSize: Size.scaleSize(32), marginLeft: Size.scaleSize(20)}}>账单明细</Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', 
                marginTop: Size.scaleSize(50), left: Size.scaleSize(43),}}>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: 'rgb(177,177,177)', fontSize: Size.scaleSize(28)}}>2018年7月</Text>
                        <Image source={updown_image} style={{left: 5}}/>
                    </TouchableOpacity>
                    
                    <View style={{flexDirection: 'row', alignItems: 'center', position: 'absolute', right:2*Size.scaleSize(43)}}>
                        <Text style={styles.rechargeTitle}>充值</Text>
                        <Text style={styles.recharge}>{"￥9876.54"}</Text>
                        <Text style={styles.consumeTitle}>消费</Text>
                        <Text style={styles.consume}>{"￥765.54"}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        borderBottomWidth: 0.5,
        // 边框颜色
        borderBottomColor: 'rgb(240,240,240)',
        borderTopWidth: 0.5,
        // 边框颜色
        borderTopColor: 'rgb(240,240,240)',
        height: Size.scaleSize(147),

    },
    date: {

    },
    changeImg: {

    },
    // 充值
    rechargeTitle: {
        color: 'rgb(26, 26, 26)',
        fontSize: Size.scaleSize(24),
    },
    recharge: {
        color: 'rgb(255, 126, 0)',
        fontSize: Size.scaleSize(24),
        marginRight: Size.scaleSize(50),
    },
    // 消费
    consumeTitle: {
        color: 'rgb(26, 26, 26)',
        fontSize: Size.scaleSize(24),
    },
    consume: {
        color: 'rgb(255, 126, 0)',
        fontSize: Size.scaleSize(24),
    },
})