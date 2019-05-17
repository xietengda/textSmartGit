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

const exchange_image = require('../../../assets/user/credit/creditexchange.png')

export default class CreditExchangeDetailItemView extends Component {
    render() {
        return(
            <View style={[styles.constain, this.props.style]}>

                <View style={{marginHorizontal: Size.scaleSize(44), flexDirection: 'row',
                    height: Size.scaleSize(120), alignItems: 'center', 
                    justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={exchange_image}/>
                        <View style={{left: Size.scaleSize(21)}}>
                            <Text style={{color: Color.font_1a, 
                                fontSize: Size.scaleSize(32)}}>学分兑换</Text>
                            <Text style={{color: Color.font_b1, 
                                fontSize: Size.scaleSize(24), marginTop: 2}}>2018-07-02 23:23</Text>
                        </View>
                    </View>

                    <Text style={{color: Color.font_b1, 
                        fontSize: Size.scaleSize(24)}}>-1000</Text>
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        height: Size.scaleSize(120),
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        // marginHorizontal: Size.scaleSize(25),
        backgroundColor: 'white',
        // borderBottomColor: 'rgba(177,177,177,0.3)',
        // borderBottomWidth: 0.5,
        // justifyContent: 'center',
    },
})