import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'

import Size from '../../../config/Size'
import Color from '../../../config/Color'

export default class AmountItemView extends Component {
    render() {
        return (
            <View style={this.props.style}>
                <TouchableOpacity style={styles.constain} onPress={()=>{
                    this.props.selectAmount && this.props.selectAmount()
                }}>
                    <Text style={{color: Color.font_1a,
                            fontSize: Size.scaleSize(36),
                            left: Size.scaleSize(28),
                            top: Size.scaleSize(34)}}>{this.props.item.title}</Text>

                        <Text style={{position: 'absolute',
                            color: this.props.item.amountColor,
                            fontSize: Size.scaleSize(72),
                            alignSelf:'center',
                            bottom: Size.scaleSize(25),}}>{this.props.item.amount}</Text>
                </TouchableOpacity>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        height: 100,
        width: Size.screenW-60-8,
        backgroundColor: 'white',
        borderRadius: Size.radius_12,
        borderWidth: 0.5,
        borderColor: 'rgb(240,240,240)',
    }
})