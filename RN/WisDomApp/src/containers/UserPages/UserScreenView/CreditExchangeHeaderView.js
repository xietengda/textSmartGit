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

export default class CreditExchangeHeaderView extends Component {
    render() {
        return(
            <View style={[styles.constain, this.props.style]}>

                <View style={{borderBottomColor: 'rgba(177,177,177,0.3)', borderBottomWidth: 0.5,
                    height: Size.scaleSize(189), }}>
                    <Text style={{color: Color.font_b1, 
                        fontSize: Size.scaleSize(28),
                        left: Size.scaleSize(46), 
                        marginTop: Size.scaleSize(49)}}>当前学分</Text>

                    <Text style={{color: Color.font_ff7e00, 
                        fontSize: Size.scaleSize(72),
                        left: Size.scaleSize(44), marginTop: 5}}>8688</Text>
                </View>

                <View style={{flexDirection: 'row', marginHorizontal: Size.scaleSize(43), 
                    justifyContent: 'space-between', marginTop: Size.scaleSize(30)}}>

                    <Text style={{color: Color.font_1a, 
                        fontSize: Size.scaleSize(24)}}>1000学分=1智力</Text>

                    <View style={{flexDirection: 'row'}}>

                        <Text style={{color: Color.font_1a, 
                            fontSize: Size.scaleSize(24)}}>今日可兑换智力：</Text>

                        <Text style={{color: Color.font_ff7e00, 
                            fontSize: Size.scaleSize(24)}}>8.68</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row', marginHorizontal: Size.scaleSize(43), 
                    justifyContent: 'space-between', marginTop: Size.scaleSize(25)}}>

                    <View style={{flexDirection: 'row'}}>

                        <Text style={{color: Color.font_1a, 
                            fontSize: Size.scaleSize(24)}}>将扣除学分：</Text>
                        <Text style={{color: Color.font_ff7e00, 
                            fontSize: Size.scaleSize(24)}}>8680</Text>

                    </View>
                    <View style={{flexDirection: 'row'}}>

                        <Text style={{color: Color.font_1a, 
                            fontSize: Size.scaleSize(24)}}>兑换后剩余学分：</Text>
                        <Text style={{color: Color.font_ff7e00, 
                            fontSize: Size.scaleSize(24)}}>8</Text>

                    </View>
                </View>

                <TouchableOpacity style={{backgroundColor: Color.bg_1580e0, 
                    marginHorizontal: Size.scaleSize(44), 
                    height: Size.scaleSize(72), borderRadius: 5, 
                    alignItems: 'center', justifyContent: 'center', 
                    marginTop: Size.scaleSize(30)}}>
                    <Text style={{color: Color.white, 
                            fontSize: Size.scaleSize(32)}}>我要兑换</Text>
                </TouchableOpacity>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        height: Size.scaleSize(430),
        // backgroundColor: 'red',
        borderBottomColor: 'rgba(177,177,177,0.3)',
        borderBottomWidth: 0.5,
        // justifyContent: 'center',
    },
})