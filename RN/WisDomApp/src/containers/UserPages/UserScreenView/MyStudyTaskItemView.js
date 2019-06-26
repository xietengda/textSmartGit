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

export default class MyStudyTaskItemView extends Component {
    render() {
        return(
            <View style={[styles.constain, this.props.style]}>

                <View style={{height: Size.scaleSize(80), 
                    justifyContent: 'space-between', }}>

                    <View style={{flexDirection: 'row', }}>

                        <Text style={{color: Color.font_1a, 
                            fontSize: Size.scaleSize(28)}}>发布动态</Text>
                        <Text style={{color: Color.font_ff7e00, 
                            fontSize: Size.scaleSize(24),
                            left: Size.scaleSize(22)}}>学分+50</Text>
                    </View>

                    <Text style={{color: Color.font_b1, 
                            fontSize: Size.scaleSize(24)}}>在同学圈发布动态，类型不限</Text>
                </View>

                <TouchableOpacity onPress={()=>{
                    this.props.publish && this.props.publish()
                }}>
                    <Text style={{color: Color.bg_1580e0, 
                            fontSize: Size.scaleSize(24)}}>去发布</Text>
                </TouchableOpacity>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        height: Size.scaleSize(150),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: Size.scaleSize(25),
        // backgroundColor: 'white',
        // borderBottomColor: 'rgba(177,177,177,0.3)',
        // borderBottomWidth: 0.5,
        // justifyContent: 'center',
    },
})