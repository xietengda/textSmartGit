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

export default class MyEarningsDetailItemView extends Component {
    render() {
        return(
            <View style={[styles.constain, this.props.style]}>

                <View style={{marginHorizontal: Size.scaleSize(20), 
                    height: Size.scaleSize(75), 
                    justifyContent: 'space-between'}}>
                    <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                        <Text style={{color: Color.font_1a, fontSize: Size.scaleSize(28)}}>收益提现</Text>
                        <Text style={{color: Color.font_b1, fontSize: Size.scaleSize(28)}}>-￥28.88</Text>
                    </View>

                    <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                        <Text style={{color: Color.font_b1, fontSize: Size.scaleSize(24)}}>2018-07-03 23:23:23</Text>
                        <Text style={{color: Color.font_b1, fontSize: Size.scaleSize(24)}}>
                            {this.props.item.status == 0 ? '审核中':(this.props.item.status == 1 ? '提现成功':'提现失败')}
                        </Text>
                    </View>
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        height: Size.scaleSize(125),
        backgroundColor: 'white',
        borderBottomColor: 'rgba(177,177,177,0.3)',
        borderBottomWidth: 0.5,
        justifyContent: 'center',
    },
})