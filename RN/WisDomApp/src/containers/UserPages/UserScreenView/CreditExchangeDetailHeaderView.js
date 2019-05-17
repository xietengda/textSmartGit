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

const updown_image = require('../../../assets/user/credit/credit-details.png')

export default class CreditExchangeDetailHeaderView extends Component {
    render() {
        return(
            <View style={[styles.constain, this.props.style]}>
                <View style={{marginHorizontal: Size.scaleSize(46),
                    height: Size.scaleSize(30), borderLeftColor: Color.bg_1580e0,
                    borderLeftWidth: 2, marginTop: Size.scaleSize(30)}}>
                    <Text style={{color: Color.bg_1580e0, fontSize: Size.scaleSize(32),
                        left: Size.scaleSize(21)}}>兑换明细</Text>
                </View>

                <TouchableOpacity style={{alignItems: 'center', left: Size.scaleSize(47),
                    flexDirection: 'row', marginTop: Size.scaleSize(20)}}
                onPress={()=>{
                    this.props.chooseDate && this.props.chooseDate()
                }}>
                    <Text style={{color: Color.font_b1, fontSize: Size.scaleSize(28)}}>{this.props.date}</Text>
                    <Image source={updown_image} style={{left: 5}}/>
                </TouchableOpacity>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    constain: {
        height: Size.scaleSize(145),
        backgroundColor: 'white',
        borderBottomColor: 'rgba(177,177,177,0.3)',
        borderBottomWidth: 0.5,
        // justifyContent: 'center',
    },
})
