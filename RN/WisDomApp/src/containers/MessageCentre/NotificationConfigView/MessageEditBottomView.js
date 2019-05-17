import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'

import Size from '../../../config/Size'
import Color from '../../../config/Color'

export default class MessageEditBottomView extends Component {
    render(){
        return(
            <View style={{flexDirection: 'row', justifyContent: 'space-between',
                alignItems: 'center', borderColor: 'rgba(177,177,177,0.3)',
                borderWidth: 0.5, height: Size.scaleSize(98), 
                backgroundColor: 'white'}}>

                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center',
                    height: Size.scaleSize(98), paddingHorizontal: Size.scaleSize(25)}}>
                    <Text style={{color: this.props.canRead ? Color.bg_1580e0 : Color.font_b1, 
                        fontSize: Size.scaleSize(28)}}>全部已读</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center',
                    height: Size.scaleSize(98), paddingHorizontal: Size.scaleSize(25)}}>
                    <Text style={{color: this.props.canDelete ? Color.bg_1580e0 : Color.font_b1, 
                        fontSize: Size.scaleSize(28)}}>删除</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})