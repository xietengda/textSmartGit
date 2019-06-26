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

export default class MyEarningsChangeHeaderView extends Component {
    render() {
        return(
            <View style={[styles.constain, this.props.style]}>
                <View style={{height: Size.scaleSize(90), 
                    justifyContent: 'space-between', 
                    marginHorizontal: Size.scaleSize(20)}}>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: Color.font_b1, 
                            fontSize: Size.scaleSize(28),}}>2018年7月</Text>
                        <Image source={updown_image} style={{left:5}}/>
                    </TouchableOpacity>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems:'center', }}>
                            <Text style={{color: Color.font_1a, 
                                fontSize: Size.scaleSize(24)}}>本月收益</Text>
                            <Text style={{color: Color.font_ff7e00, 
                                fontSize: Size.scaleSize(28)}}>+￥765.54</Text>
                        </View>

                        <View style={{flexDirection: 'row', alignItems:'center', }}>
                            <Text style={{color: Color.font_1a, 
                                fontSize: Size.scaleSize(24)}}>今日收益</Text>
                            <Text style={{color: Color.font_ff7e00, 
                                fontSize: Size.scaleSize(28)}}>+￥889765.54</Text>
                        </View>
                    </View>
                </View>
                
                    
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        height: Size.scaleSize(159),
        backgroundColor: 'white',
        borderBottomColor: 'rgba(177,177,177,0.3)',
        borderBottomWidth: 0.5,
        justifyContent: 'center',
    },
})