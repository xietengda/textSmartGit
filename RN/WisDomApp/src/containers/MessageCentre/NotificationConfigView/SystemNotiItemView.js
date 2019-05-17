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

export default class SystemNotiItemView extends Component {
    render() {
        return(
            <View style={[styles.constain, this.props.style]}>
                <View style={{marginHorizontal: 20, alignItems: 'center', 
                    justifyContent: 'center', height: Size.scaleSize(90)}}>
                    <Text style={{color: Color.font_b1, 
                        fontSize: Size.scaleSize(24)}}>2017-12-30 12:00</Text>
                </View>

                <View style={{flexDirection: 'row', marginHorizontal: Size.scaleSize(25)}}>
                    <Image style={{width: Size.scaleSize(90), 
                        height: Size.scaleSize(90), borderRadius: Size.scaleSize(90)/2, 
                        backgroundColor: Color.bg_1580e0}}/>

                    {/* 底部白色背景 */}
                    <View style={{width: Size.screenW-Size.scaleSize(125)-Size.scaleSize(23),
                            left: Size.scaleSize(10), backgroundColor: 'white',
                            paddingTop: Size.scaleSize(25), paddingBottom: Size.scaleSize(25),
                            borderRadius: 8,}}>

                        <View style={{marginHorizontal: Size.scaleSize(20)}}>

                            <Text style={{color: Color.font_1a, 
                                fontSize: Size.scaleSize(28),}}>
                                你在回答区
                                <Text style={{color: Color.font_ff7e00, 
                                    fontSize: Size.scaleSize(28),}}>回答区名称</Text>
                                的回答被
                                <Text style={{color: Color.font_ff7e00, 
                                    fontSize: Size.scaleSize(28),}}>用户昵称</Text>
                                偷听了，恭喜你获得分成佣金：
                                <Text style={{color: Color.font_ff7e00, 
                                    fontSize: Size.scaleSize(28),}}>￥9999.99</Text>
                                <Text style={{color: Color.bg_1580e0, 
                                    fontSize: Size.scaleSize(28),}}> 点击查看详情>>></Text>
                            </Text>

                            <View style={{flexDirection: 'row', marginTop: Size.scaleSize(20), 
                                alignItems: 'center'}}>
                                <Image style={{width: Size.scaleSize(95), 
                                    height: Size.scaleSize(71), borderRadius: 2.5, 
                                    backgroundColor: 'black'}}/>
                                <View style={{height: Size.scaleSize(70), justifyContent: 'space-between', 
                                    left: Size.scaleSize(10), 
                                    width: Size.screenW-Size.scaleSize(90)-2*Size.scaleSize(25)-Size.scaleSize(30)-Size.scaleSize(100)}}>
                                    <Text numberOfLines={1} 
                                    style={{color: Color.font_1a, 
                                        fontSize: Size.scaleSize(28)}}>领导力之九领导力之九领导力之久领导力之九领导力之九领导力之久</Text>
                                    <Text numberOfLines={1} 
                                    style={{color: Color.font_b1, 
                                        fontSize: Size.scaleSize(24)}}>课程的简介显示课程的简介显示课程的简介显示课程的简介显示</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        // paddingTop: 10,
        // paddingBottom: 10,
    },
})