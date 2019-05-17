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

export default class HelpQuestionItemView extends Component {
    render() {
        return(
            <View style={[styles.constain, this.props.style]}>

                <TouchableOpacity style={{flexDirection: 'row', left: this.props.leftSpace, }}>
                    <Image resizeMode='contain' source={this.props.item.icon} style={styles.icon}/>

                    <View style={{height: Size.scaleSize(55), 
                        justifyContent:'space-between', 
                        left:Size.scaleSize(50)}}>
                        <Text style={styles.title}>{this.props.item.title}</Text>
                        <Text style={styles.detial}>{this.props.item.detail}</Text>
                    </View>
                </TouchableOpacity>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        width: (Size.screenW-2*Size.scaleSize(24)-1)/2,
        height: Size.scaleSize(110),
        justifyContent:'center', 
    },
    icon: {
        width: Size.scaleSize(50),
        height: Size.scaleSize(50),
        left: Size.scaleSize(30),
    },
    title: {
        color: Color.font_1a,
        fontSize: Size.scaleSize(24),
    },
    detial: {
        color: Color.font_b1,
        fontSize: Size.scaleSize(20),
    },
})