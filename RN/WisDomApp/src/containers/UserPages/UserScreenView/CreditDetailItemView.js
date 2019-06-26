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

export default class CreditDetailItemView extends Component {
    render() {
        return(
            <View style={[styles.constain, this.props.style]}>

                <View style={{flexDirection: 'row', 
                    alignItems: 'center', marginHorizontal: Size.scaleSize(30),
                    justifyContent: 'space-between', }}>
                    <View style={{height: Size.scaleSize(85), justifyContent: 'space-between',}}>
                        <Text style={{color: Color.font_1a, 
                            fontSize:Size.scaleSize(28)}}>{this.props.item.title}</Text>
                        <Text style={{color: Color.font_b1, 
                            fontSize:Size.scaleSize(24)}}>{this.props.item.time}</Text>
                    </View>
                    
                    <Text style={{color: Color.font_ff7e00, 
                            fontSize:Size.scaleSize(28)}}>{this.props.item.credit}</Text>
                </View>

            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        height: Size.scaleSize(150),
        // flexDirection: 'row',
        justifyContent: 'center',
    },
})