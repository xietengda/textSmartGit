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
                <Text numberOfLines={1} 
                    style={{marginTop: Size.scaleSize(30), marginHorizontal: Size.scaleSize(20),
                        color: Color.font_1a, fontSize: Size.scaleSize(28)}}>
                    {this.props.item.title}
                </Text>
                
                <View style={{marginHorizontal: Size.scaleSize(20), 
                        marginTop: Size.scaleSize(15), 
                        flexDirection: 'row',
                        justifyContent: 'space-between'}}>
                    <View>
                        <Text style={{color: Color.font_b1, 
                            fontSize: Size.scaleSize(24)}}>{this.props.item.name}</Text>

                        { this.props.item.desc && <Text style={{color: Color.font_b1, 
                            fontSize: Size.scaleSize(24), 
                            marginTop: Size.scaleSize(15)}}>{this.props.item.desc}</Text>}

                        <Text style={{color: Color.font_b1, 
                            fontSize: Size.scaleSize(24), 
                            marginTop: Size.scaleSize(15)}}>{this.props.item.time}</Text>
                    </View>

                    {/* <View style={{alignItems: 'flex-end', marginTop: Size.scaleSize(0), }}>
                        <Text style={{color: Color.font_ff7e00, 
                            fontSize: Size.scaleSize(28)}}>{'+￥'+this.props.item.price}</Text>

                        { this.props.item.status && <Text style={{color: Color.font_b1, 
                            fontSize: Size.scaleSize(24)}}>{this.props.item.status}</Text> }
                    </View> */}
                </View>

                <View style={{position: 'absolute', top: 10, bottom: 10, 
                    right: Size.scaleSize(20), alignItems: 'flex-end',
                    justifyContent: 'center'}}>
                        <Text style={{color: Color.font_ff7e00, 
                            fontSize: Size.scaleSize(28),
                            marginTop: Size.scaleSize(10)}}>{'+￥'+this.props.item.price}</Text>

                        { this.props.item.status && <Text style={{color: Color.font_b1, 
                            fontSize: Size.scaleSize(24)}}>{this.props.item.status}</Text> }
                </View>

            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        paddingBottom: Size.scaleSize(30),
        backgroundColor: 'white',
        borderBottomColor: 'rgba(177,177,177,0.3)',
        borderBottomWidth: 0.5,
    },
})